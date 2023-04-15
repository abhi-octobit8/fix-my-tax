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
  Space,
  Tooltip,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FIELD_NAME } from "./constant";
import useUserRole from "../../components/hooks/useUserRole";
import { fixMytaxServiceInfoData } from "../../shared/constant/ServiceInfoData";
import { getObjectFromList, openFile } from "../../shared/utils";

import "./GstNoticeForm.css";

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
const GstNoticeForm = (props) => {
  const { onFinish, onProceed } = props;
  const { gst_notice } = fixMytaxServiceInfoData;
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
      sectionList: gst_notice,
    }));
  }, []);

  const onSubmit = (values) => {
    try {
      const sectionObj = getObjectFromList(gst_notice, values.section);

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
    console.log(value);
    if (value) {
      const priceValue = getObjectFromList(gst_notice, value).fee;
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
        label="NOTICE TYPE IN PRESCRIBED FORM"
        rules={[
          {
            required: true,
            message: "Select your Notice Type!",
          },
        ]}
      >
        <Select
          placeholder="Select your Notice Type"
          onChange={onHandleSection}
          showSearch
        >
          {optionData.sectionList.map((x, i) => {
            return (
              <Option value={x.key} key={i}>
                <Tooltip title={x.description}>
                  {x.name} ({x.description}
                </Tooltip>
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name={FIELD_NAME.PRICE}
        label="Fee"
        // extra="FEE INCLUDING GST @ 18%"
      >
        <Input disabled={true} addonAfter="INR"></Input>
      </Form.Item>
      <Form.Item label="UPLOAD COPY OF NOTICE & SUPPORTING DOCUMENTS">
        <Space>
          <Form.Item
            name={FIELD_NAME.UPLOAD_GST}
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
            onClick={() => openFile("/documents/NOTICES_UNDER_GST.pdf")}
          >
            Tutorial on GST
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

export default GstNoticeForm;
