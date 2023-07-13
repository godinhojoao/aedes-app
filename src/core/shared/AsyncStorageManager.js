import AsyncStorage from '@react-native-async-storage/async-storage';

// how to use
// await AsyncStorageManager.removeItem("aedes-token");
// const token = await AsyncStorageManager.getItem("aedes-token");
// const account = await AsyncStorageManager.getItem("aedes-account", true);
// await AsyncStorageManager.setItem("aedes-token", "1234567890");
// await AsyncStorageManager.setItem("aedes-account", {
//   id: '29bb453d-db2f-4595-ac50-8ec3330b4086',
//   name: 'test',
//   email: 'test@gmail.com',
//   cpf: '91293252000',
//   role: 'USER',
// });
export class AsyncStorageManager {
  static async setItem(key, value) {
    try {
      const item = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, item);
    } catch (error) {
      console.log('Error storing item:', error);
    }
  }

  static async getItem(key, isToParse = false) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value && isToParse ? JSON.parse(value) : value;
    } catch (error) {
      console.log('Error retrieving item:', error);
      return null;
    }
  }

  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing item:', error);
    }
  }
}