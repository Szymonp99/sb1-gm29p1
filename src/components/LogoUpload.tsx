import React from 'react';
import { Upload, X } from 'lucide-react';

interface LogoUploadProps {
  logo?: string;
  onLogoChange: (logo: string) => void;
  onLogoRemove: () => void;
}

export default function LogoUpload({ logo, onLogoChange, onLogoRemove }: LogoUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Logo
      </label>
      <div className="flex items-center gap-4">
        {logo ? (
          <div className="relative">
            <img
              src={logo}
              alt="Company logo"
              className="h-16 w-16 object-contain border rounded-lg"
            />
            <button
              onClick={onLogoRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center h-16 w-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="text-gray-400" />
          </label>
        )}
      </div>
    </div>
  );
}