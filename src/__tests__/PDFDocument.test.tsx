import { describe, it, expect } from 'vitest';
import { render } from '@react-pdf/renderer';
import PDFDocument from '../components/PDFDocument';

// Mock Font.register to avoid actual font loading during tests
vi.mock('@react-pdf/renderer', async () => {
  const actual = await vi.importActual('@react-pdf/renderer');
  return {
    ...actual,
    Font: {
      register: vi.fn(),
    },
  };
});

describe('PDFDocument', () => {
  const mockServices = [
    { id: '1', name: 'Service 1', price: 100 },
    { id: '2', name: 'Service 2', price: 200 },
  ];

  it('renders without crashing', async () => {
    const component = <PDFDocument services={mockServices} />;
    expect(() => render(component)).not.toThrow();
  });

  it('renders with logo', async () => {
    const component = <PDFDocument services={mockServices} logo="test-logo.png" />;
    expect(() => render(component)).not.toThrow();
  });
});