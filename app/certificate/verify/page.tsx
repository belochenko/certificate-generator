"use client";
import { useState } from "react";
import { CertificateVerification } from "@/components/certificate-verification";
import { DocumentDetailsVerification } from "@/components/document-details-verification";
import { queryDB } from "@/lib/db";

export default function Verification() {
  const [formData, setFormData] = useState({
    fullName: "",
    documentNumber: "",
    issuer: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

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
      setIsVerified(true);
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

  const handleDocumentNumberChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      documentNumber: value,
    });
    setIsValid(isValidDocumentNumber(value));
  };

  return (
    <div>
      {!isVerified ? (
        <CertificateVerification
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          isValid={isValidDocumentNumber(formData.documentNumber)}
        />
      ) : (
        <DocumentDetailsVerification />
      )}
    </div>
  );
}
