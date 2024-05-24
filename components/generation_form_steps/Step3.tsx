import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  CertificateGenerator,
  CertificateData,
} from "@/lib/certificate-processing";

const Step3: FC<{
  creationType: string | null;
  formData: any;
  selectedRows: number[];
  fileData: any[];
  selectedTemplate: string | null;
  handleFormDataSubmit: () => void;
  downloadPdf: (blob: Blob, filename: string) => void;
}> = ({
  creationType,
  formData,
  selectedRows,
  fileData,
  selectedTemplate,
  handleFormDataSubmit,
  downloadPdf,
}) => (
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
            <strong>Ім'я та Призвіще Ментора або Дитини:</strong>{" "}
            {formData.issued_to}
          </p>
          <p>
            <strong>Учбовий напрямок:</strong> {formData.course_name}
          </p>
          <p>
            <strong>
              Ім&apos;я та Призвіще Координатора Локацій або Відповідної особи:
            </strong>{" "}
            {formData.location_coordinator}
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

export default Step3;
