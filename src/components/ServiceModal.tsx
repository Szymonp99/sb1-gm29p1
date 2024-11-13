import React, { useState } from 'react';
import { X, Plus, Edit2, Save, Trash2 } from 'lucide-react';
import { predefinedServices } from '../data/services';
import type { Service } from '../types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: Service) => void;
}

export default function ServiceModal({ isOpen, onClose, onAdd }: ServiceModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingServices, setEditingServices] = useState(predefinedServices);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price) {
      onAdd({
        id: crypto.randomUUID(),
        name,
        price: Number(price),
        isCustom: true,
      });
      setName('');
      setPrice('');
      onClose();
    }
  };

  const handleEdit = (service: Service) => {
    setName(service.name);
    setPrice(service.price.toString());
    setEditingId(service.id);
  };

  const handleSave = () => {
    if (editingId && name && price) {
      const updatedServices = editingServices.map(service => 
        service.id === editingId 
          ? { ...service, name, price: Number(price) }
          : service
      );
      setEditingServices(updatedServices);
      setName('');
      setPrice('');
      setEditingId(null);
    }
  };

  const handleRemove = (id: string) => {
    setEditingServices(prev => prev.filter(service => service.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName('');
      setPrice('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setPrice('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Dodaj usługę</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa usługi
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Wprowadź nazwę usługi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cena
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Wprowadź cenę"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            {editingId ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Save size={20} />
                  Zapisz zmiany
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Dodaj usługę
              </button>
            )}
          </div>
        </form>

        <div>
          <h3 className="text-lg font-semibold mb-4">Predefiniowane usługi</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Usługa</th>
                  <th className="text-right py-2 px-4">Cena</th>
                  <th className="text-right py-2 px-4">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {editingServices.map((service) => (
                  <tr key={service.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{service.name}</td>
                    <td className="text-right py-2 px-4">${service.price.toFixed(2)}</td>
                    <td className="text-right py-2 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleRemove(service.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}