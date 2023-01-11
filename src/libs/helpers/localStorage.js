const storage = {
  setValueIntoKey(key, value) {
    localStorage.setItem(key, value);
  },
  getValueFromKey(key) {
    return localStorage.getItem(key);
  },
  setObjectIntoKey(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  },
  setAccessToken(token) {
    this.setValueIntoKey('accessToken', token);
  },
  getAccessToken() {
    const accessToken = this.getValueFromKey('accessToken');
    if (!accessToken) return null;
    return accessToken;
  },
  clearStorage() {
    localStorage.clear();
  },
};

export default storage;
