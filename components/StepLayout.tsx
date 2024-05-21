"use client";
import { Button } from "@/components/ui/button";

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

export default StepLayout;
