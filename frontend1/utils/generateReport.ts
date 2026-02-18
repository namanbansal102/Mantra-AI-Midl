import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface RiskData {
  risk_score: number;
  reasons: string[];
  address: string;
  nodes?: any[];
  edges?: any[];
  root_wallet?: string;
}

export const generateRiskReport = async (riskData: RiskData, knobElement?: HTMLElement, graphElement?: HTMLElement) => {
  const pdf:any = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function for styled text
  const addStyledText = (text: string, size: number, color: [number, number, number], weight: 'bold' | 'normal' = 'normal', x = 20) => {
    pdf.setFontSize(size);
    pdf.setTextColor(color[0], color[1], color[2]);
    pdf.setFont('helvetica', weight);
    pdf.text(text, x, yPosition);
    yPosition += size + 5;
  };

  const addSection = (title: string) => {
    yPosition += 5;
    pdf.setDrawColor(100, 150, 200);
    pdf.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 8;
    addStyledText(title, 14, [100, 150, 200], 'bold');
  };

  // Header
  pdf.setFillColor(15, 15, 30);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setFontSize(28);
  pdf.setTextColor(100, 150, 200);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Wallet Risk Assessment Report', 20, 20);
  
  yPosition = 50;

  // Risk Score Section
  addSection('Risk Analysis');
  
  const getRiskColor = (score: number): [number, number, number] => {
    if (score < 100) return [34, 197, 94]; // Green
    if (score < 200) return [234, 179, 8]; // Yellow
    if (score < 500) return [249, 115, 22]; // Orange
    return [239, 68, 68]; // Red
  };

  const getRiskLabel = (score: number): string => {
    if (score < 100) return 'Safe';
    if (score < 200) return 'Low Risk';
    if (score < 500) return 'Medium Risk';
    return 'High Risk';
  };

  const riskColor = getRiskColor(riskData.risk_score);
  const riskLabel = getRiskLabel(riskData.risk_score);

  // Risk Score Display
  pdf.setFontSize(12);
  pdf.setTextColor(150, 150, 150);
  pdf.text('Risk Score:', 20, yPosition);
  
  pdf.setFontSize(24);
  pdf.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
  pdf.setFont('helvetica', 'bold');
  pdf.text(riskData.risk_score.toString(), 80, yPosition);
  
  pdf.setFontSize(14);
  pdf.text(`(${riskLabel})`, 110, yPosition);
  
  yPosition += 15;

  // Risk Score Ranges
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Safe: < 100  |  Low Risk: 100-200  |  Medium: 200-500  |  High: > 500', 20, yPosition);
  yPosition += 10;

  // Wallet Address
  addSection('Wallet Information');
  
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Address:', 20, yPosition);
  
  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 150);
  pdf.setFont('courier');
  const addressLines = pdf.splitTextToSize(riskData.address, pageWidth - 40);
  pdf.text(addressLines, 20, yPosition + 5);
  yPosition += 15 + addressLines.length * 4;

  // Risk Factors
  if (riskData.reasons && riskData.reasons.length > 0) {
    addSection('Risk Factors');
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    riskData.reasons.forEach((reason, index) => {
      pdf.setTextColor(150, 150, 150);
      const reasonLines = pdf.splitTextToSize(`${index + 1}. ${reason}`, pageWidth - 40);
      pdf.text(reasonLines, 20, yPosition);
      yPosition += reasonLines.length * 5 + 3;
      
      // Add new page if content exceeds page height
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
    });
  }

  // Wallet Network Information
  if (riskData.nodes && riskData.nodes.length > 0) {
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }

    addSection('Connected Wallet Network');
    
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'normal');
    
    pdf.text(`Total Connected Wallets: ${riskData.nodes.length}`, 20, yPosition);
    yPosition += 8;
    
    // Node statistics
    const highRiskNodes = riskData.nodes.filter((n: any) => n.suspicious_score > 60).length;
    const mediumRiskNodes = riskData.nodes.filter((n: any) => n.suspicious_score > 40 && n.suspicious_score <= 60).length;
    
    pdf.text(`High Risk Nodes: ${highRiskNodes}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Medium Risk Nodes: ${mediumRiskNodes}`, 20, yPosition);
    yPosition += 10;

    // Top risk nodes
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(100, 150, 200);
    pdf.text('Top Risk Wallets:', 20, yPosition);
    yPosition += 7;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(150, 150, 150);
    
    const topRiskNodes = riskData.nodes
      .sort((a: any, b: any) => b.suspicious_score - a.suspicious_score)
      .slice(0, 5);

    topRiskNodes.forEach((node: any, idx: number) => {
      const text = `${idx + 1}. ${node.id.substring(0, 10)}... - Risk: ${node.suspicious_score}/100`;
      pdf.text(text, 25, yPosition);
      yPosition += 6;
    });
  }

  // Transaction Flow (if edges exist)
  if (riskData.edges && riskData.edges.length > 0) {
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 20;
    }

    addSection('Transaction Flow Summary');
    
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'normal');
    
    const riskFlagEdges = riskData.edges.filter((e: any) => e.risk_flag).length;
    pdf.text(`Total Connections: ${riskData.edges.length}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Risky Connections: ${riskFlagEdges}`, 20, yPosition);
    yPosition += 10;
  }

  // Knob visualization capture
  if (knobElement) {
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    try {
      addSection('Risk Score Visualization');
      
      const canvas = await html2canvas(knobElement, {
        backgroundColor: null,
        scale: 2,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 80;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;
      
      pdf.addImage(imgData, 'PNG', (pageWidth - imgWidth) / 2, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 15;
    } catch (err) {
      console.error('Failed to capture knob visualization:', err);
    }
  }

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Report Generated: ${new Date().toLocaleString()}`, 20, pageHeight - 10);
//   pdf.text(`Page ${pdf.internal.getPages().length} of ${pdf.internal.getPages().length}`, pageWidth - 30, pageHeight - 10);

  // Save PDF
  pdf.save(`wallet-risk-report-${riskData.address.substring(0, 10)}-${Date.now()}.pdf`);
};
