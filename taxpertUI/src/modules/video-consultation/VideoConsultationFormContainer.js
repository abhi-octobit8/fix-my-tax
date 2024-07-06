import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../shared/Route";

import VideoConsultationForm from "./VideoConsultationForm";
import { FIX_MY_TAX_SERVICE_TYPES } from "../../shared/constant/TaxService";
import { setOrderData } from "../../store/order/orderActions";

const VideoConsultationFormContainer = (props) => {
  const navigate = useNavigate();

  const onProceed = (values) => {
    //update reducer for selected service.
    console.log(values);

    const formData = {
      ...values,
      fixMyTaxService: FIX_MY_TAX_SERVICE_TYPES[7],
    };
    setOrderData(formData);
    navigate(PATH.CHECKOUT);
  };
  const onFinish = async (values) => {
    // check request created from new assessee or existing assessee
    // debugger;
    // if (userRole) {
    //   const registerFormData = {
    //     fixMyTaxServiceType: selectedFixMyTaxService,
    //     serviceType: 2, // notice reply always for time being
    //     section: values.section,
    //     subSection: "",
    //     subject: values.subject,
    //     question: values.question,
    //     description: values.description,
    //     // status: 0,
    //     price: values.price,
    //     // paymentStaus: 0,
    //     // transactionNumber: "678678",
    //   };
    //   const res = await createTicketService(
    //     registerFormData,
    //     values.uploadDocument
    //   );
    //   if (res.id) {
    //     message.success(SUCCESS_MESSAGE_INFO.REGISTRATION);
    //     navigate(PATH.TICKET_REQUEST_LIST);
    //   }
    // } else {
    //   const registerFormData = {
    //     name: values.name,
    //     email: values.email,
    //     phoneNumber: values.phoneNumber,
    //     ticketDetails: {
    //       fixMyTaxServiceType: selectedFixMyTaxService,
    //       serviceType: 2, // notice reply always for time being
    //       section: values.section,
    //       subSection: "",
    //       subject: values.subject,
    //       question: values.question,
    //       description: values.description,
    //       // status: 0,
    //       price: values.price,
    //       // paymentStaus: 0,
    //       // transactionNumber: "678678",
    //     },
    //   };
    //   const res = await registerNotice(registerFormData, values.uploadDocument);
    //   if (res.id) {
    //     message.success(SUCCESS_MESSAGE_INFO.REGISTRATION);
    //   }
    // }
  };

  return <VideoConsultationForm onFinish={onFinish} onProceed={onProceed} />;
};

export default VideoConsultationFormContainer;
