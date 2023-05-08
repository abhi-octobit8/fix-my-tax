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
  Spin,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FIELD_NAME } from "./constant";
import useUserRole from "../../components/hooks/useUserRole";

import "./BusinessConsultationForm.css";
import { fixMytaxServiceInfoData } from "../../shared/constant/ServiceInfoData";
import { getObjectFromList, openFile } from "../../shared/utils";
import { USER_ROLE } from "../../components/application/application-menu/constant";
import RegisterButton from "../../common/register-button/RegisterButton";
import { GetServicePrice } from "../../services/ticket.service";

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
const BusinessConsultationForm = (props) => {
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
        pricingKey: sectionObj.pricingKey,
      };
      onProceed(formData);
    } catch (e) {
      console.error(e);
    }
  };

  // const onHandleSection = (value) => {
  //   console.log(value);
  //   if (value) {
  //     const priceValue = getObjectFromList(business_consultation, value).fee;
  //     form.setFieldValue(FIELD_NAME.PRICE, priceValue);
  //   } else {
  //     setOptionData((prevState) => ({
  //       sectionList: [],
  //     }));
  //     form.setFieldValue(FIELD_NAME.PRICE, "");
  //   }
  // };

  const onHandleSection = async (value) => {
    try {
      console.log(value);
      setIsLoading(true);
      if (value) {
        // call get api to get price
        const pricingKeyValue = getObjectFromList(
          business_consultation,
          value
        ).pricingKey;

        const res = await GetServicePrice(pricingKeyValue);
        // const priceValue = getObjectFromList(itr_filling, value).fee;
        if (res && res.price) {
          form.setFieldValue(FIELD_NAME.PRICE, res.price);
        } else {
          form.setFieldValue(FIELD_NAME.PRICE, "");
        }
      } else {
        setOptionData((prevState) => ({
          sectionList: [],
        }));
        form.setFieldValue(FIELD_NAME.PRICE, "");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onFinish={onSubmit} {...formItemLayout} form={form} name="register">
      <Form.Item
        name={FIELD_NAME.SECTION}
        label="Nature of Query"
        rules={[
          {
            required: true,
            message: "Select your query",
          },
        ]}
      >
        <Select
          placeholder="Select your query"
          onChange={onHandleSection}
          showSearch
        >
          {optionData.sectionList.map((x, i) => {
            return (
              <Option value={x.key} key={i}>
                <Tooltip title={x.name}>{x.name}</Tooltip>
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Spin spinning={isLoading}>
        {" "}
        <Form.Item
          name={FIELD_NAME.PRICE}
          label="Fee"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select ITR Type again",
          //   },
          // ]}
        >
          <Input disabled={true} addonAfter="INR"></Input>
        </Form.Item>
      </Spin>
      <Form.Item label="Upload Documents for Query/Opinion">
        <Space>
          <Form.Item
            name="uploadDocument"
            noStyle
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Upload Required Document",
              },
            ]}
          >
            <Upload
              beforeUpload={(file) => {
                return false;
              }}
              multiple={false}
              maxCount={1}
              style={{
                width: 160,
              }}
            >
              <Button icon={<UploadOutlined />}>Click Upload File</Button>
            </Upload>
          </Form.Item>

          <Tooltip title="Please merge file in single Pdf">
            <InfoCircleOutlined
              style={{ fontSize: "16px", color: "#f47c01" }}
            />
          </Tooltip>
        </Space>
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

export default BusinessConsultationForm;