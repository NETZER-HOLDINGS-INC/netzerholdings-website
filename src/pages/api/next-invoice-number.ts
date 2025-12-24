import type { APIRoute } from 'astro';
import { getNextInvoiceNumber } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const nextNumber = getNextInvoiceNumber();
    
    return new Response(JSON.stringify({ invoiceNumber: nextNumber }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error getting next invoice number:', error);
    return new Response(JSON.stringify({ error: 'Failed to get invoice number' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

