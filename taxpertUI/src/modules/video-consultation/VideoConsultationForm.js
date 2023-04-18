/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Checkbox,
  Tooltip,
  Space,
  DatePicker,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FIELD_NAME } from "./constant";
import useUserRole from "../../components/hooks/useUserRole";

import { fixMytaxServiceInfoData } from "../../shared/constant/ServiceInfoData";
import { getObjectFromList, openFile } from "../../shared/utils";
import { USER_ROLE } from "../../components/application/application-menu/constant";
import RegisterButton from "../../common/register-button/RegisterButton";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const VideoConsultationForm = (props) => {
  const { onFinish, onProceed } = props;
  const { business_consultation } = fixMytaxServiceInfoData;
  const userRole = useUserRole();

  const [isLoading, setIsLoading] = useState(false);
  const [optionData, setOptionData] = useState({
    sectionList: [],
    subSectionsList: [],
  });

  const [form] = Form.useForm();

  React.useEffect(() => {
    setOptionData((prevState) => ({
      ...prevState,
      sectionList: business_consultation,
    }));
  }, []);

  const onSubmit = (values) => {
    try {
      const sectionObj = getObjectFromList(
        business_consultation,
        values.section
      );

      const formData = {
        ...values,
        sectionObj,
      };
      onProceed(formData);
    } catch (e) {
      console.error(e);
    }
  };

  const onHandleSection = (value) => {
    console.log(value);
    if (value) {
      const priceValue = getObjectFromList(business_consultation, value).fee;
      form.setFieldValue(FIELD_NAME.PRICE, priceValue);
    } else {
      setOptionData((prevState) => ({
        sectionList: [],
      }));
      form.setFieldValue(FIELD_NAME.PRICE, "");
    }
  };

  const disabledDate = (current) => {
    return (
      moment(current).day() === 0 ||
      moment(current).day() === 6 ||
      current < moment().add(1) ||
      current > moment().day(21)
    );
  };

  return (
    <Form onFinish={onSubmit} {...formItemLayout} form={form} name="register">
      <Form.Item
        label="Topic"
        name="query"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <TextArea showCount maxLength={140} />
      </Form.Item>

      <Form.Item
        name={FIELD_NAME.PRICE}
        label="Fee"
        // extra="FEE INCLUDING GST @ 18%"
      >
        <Input disabled={true} addonAfter="INR" value="2000"></Input>
      </Form.Item>
      <Form.Item
        name={FIELD_NAME.DATE}
        label="Select Date"
        // extra="FEE INCLUDING GST @ 18%"
      >
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          // showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
        />
      </Form.Item>

      <Form.Item
        label=" "
        colon={false}
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
      >
        <Checkbox>
          I have read and I agree to the{" "}
          <a
            href="#"
            onClick={() => openFile("/documents/TERMS_CONDITIONS_FMT.pdf")}
          >
            Terms & Condition.
          </a>
        </Checkbox>
      </Form.Item>

      {/* <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button> */}
      <Form.Item label=" " colon={false}>
        {userRole === USER_ROLE.CUSTOMER ? (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ) : (
          <RegisterButton />
        )}
      </Form.Item>
    </Form>
  );
};

export default VideoConsultationForm;
