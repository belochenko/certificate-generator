import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useState } from "react";
import { CertificateData } from "@/lib/certificate-processing";
import Image from "next/image";

const StepLayout = ({ children, step, nextStep, prevStep, isLastStep }) => (
  <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
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

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

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
        <h2 className="text-2xl font-bold">Enter Details</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please provide the necessary details to proceed.
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            id="project-name"
            placeholder="Enter your project name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter project description"
            required
          />
        </div>
      </form>
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
        <div className="space-y-2">
          <Label>Project Name</Label>
          <div className="border p-2 rounded dark:border-gray-700">
            [Project Name]
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <div className="border p-2 rounded dark:border-gray-700">
            [Description]
          </div>
        </div>
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
