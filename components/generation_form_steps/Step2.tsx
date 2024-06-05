import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import UploadTable from "@/components/generation_form_steps/UploadTable";

const Step2: FC<{
  creationType: string | null;
  setCreationType: (type: string) => void;
  showPopup: boolean;
  togglePopup: () => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileData: any[];
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
}> = ({
  creationType,
  setCreationType,
  showPopup,
  togglePopup,
  formData,
  handleInputChange,
  handleSelectChange,
  handleFileUpload,
  fileData,
  selectedRows,
  setSelectedRows,
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Оберіть тип створення</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Будь ласка, оберіть один з варіантів, щоб продовжити.
      </p>
    </div>
    {showPopup && (
      <div className="popup">
        <div className="popup-content">
          <p className="popup-text">Additional information goes here.</p>
          <Button onClick={togglePopup} className="close-button">
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
          <Label htmlFor="name">Ім'я та Призвіще Ментора або Дитини</Label>
          <Input
            id="issued_to"
            value={formData.issued_to}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="course">Учбовий напрямок</Label>
          <Input
            id="course_name"
            value={formData.course_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="manager">
            Ім'я та Призвіще Координатор Локацій або Відповідної особи
          </Label>
          <Input
            id="location_coordinator"
            value={formData.location_coordinator}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="issuer">Організація що видала</Label>
          <Select
            value={formData.issued_by_org}
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Оберіть організацію" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT2School">IT2School</SelectItem>
              <SelectItem value="Codeclub">Codeclub</SelectItem>
              <SelectItem value="Other">Інша</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    )}
    {creationType === "bulk" && (
      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Завантажити файл CSV/XLSX</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Завантажте файл з необхідною інформацією.
          </p>
          <button
            onClick={togglePopup}
            className="information-button text-blue-500"
          >
            Інформація щодо струкутри файлів CSV/XLSX
          </button>
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

export default Step2;
