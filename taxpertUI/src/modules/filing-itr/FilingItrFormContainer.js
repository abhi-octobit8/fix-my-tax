import React from "react";
import { useNavigate } from "react-router-dom";
import useUserRole from "../../components/hooks/useUserRole";
import { registerNotice } from "../../services/register.service";
import { createTicketService } from "../../services/ticket.service";
import { SUCCESS_MESSAGE_INFO } from "../../shared/constant/MessageInfo";
import { PATH } from "../../shared/Route";
import { message } from "../../shared/utils";

import FilingItrForm from "./FilingItrForm";
import { FIX_MY_TAX_SERVICE_TYPES } from "../../shared/constant/TaxService";
import { setOrderData } from "../../store/order/orderActions";

const FilingItrFormContainer = (props) => {
  const navigate = useNavigate();

  const onProceed = (values) => {
    //update reducer for selected service.
    console.log(values);

    const formData = {
      ...values,
      fixMyTaxService: FIX_MY_TAX_SERVICE_TYPES[0],
    };
    setOrderData(formData);
    navigate(PATH.CHECKOUT);
  };
  return <FilingItrForm onProceed={onProceed} />;
};

export default FilingItrFormContainer;
