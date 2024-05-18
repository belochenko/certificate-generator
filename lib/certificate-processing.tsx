import { PDFDocument } from "pdf-lib";
import { JSDOM } from "jsdom";
import dompurify from "dompurify";

export interface CertificateData {
  student_full_name: string;
  course_name: string;
  mentor_full_name: string;
  location_coordinator_anme: string;
  unique_certificate_id: string;
  issue_date: string;
}

export class CertificateGenerator {
  static async fetchTemplate(templateUrl: string): Promise<string> {
    const response = await fetch(templateUrl);
    return await response.text();
  }

  static async generatePdf(
    template: string,
    data: CertificateData,
  ): Promise<Blob> {
    // Sanitize and replace placeholders with actual data
    const sanitizedTemplate = dompurify.sanitize(template);
    let processedTemplate = sanitizedTemplate;
    Object.keys(data).forEach((key) => {
      const regex = new RegExp(`<${key}>`, "g");
      processedTemplate = processedTemplate.replace(
        regex,
        data[key as keyof CertificateData],
      );
    });

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Create a temporary DOM container
    const dom = new JSDOM(`<html><body>${processedTemplate}</body></html>`);
    const container = dom.window.document.body;

    // Embed SVG elements into the PDF
    const svgElements = container.querySelectorAll("svg");
    for (let svgElement of svgElements) {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgImage = await pdfDoc.embedSvg(svgString, { expand: true });
      page.drawImage(svgImage, {
        x: 0,
        y: height - svgImage.height,
        width: svgImage.width,
        height: svgImage.height,
      });
    }

    // Serialize PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Return PDF as Blob
    return new Blob([pdfBytes], { type: "application/pdf" });
  }
}
