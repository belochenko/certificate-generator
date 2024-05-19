"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { read, utils } from "xlsx";
import Image from "next/image";

const UploadTable = ({ data, selectedRows, handleRowSelect }) => (
  <div className="mt-6 overflow-x-auto max-h-96">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === data.length}
              onChange={() =>
                handleRowSelect(
                  selectedRows.length === data.length
                    ? []
                    : data.map((_, i) => i),
                )
              }
            />
          </th>
          {Object.keys(data[0]).map((key) => (
            <th
              key={key}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(index)}
                onChange={() => {
                  const newSelectedRows = selectedRows.includes(index)
                    ? selectedRows.filter((i) => i !== index)
                    : [...selectedRows, index];
                  handleRowSelect(newSelectedRows);
                }}
              />
            </td>
            {Object.values(row).map((value, idx) => (
              <td
                key={idx}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StepLayout = ({ children, step, nextStep, prevStep, isLastStep }) => (
  <div className="flex min-h-screen w-full items-center justify-center px-4 py-12">
    <div className="w-full max-w-5xl">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
        <div className="hidden md:block">
          <div className="space-y-4">
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Step {step}
                </div>
                <div className="text-lg font-semibold">Step Details</div>
              </div>
              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 w-2 rounded-full ${step >= 1 ? "bg-blue-500" : "bg-gray-400 dark:bg-gray-600"}`}
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Select a template
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 w-2 rounded-full ${step >= 2 ? "bg-blue-500" : "bg-gray-400 dark:bg-gray-600"}`}
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Enter details
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 w-2 rounded-full ${step >= 3 ? "bg-blue-500" : "bg-gray-400 dark:bg-gray-600"}`}
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Review and submit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            {children}
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <Button
                  onClick={prevStep}
                  className="bg-gray-300 text-gray-900 hover:bg-gray-200"
                >
                  Previous Step
                </Button>
              )}
              {!isLastStep && (
                <Button
                  onClick={nextStep}
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  Next Step
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function CertificateGenerationForm() {
  const [step, setStep] = useState(1);
  const [creationType, setCreationType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    manager: "",
    description: "",
  });

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const [fileData, setFileData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

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

  const Step1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-2xl font-semibold">Create a new project</div>
        <div className="text-gray-500 dark:text-gray-400">
          Select a template to get started.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {["Template 1", "Template 2", "Template 3", "Template 4"].map(
          (template, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-50 dark:border-gray-800"
            >
              <div className="flex h-20 items-center justify-center">
                <Image
                  alt={template}
                  className="aspect-square object-contain"
                  height="80"
                  src="/placeholder.svg"
                  width="80"
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium">
                {template}
              </div>
            </div>
          ),
        )}
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
          className={`w-1/2 ${creationType === "single" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
        >
          Single Creation
        </Button>
        <Button
          onClick={() => setCreationType("multiple")}
          className={`w-1/2 ${creationType === "multiple" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
        >
          Multiple Creation
        </Button>
      </div>
      {creationType === "single" && (
        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Enter Student or Mentor Full Name</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Enter Course Name</Label>
            <Input
              id="course"
              placeholder="Enter course name"
              value={formData.course}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager">
              Enter Project Manager/Coordinator Name
            </Label>
            <Input
              id="manager"
              placeholder="Enter manager/coordinator name"
              value={formData.manager}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      )}
      {creationType === "multiple" && (
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Upload CSV/XLSX File</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Upload a file with the necessary details.
            </p>
          </div>
          <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
          {fileData.length > 0 && (
            <>
              <UploadTable
                data={fileData}
                selectedRows={selectedRows}
                handleRowSelect={setSelectedRows}
              />
              <Button
                className="mt-4 bg-gray-900 text-white hover:bg-gray-800"
                onClick={nextStep}
              >
                Proceed with selected entries
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );

  const Step3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Review and Submit</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Review your details before submitting.
        </p>
      </div>
      <form className="space-y-4">
        {creationType === "single" ? (
          <>
            <div className="space-y-2">
              <Label>Student/Mentor Full Name</Label>
              <div className="border p-2 rounded dark:border-gray-700">
                {formData.name}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Course Name</Label>
              <div className="border p-2 rounded dark:border-gray-700">
                {formData.course}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Project Manager/Coordinator Name</Label>
              <div className="border p-2 rounded dark:border-gray-700">
                {formData.manager}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <div className="border p-2 rounded dark:border-gray-700">
                {formData.description}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <Label>Selected Entries</Label>
            <div className="border p-2 rounded dark:border-gray-700">
              {selectedRows.length} entries selected
            </div>
          </div>
        )}
        <Button className="bg-gray-900 text-white hover:bg-gray-800">
          Submit
        </Button>
      </form>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <StepLayout
      step={step}
      nextStep={nextStep}
      prevStep={prevStep}
      isLastStep={step === 3}
    >
      {renderStep()}
    </StepLayout>
  );
}
