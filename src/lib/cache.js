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


const WX_DELPIC_KEY = CACHE_PREFIX + "delpic_";
export const delpicCache = {
  get() {
    return storage.session.get(WX_DELPIC_KEY, null);
  },
  set(value) {
    storage.session.set(WX_DELPIC_KEY, value);
  }
}

const WX_BACKPATH_KEY = CACHE_PREFIX + "backpath_";
export const backpathCache = {
  get() {
    return storage.session.get(WX_BACKPATH_KEY, null);
  },
  set(value) {
    storage.session.set(WX_BACKPATH_KEY, value);
  },
  remove() {
    storage.session.remove(WX_BACKPATH_KEY);
  }
}


const SEARCH_KEY = CACHE_PREFIX + "search_";
export const searchCache = {
  get() {
    return storage.session.get(SEARCH_KEY, null);
  },
  set(value) {
    storage.session.set(SEARCH_KEY, value);
  },
  remove() {
    storage.session.remove(SEARCH_KEY);
  }
}


const COUPONS_KEY = CACHE_PREFIX + "coupons_";
export const couponsCache = {
  get() {
    return storage.session.get(COUPONS_KEY, null);
  },
  set(value) {
    storage.session.set(COUPONS_KEY, value);
  },
  remove() {
    storage.session.remove(COUPONS_KEY);
  }
}


const ORDER_KEY = CACHE_PREFIX + "order_";
export const orderCache = {
  get() {
    return storage.session.get(ORDER_KEY, null);
  },
  set(value) {
    storage.session.set(ORDER_KEY, value);
  },
  remove() {
    storage.session.remove(ORDER_KEY);
  }
}

const CHART_KEY = CACHE_PREFIX + "chart_";
export const chartCache = {
  get() {
    return storage.session.get(CHART_KEY, null);
  },
  set(value) {
    storage.session.set(CHART_KEY, value);
  },
  remove() {
    storage.session.remove(CHART_KEY);
  }
}
