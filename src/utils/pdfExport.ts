import { jsPDF } from 'jspdf';
import { AnalysisResult } from '../types';

/**
 * Formats analysis findings into a clean text summary suitable for pasting into chats, emails, or notes.
 */
export function formatSummaryForClipboard(result: AnalysisResult): string {
  const levelUpper = result.pressureLevel.toUpperCase();
  const tacticsList =
    result.tactics.length > 0
      ? result.tactics.map((t) => `• ${t.name}: ${t.explanation}`).join('\n')
      : '• No coercive or manipulative tactics detected.';

  return `[PRESSURE EVALUATION REPORT]
Result: ${levelUpper} PRESSURE (${result.score}/100)

SENDER'S REQUEST:
"${result.request}"

SUMMARY:
${result.summary}

TACTICS DETECTED:
${tacticsList}

WHY THIS DESERVES A SECOND LOOK:
${result.riskContext}

BEFORE YOU ACT:
${result.recommendedAction}

PAUSE QUESTION:
"${result.pauseQuestion}"

---
Generated with PRESSURE • Pause before you respond.`;
}

/**
 * Generates and downloads a clean, professional PDF report of the evaluation findings.
 */
export function exportAnalysisToPDF(result: AnalysisResult, date = new Date()): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 22;

  // Header: Brand & Tagline
  doc.setFillColor(20, 20, 20); // #141414
  doc.rect(margin, y - 6, contentWidth, 20, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('PRESSURE', margin + 6, y + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 85, 0); // #FF5500
  doc.text('Pause before you respond.', margin + 46, y + 3.5);

  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  doc.text(dateStr, pageWidth - margin - 6, y + 3.5, { align: 'right' });

  y += 24;

  // Pressure Level & Score Banner
  const isHigh = result.pressureLevel === 'high';
  const isMed = result.pressureLevel === 'medium';
  const bannerBg = isHigh ? [255, 240, 235] : isMed ? [255, 250, 230] : [240, 253, 244];
  const bannerBorder = isHigh ? [255, 85, 0] : isMed ? [217, 119, 6] : [22, 163, 74];

  doc.setFillColor(bannerBg[0], bannerBg[1], bannerBg[2]);
  doc.setDrawColor(bannerBorder[0], bannerBorder[1], bannerBorder[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 18, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(bannerBorder[0], bannerBorder[1], bannerBorder[2]);
  doc.text(`${result.pressureLevel.toUpperCase()} PRESSURE LEVEL`, margin + 6, y + 7.5);

  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(`Score: ${result.score}/100 • Evaluated from message language and context`, margin + 6, y + 13.5);

  y += 26;

  // Section: What they're asking you to do
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text("WHAT THEY'RE ASKING YOU TO DO", margin, y);
  y += 5;

  doc.setFillColor(248, 247, 245);
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);

  const requestLines = doc.splitTextToSize(`"${result.request}"`, contentWidth - 10);
  const requestBoxHeight = Math.max(14, requestLines.length * 5.5 + 8);
  doc.roundedRect(margin, y, contentWidth, requestBoxHeight, 2, 2, 'FD');
  doc.text(requestLines, margin + 5, y + 6.5);

  y += requestBoxHeight + 8;

  // Section: Tactics Detected
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text('TACTICS DETECTED', margin, y);
  y += 5;

  if (result.tactics.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(70, 70, 70);
    doc.text('No coercive or manipulative pressure tactics were found in this message.', margin + 2, y + 4);
    y += 10;
  } else {
    for (const tactic of result.tactics) {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.3);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(255, 85, 0); // #FF5500
      const titleText = tactic.name.toUpperCase();

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      const explLines = doc.splitTextToSize(tactic.explanation, contentWidth - 10);
      const cardHeight = explLines.length * 4.5 + 9;

      // Check if page needs break
      if (y + cardHeight > 270) {
        doc.addPage();
        y = 20;
      }

      doc.roundedRect(margin, y, contentWidth, cardHeight, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(20, 20, 20);
      doc.text(titleText, margin + 5, y + 5.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(70, 70, 70);
      doc.text(explLines, margin + 5, y + 10.5);

      y += cardHeight + 4;
    }
  }

  y += 4;

  // Section: Why this deserves a second look & Before you act
  if (y + 35 > 270) {
    doc.addPage();
    y = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text('WHY THIS DESERVES A SECOND LOOK', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const riskLines = doc.splitTextToSize(result.riskContext, contentWidth);
  doc.text(riskLines, margin, y);
  y += riskLines.length * 4.5 + 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text('BEFORE YOU ACT', margin, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  const actLines = doc.splitTextToSize(result.recommendedAction, contentWidth);
  doc.text(actLines, margin, y);
  y += actLines.length * 4.5 + 10;

  // Section: Centerpiece - Pause Before You Respond
  if (y + 40 > 270) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(20, 20, 20);
  const pauseLines = doc.splitTextToSize(`"${result.pauseQuestion}"`, contentWidth - 14);
  const pauseHeight = pauseLines.length * 6 + 18;

  doc.roundedRect(margin, y, contentWidth, pauseHeight, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 85, 0); // Orange
  doc.text('PAUSE BEFORE YOU RESPOND', margin + 7, y + 7.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(pauseLines, margin + 7, y + 14);

  y += pauseHeight + 10;

  // Footer Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text(
    'PRESSURE is a decision-support tool. Always independently verify unexpected communications through secondary channels.',
    pageWidth / 2,
    285,
    { align: 'center' }
  );

  // Save the document
  const filename = `pressure-evaluation-${date.toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
