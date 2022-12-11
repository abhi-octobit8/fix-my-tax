export const erLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },
  getItem: (key) => {
    return localStorage.getItem(key);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  setJSONItem: (key, value) => {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  getJSONItem: (key) => {
    let returnValue = {};
    try {
      returnValue = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      //do nothing
      console.error(e);
    }
    return returnValue;
  },
};
