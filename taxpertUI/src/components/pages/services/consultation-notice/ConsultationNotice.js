import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Card,
  Upload,
  Collapse,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ConsultationNotice.css";
import { phoneNumberValidator } from "../../../../shared/validator";
import { FIELD_NAME } from "./constant";
import { fixMytaxServicesInfo, FixMyTaxServiceType } from "../constant";
import { useState } from "react";
import { registerNotice } from "../../../../services/register.service";
import { message } from "../../../../shared/utils";

const { Panel } = Collapse;
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
const ConsultationNotice = () => {
  const titleHeader = "Consultation";
  const { consultation } = fixMytaxServicesInfo;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const [optionData, setOptionData] = useState({
    sectionList: [],
    subSectionsList: [],
  });

  React.useEffect(() => {
    setOptionData((prevState) => ({
      ...prevState,
      sectionList: Object.keys(consultation),
    }));
  }, []);

  const onFinish = async (values) => {
    console.log("registration values:", values);
    setIsLoading(true);
    try {
      const registerFormData = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        ticketDetails: {
          fixMyTaxServiceType: FixMyTaxServiceType.Consultation,
          serviceType: 2, // notice reply always for time being
          section: values.section,
          subSection: "",
          subject: values.subject,
          question: values.question,
          description: values.description,
          // status: 0,
          price: values.price,
          // paymentStaus: 0,
          // transactionNumber: "678678",
        },
      };
      console.log(registerFormData);

      const res = await registerNotice(registerFormData, values.uploadDocument);

      if (res.ticketId) {
        message.success("Request Created successfully.");
      }
    } catch (e) {
      console.error("error in creation", e);
    } finally {
      setIsLoading(false);
    }
  };
  const onHandleSection = (value) => {
    console.log(value);
    if (value) {
      const priceValue = consultation[value].price;
      // setOptionData((prevState) => ({
      //   ...prevState,
      // }));
      form.setFieldValue(FIELD_NAME.PRICE, priceValue);
    } else {
      setOptionData((prevState) => ({
        sectionList: [],
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
    <React.Fragment>
      <section id="service-banner" className="service-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="service-banner-info">
              <div className="service-banner-title">Consultation</div>
              All matters related to direct/indirect tax filing, TDS/TCS filing
              and claim, enetrprise setup, consultancy on tax management for
              individuals and businesses.
              <br /> Other taxation related queries & doubts.
            </div>
          </div>
        </div>
      </section>
      <section className="section-consultation-card">
        <Card className="card-container" bordered={true}>
          <div className="Card-header-title">
            <h1>{titleHeader}</h1>
          </div>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "91",
            }}
            scrollToFirstError
          >
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

            <Form.Item name={FIELD_NAME.PRICE} label="Fee">
              <Input disabled={true} addonAfter="INR"></Input>
            </Form.Item>
            <React.Fragment>
              <Form.Item
                name={FIELD_NAME.UPLOAD_DOCUMENT}
                label="Upload Document"
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
              </Form.Item>
            </React.Fragment>

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
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "91",
            }}
            scrollToFirstError
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="emailAddress"
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
            <React.Fragment>
              <Form.Item
                name="uploadConsultationNotice"
                label="Upload Document"
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
              </Form.Item>
            </React.Fragment>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                phoneNumberValidator,
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form> */}
        </Card>
      </section>

      <section className="section-container">
        <div className="section-header">
          <h4>FAQ’s on Income Tax Notice</h4>
          <hr className="taxpert-line" />
        </div>
        <div>
          <Card>
            <Space direction="vertical" className="section-faq-items">
              <Collapse expandIconPosition={"end"} className="section-faq-item">
                <Panel header="What to do if I get a tax notice?" key="1">
                  <p>
                    If you get an income tax notice, you should understand why
                    the notice has been sent. Notices may be sent due to various
                    reasons. For example, Notices may be sent for the details
                    and papers required by the Income Tax Department. In such a
                    case, you need to provide the details as required. If there
                    is any error in the ITR, then notices may be sent to rectify
                    the error. In such a case, you should then rectify any error
                    in your return and respond to the notice with the time
                    specified by the income tax department to avoid possible
                    penalties.
                  </p>
                </Panel>
              </Collapse>
              <Collapse expandIconPosition={"end"}>
                <Panel
                  header="What happens if you dont respond to tax notice?"
                  key="1"
                >
                  <p>
                    If you dont respond to the income tax notice, there can be
                    different types of consequences depending upon the type of
                    Notice which you would have to face. Such consequences
                    include fines of up to INR 10,000 and also imprisonment for
                    up to a year.
                  </p>
                </Panel>
              </Collapse>
              <Collapse expandIconPosition={"end"}>
                <Panel
                  header="What happens if I dont respond to the notice within 30 days?"
                  key="1"
                >
                  <p>
                    In case you dont respond to notice within 30 days the income
                    tax department will make the adjustment if there is some
                    outstanding demand without giving any further opportunity to
                    respond.
                  </p>
                </Panel>
              </Collapse>
            </Space>
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ConsultationNotice;
