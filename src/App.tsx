import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { FileDown, Plus, Home } from 'lucide-react';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';
import ServiceSelector from './components/ServiceSelector';
import PDFDocument from './components/PDFDocument';
import LogoUpload from './components/LogoUpload';
import Modal from './components/Modal';
import ServiceModal from './components/ServiceModal';
import SideMenu from './components/SideMenu';
import { predefinedServices } from './data/services';
import type { Service, ServiceFormData } from './types';

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [logo, setLogo] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    const selectedService = predefinedServices.find(s => s.id === serviceId);
    if (selectedService && !services.some(s => s.id === serviceId)) {
      setServices(prev => [...prev, selectedService]);
    }
  };

  const handleCustomServiceAdd = (data: ServiceFormData) => {
    const newService: Service = {
      id: uuidv4(),
      name: data.name,
      price: Number(data.price),
      isCustom: true,
    };
    setServices(prev => [...prev, newService]);
  };

  const handleServiceRemove = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const handleLogoChange = (newLogo: string) => {
    setLogo(newLogo);
  };

  const handleLogoRemove = () => {
    setLogo(undefined);
  };

  const handleAddService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <button
        onClick={() => setShowSideMenu(true)}
        className="fixed left-6 top-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow z-30"
      >
        <Home size={24} className="text-blue-600" />
      </button>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Generowanie kosztorysy</h1>
              <button
                onClick={() => setShowServiceModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Add to the list
              </button>
            </div>
            
            <LogoUpload
              logo={logo}
              onLogoChange={handleLogoChange}
              onLogoRemove={handleLogoRemove}
            />
            <ServiceSelector onSelect={handleServiceSelect} />
            <ServiceForm onAdd={handleCustomServiceAdd} />
          </div>

          {services.length > 0 && (
            <>
              <ServiceList
                services={services}
                onRemove={handleServiceRemove}
              />
              
              <div className="mt-8 flex justify-end">
                {services.length > 0 && (
                  <PDFDownloadLink
                    document={<PDFDocument services={services} logo={logo} />}
                    fileName="services.pdf"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                  >
                    {({ loading }) => (
                      <>
                        <FileDown size={20} />
                        {loading ? 'Generating PDF...' : 'Download PDF'}
                      </>
                    )}
                  </PDFDownloadLink>
                )}
              </div>

              {/* Preview PDF */}
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">PDF Preview</h2>
                <div className="h-[600px]">
                  <PDFViewer width="100%" height="100%" className="border rounded">
                    <PDFDocument services={services} logo={logo} />
                  </PDFViewer>
                </div>
              </div>
            </>
          )}

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => setShowModal(false)}
            title="Missing Logo"
            message="Your logo is not added. Do you want to download PDF without it?"
          />

          <ServiceModal
            isOpen={showServiceModal}
            onClose={() => setShowServiceModal(false)}
            onAdd={handleAddService}
          />

          <SideMenu
            isOpen={showSideMenu}
            onClose={() => setShowSideMenu(false)}
            services={services}
          />
        </div>
      </div>
    </div>
  );
}

export default App;