import React from "react";
import { useNavigate } from "react-router-dom";
import useUserRole from "../../components/hooks/useUserRole";

import {
  fixMytaxServicesInfo,
  FixMyTaxServiceType,
} from "../../components/pages/services/constant";
import { registerNotice } from "../../services/register.service";
import { createTicketService } from "../../services/ticket.service";
import { SUCCESS_MESSAGE_INFO } from "../../shared/constant/MessageInfo";
import { PATH } from "../../shared/Route";
import { getObjectFromList, message } from "../../shared/utils";

import ItrNoticeForm from "./ItrNoticeForm";
import { setOrderData } from "../../store/order/orderActions";
import { FIX_MY_TAX_SERVICE_TYPES } from "../../shared/constant/TaxService";

const ItrNoticeFormContainer = (props) => {
  const { selectedFixMyTaxService } = props;
  const { notice } = fixMytaxServicesInfo;
  const navigate = useNavigate();

  const userRole = useUserRole();

  const onProceed = (values) => {
    //update reducer for selected service.
    console.log(values);
    debugger;

    const formData = {
      ...values,
      fixMyTaxService: FIX_MY_TAX_SERVICE_TYPES[2],
    };
    setOrderData(formData);
    navigate(PATH.CHECKOUT);
  };
  const onFinish = async (values) => {
    // check request created from new assessee or existing assessee
    debugger;
    if (userRole) {
      const registerFormData = {
        fixMyTaxServiceType: selectedFixMyTaxService,
        serviceType: 2, // notice reply always for time being
        section: values.section,
        subSection: values.subSection,
        subject: values.subject,
        question: values.question,
        description: values.description,
        // status: 0,
        price: values.price,
        // paymentStaus: 0,
        // transactionNumber: "678678",
      };

      const res = await createTicketService(registerFormData, values.uploadITR);
      if (res.id) {
        message.success(SUCCESS_MESSAGE_INFO.REGISTRATION);
        navigate(PATH.TICKET_REQUEST_LIST);
      }
    } else {
      const registerFormData = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        ticketDetails: {
          fixMyTaxServiceType: selectedFixMyTaxService,
          serviceType: 2, // notice reply always for time being
          section: values.section,
          subSection: values.subSection,
          subject: values.subject,
          question: values.question,
          description: values.description,
          // status: 0,
          price: values.price,
          // paymentStaus: 0,
          // transactionNumber: "678678",
        },
      };

      const res = await registerNotice(registerFormData, values.uploadITR);
      if (res.id) {
        message.success(SUCCESS_MESSAGE_INFO.REGISTRATION);
      }
    }
  };

  return <ItrNoticeForm onProceed={onProceed} />;
};

export default ItrNoticeFormContainer;
