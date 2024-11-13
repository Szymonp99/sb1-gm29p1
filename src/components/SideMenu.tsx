import React from 'react';
import { X, TrendingUp, DollarSign, FileText, Users } from 'lucide-react';
import type { Service } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
}

export default function SideMenu({ isOpen, onClose, services }: SideMenuProps) {
  const totalServices = services.length;
  const totalValue = services.reduce((sum, service) => sum + service.price, 0);
  const averagePrice = totalServices > 0 ? totalValue / totalServices : 0;
  const customServices = services.filter(s => s.isCustom).length;

  const stats = [
    {
      icon: FileText,
      label: 'Wszystkie usługi',
      value: totalServices,
    },
    {
      icon: DollarSign,
      label: 'Suma',
      value: `$${totalValue.toFixed(2)}`,
    },
    {
      icon: TrendingUp,
      label: 'Średnia cena',
      value: `$${averagePrice.toFixed(2)}`,
    },
    {
      icon: Users,
      label: 'Własne usługi',
      value: customServices,
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Statystyki</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}