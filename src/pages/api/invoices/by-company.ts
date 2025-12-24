import type { APIRoute } from 'astro';
import { getInvoicesByCompany } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const companyKey = url.searchParams.get('company');
    
    if (!companyKey) {
      return new Response(JSON.stringify({ error: 'Company key is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const invoices = getInvoicesByCompany(companyKey);
    
    // Calculate totals
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const count = invoices.length;
    
    return new Response(JSON.stringify({ 
      company: companyKey,
      count,
      totalAmount,
      invoices 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error getting invoices by company:', error);
    return new Response(JSON.stringify({ error: 'Failed to get invoices' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

