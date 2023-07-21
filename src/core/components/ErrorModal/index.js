import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const ErrorModal = ({ visible, errors, onClose }) => {
  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Erros de validação</Text>
        {
          errors && !isObjectEmpty(errors) ?
            Object.entries(errors).map(([field, error]) => (
              <Text key={field} style={styles.modalError}>
                {error}
              </Text>
            ))
            :
            <Text>Houve um erro.</Text>
        }
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

