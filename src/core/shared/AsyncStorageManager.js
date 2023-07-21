import AsyncStorage from '@react-native-async-storage/async-storage';

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