"use client";
import { useState } from "react";
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
import { queryDB } from "@/lib/db";

export function CertificateVerification() {
  const [formData, setFormData] = useState({
    fullName: "",
    documentNumber: "",
    issuer: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      issuer: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await queryDB(
        "INSERT INTO Certificates (fullName, documentNumber, issuer) VALUES ($1, $2, $3)",
        [formData.fullName, formData.documentNumber, formData.issuer],
      );
      if (res.error) {
        throw new Error(res.error);
      }
      // handle successful submission (e.g., show a success message)
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidDocumentNumber = (documentNumber) => {
    const regex = /^(ITS|CCU)-(\d{3})-(\d{6})$/;
    return regex.test(documentNumber);
  };

  const [documentNumber, setDocumentNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleDocumentNumberChange = (event) => {
    const value = event.target.value;
    setDocumentNumber(value);
    setIsValid(isValidDocumentNumber(value));
  };

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
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuer">Issuer</Label>
          <Select
            id="issuer"
            value={formData.issuer}
            onValueChange={handleDocumentNumberChange}
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
