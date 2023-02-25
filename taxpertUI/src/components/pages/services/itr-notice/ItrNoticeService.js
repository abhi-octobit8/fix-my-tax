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
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ItrNotice.css";
import { registerNotice } from "../../../../services/register.service";
import { NOTICE_TYPE } from "../constant";
const { Option } = Select;
const { Panel } = Collapse;

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
const ItrNoticeService = (props) => {
  const titleHeader = "Notice";
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("registration values:", values);
    debugger;
    // const registerData = {
    //   values,
    //   isActive: true,
    //   roleNames: ["string"],
    // };
    const formData = {
      noticeType: NOTICE_TYPE.ITR_NOTICE,
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      noticeQuestion: values.service,
    };
    // "name": "string",
    // "email": "user@example.com",
    // "phoneNumber": "stringstri",
    // "noticeQuestion": "string",
    // "noticeType": 1
    const data = await registerNotice(values);
    console.log(data);
    debugger;
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
              <div className="service-banner-title">
                Income Tax Notices in India
              </div>
              An income tax notice is a written communication sent by the Income
              Tax Department to a taxpayer alerting an issue with his tax
              account. The notice can be sent for different reasons like filing/
              non-filing his/ her income tax return, for the purpose of making
              the assessment or to ask the certain details etc. When a notice is
              sent by the Income Tax Department, the taxpayer has to act on the
              notice and get the matter resolved with the tax authorities.
            </div>
          </div>
        </div>
      </section>
      <section className="section-itr-card">
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
              name="name"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
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
                name="service"
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
                  <Option value="reply">Notice Reply</Option>
                </Select>
              </Form.Item>

              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  const value = getFieldValue("service");
                  if (value == "video") {
                    return (
                      <Form.Item
                        name="date-time-picker"
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

              <Form.Item
                name="uploadNotice"
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
              </Form.Item>
              <Form.Item
                name="uploadITR"
                label="Upload Computation of Income & 26AS"
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
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
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
          </Form>
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
                    Notices may be served enquiring any missing informaiton or
                    supporting document required to substantiate your return or
                    for any other reason realting to income
                    escaping/non-disclosure of income. As suc you are required
                    to furnish necessary details and documents ot substantiate
                    your return or justify your income; so that you may avoid
                    peral and prosecution proceedings.
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
                    different types of consequential proceeding depending upon
                    the type of Notice which has been served.Such consequences
                    include fines of up to INR 10,000 and also imprisonment.
                  </p>
                </Panel>
              </Collapse>
              <Collapse expandIconPosition={"end"}>
                <Panel
                  header="What happens if I dont respond to the notice within the time prescribed?"
                  key="1"
                >
                  <p>
                    In case you dont respond to notice within the time
                    prescribed; the Income Tax Department will make the
                    adjustment of refund to some outstanding demand without
                    giving any further opportunity to respond or initiate/impose
                    penalty as per provisons of the Income Tax Act.
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

export default ItrNoticeService;
