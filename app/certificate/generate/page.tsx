"use client";
import { useState } from "react";
import {
  CertificateGenerator,
  CertificateData,
} from "@/lib/certificate-processing";

import CertificateGenerationForm from "@/components/CertificateGenerationForm";

export default function GeneratePage() {
  // const [templateUrl, setTemplateUrl] = useState<string>("");
  // const [data, setData] = useState<CertificateData>({
  //   student_name: "John Doe",
  //   course_name: "Next.js Development",
  //   project_name: "PDF Generator",
  //   certificate_id: "123456",
  //   current_date: new Date().toLocaleDateString(),
  // });

  // const handleGeneratePdf = async () => {
  //   if (templateUrl) {
  //     try {
  //       const template = await CertificateGenerator.fetchTemplate(templateUrl);
  //       const pdfBlob = await CertificateGenerator.generatePdf(template, data);
  //       const url = URL.createObjectURL(pdfBlob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "certificate.pdf";
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //     } catch (error) {
  //       console.error("Error generating PDF:", error);
  //     }
  //   } else {
  //     alert("Please provide a template URL first.");
  //   }
  // };

  return (
    <div>
      <CertificateGenerationForm />
    </div>
  );
}
