class HydrateService {
  static getStoreInitialState(initialState) {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const userSession = {
      accessToken,
      userId,
    };
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
