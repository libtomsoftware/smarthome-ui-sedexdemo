const defaultStorageType = "local";
const keyNamespace = "smarthome-";

export const storageKeys = {
  accessToken: "access-token",
  authExpiration: "auth-expiration",
  authUser: "auth-user",
  refreshToken: "refresh-token",
};

class StorageService {
  get storage() {
    return { local: window.localStorage, session: window.sessionStorage };
  }

  set(key, value, type = defaultStorageType) {
    this.getStorage(type).setItem(
      this.getNamespacedKey(key),
      JSON.stringify(value)
    );
  }

  get(key, type = defaultStorageType) {
    const value = this.getStorage(type).getItem(this.getNamespacedKey(key));

    return value ? JSON.parse(value) : null;
  }

  remove(key, type = defaultStorageType) {
    this.getStorage(type).removeItem(this.getNamespacedKey(key));
  }

  getNamespacedKey(key) {
    return `${keyNamespace}${key}`;
  }

  getStorage(type) {
    return this.storage[type];
  }
}

export default new StorageService();
