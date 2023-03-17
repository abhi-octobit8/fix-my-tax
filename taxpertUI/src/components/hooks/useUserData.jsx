import { useSelector } from "react-redux";

function useUserData() {
  const userData = useSelector((state) => state.authentication.user);

  return userData;
}

export default useUserData;
