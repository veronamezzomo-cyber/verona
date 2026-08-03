import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Placeholder para serviço de exportação PDF.
 */

export async function exportPDF(elements: UIElement[], filename = 'layout-export.pdf') {
  console.log('Exporting PDF...', elements);
  // Implementação futura com jsPDF
  alert('PDF Export initiated (Console log only for now)');
}
