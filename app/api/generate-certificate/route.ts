import { NextApiRequest, NextApiResponse } from "next";
import {
  CertificateGenerator,
  CertificateData,
} from "@/lib/certificate-processing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { templateUrl, data } = req.body;
    console.log(templateUrl);

    try {
      const template = await CertificateGenerator.fetchTemplate(templateUrl);
      const pdfBlob = await CertificateGenerator.generatePdf(template, data);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=certificate.pdf`,
      );
      res.send(pdfBlob);
    } catch (error) {
      console.error("Failed to generate certificate PDF:", error);
      res.status(500).json({ error: "Failed to generate certificate PDF" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
