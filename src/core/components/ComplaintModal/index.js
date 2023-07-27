import React from 'react';
import Modal from 'react-native-modal';
import { ComplaintForm } from '../ComplaintForm';
import { formatCEP } from '../../shared/formatCEP';
import { useMutation } from '@apollo/client';

export function ComplaintModal({ selectedComplaint, closeModal }) {
  // const [updateComplaint] = useMutation(CREATE_COMPLAINT);

  const complaint = {
    ...selectedComplaint,
    location: {
      ...selectedComplaint.location,
      cep: selectedComplaint.location.cep && formatCEP(selectedComplaint.location.cep) || '',
    }
  };

  async function handleSave(formData, token) {
    console.log('formData', formData)
    console.log('token', token)
    // await updateComplaint({
    //   variables: { input: formData },
    //   context: {
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //   },
    // });
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
      <ComplaintForm handleSave={handleSave} complaint={complaint} />
    </Modal>
  )
}