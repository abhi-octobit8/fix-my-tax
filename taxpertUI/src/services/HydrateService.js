// import LocalStorageService from "~/service/LocalStorageService";

class HydrateService {
  static getStoreInitialState(initialState) {
    // const userSession = LocalStorageService.read(
    //   LocalStorageService.KEY.USER_SESSION,
    // );
    const userSession = localStorage.getItem("accessToken");

    return {
      ...initialState,
      authentication: {
        ...initialState.authentication,
        userSession,
      },
    };
  }
}

export default HydrateService;
