"use client";
import { useState, useEffect } from "react";

import StepLayout from "@/components/generation_form_steps/StepLayout";
import Step1 from "@/components/generation_form_steps/Step1";
import Step2 from "@/components/generation_form_steps/Step2";
import Step3 from "@/components/generation_form_steps/Step3";

import { listTemplates } from "@/lib/storj";
import {
  CertificateGenerator,
  CertificateData,
} from "@/lib/certificate-processing";

const CertificateGenerationForm = () => {
  const [step, setStep] = useState(1);
  const [creationType, setCreationType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    issued_to: "",
    course_name: "",
    mentor_full_name: "",
    issued_by_org: "",
    location_coordinator: "",
  });
  const [fileData, setFileData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, issued_by_org: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = read(event.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(sheet);
      setFileData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const svgKeys = await listTemplates(
          "certificates-templates-preview",
          ".png",
        );
        const publicUrls = svgKeys.map((key) => `${key}`);
        setTemplates(publicUrls);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
    }
    fetchTemplates();
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    nextStep();
  };

  const handleFormDataSubmit = async () => {
    if (creationType === "single") {
      const data: CertificateData = {
        issued_to: formData.issued_to,
        course_name: formData.course_name,
        mentor_full_name: formData.mentor_full_name,
        location_coordinator: formData.location_coordinator,
        unique_certificate_id: "12345", // Replace with actual unique ID
        issue_date: new Date().toISOString().split("T")[0],
      };

      try {
        const response = await fetch("/api/generate-certificate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ templateUrl: selectedTemplate, data }),
        });

        if (response.ok) {
          const blob = await response.blob();
          downloadPdf(blob, "certificate.pdf");
        } else {
          console.error(
            "Failed to generate certificate PDF:",
            await response.text(),
          );
        }
      } catch (error) {
        console.error("Failed to generate certificate PDF:", error);
      }
    } else if (creationType === "bulk") {
      try {
        for (const rowData of selectedRows.map(
          (rowIndex) => fileData[rowIndex],
        )) {
          const data: CertificateData = {
            issued_to: rowData.issued_to,
            course_name: rowData.course_name,
            mentor_full_name: rowData.mentor_full_name,
            location_coordinator: rowData.location_coordinator,
            unique_certificate_id: "12345", // Replace with actual unique ID
            issue_date: new Date().toISOString().split("T")[0],
          };

          const response = await fetch("/api/generate-certificate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ templateUrl: selectedTemplate, data }),
          });

          if (response.ok) {
            const blob = await response.blob();
            downloadPdf(blob, `certificate_${rowData.issued_to}.pdf`);
          } else {
            console.error(
              "Failed to generate certificate PDF:",
              await response.text(),
            );
          }
        }
      } catch (error) {
        console.error("Failed to generate bulk certificates PDF:", error);
      }
    }
  };

  const downloadPdf = (blob, filename) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            templates={templates}
            handleTemplateSelect={handleTemplateSelect}
          />
        );
      case 2:
        return (
          <Step2
            creationType={creationType}
            setCreationType={setCreationType}
            showPopup={showPopup}
            togglePopup={togglePopup}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleFileUpload={handleFileUpload}
            fileData={fileData}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        );
      case 3:
        return (
          <Step3
            creationType={creationType}
            formData={formData}
            selectedRows={selectedRows}
            fileData={fileData}
            selectedTemplate={selectedTemplate}
            handleFormDataSubmit={handleFormDataSubmit}
            downloadPdf={downloadPdf}
          />
        );
      default:
        return null;
    }
  };

  return (
    <StepLayout
      step={step}
      nextStep={nextStep}
      prevStep={prevStep}
      isLastStep={step === 3}
    >
      {renderStepContent()}
    </StepLayout>
  );
};

export default CertificateGenerationForm;
