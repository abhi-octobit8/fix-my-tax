export const erSessionStorage = {
  setItem: (key, value) => {
    sessionStorage.setItem(key, value);
  },
  getItem: (key) =>{
    return sessionStorage.getItem(key);
  },
  removeItem: (key) =>{
    sessionStorage.removeItem(key);
  },
  setJSONItem: (key, value) =>{
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  },
  getJSONItem: (key) =>{
    let returnValue = {};
    try{
      returnValue = JSON.parse(sessionStorage.getItem(key));
    } catch(e){//do nothing
      console.error(e);
    }
    return returnValue;
  }
};
