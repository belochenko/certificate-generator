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
        <h1 className="text-3xl font-bold">Certification Verification</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to verify your certificate.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="documentNumber">Document Number</Label>
          <Input
            id="documentNumber"
            placeholder="ITS-01-000000"
            value={formData.documentNumber}
            onChange={handleInputChange}
            required
          />
          {!isValid && (
            <p style={{ color: "red" }}>Invalid document number format</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuer">Issuer</Label>
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
              <SelectItem value="Other">Other</SelectItem>
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
