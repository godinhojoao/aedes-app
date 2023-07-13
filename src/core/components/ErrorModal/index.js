import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

export const ErrorModal = ({ visible, errors, onClose }) => {
  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Erros de validação</Text>
        {Object.entries(errors).map(([field, error]) => (
          <Text key={field} style={styles.modalError}>
            {error}
          </Text>
        ))}
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

