import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveItem = async (item) => {
  let itemID = item.id.toString();
  try {
    await AsyncStorage.setItem(itemID, JSON.stringify(item))
  } catch (e) {
    console.log(e)
  }
}

export const loadItem = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : -1;
  } catch (e) {
    console.log(e)
  }
}

export const deleteItem = async (item) => {
  let itemID = userId = item.id.toString();
  try {
    await AsyncStorage.removeItem(itemID)
  } catch (e) {
    console.log(e)
  }
}

export const getAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch (e) {
    console.log(e)
  }
  return keys;
}

export const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log(e)
  }
}

