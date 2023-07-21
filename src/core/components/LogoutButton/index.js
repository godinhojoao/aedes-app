import { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

import styles from './styles';

export const LogoutButton = () => {
  const { logout, isAuthenticated } = useContext(AuthContext)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <TouchableOpacity onPress={logout} style={styles.button}>
      <Text style={styles.buttonText}>Sair</Text>
    </TouchableOpacity>
  );
};
