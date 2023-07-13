import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { signInSchema } from '../../core/validations/signInSchema';

import styles from './styles';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleSignIn = async () => {
    try {
      setValidationErrors({});
      await signInSchema.validate({ email, password }, { abortEarly: false });
      // call backend
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
    }
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

