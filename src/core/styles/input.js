import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  inputContainer: {
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#fff',
    backgroundColor: "#fff",
    color: "#333",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14
  },
});
