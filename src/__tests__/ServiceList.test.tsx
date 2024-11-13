import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServiceList from '../components/ServiceList';

describe('ServiceList', () => {
  const mockServices = [
    { id: '1', name: 'Service 1', price: 100 },
    { id: '2', name: 'Service 2', price: 200 },
  ];

  it('renders all services', () => {
    render(<ServiceList services={mockServices} onRemove={() => {}} />);
    
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });

  it('calculates total correctly', () => {
    render(<ServiceList services={mockServices} onRemove={() => {}} />);
    
    expect(screen.getByText('$300.00')).toBeInTheDocument();
  });

  it('calls onRemove when delete button is clicked', async () => {
    const onRemove = vi.fn();
    render(<ServiceList services={mockServices} onRemove={onRemove} />);
    
    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);
    
    expect(onRemove).toHaveBeenCalledWith('1');
  });
});