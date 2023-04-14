/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  InputNumber,
  Checkbox,
  Space,
  Tooltip,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { fixMytaxServicesInfo } from "../../components/pages/services/constant";
import { phoneNumberValidator } from "../../shared/validator";
import { FIELD_NAME } from "./constant";
import useUserRole from "../../components/hooks/useUserRole";

import "./FilingTdsForm.css";
import { getObjectFromList, openFile } from "../../shared/utils";
import { fixMytaxServiceInfoData } from "../../shared/constant/ServiceInfoData";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
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
      span: 14,
      offset: 10,
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
const FilingTdsForm = (props) => {
  const { onFinish } = props;
  const { tds_filing } = fixMytaxServiceInfoData;
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
      sectionList: tds_filing,
    }));
  }, []);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      await onFinish(values);
      form.resetFields();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSection = (value) => {
    console.log(value);
    if (value) {
      const priceValue = getObjectFromList(tds_filing, value).fee;
      form.setFieldValue(FIELD_NAME.PRICE, priceValue);
    } else {
      setOptionData((prevState) => ({
        sectionList: [],
      }));
      form.setFieldValue(FIELD_NAME.PRICE, "");
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSubmit}
      initialValues={{
        prefix: "91",
      }}
      scrollToFirstError
    >
      <Form.Item
        name={FIELD_NAME.SECTION}
        label="Type of TDS/TCS Statement"
        rules={[
          {
            required: true,
            message: "Select your TDS/TCS Statement",
          },
        ]}
      >
        <Select
          placeholder="Select your TDS/TCS Statement"
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
        name={FIELD_NAME.PRICE}
        label="Fee"
        extra="FEE INCLUDING GST @ 18%"
      >
        <Input disabled={true} addonAfter="INR"></Input>
      </Form.Item>
      <Form.Item label="Upload Documents">
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
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FilingTdsForm;
