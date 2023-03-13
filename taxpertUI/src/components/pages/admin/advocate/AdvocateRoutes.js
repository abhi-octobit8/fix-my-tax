import { Route, Routes } from "react-router-dom";
import AdvocateList from "./AdvocateList";
import CreateAdvocate from "./create/CreateAdvocate";

function AdvocateRoutes() {
  // debugger;
  return (
    <div>
      <Routes>
        <Route element={<AdvocateList />} index />
        <Route element={<CreateAdvocate />} path="create" />
      </Routes>
    </div>
  );
}
export default AdvocateRoutes;
