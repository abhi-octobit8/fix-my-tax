import React from "react";
import "./CreateTicket.less";
import { Form, Select, Card } from "antd";
import { useState } from "react";
import { FIX_MY_TAX_SERVICE_TYPES } from "../../../../../shared/constant/TaxService";
import ItrNoticeFormContainer from "../../../../../modules/itr-notice/ItrNoticeFormContainer";
import GstNoticeFormContainer from "../../../../../modules/gst-notice-form/GstNoticeFormContainer";
import FilingItrFormContainer from "../../../../../modules/filing-itr/FilingItrFormContainer";
import BusinessConsultationFormContainer from "../../../../../modules/business-consultation/BusinessConsultationFormContainer";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const CreateTicket = (props) => {
  const [selectedService, setSelectedServices] = useState("");

  const onHandleServiceSection = React.useCallback(
    async (value) => {
      setSelectedServices(value);
    },
    [selectedService]
  );
  const renderSelectedService = (selectedValue) => {
    switch (selectedValue) {
      case 1:
        return (
          <ItrNoticeFormContainer selectedFixMyTaxService={selectedService} />
        );
      case 2:
        return (
          <GstNoticeFormContainer selectedFixMyTaxService={selectedService} />
        );
      case 3:
        return (
          <FilingItrFormContainer selectedFixMyTaxService={selectedService} />
        );
      case 4:
        return (
          <BusinessConsultationFormContainer
            selectedFixMyTaxService={selectedService}
          />
        );

      default:
        return;
    }
  };

  return (
    <Card className="create-card-layout" title="Create Ticket" bordered={false}>
      <Form {...formItemLayout}>
        <Form.Item label="Select Service" name="serviceType">
          <Select
            placeholder="Select your Service"
            onChange={onHandleServiceSection}
            showSearch
          >
            {FIX_MY_TAX_SERVICE_TYPES.map((x, i) => {
              return (
                <Option value={x.value} key={i}>
                  {x.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
      {/* {selectedService == 1 ? <ItrNoticeForm /> : null} */}
      {renderSelectedService(selectedService)}
    </Card>
  );
};

export default CreateTicket;
