import React from 'react';
import Modal from 'react-native-modal';
import { ComplaintForm } from '../ComplaintForm';
import { formatCEP } from '../../shared/formatCEP';
import { useMutation } from '@apollo/client';
import { UPDATE_COMPLAINT } from '../../graphql/mutations';

export function ComplaintModal({ selectedComplaint, closeModal }) {
  const [updateComplaint] = useMutation(UPDATE_COMPLAINT);
  const complaint = {
    ...selectedComplaint,
    location: {
      ...selectedComplaint.location,
      cep: selectedComplaint.location.cep && formatCEP(selectedComplaint.location.cep) || '',
    },
    updatedAt: new Date()
  };

  async function handleSave(formData, token) {
    delete formData.__typename;
    delete formData.denunciatorId;
    delete formData.createdAt;
    delete formData.formattedAddress;
    delete formData.location.__typename;
    await updateComplaint({
      variables: { input: formData },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
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