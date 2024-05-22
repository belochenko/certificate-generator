"use client";
import { useState } from "react";
import {
  CertificateGenerator,
  CertificateData,
} from "@/lib/certificate-processing";

import Image from "next/image";
import CertificateGenerationForm from "@/components/CertificateGenerationForm";

export default function GeneratePage() {
  return (
    <div>
      <CertificateGenerationForm />
    </div>
  );
}
