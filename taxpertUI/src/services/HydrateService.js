class HydrateService {
  static getStoreInitialState(initialState) {
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
