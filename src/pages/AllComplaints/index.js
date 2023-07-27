import React, { useContext, useEffect, useState, useCallback } from 'react';
import { FlatList, SafeAreaView, View, Text, RefreshControl } from 'react-native';
import { ComplaintModal } from '../../core/components/ComplaintModal';
import { Item } from '../../core/components/Item/index';
import styles from './styles';
import { FIND_ALL_COMPLAINTS_QUERY } from '../../core/graphql/queries';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../core/context/AuthContext';
import { ErrorModal } from '../../core/components/ErrorModal';

export const AllComplaints = ({ route, navigation }) => {
  const { token, account, logout } = useContext(AuthContext);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { refetch } = useQuery(FIND_ALL_COMPLAINTS_QUERY, {
    variables: {
      input: {
        limit: 999,
        offset: 0,
        denunciatorId: account && account.id,
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

  useEffect(() => {
    if (!selectedComplaint) {
      refetch();
    }
  }, [selectedComplaint]);

  useEffect(() => {
    const onFocus = () => {
      refetch();
    };

    const unsubscribeFocus = navigation.addListener('focus', onFocus);

    return () => {
      unsubscribeFocus();
    };
  }, [navigation, route]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetch()
      .then(() => setIsRefreshing(false))
      .catch(() => {
        setIsRefreshing(false);
        setIsErrorModalVisible(true);
      });
  }, [refetch]);

  function closeModal() {
    setSelectedComplaint(null);
  }

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
  }

  return (
    <SafeAreaView style={styles.container}>
      {complaints.length ? (
        <FlatList
          data={complaints}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedComplaint ? selectedComplaint.id : null}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
        />
      ) : (
        <View style={styles.noComplaintsContainer}>
          <Text>Você não realizou nenhuma denúncia ainda.</Text>
        </View>
      )}
      {selectedComplaint && (
        <ComplaintModal closeModal={closeModal} selectedComplaint={selectedComplaint} />
      )}
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
