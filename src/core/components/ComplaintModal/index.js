import React from 'react';
import Modal from 'react-native-modal';
import { ComplaintForm } from '../ComplaintForm';

export function ComplaintModal({ selectedComplaint, closeModal }) {
  const handleSave = (formData) => {
    console.log('formData', formData)
    closeModal();
  };

  return (
    <Modal
      isVisible={!!selectedComplaint}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      backdropOpacity={0.5}
      backdropColor="black"
    >
      <ComplaintForm handleSave={handleSave} complaint={selectedComplaint} />
    </Modal>
  )
}