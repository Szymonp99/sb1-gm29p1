export interface Service {
  id: string;
  name: string;
  price: number;
  isCustom?: boolean;
}

export interface ServiceFormData {
  name: string;
  price: string;
}

export interface CompanyInfo {
  logo?: string;
}