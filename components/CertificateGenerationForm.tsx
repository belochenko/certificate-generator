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
  const [images, setImages] = useState<string[]>([]);

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

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/templates");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setImages(data.images);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    }

    fetchImages();
  }, []);

  const Step1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-2xl font-semibold">Create a new project</div>
        <div className="text-gray-500 dark:text-gray-400">
          Select a template to get started.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-900 dark:hover:border-gray-50 dark:border-gray-800"
          >
            <div className="flex h-20 items-center justify-center">
              <Image
                alt={`Template ${index + 1}`}
                className="aspect-square object-contain"
                height="80"
                src={src}
                width="80"
              />
            </div>
            <div className="mt-4 text-center text-sm font-medium">
              Template {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Choose Creation Type</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please select one of the options to proceed.
        </p>
      </div>
      <div className="flex space-x-4">
        <Button
          onClick={() => setCreationType("single")}
          className={`w-1/2 ${creationType === "single" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"}`}
        >
          Single Certificate
        </Button>
        <Button
          onClick={() => setCreationType("bulk")}
          className={`w-1/2 ${creationType === "bulk" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"}`}
        >
          Bulk Certificates
        </Button>
      </div>
      {creationType === "single" && (
        <form className="mt-4 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={formData.course}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="manager">Manager</Label>
            <Input
              id="manager"
              value={formData.manager}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
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
          <div>
            <Label htmlFor="upload">Upload Spreadsheet</Label>
            <Input id="upload" type="file" onChange={handleFileUpload} />
          </div>
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
        <h2 className="text-2xl font-bold">Review Details</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please review the details before submitting.
        </p>
      </div>
      <div className="space-y-4">
        {creationType === "single" && (
          <div>
            <h3 className="text-lg font-semibold">Certificate Details</h3>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Course:</strong> {formData.course}
            </p>
            <p>
              <strong>Manager:</strong> {formData.manager}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}
            </p>
          </div>
        )}
        {creationType === "bulk" && (
          <div>
            <h3 className="text-lg font-semibold">Selected Rows</h3>
            <ul>
              {selectedRows.map((rowIndex) => (
                <li key={rowIndex}>{JSON.stringify(fileData[rowIndex])}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button
        onClick={() => alert("Submitted!")}
        className="bg-blue-500 text-white hover:bg-blue-400"
      >
        Submit
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
