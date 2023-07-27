import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 2,
    borderColor: '#0842a0ff'
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
    borderColor: '#0842a0ff'
  },
  picker: {
    color: 'black',
    paddingVertical: 12,
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#0842a0ff',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});