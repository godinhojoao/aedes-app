import React, { useContext, useState } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import { ComplaintModal } from '../../core/components/ComplaintModal';
import { Item } from '../../core/components/Item/index';
import styles from './styles';
import { FIND_ALL_COMPLAINTS_QUERY } from '../../core/graphql/queries';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../core/context/AuthContext';
import { ErrorModal } from '../../core/components/ErrorModal';

export const AllComplaints = () => {
  const { token, account, logout } = useContext(AuthContext);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const { refetch } = useQuery(FIND_ALL_COMPLAINTS_QUERY, {
    variables: {
      input: {
        limit: 999,
        offset: 0,
        // denunciatorId: account && account.id
      },
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      setComplaints(data.findAllComplaints.items);
    },
    onError: () => setIsErrorModalVisible(true),
  });

  function closeModal() {
    setSelectedComplaint(null)
  };

  function handlePress(complaint) {
    setSelectedComplaint(complaint);
  }

  function renderItem({ item }) {
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
      {complaints.length ?
        <FlatList
          data={complaints}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedComplaint ? selectedComplaint.id : null}
        />
        :
        <View style={styles.noComplaintsContainer}>
          <Text>Você não realizou nenhuma denúncia ainda.</Text>
        </View>
      }
      {selectedComplaint && <ComplaintModal closeModal={closeModal} selectedComplaint={selectedComplaint} />}
      <ErrorModal
        visible={isErrorModalVisible}
        onClose={() => {
          setIsErrorModalVisible(false);
          logout();
        }}
      />
    </SafeAreaView>
  );
};
