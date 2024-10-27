import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';
describe('AppFunctional Component', () => {
  // Render the component before each test
  beforeEach(() => {
    render(<AppFunctional />);
  });

  test('renders headings and main elements on the screen', () => {
    // Check for the headings and labels
    expect(screen.getByText(/Coordinates/i)).toBeInTheDocument();
    expect(screen.getByText(/You moved/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type email/i)).toBeInTheDocument(); // Use getByPlaceholderText here
  });

  test('renders buttons for moving and reset', () => {
    // Check for each button's presence
    expect(screen.getByText(/LEFT/i)).toBeInTheDocument();
    expect(screen.getByText(/UP/i)).toBeInTheDocument();
    expect(screen.getByText(/RIGHT/i)).toBeInTheDocument();
    expect(screen.getByText(/DOWN/i)).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });

  test('typing in the email input updates its value', () => {
    // Select the email input
    const emailInput = screen.getByPlaceholderText(/type email/i);

    // Type text into the input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Assert that the input's value changed
    expect(emailInput.value).toBe('test@example.com');
  });

  test('displays "B" in the initial active square', () => {
    // Check if "B" is displayed in the square with the "active" class
    const activeSquare = screen.getByText('B');
    expect(activeSquare).toBeInTheDocument();
    expect(activeSquare).toHaveClass('active');
  });

  test('displays the correct coordinates message on initial render', () => {
    // Coordinates should be displayed as (2, 2) initially
    expect(screen.getByText(/Coordinates \(2, 2\)/i)).toBeInTheDocument();
  });
});
