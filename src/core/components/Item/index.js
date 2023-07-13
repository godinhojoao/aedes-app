import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

export const Item = ({ item, onPress, isSelected }) => {
  const backgroundColor = isSelected ? '#0842a0ff' : '#2255a9';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <View>
        <Text style={[styles.itemTitle, { color: '#fff' }]}>{item.description}</Text>
        <Text style={[styles.itemSubtitle, { color: '#fff' }]}>
          {item.location.city} -  {item.location.street}, {item.location.number}
        </Text>
      </View>
    </TouchableOpacity>
  );
}