import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

export const LogoutButton = ({ isAuthenticated, handleLogout }) => {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text style={styles.buttonText}>Sair</Text>
    </TouchableOpacity>
  );
};
