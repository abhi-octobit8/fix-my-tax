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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fixMytaxServicesInfo } from "../../components/pages/services/constant";
import { phoneNumberValidator } from "../../shared/validator";
import { FIELD_NAME } from "./constant";
import useUserRole from "../../components/hooks/useUserRole";

import "./ItrNoticeForm.css";

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
  const { onFinish } = props;
  const { notice } = fixMytaxServicesInfo;
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
      sectionList: Object.keys(notice),
    }));
  }, []);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      await onFinish(values);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSection = (value) => {
    if (value) {
      const item = Object.keys(notice[value].subSections);
      setOptionData((prevState) => ({
        ...prevState,
        subSectionsList: item,
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

  const onHandleSubSection = (value) => {
    console.log(value);
    if (value) {
      const sectionValue = form.getFieldValue(FIELD_NAME.SECTION);
      const priceValue = notice[sectionValue].subSections[value].price;

      form.setFieldValue(FIELD_NAME.PRICE, priceValue);
    } else {
      setOptionData((prevState) => ({
        sectionList: [],
        subSectionsList: [],
      }));
      form.setFieldValue(FIELD_NAME.PRICE, "");
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
      {!userRole && (
        <>
          <Form.Item
            label="Name"
            name={FIELD_NAME.NAME}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={FIELD_NAME.EMAIL}
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      )}
      {/* <Form.Item
              name={FIELD_NAME.SERVICE_TYPE}
              label="Service Type"
              rules={[
                {
                  required: true,
                  message: "Please select Service Type!",
                },
              ]}
            >
              <Select placeholder="Select your Service Type">
                <Option value="video">Video Consultation</Option>
                <Option value="2">Notice Reply</Option>
              </Select>
            </Form.Item> */}

      <Form.Item
        name={FIELD_NAME.SECTION}
        label="Section Type"
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
              <Option value={x} key={i}>
                {x}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={FIELD_NAME.SUBSECTION}
        label="SubSection Type"
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
              <Option value={x} key={i}>
                {x}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={FIELD_NAME.PRICE}
        label="Fee"
        extra="This Fee Included GST"
      >
        <Input disabled={true} addonAfter="INR"></Input>
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => {
          const value = getFieldValue("service");
          if (value === "video") {
            return (
              <Form.Item
                name={FIELD_NAME.SELECT_TIME}
                label="select Time"
                rules={[
                  {
                    required: true,
                    message: "Please select Date!",
                  },
                ]}
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            );
          }
          return null;
        }}
      </Form.Item>

      {/* <Form.Item
              name={FIELD_NAME.UPLOAD_NOTICE}
              label="Upload Notice"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                beforeUpload={(file) => {
                  // console.log(file);
                  return false;
                }}
                multiple={false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item> */}
      <Form.Item
        name={FIELD_NAME.UPLOAD_ITR}
        label="Upload Computation of Income & 26AS"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          beforeUpload={(file) => {
            return false;
          }}
          multiple={false}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      {!userRole && (
        <Form.Item
          name={FIELD_NAME.PHONE_NUMBER}
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            phoneNumberValidator,
          ]}
        >
          <InputNumber
            minLength={10}
            maxLength={10}
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
      )}

      <Form.Item
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
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="#">Terms & Condition.</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ItrNoticeForm;
