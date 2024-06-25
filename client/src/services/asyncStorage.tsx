import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (name: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (name: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeData = async (name: string) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};
