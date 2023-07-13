import React, { useState, useContext } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ComplaintModal } from '../../core/components/ComplaintModal';

import { Complaints } from '../../core/context/Complaints';
import { Item } from '../../core/components/Item/index';
import styles from './styles';
import { complaintStatusesManager } from '../../core/shared/complaintStatusesManager';

export const AllComplaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  // const { complaints } = useContext(ComplaintsContext);
  const complaints = [
    {
      id: 'dale1',
      status: 'WAITING',
      location: {
        cep: '12345-321',
        city: 'Bagé',
        neighborhood: 'Test neighborhood',
        number: '1000',
        state: 'RS',
        street: 'Test street',
      },
      denunciatorId: '4152d669-a9a1-49d0-bfdf-9d58040fcfb7',
      description: 'Test complaint',
    }
  ]

  const closeModal = () => {
    setSelectedComplaint(null)
  };

  function handlePress(complaint) {
    setSelectedComplaint(complaint);
  }

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => handlePress(item)}
        isSelected={selectedComplaint ? item.id === selectedComplaint.id : false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={complaints}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedComplaint ? selectedComplaint.id : null}
      />
      <ComplaintModal closeModal={closeModal} selectedComplaint={selectedComplaint} />
    </SafeAreaView>
  );
};
