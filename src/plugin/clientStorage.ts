


async function getValue(key: string) {
  try {
    return await figma.clientStorage.getAsync(key);
  } catch (error) {
    console.log('unable to get from storage', error);
    return undefined;
  }
}
async function setValue(key: string, value: string): Promise<void> {
  try {
    await figma.clientStorage.setAsync(key, value);
  } catch (error) {
    console.log('unable to save to storage', error);
  }
}
async function deleteValue(key: string): Promise<void> {
  try {
    await figma.clientStorage.deleteAsync(key);
  } catch (error) {
    console.log('unable to remove from storage', error);
  }
}
async function getEntries() {
  try {
    const keys = await figma.clientStorage.keysAsync();
    for (const key of keys) {
      const value = await figma.clientStorage.getAsync(key);
      return `${key}: ${value}`;
    }
  } catch (error) {
    console.log('unable to get keys', error);
  }
}

export default {
  getValue,
  setValue,
  deleteValue,
  getEntries,
};

