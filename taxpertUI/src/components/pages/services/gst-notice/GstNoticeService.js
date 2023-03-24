import React from "react";
import "./GstNotice.css";

import { Button, Card, Col, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Collapse, Space } from "antd";
import { FIELD_NAME } from "./constant";
import { fixMytaxServicesInfo, FixMyTaxServiceType } from "../constant";
import { useState } from "react";
import { phoneNumberValidator } from "../../../../shared/validator";
import { message } from "../../../../shared/utils";
import { registerNotice } from "../../../../services/register.service";
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

const GstNoticeService = () => {
  const { gst } = fixMytaxServicesInfo;
  const [isLoading, setIsLoading] = useState(false);
  const titleHeader = "GST Notice";
  const [form] = Form.useForm();

  const [optionData, setOptionData] = useState({
    sectionList: [],
    subSectionsList: [],
  });

  React.useEffect(() => {
    setOptionData((prevState) => ({
      ...prevState,
      sectionList: Object.keys(gst),
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
          fixMyTaxServiceType: FixMyTaxServiceType.GST_Notice,
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

      const res = await registerNotice(
        registerFormData,
        values.uploadGSTNotice
      );

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
      const priceValue = gst[value].price;
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
    <>
      <div className="gst-banner">
        <h3 className="gst-banner-title">GST Notice</h3>

        <p className="gst-banner-data">
          Notices under the Goods and Services Tax (GST) Act are a method used
          by tax authorities to communicate with taxpayers. GST notices are
          often sent as a warning voice for any automation marked by authorities
          especially in compliance with the GST, or to collect excess
          information from taxpayers. The GST authorities send out mainly
          notices where taxpayers are acting suspiciously and where there is a
          supply of goods or services that are not possible under the tax
          license. In ensuring the return of GST taxpayers, the authorities act
          in accordance with the advice collected by them, obtained from another
          government department, or a third party.
        </p>
      </div>

      <section className="section-gst-card ">
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
                name={FIELD_NAME.UPLOAD_GST}
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
        </Card>
      </section>
      <div className="gst-site-card-wrapper">
        <div className="section-header">
          <h1>Different Types of GST Notice</h1>
          <hr className="taxpert-line" />
          <h6>
            Notices under GST are issue to the taxpayers, depending upon the
            purpose or gravity of default or action require from these
            taxpayers.
          </h6>
        </div>

        <Row gutter={16}>
          <Col span={8}>
            <Card
              id="cards"
              className="gst-notice-card"
              title="GSTR-3A"
              bordered={false}
            >
              <p>
                GSTR-3A notification for non-GST Returns files. This is the most
                common notification of all notifications. Applies to GSTR-1,
                GSTR-3B, GSTR-4, GSTR-8 (only for eCommerce Operators) Prepare &
                EFile for GST refunds payable and late payments, interest on GST
                obligation, if there is. for each notice or within 15 days from
                the date of the notice. (Note that this can be up to 7 days and
                in some cases.)
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              id="cards"
              className="gst-notice-card"
              title="REG-03"
              bordered={false}
            >
              <p>
                REG-03 specification displayed to display or upload additional
                documents to complete new GST registrations, or amendments to
                GST registrations (key field updates, etc.) Provide
                clarification of the REG-04 notification by specifying or
                inserting additional details/documents requested 7 days of the
                notification date.
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              id="cards"
              className="gst-notice-card"
              title="CMP-05"
              bordered={false}
            >
              <p>
                It is an SCN which questions the taxpayer’s ability to be a
                composition dealer under the GST norms. Indicate the reason for
                the notice to question the taxpayer’s suitability as a
                designated seller. Verify and the reasons why the taxpayer is
                still eligible for the design structure in their field and the
                amount they hold on each notice or within 15 days
              </p>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="gst-section-header">
        <h4>FAQ’s on GST Notice</h4>
        <hr className="taxpert-line" />
      </div>
      <div>
        <Card>
          <Space direction="vertical" className="section-faq-items">
            <Collapse expandIconPosition={"end"} className="section-faq-item">
              <Panel
                header="Can I authorize my Chartered Accountant to reply to GST Notices on my behalf?"
                key="1"
              >
                <p>
                  Yes, a Chartered Accountant or any other representative can be
                  authorized by the taxpayer for compliance of n GST notices on
                  his/her behalf.
                </p>
              </Panel>
            </Collapse>
            <Collapse expandIconPosition={"end"}>
              <Panel header="How can I reply to GST Notices?" key="1">
                <p>
                  The reply to GST Notices can be made by submitting response
                  online on GST Portal. In addition, while doing so, taxpayers
                  may use their own respective digital signature to substantiate
                  their title/ownership.
                </p>
              </Panel>
            </Collapse>
            <Collapse expandIconPosition={"end"}>
              <Panel header="Do I need to upload any documents?" key="1">
                <p>
                  Yes; the assessee has to upload doucment and information as
                  desired by the GST authorities to prove his/her bonafide. you
                  can avail the services of our experts to fixmytax before
                  uploading any document to make his/her reply more precise and
                  intense.
                </p>
              </Panel>
            </Collapse>
          </Space>
        </Card>
      </div>
    </>
  );
};
export default GstNoticeService;
