import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../shared/Route";

import FilingTdsForm from "./FilingTdsForm";
import { FIX_MY_TAX_SERVICE_TYPES } from "../../shared/constant/TaxService";
import { setOrderData } from "../../store/order/orderActions";

const FilingTdsFormContainer = (props) => {
  const navigate = useNavigate();

  const onProceed = (values) => {
    //update reducer for selected service.

    const formData = {
      ...values,
      fixMyTaxService: FIX_MY_TAX_SERVICE_TYPES[1],
    };
    setOrderData(formData);
    navigate(PATH.CHECKOUT);
  };

  return <FilingTdsForm onProceed={onProceed} />;
};

export default FilingTdsFormContainer;
