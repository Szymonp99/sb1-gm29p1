import React from 'react';
import { predefinedServices } from '../data/services';

interface ServiceSelectorProps {
  onSelect: (serviceId: string) => void;
}

export default function ServiceSelector({ onSelect }: ServiceSelectorProps) {
  return (
    <div className="mb-8">
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        defaultValue=""
      >
        <option value="" disabled>Select a predefined service</option>
        {predefinedServices.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name} - ${service.price}
          </option>
        ))}
      </select>
    </div>
  );
}