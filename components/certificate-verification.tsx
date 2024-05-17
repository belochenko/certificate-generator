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

export function CertificateVerification() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Certification Verification</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to verify your certificate.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full-name">Full Name</Label>
          <Input id="full-name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="document-number">Document Number</Label>
          <Input id="document-number" placeholder="123456789" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuer">Issuer</Label>
          <Select id="issuer" required>
            <SelectTrigger>
              <SelectValue placeholder="Select issuer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="government">IT2School</SelectItem>
              <SelectItem value="university">Codeclub</SelectItem>
              <SelectItem value="employer">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" type="submit">
          Verify
        </Button>
      </div>
    </div>
  );
}
