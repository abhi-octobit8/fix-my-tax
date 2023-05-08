/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Collapse,
  DatePicker,
  InputNumber,
  Checkbox,
  Tooltip,
  Space,
  Spin,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { fixMytaxServicesInfo } from "../../components/pages/services/constant";
import { phoneNumberValidator } from "../../shared/validator";
import { FIELD_NAME } from "./constant";
import useUserRole from "../../components/hooks/useUserRole";

import "./ItrNoticeForm.css";
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
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
const ItrNoticeForm = (props) => {
  const { onProceed } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { itr_tds_tcs_notice } = fixMytaxServiceInfoData;
  const userRole = useUserRole();

  const [optionData, setOptionData] = useState({
    sectionList: [],
    subSectionsList: [],
  });

  const [form] = Form.useForm();

  React.useEffect(() => {
    setOptionData((prevState) => ({
      ...prevState,
      sectionList: itr_tds_tcs_notice,
    }));
  }, []);

  React.useEffect(() => () => form.resetFields(), []);

  const onSubmit = (values) => {
    try {
      const sectionObj = getObjectFromList(itr_tds_tcs_notice, values.section);

      // const sectionValue = sectionObj.name;
      const subSectionObj = getObjectFromList(
        sectionObj.subSections,
        values.subSection
      );
      const formData = {
        ...values,
        sectionObj,
        subSectionObj,
        pricingKey: subSectionObj.pricingKey,
      };
      onProceed(formData);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const handleClick = (path) => {
    window.open(path, "_blank");
  };
  const onHandleSection = (value) => {
    if (value) {
      const { subSections } = getObjectFromList(itr_tds_tcs_notice, value);
      // const item = Object.keys(notice[value].subSections);
      setOptionData((prevState) => ({
        ...prevState,
        subSectionsList: subSections,
      }));
    } else {
      setOptionData((prevState) => ({
        ...prevState,
        subSectionsList: [],
      }));
    }
    form.setFieldValue(FIELD_NAME.SUBSECTION, "");
    form.setFieldValue(FIELD_NAME.PRICE, "");
  };

  const onHandleSubSection = async (value) => {
    try {
      if (value) {
        // const sectionValue = getObjectFromList(tds_filing, value).fee;
        const sectionValue = form.getFieldValue(FIELD_NAME.SECTION);
        const sectionObj = getObjectFromList(itr_tds_tcs_notice, sectionValue);
        // const priceValue = getObjectFromList(sectionObj.subSections, value).fee;
        // call get api to get price
        const pricingKeyValue = getObjectFromList(
          sectionObj.subSections,
          value
        ).pricingKey;
        const res = await GetServicePrice(pricingKeyValue);
        if (res && res.price) {
          form.setFieldValue(FIELD_NAME.PRICE, res.price);
        } else {
          form.setFieldValue(FIELD_NAME.PRICE, "");
        }
      } else {
        setOptionData((prevState) => ({
          sectionList: [],
          subSectionsList: [],
        }));
        form.setFieldValue(FIELD_NAME.PRICE, "");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSubmit}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "91",
      }}
      scrollToFirstError
    >
      <Form.Item
        name={FIELD_NAME.SECTION}
        label="Under Section"
        rules={[
          {
            required: true,
            message: "Please select Section Type!",
          },
        ]}
      >
        <Select
          placeholder="Select your Section Type"
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
      <Form.Item
        name={FIELD_NAME.SUBSECTION}
        label="Select your Notice Type"
        rules={[
          {
            required: true,
            message: "Please select SubSection Type!",
          },
        ]}
      >
        <Select
          placeholder="Select your SubSection Type"
          onChange={onHandleSubSection}
          showSearch
        >
          {optionData.subSectionsList.map((x, i) => {
            return (
              <Option value={x.key} key={i}>
                <Tooltip title={x.name}>{x.name}</Tooltip>
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      {/* <Form.Item name={FIELD_NAME.PRICE} label="Fee">
        <Input disabled={true} addonAfter="INR"></Input>
      </Form.Item> */}

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

      {/* <Form.Item label="Upload Copy of Notice & other supporting documents">
        <Space>
          <Form.Item
            name={FIELD_NAME.UPLOAD_DOCUMENT}
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
          <a
            href="#"
            onClick={() => openFile("/documents/ITR_FILINING_DOCUMENT.pdf")}
          >
            Documents Click Here
          </a>
        </Space>
      </Form.Item> */}
      <Form.Item label="Upload Copy of Notice & other supporting documents">
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
          {/* <a
            href="#"
            onClick={() => openFile("/documents/ITR_FILINING_DOCUMENT.pdf")}
          >
            Documents Click Here
          </a> */}
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

export default ItrNoticeForm;