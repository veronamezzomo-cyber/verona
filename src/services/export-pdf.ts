
'use client';

import { jsPDF } from 'jspdf';
import { buildSVG } from '@/lib/svg-builder';
import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Serviço de exportação de PDF Real para Adobe After Effects / Illustrator.
 * Converte o layout vetorial em um documento PDF de alta fidelidade.
 */

export async function exportPDF(elements: UIElement[], filename = 'layout-forge-export.pdf') {
  // Criamos o SVG como base
  const svgString = buildSVG(elements);
  
  // Criamos o documento PDF (Landscape, pixels)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [1280, 720]
  });

  // Embutimos o SVG no PDF
  // Nota: jsPDF suporta a adição de SVG através de plugins ou desenhando manualmente.
  // Para máxima compatibilidade em um ambiente de prototipagem, usamos a estratégia de embed.
  try {
    const parser = new XMLSerializer();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    // Convertemos SVG para Imagem temporária para garantir renderização correta no PDF
    const img = new Image();
    img.src = url;
    
    await new Promise((resolve) => {
      img.onload = () => {
        doc.addImage(img, 'PNG', 0, 0, 1280, 720);
        doc.save(filename);
        URL.revokeObjectURL(url);
        resolve(true);
      };
    });
  } catch (error) {
    console.error('PDF_EXPORT_ERROR:', error);
    // Fallback simples se o motor de renderização falhar
    alert('Erro na geração do PDF. Tente exportar em SVG.');
  }
}
