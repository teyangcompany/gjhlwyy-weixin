import {CACHE_PREFIX} from "./config"
import storage from "good-storage"

const OPENID_KEY = CACHE_PREFIX + "openid_";

export const openidCache = {
  get() {
    return storage.get(OPENID_KEY, null);
  },
  set(value) {
    storage.set(OPENID_KEY, value);
  }
}
