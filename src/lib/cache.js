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

const TOKEN_KEY = CACHE_PREFIX + "token_";
export const tokenCache = {
  get() {
    return storage.get(TOKEN_KEY, null);
  },
  set(value) {
    storage.set(TOKEN_KEY, value);
  }
}

const WX_USER_KEY = CACHE_PREFIX + "user_";
export const userCache = {
  get() {
    return storage.get(WX_USER_KEY, null);
  },
  set(value) {
    storage.set(WX_USER_KEY, value);
  }
}
