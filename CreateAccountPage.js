import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const validateDate = (date) => /^\d{2}\/\d{2}\/\d{4}$/.test(date);

  const handleSubmit = () => {
    let errors = {};
    
    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (!confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    if (!dob) errors.dob = 'Date of Birth is required';

    if (password && confirmPassword && password !== confirmPassword) {
      errors.passwordMismatch = 'Passwords must match';
    }

    if (email && !validateEmail(email)) {
      errors.emailInvalid = 'Email is invalid';
    }

    if (password && password.length < 6) {
      errors.passwordShort = 'Password must be at least 6 characters';
    }

    if (dob && !validateDate(dob)) {
      errors.dobInvalid = 'Date of Birth must be in dd/mm/yyyy format';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert('Account created successfully');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      {errors.firstName && <Text>{errors.firstName}</Text>}

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      {errors.lastName && <Text>{errors.lastName}</Text>}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text>{errors.email}</Text>}
      {errors.emailInvalid && <Text>{errors.emailInvalid}</Text>}

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text>{errors.password}</Text>}
      {errors.passwordShort && <Text>{errors.passwordShort}</Text>}

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}
      {errors.passwordMismatch && <Text>{errors.passwordMismatch}</Text>}

      <TextInput
        placeholder="Date of Birth (dd/mm/yyyy)"
        value={dob}
        onChangeText={setDob}
      />
      {errors.dob && <Text>{errors.dob}</Text>}
      {errors.dobInvalid && <Text>{errors.dobInvalid}</Text>}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CreateAccountPage;