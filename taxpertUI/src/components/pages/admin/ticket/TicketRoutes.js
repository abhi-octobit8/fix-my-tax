import { Route, Routes } from "react-router-dom";
import TicketDetails from "./details/TicketDetails";
// import CreateEmployer from "./create/CreateEmployer";
import TicketListRequest from "./TicketListRequest";

function TicketRoutes() {
  debugger;
  return (
    <div>
      <Routes>
        <Route element={<TicketListRequest />} index />
        {/* <Route element={<CreateEmployer />} path="create" /> */}
        <Route element={<TicketDetails />} path="details/:id" />
      </Routes>
    </div>
  );
}
export default TicketRoutes;
