import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create data directory if it doesn't exist
const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, 'invoices.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number TEXT UNIQUE NOT NULL,
    contractor_name TEXT NOT NULL,
    contractor_email TEXT NOT NULL,
    contractor_phone TEXT,
    contractor_address TEXT,
    company_key TEXT,
    company_name TEXT NOT NULL,
    company_address TEXT,
    company_email TEXT,
    invoice_date TEXT NOT NULL,
    due_date TEXT,
    notes TEXT,
    total REAL NOT NULL,
    line_items TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'submitted'
  );

  CREATE INDEX IF NOT EXISTS idx_invoice_number ON invoices(invoice_number);
  CREATE INDEX IF NOT EXISTS idx_created_at ON invoices(created_at);
  CREATE INDEX IF NOT EXISTS idx_contractor_email ON invoices(contractor_email);
  CREATE INDEX IF NOT EXISTS idx_company_key ON invoices(company_key);
`);

export interface Invoice {
  id?: number;
  invoice_number: string;
  contractor_name: string;
  contractor_email: string;
  contractor_phone?: string;
  contractor_address?: string;
  company_key?: string;
  company_name: string;
  company_address?: string;
  company_email?: string;
  invoice_date: string;
  due_date?: string;
  notes?: string;
  total: number;
  line_items: string; // JSON string
  created_at?: string;
  status?: string;
}

// Get next invoice number
export function getNextInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;
  
  const result = db.prepare(`
    SELECT invoice_number 
    FROM invoices 
    WHERE invoice_number LIKE ? 
    ORDER BY id DESC 
    LIMIT 1
  `).get(`${prefix}%`) as { invoice_number: string } | undefined;

  if (result) {
    const lastNumber = parseInt(result.invoice_number.split('-')[2]);
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    return `${prefix}${nextNumber}`;
  }
  
  return `${prefix}0001`;
}

// Save invoice
export function saveInvoice(invoice: Invoice): number {
  const stmt = db.prepare(`
    INSERT INTO invoices (
      invoice_number, contractor_name, contractor_email, contractor_phone,
      contractor_address, company_key, company_name, company_address, company_email,
      invoice_date, due_date, notes, total, line_items, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    invoice.invoice_number,
    invoice.contractor_name,
    invoice.contractor_email,
    invoice.contractor_phone || null,
    invoice.contractor_address || null,
    invoice.company_key || null,
    invoice.company_name,
    invoice.company_address || null,
    invoice.company_email || null,
    invoice.invoice_date,
    invoice.due_date || null,
    invoice.notes || null,
    invoice.total,
    invoice.line_items,
    invoice.status || 'submitted'
  );

  return result.lastInsertRowid as number;
}

// Get invoice by number
export function getInvoiceByNumber(invoiceNumber: string): Invoice | undefined {
  const stmt = db.prepare('SELECT * FROM invoices WHERE invoice_number = ?');
  return stmt.get(invoiceNumber) as Invoice | undefined;
}

// Get all invoices (with pagination)
export function getAllInvoices(limit = 100, offset = 0): Invoice[] {
  const stmt = db.prepare('SELECT * FROM invoices ORDER BY created_at DESC LIMIT ? OFFSET ?');
  return stmt.all(limit, offset) as Invoice[];
}

// Get invoices by contractor email
export function getInvoicesByContractor(email: string): Invoice[] {
  const stmt = db.prepare('SELECT * FROM invoices WHERE contractor_email = ? ORDER BY created_at DESC');
  return stmt.all(email) as Invoice[];
}

// Get invoices by company
export function getInvoicesByCompany(companyKey: string): Invoice[] {
  const stmt = db.prepare('SELECT * FROM invoices WHERE company_key = ? ORDER BY created_at DESC');
  return stmt.all(companyKey) as Invoice[];
}

// Update invoice status
export function updateInvoiceStatus(invoiceNumber: string, status: string): void {
  const stmt = db.prepare('UPDATE invoices SET status = ? WHERE invoice_number = ?');
  stmt.run(status, invoiceNumber);
}

// Get invoice statistics
export function getInvoiceStats() {
  const totalInvoices = db.prepare('SELECT COUNT(*) as count FROM invoices').get() as { count: number };
  const totalAmount = db.prepare('SELECT SUM(total) as sum FROM invoices').get() as { sum: number };
  const thisMonth = db.prepare(`
    SELECT COUNT(*) as count, SUM(total) as sum 
    FROM invoices 
    WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
  `).get() as { count: number; sum: number };

  return {
    totalInvoices: totalInvoices.count,
    totalAmount: totalAmount.sum || 0,
    thisMonthCount: thisMonth.count,
    thisMonthAmount: thisMonth.sum || 0
  };
}

export default db;

