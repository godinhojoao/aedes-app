import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import styles from './styles';
import { complaintStatusesManager } from '../../shared/complaintStatusesManager';

export const ComplaintForm = ({ complaint, handleSave }) => {
  const [formData, setFormData] = useState(complaint || {
    status: 'WAITING',
    location: {
      cep: '',
      city: '',
      neighborhood: '',
      number: '',
      state: '',
      street: '',
    },
    denunciatorId: 'current-user-id',
    description: '',
  });

  const handleInputChange = (key, value) => {
    if (key.startsWith('location.')) {
      const locationKey = key.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          [locationKey]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  function onSave() {
    handleSave(formData)
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Denúncia</Text>
        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          value={complaintStatusesManager.getComplaintStatusTranslation(formData.status)}
          editable={false}
        />
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
        {formData.solverDescription && (
          <React.Fragment>
            <Text style={styles.label}>Descrição do Solucionador</Text>
            <TextInput
              style={styles.input}
              value={formData.solverDescription}
              onChangeText={(value) => handleInputChange('solverDescription', value)}
              editable={false}
            />
          </React.Fragment>
        )}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Localização</Text>
        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          value={formData.location.cep}
          onChangeText={(value) => handleInputChange('location.cep', value)}
        />
        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          value={formData.location.city}
          onChangeText={(value) => handleInputChange('location.city', value)}
        />
        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          value={formData.location.neighborhood}
          onChangeText={(value) => handleInputChange('location.neighborhood', value)}
        />
        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={formData.location.number}
          onChangeText={(value) => handleInputChange('location.number', value)}
        />
        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          value={formData.location.state}
          onChangeText={(value) => handleInputChange('location.state', value)}
        />
        <Text style={styles.label}>Rua</Text>
        <TextInput
          style={styles.input}
          value={formData.location.street}
          onChangeText={(value) => handleInputChange('location.street', value)}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};