import { Route, Routes } from "react-router-dom";
import UserComponent from "./User";

function UserRouter() {
  return (
    <div>
      <Routes>
        <Route element={<UserComponent />} index />
      </Routes>
    </div>
  );
}
export default UserRouter;
