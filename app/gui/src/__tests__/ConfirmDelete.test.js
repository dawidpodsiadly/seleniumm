import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ConfirmDelete from '../components/ConfirmDelete';

const onCancel = jest.fn();
const onConfirm = jest.fn();

describe('Confirm Delete', () => {
  test('Renders with Correct Content', () => {
    const {getByText} = render(<ConfirmDelete onCancel={onCancel} onConfirm={onConfirm} />);

    expect(getByText('Are you sure that you want to delete user?')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  test('Calls onCancel when Cancel button is clicked', () => {
    const {getByText} = render(<ConfirmDelete onCancel={onCancel} onConfirm={onConfirm} />);
    const cancelButton = getByText('Cancel');

    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  test('Calls onConfirm when Delete button is clicked', () => {
    const {getByText} = render(<ConfirmDelete onCancel={onCancel} onConfirm={onConfirm} />);
    const deleteButton = getByText('Delete');

    fireEvent.click(deleteButton);
    expect(onConfirm).toHaveBeenCalled();
  });
});
