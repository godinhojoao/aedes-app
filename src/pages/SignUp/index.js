import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { signupSchema } from '../../core/validations/signUpSchema';
import { formatCPF } from '../../core/shared/formatCPF';
import styles from './styles';
import { inputStyles } from '../../core/styles/input';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../../core/graphql/mutations';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [createAccount] = useMutation(
    CREATE_ACCOUNT,
    {
      onCompleted: () => {
        setName('');
        setCpf('');
        setPassword('');
        setEmail('');
        // navigate to login here
      },
    }
  );


  const handleCpfChange = (value) => {
    const formattedCPF = formatCPF(value);
    setCpf(formattedCPF);
  };

  const handleSignUp = async () => {
    try {
      setValidationErrors({});
      const cpfNumbers = cpf.replace(/\D/g, '');
      const createAccountInput = { name, cpf: cpfNumbers, email, password };
      await signupSchema.validate(createAccountInput, { abortEarly: false });
      const result = await createAccount({ variables: { input: createAccountInput } });
      if (result && result.errors && result.errors.graphQLErrors) {
        const errorMessages = result.errors.graphQLErrors.map((error) => error.detailedMessage);
        setValidationErrors(errorMessages);
      }
    } catch (error) {
      setValidationErrors([error.message]);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://blog.rsisecurity.com/wp-content/uploads/2019/10/hitrust-nist-compliance-stethoscope.jpg' }}
        style={styles.backgroundImage}>
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Nome</Text>
          <TextInput
            style={inputStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
          />
          {validationErrors.name && (
            <Text style={inputStyles.errorText}>{validationErrors.name}</Text>
          )}
        </View>

        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>CPF</Text>
          <TextInput
            style={inputStyles.input}
            value={cpf}
            onChangeText={handleCpfChange}
            placeholder="Digite seu CPF"
          />
          {validationErrors.cpf && (
            <Text style={inputStyles.errorText}>{validationErrors.cpf}</Text>
          )}
        </View>

        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Email</Text>
          <TextInput
            style={inputStyles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
          />
          {validationErrors.email && (
            <Text style={inputStyles.errorText}>{validationErrors.email}</Text>
          )}
        </View>

        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Senha</Text>
          <TextInput
            style={inputStyles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
          />
          {validationErrors.password && (
            <Text style={inputStyles.errorText}>{validationErrors.password}</Text>
          )}
        </View>

        {Array.isArray(validationErrors) && validationErrors.length && (
          <Text style={inputStyles.errorText}>{validationErrors[0]}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
