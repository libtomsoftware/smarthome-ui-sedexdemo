import StorageService, { storageKeys } from "../services/storage";

function getUser() {
  const user = StorageService.get(storageKeys.authUser);

  return user ? JSON.parse(user) : null;
}

export default {
  devices: [],
  loader: false,
  modal: null,
  reports: [],
  security: null,
  sidebar: false,
  tasks: [],
  user: getUser(),
};
