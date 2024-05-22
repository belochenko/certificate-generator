"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import Image from "next/image";
import UploadTable from "@/components/UploadTable";
import StepLayout from "@/components/StepLayout";
import { listImages } from "@/lib/storj";

const CertificateGenerationForm = () => {
  const [step, setStep] = useState(1);
  const [creationType, setCreationType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    manager: "",
    description: "",
  });
  const [fileData, setFileData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
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

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const svgKeys = await listImages("certificates-templates-preview");
        const publicUrls = svgKeys.map((key) => `${key}`);
        setTemplates(publicUrls);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
    }
    fetchTemplates();
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  // Function to toggle pop-up window
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    nextStep();
  };

  const handleFormDataSubmit = () => {
    const data = {
      template: selectedTemplate,
      formData: creationType === "single" ? { ...formData } : null,
      fileData: creationType === "bulk" ? [...fileData] : null,
    };
    console.log(data);
    // Send data to backend or perform further processing
  };

  const Step1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-2xl font-semibold">Створити новий сертіфікат</div>
        <div className="text-gray-500 dark:text-gray-400">
          Оберіть шаблон сертифікату
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <div
            key={index}
            onClick={() => handleTemplateSelect(template)}
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-50"
          >
            <div className="flex h-20 items-center justify-center">
              <Image
                src={template}
                alt={`Template ${index + 1}`}
                className="aspect-square object-contain"
                height="200"
                width="150"
              />
            </div>
            <div className="mt-4 text-center text-sm font-medium">
              {/* {template.split("/").pop()} */}
              <p>Template 1</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Оберіть тип створення</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Будь ласка, оберіть один з варіантів, щоб продовжити.
        </p>
      </div>
      {showPopup && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "black",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            zIndex: "1000",
            padding: "20px",
          }}
        >
          <div
            className="popup-content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p className="popup-text">Additional information goes here.</p>
            <Button
              onClick={togglePopup}
              className="close-button"
              style={{
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Закрити
            </Button>
          </div>
        </div>
      )}
      <div className="flex space-x-4">
        <Button
          onClick={() => setCreationType("single")}
          className={`w-1/2 ${creationType === "single" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"}`}
        >
          Один сертифікат
        </Button>
        <Button
          onClick={() => setCreationType("bulk")}
          className={`w-1/2 ${creationType === "bulk" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"}`}
        >
          Масові сертифікати
        </Button>
      </div>
      {creationType === "single" && (
        <form className="mt-4 space-y-4">
          <div>
            <Label htmlFor="name">
              Ім&apos;я та Призвіще Ментора або Дитини
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="course">Учбовий напрямок</Label>
            <Input
              id="course"
              value={formData.course}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="manager">
              Ім&apos;я та Призвіще Координатор Локацій або Відповідної особи
            </Label>
            <Input
              id="manager"
              value={formData.manager}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="description">
              Опис (Опціональний). Опис є ПУБЛІЧНИМ.
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </form>
      )}
      {creationType === "bulk" && (
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Завантажити файл CSV/XLSX</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Завантажте файл з необхідною інформацією.
              <p>
                <button
                  onClick={togglePopup}
                  className="information-button text-blue-500"
                >
                  Інформація щодо струкутри файлів CSV/XLSX
                </button>
              </p>
            </p>
          </div>
          <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
          {fileData.length > 0 && (
            <UploadTable
              data={fileData}
              selectedRows={selectedRows}
              handleRowSelect={setSelectedRows}
            />
          )}
        </div>
      )}
    </div>
  );

  const Step3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Детальний огляд</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Будь ласка, ознайомтеся з деталями перед подачею заявки.
        </p>
      </div>
      <div className="space-y-4">
        {creationType === "single" && (
          <div>
            <h3 className="text-lg font-semibold">
              Детальна інформація про сертифікат
            </h3>
            <p>
              <strong>Ім&apos;я та Призвіще Ментора або Дитини:</strong>{" "}
              {formData.name}
            </p>
            <p>
              <strong>Учбовий напрямок:</strong> {formData.course}
            </p>
            <p>
              <strong>
                Ім&apos;я та Призвіще Координатора Локацій або Відповідної
                особи:
              </strong>{" "}
              {formData.manager}
            </p>
            <p>
              <strong>Опис:</strong> {formData.description}
            </p>
          </div>
        )}
        {creationType === "bulk" && (
          <div>
            <h3 className="text-lg font-semibold">Вибрані рядки</h3>
            <ul>
              {selectedRows.map((rowIndex) => (
                <li key={rowIndex}>{JSON.stringify(fileData[rowIndex])}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button
        onClick={handleFormDataSubmit}
        className="bg-blue-500 text-white hover:bg-blue-400"
      >
        Надіслати
      </Button>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
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
