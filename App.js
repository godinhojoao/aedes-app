import React from 'react';
import { StatusBar } from 'expo-status-bar';
import fetch from "cross-fetch";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import 'react-native-gesture-handler';

import { AEDES_API_URL } from "./env.json"
import { Routes } from './routes';
import { AuthProvider } from './src/core/context/AuthContext';

const client = new ApolloClient({
  link: new HttpLink({
    uri: AEDES_API_URL,
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <StatusBar />
        <Routes />
      </AuthProvider>
    </ApolloProvider>
  );
}
