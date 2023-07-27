import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { complaintStatusesManager } from '../../shared/ComplaintStatusesManager';

export const Item = ({ item, onPress, isSelected }) => {
  const backgroundColor = isSelected ? '#0842a0ff' : '#2255a9';
  const currentComplaintStatus = complaintStatusesManager.getCurrentComplaintStatus(item.status);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <View>
        <Text
          style={[styles.itemTitle, { color: '#fff' }]}
          numberOfLines={5}
          ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text style={[styles.itemSubtitle, { color: '#fff' }]}>
          {item.location.city} -  {item.location.street}, {item.location.number}
        </Text>
        <View style={styles.statusContainer}>
          {currentComplaintStatus && currentComplaintStatus.color &&
            <Text style={{ ...styles.statusBullet, backgroundColor: currentComplaintStatus.color }}></Text>
          }
          <Text style={[styles.itemSubtitle, { color: '#fff' }]}>
            {currentComplaintStatus.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}