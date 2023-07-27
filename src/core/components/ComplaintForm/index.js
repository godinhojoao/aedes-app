import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { complaintStatusesManager } from '../../shared/ComplaintStatusesManager';
import { complaintSchema } from '../../validations/complaintSchema';
import { ErrorModal } from '../ErrorModal';

import styles from './styles';
import { inputStyles } from '../../styles/input';
import { AuthContext } from '../../context/AuthContext';
import { formatCEP } from '../../shared/formatCEP';
import { BRAZILIAN_STATES } from '../../constants/brazilianStates';
import { fetchAddressDataByCEP } from '../../shared/fetchAddressDataByCEP';
import { debounce } from '../../shared/debounce';

export const ComplaintForm = ({ complaint, handleSave }) => {
  const { account, token } = useContext(AuthContext);
  const defaultComplaintData = {
    status: 'WAITING',
    location: {
      cep: '',
      city: '',
      neighborhood: '',
      number: '',
      state: '',
      street: '',
    },
    denunciatorId: account && account.id,
    description: '',
  };
  const [validationErrors, setValidationErrors] = useState([]);
  const [formData, setFormData] = useState(complaint || defaultComplaintData);

  const debouncedSearchByCEP = debounce(async (cep) => {
    try {
      const formattedCEP = cep.replace(/\D/g, '');
      const addressData = await fetchAddressDataByCEP(formattedCEP);
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          city: addressData.cidade || '',
          neighborhood: addressData.bairro || '',
          state: addressData.estado || '',
          street: addressData.logradouro || '',
        },
      }));
    } catch (error) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          city: '',
          neighborhood: '',
          state: '',
          street: '',
        },
      }));
    }
  }, 500);

  const handleInputChange = async (key, value) => {
    if (key.startsWith('location.')) {
      const locationKey = key.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          [locationKey]: value,
        },
      }));

      if (key === 'location.cep' && value.length === 9) {
        debouncedSearchByCEP(value);
      }
      return;
    }

    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
  };

  async function onSave() {
    try {
      await complaintSchema.validate(formData, { abortEarly: false });
      if (formData && formData.location && formData.location.cep) {
        formData.location.cep = formData.location.cep.replace(/\D/g, '');
      }
      await handleSave(formData, token);
      setFormData(defaultComplaintData);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setValidationErrors(validationErrors);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.modalContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderText}>Denúncia</Text>

          <Text style={inputStyles.label}>Status</Text>
          <TextInput
            style={styles.input}
            value={complaintStatusesManager.getComplaintStatusTranslation(formData.status)}
            editable={false}
          />

          <Text style={inputStyles.label}>Descrição</Text>
          <TextInput
            style={{ ...styles.input, height: 80, textAlignVertical: 'top', padding: 8 }}
            value={formData.description}
            multiline
            numberOfLines={4}
            onChangeText={(value) => handleInputChange('description', value)}
          />

          {formData.solverDescription && formData.solverDescription.trim() && (
            <React.Fragment>
              <Text style={inputStyles.label}>Descrição do Solucionador</Text>
              <TextInput
                style={{ ...styles.input, height: 80, textAlignVertical: 'top', padding: 8 }}
                value={formData.solverDescription}
                multiline
                numberOfLines={4}
                editable={false}

                onChangeText={(value) => handleInputChange('solverDescription', value)}
              />
            </React.Fragment>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderText}>Localização</Text>

          <Text style={inputStyles.label}>CEP</Text>
          <TextInput
            style={styles.input}
            value={formData.location.cep}
            onChangeText={(value) => {
              const formattedCEP = formatCEP(value);
              handleInputChange('location.cep', formattedCEP);
            }}
          />

          <Text style={inputStyles.label}>Estado</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={formData.location.state}
              onValueChange={(value) => handleInputChange('location.state', value)}
            >
              {BRAZILIAN_STATES.map((state) => (
                <Picker.Item key={state.value} label={state.value} value={state.value} />
              ))}
            </Picker>
          </View>

          <Text style={inputStyles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            value={formData.location.city}
            onChangeText={(value) => handleInputChange('location.city', value)}
          />

          <Text style={inputStyles.label}>Bairro</Text>
          <TextInput
            style={styles.input}
            value={formData.location.neighborhood}
            onChangeText={(value) => handleInputChange('location.neighborhood', value)}
          />

          <Text style={inputStyles.label}>Rua</Text>
          <TextInput
            style={styles.input}
            value={formData.location.street}
            onChangeText={(value) => handleInputChange('location.street', value)}
          />

          <Text style={inputStyles.label}>Número</Text>
          <TextInput
            style={styles.input}
            value={formData.location.number}
            onChangeText={(value) => handleInputChange('location.number', value)}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>

        <ErrorModal
          visible={Object.keys(validationErrors).length > 0}
          errors={validationErrors}
          onClose={() => setValidationErrors({})}
        />
      </View>
    </ScrollView>
  );
};