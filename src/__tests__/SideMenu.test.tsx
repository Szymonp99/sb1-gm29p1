import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideMenu from '../components/SideMenu';

describe('SideMenu', () => {
  const mockServices = [
    { id: '1', name: 'Service 1', price: 100, isCustom: true },
    { id: '2', name: 'Service 2', price: 200, isCustom: false },
  ];

  it('renders statistics correctly', () => {
    render(<SideMenu isOpen={true} onClose={() => {}} services={mockServices} />);
    
    expect(screen.getByText('Wszystkie usługi')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$300.00')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn();
    render(<SideMenu isOpen={true} onClose={onClose} services={mockServices} />);
    
    const backdrop = screen.getByRole('complementary');
    await userEvent.click(backdrop);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    render(<SideMenu isOpen={false} onClose={() => {}} services={mockServices} />);
    
    expect(screen.queryByText('Statystyki')).not.toBeInTheDocument();
  });
});