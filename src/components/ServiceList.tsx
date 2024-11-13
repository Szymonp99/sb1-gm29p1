import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Service } from '../types';

interface ServiceListProps {
  services: Service[];
  onRemove: (id: string) => void;
}

export default function ServiceList({ services, onRemove }: ServiceListProps) {
  const total = services.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4">Usługa</th>
              <th className="text-right py-4 px-4">Price</th>
              <th className="text-right py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">{service.name}</td>
                <td className="text-right py-4 px-4">${service.price.toFixed(2)}</td>
                <td className="text-right py-4 px-4">
                  <button
                    onClick={() => onRemove(service.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-50">
              <td className="py-4 px-4">Suma</td>
              <td className="text-right py-4 px-4">${total.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}