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
    this.setValueIntoKey("accessToken", token);
  },
  setRefreshToken(token) {
    this.setValueIntoKey("refreshToken", token);
  },
  getAccessToken() {
    const accessToken = this.getValueFromKey("accessToken");
    if (!accessToken) return null;
    return accessToken;
  },
  getRefreshToken() {
    const refreshToken = this.getValueFromKey("refreshToken");
    if (!refreshToken) return null;
    return refreshToken;
  },
  // removeAccessToken() {
  //   const accessToken = this.getAccessToken();
  //   if (!accessToken) return null;
  //   localStorage.removeItem("accessToken");
  // },
  // removeRefreshToken() {
  //   const refreshToken = this.getRefreshToken();
  //   if (!refreshToken) return null;
  //   localStorage.removeItem("refreshToken");
  // },
  clearStorage() {
    localStorage.clear();
  },
};

export default storage;
