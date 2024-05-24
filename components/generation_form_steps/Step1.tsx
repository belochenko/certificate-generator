import { FC } from "react";
import Image from "next/image";

const Step1: FC<{
  templates: string[];
  handleTemplateSelect: (template: string) => void;
}> = ({ templates, handleTemplateSelect }) => (
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
            <p>Template {index + 1}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Step1;
