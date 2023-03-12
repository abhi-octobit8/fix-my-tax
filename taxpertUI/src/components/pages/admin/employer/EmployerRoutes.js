import { Route, Routes } from "react-router-dom";
import CreateEmployer from "./create/CreateEmployer";
import EmployerList from "./EmployerList";

function EmployerRoutes() {
  // debugger;
  return (
    <div>
      <Routes>
        <Route element={<EmployerList />} index />
        <Route element={<CreateEmployer />} path="create" />
      </Routes>
    </div>
  );
}
export default EmployerRoutes;
