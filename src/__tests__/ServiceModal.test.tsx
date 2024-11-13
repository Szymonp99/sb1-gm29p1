import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServiceModal from '../components/ServiceModal';

describe('ServiceModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onAdd: vi.fn(),
  };

  it('renders form inputs', () => {
    render(<ServiceModal {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Wprowadź nazwę usługi')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wprowadź cenę')).toBeInTheDocument();
  });

  it('adds new service when form is submitted', async () => {
    render(<ServiceModal {...defaultProps} />);
    
    await userEvent.type(screen.getByPlaceholderText('Wprowadź nazwę usługi'), 'New Service');
    await userEvent.type(screen.getByPlaceholderText('Wprowadź cenę'), '100');
    await userEvent.click(screen.getByText('Dodaj usługę'));
    
    expect(defaultProps.onAdd).toHaveBeenCalledWith(expect.objectContaining({
      name: 'New Service',
      price: 100,
      isCustom: true,
    }));
  });

  it('shows predefined services', () => {
    render(<ServiceModal {...defaultProps} />);
    
    expect(screen.getByText('Predefiniowane usługi')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
  });
});