import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { View, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { signInSchema } from '../../core/validations/signInSchema';
import { SIGN_IN } from '../../core/graphql/mutations';
import { AsyncStorageManager } from '../../core/shared/AsyncStorageManager';
import { AuthContext } from '../../core/context/AuthContext';

import styles from './styles';
import { inputStyles } from '../../core/styles/input';

export const SignIn = () => {
  const { setAccount, setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: async (data) => {
      const account = data.signIn.account;
      const token = data.signIn.token;
      await AsyncStorageManager.setItem('aedes-account', account);
      await AsyncStorageManager.setItem('aedes-token', token);
      setIsAuthenticated(true);
      setAccount(account);
    },
  });

  const handleSignIn = async () => {
    try {
      setValidationErrors({});
      await signInSchema.validate({ email, password }, { abortEarly: false });
      const result = await signIn({ variables: { input: { email, password } } });
      if (result && result.errors && result.errors.graphQLErrors) {
        const errorMessages = result.errors.graphQLErrors.map((error) => error.detailedMessage);
        setValidationErrors(errorMessages);
      }
    } catch (error) {
      const errors = {};
      if (error.inner && error.inner.length) {
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
      } else {
        setValidationErrors([error.message || 'Houve um erro']);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://blog.rsisecurity.com/wp-content/uploads/2019/10/hitrust-nist-compliance-stethoscope.jpg' }}
        style={styles.backgroundImage}>
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Email</Text>
          <TextInput
            style={inputStyles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
          />
          {validationErrors.email && <Text style={inputStyles.errorText}>{validationErrors.email}</Text>}
        </View>

        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Senha</Text>
          <TextInput
            style={inputStyles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
            placeholderTextColor="#999"
          />
          {validationErrors.password && (
            <Text style={inputStyles.errorText}>{validationErrors.password}</Text>
          )}
        </View>

        {Array.isArray(validationErrors) && validationErrors.length && (
          <Text style={inputStyles.errorText}>{validationErrors[0]}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
