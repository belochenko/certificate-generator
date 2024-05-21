import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DocumentDetailsVerification() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-6xl px-6 py-4 grid md:grid-cols-2 gap-6">
        <div className="relative h-[80vh] w-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 dark:border-gray-800">
          <div className="absolute top-0 left-0 h-full w-full bg-white dark:bg-gray-900">
            <Image
              alt="Document page"
              className="h-full w-full object-contain"
              height="1123"
              src="/placeholder.svg"
              style={{
                aspectRatio: "794/1123",
                objectFit: "cover",
              }}
              width="794"
            />
          </div>
          <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
            <Button size="icon" variant="ghost">
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="ghost">
              <ChevronRightIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white">Document Details</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-gray-400">Issuer</p>
                <p className="text-white">Acme Corporation</p>
              </div>
              <div>
                <p className="text-gray-400">Issuer Name</p>
                <p className="text-white">John Doe</p>
              </div>
              <div>
                <p className="text-gray-400">Date of Issue</p>
                <p className="text-white">2023-04-15</p>
              </div>
              <div>
                <p className="text-gray-400">Document Number</p>
                <p className="text-white">ABC123</p>
              </div>
              <div>
                <p className="text-gray-400">Holder</p>
                <p className="text-white">Jane Smith</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium">Description</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              This is the annual report for Acme Corporation, showcasing our
              company's performance and achievements in 2023.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <DownloadIcon className="mr-2 h-5 w-5" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
