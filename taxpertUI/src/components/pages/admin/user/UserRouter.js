import { Route, Routes } from "react-router-dom";
// import CreateUser from "./create/CreateUser";
import UserComponent from "./User";
// import loadable from "@loadable/component";

// const Create = loadable(() => import("./create/CreateRequestPage"));
// const UserList = loadable(() => import("./User"));

function UserRouter() {
  //   debugger;
  return (
    <div>
      <Routes>
        <Route element={<UserComponent />} index />
        {/* <Route element={<CreateUser />} path="create" /> */}
        {/* <Route element={<UserList />} index />
        <Route element={<Create />} path="create" /> */}
      </Routes>
      {/* <Route path={`${path}/:draftId`} component={DraftUpdate} /> */}
    </div>
  );
}
export default UserRouter;
