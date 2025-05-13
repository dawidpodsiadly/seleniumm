import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import AddUserButton from '../components/AddUserButton';

jest.mock('react-router-dom', () => ({
  Link: ({to, className, children}) => (
    <a href={to} className={className} data-testid="link">
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
});

describe('Add User Button', () => {
  test('Renders with Correct Props', () => {
    const {getByTestId} = render(<AddUserButton />);
    const link = getByTestId('link');

    expect(link).toHaveAttribute('href', '/create');
    expect(link).toHaveClass('btn', 'btn-success', 'btn-lg');
    expect(link.textContent).toBe('Add User');
  });

  test('FAIL - Renders with Correct Props', () => {
    const {getByTestId} = render(<AddUserButton />);
    const link = getByTestId('link');

    expect(link).toHaveAttribute('href', '/notExistingPath');
    expect(link).toHaveClass('btn', 'btn-success', 'btn-lg');
    expect(link.textContent).toBe('Add User');
  });
});
