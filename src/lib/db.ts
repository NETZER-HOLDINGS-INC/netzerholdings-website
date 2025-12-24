import { join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

// Create data directory if it doesn't exist
const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, 'invoices.json');

// Initialize database file
if (!existsSync(dbPath)) {
  writeFileSync(dbPath, JSON.stringify({ invoices: [], nextId: 1 }, null, 2));
}

// Read database
function readDB() {
  try {
    const data = readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { invoices: [], nextId: 1 };
  }
}

// Write database
function writeDB(data: any) {
  try {
    writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
  }
}

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
  const db = readDB();
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;

  // Find the last invoice number for this year
  const yearInvoices = db.invoices
    .filter((inv: Invoice) => inv.invoice_number.startsWith(prefix))
    .sort((a: Invoice, b: Invoice) => {
      const numA = parseInt(a.invoice_number.split('-')[2]);
      const numB = parseInt(b.invoice_number.split('-')[2]);
      return numB - numA;
    });

  if (yearInvoices.length > 0) {
    const lastNumber = parseInt(yearInvoices[0].invoice_number.split('-')[2]);
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    return `${prefix}${nextNumber}`;
  }

  return `${prefix}0001`;
}

// Save invoice
export function saveInvoice(invoice: Invoice): number {
  const db = readDB();

  const newInvoice = {
    id: db.nextId,
    invoice_number: invoice.invoice_number,
    contractor_name: invoice.contractor_name,
    contractor_email: invoice.contractor_email,
    contractor_phone: invoice.contractor_phone || null,
    contractor_address: invoice.contractor_address || null,
    company_key: invoice.company_key || null,
    company_name: invoice.company_name,
    company_address: invoice.company_address || null,
    company_email: invoice.company_email || null,
    invoice_date: invoice.invoice_date,
    due_date: invoice.due_date || null,
    notes: invoice.notes || null,
    total: invoice.total,
    line_items: invoice.line_items,
    created_at: new Date().toISOString(),
    status: invoice.status || 'submitted'
  };

  db.invoices.push(newInvoice);
  db.nextId++;

  writeDB(db);

  return newInvoice.id;
}

// Get invoice by number
export function getInvoiceByNumber(invoiceNumber: string): Invoice | undefined {
  const db = readDB();
  return db.invoices.find((inv: Invoice) => inv.invoice_number === invoiceNumber);
}

// Get all invoices (with pagination)
export function getAllInvoices(limit = 100, offset = 0): Invoice[] {
  const db = readDB();
  return db.invoices
    .sort((a: Invoice, b: Invoice) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    })
    .slice(offset, offset + limit);
}

// Get invoices by contractor email
export function getInvoicesByContractor(email: string): Invoice[] {
  const db = readDB();
  return db.invoices
    .filter((inv: Invoice) => inv.contractor_email === email)
    .sort((a: Invoice, b: Invoice) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });
}

// Get invoices by company
export function getInvoicesByCompany(companyKey: string): Invoice[] {
  const db = readDB();
  return db.invoices
    .filter((inv: Invoice) => inv.company_key === companyKey)
    .sort((a: Invoice, b: Invoice) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });
}

// Update invoice status
export function updateInvoiceStatus(invoiceNumber: string, status: string): void {
  const db = readDB();
  const invoice = db.invoices.find((inv: Invoice) => inv.invoice_number === invoiceNumber);
  if (invoice) {
    invoice.status = status;
    writeDB(db);
  }
}

// Get invoice statistics
export function getInvoiceStats() {
  const db = readDB();
  const totalInvoices = db.invoices.length;
  const totalAmount = db.invoices.reduce((sum: number, inv: Invoice) => sum + inv.total, 0);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthInvoices = db.invoices.filter((inv: Invoice) => {
    const invDate = new Date(inv.created_at || 0);
    return invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;
  });

  const thisMonthCount = thisMonthInvoices.length;
  const thisMonthAmount = thisMonthInvoices.reduce((sum: number, inv: Invoice) => sum + inv.total, 0);

  return {
    totalInvoices,
    totalAmount,
    thisMonthCount,
    thisMonthAmount
  };
}

