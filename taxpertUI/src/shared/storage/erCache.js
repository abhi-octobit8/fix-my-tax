class ErCache{
  constructor() {
    //TODO if the window.sessionStorage is not available then use the object as a service here.
    //TODO set the localstorage with the expiration period
    this.sessionStorage = window.sessionStorage;
  }

  getItem(key){
    return this.sessionStorage.getItem(key);
  }

  getJSONItem(key){
    try{
      return JSON.parse(this.sessionStorage.getItem(key));
    } catch(e){
      return {};
    }
  }

  removeItem(key) {
    this.sessionStorage.removeItem(key)
  }

  setItem({key, value}){
    return this.sessionStorage.setItem(key, value);
  }

  setJSONItem({key, value}){
    try{
      return this.sessionStorage.setItem(key, JSON.stringify(value));
    } catch(e){/*Do nothing*/
      console.error(e);
    }
  }
}

export const erCache = new ErCache();
