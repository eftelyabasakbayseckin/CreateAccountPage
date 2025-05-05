import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import CreateAccountPage from '../CreateAccountPage'; // Yolu doğru ayarlayın

// global alert mock'lanması
beforeAll(() => {
  global.alert = jest.fn(); // alert fonksiyonunu mock'la
});

describe('CreateAccountPage', () => {
  jest.setTimeout(10000);  // Testin zaman aşımını 10 saniyeye çıkarıyoruz

  it('should show error messages for empty fields', async () => {
    const { getByText } = render(<CreateAccountPage />);

    const submitButton = getByText('Submit'); // Eğer buton 'Submit' yazıyorsa
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText('First name is required')).toBeTruthy();
      expect(getByText('Last name is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByText('Confirm Password is required')).toBeTruthy();
      expect(getByText('Date of Birth is required')).toBeTruthy();
    });
  });

  it('should show "Passwords must match" error when passwords don’t match', async () => {
    const { getByPlaceholderText, getByText } = render(<CreateAccountPage />);

    fireEvent.changeText(getByPlaceholderText('First Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'abcdef'); // mismatch
    fireEvent.changeText(getByPlaceholderText('Date of Birth (dd/mm/yyyy)'), '01/01/2000');

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Passwords must match')).toBeTruthy();
    });
  });

  // Tekrar eden testi kaldırdık ve düzeltmeleri yaptık
  it('should successfully submit the form when all fields are valid', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<CreateAccountPage />);

    fireEvent.changeText(getByPlaceholderText('First Name'), 'Alice');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Wonderland');
    fireEvent.changeText(getByPlaceholderText('Email'), 'alice@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), '123456');
    fireEvent.changeText(getByPlaceholderText('Date of Birth (dd/mm/yyyy)'), '01/01/1990');

    fireEvent.press(getByText('Submit'));

    // Başarı mesajını görmek için biraz bekleyelim
    await waitFor(() => {
      // Burada başarı mesajı yerine alert fonksiyonunun çağrıldığını kontrol ediyoruz
      expect(global.alert).toHaveBeenCalledWith('Account created successfully');
    });
  });
});
