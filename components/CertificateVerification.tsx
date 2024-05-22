"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function CertificateVerification({
  formData,
  handleInputChange,
  handleSelectChange,
  handleSubmit,
  isLoading,
  error,
  isValid,
}) {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Перевірка сертифіката</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Введіть свої дані для перевірки сертифіката.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Ім&apos;я та Призвіще</Label>
          <Input
            id="fullName"
            placeholder="Володимир Великий"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="documentNumber">Номер документа</Label>
          <Input
            id="documentNumber"
            placeholder="ITS-01-000000"
            value={formData.documentNumber}
            onChange={handleInputChange}
            required
          />
          {!isValid && (
            <p style={{ color: "red" }}>Неправильний формат номера документа</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuer">Організація що видала</Label>
          <Select
            id="issuer"
            value={formData.issuer}
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select issuer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT2School">IT2School</SelectItem>
              <SelectItem value="Codeclub">Codeclub</SelectItem>
              <SelectItem value="Other">Інша</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
