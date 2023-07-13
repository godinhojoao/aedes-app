import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { signupSchema } from '../../core/validations/signUpSchema';

import styles from './styles';
import { formatCPF } from '../../core/shared/formatCPF';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleCpfChange = (value) => {
    const formattedCPF = formatCPF(value);
    setCpf(formattedCPF);
  };

  const handleSignUp = async () => {
    try {
      setValidationErrors({});
      await signupSchema.validate({ name, cpf: cpf.replace(/\D/g, ''), email, password }, { abortEarly: false });
      // call backend
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
      console.log('errors', errors)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
      />
      {validationErrors.name && (
        <Text style={styles.errorText}>{validationErrors.name}</Text>
      )}

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={handleCpfChange}
        placeholder="Digite seu CPF"
      />
      {validationErrors.cpf && (
        <Text style={styles.errorText}>{validationErrors.cpf}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
      />
      {validationErrors.email && (
        <Text style={styles.errorText}>{validationErrors.email}</Text>
      )}

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
      />
      {validationErrors.password && (
        <Text style={styles.errorText}>{validationErrors.password}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};
