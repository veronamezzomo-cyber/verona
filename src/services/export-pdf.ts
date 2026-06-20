'use client';

import { jsPDF } from 'jspdf';
import { buildSVG } from '@/lib/svg-builder';
import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Serviço de exportação de PDF de alta fidelidade para After Effects / Illustrator.
 * Pipeline de estabilização via Canvas para evitar erros de arquivo corrompido.
 */

export async function exportPDF(elements: UIElement[], filename = 'youtube-studio-export.pdf') {
  const svgString = buildSVG(elements);
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [1280, 720]
  });

  try {
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Canvas context not available');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    
    await new Promise((resolve, reject) => {
      img.onload = () => {
        // Renderizar com fundo preto sólido (YouTube Style)
        ctx.fillStyle = '#0f0f0f';
        ctx.fillRect(0, 0, 1280, 720);
        
        // Desenhar a imagem carregada
        ctx.drawImage(img, 0, 0, 1280, 720);
        
        // Obter o base64 estável (Pipeline de estabilização de buffer)
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Verificar integridade do buffer
        if (imgData.length < 1000) {
          reject(new Error('Buffer de imagem insuficiente.'));
          return;
        }

        // Injetar no PDF
        doc.addImage(imgData, 'PNG', 0, 0, 1280, 720, undefined, 'FAST');
        doc.save(filename);
        
        URL.revokeObjectURL(url);
        resolve(true);
      };
      
      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(new Error('Falha ao processar o buffer de imagem do SVG.'));
      };
    });
  } catch (error) {
    console.error('PDF_EXPORT_ERROR:', error);
    alert('Erro na geração do PDF. O buffer de imagem não pôde ser estabilizado.');
  }
}
