import { Route, Routes } from "react-router-dom";
import CreateTicket from "./create/CreateTicket";
import TicketDetails from "./details/TicketDetails";
import TicketListRequest from "./TicketListRequest";

function TicketRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<TicketListRequest />} index />
        <Route element={<CreateTicket />} path="create" />
        <Route element={<TicketDetails />} path="details/:id" />
      </Routes>
    </div>
  );
}
export default TicketRoutes;
