import { useSelector } from "react-redux";

function useUserRole() {
  const userData = useSelector((state) => state.authentication.user);
  const userRole = userData && userData?.roleNames[0];

  return userRole;
}

export default useUserRole;
