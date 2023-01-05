import React from "react";
import "./GstNotice.css";

import { Button, Card, Col, Row } from "antd";
import { Divider, List, Typography } from "antd";
import { Collapse, Space } from "antd";
const { Panel } = Collapse;

const data = [
  "1. Anti profiteering - Non reduction of prices due to reduced GST rates.",
  "2. Liable but has failed to obtain GST registration.",
  "3. GST refund wrongly claimed with or without the intent to fraud.",
  "4. Unethical avail or utilization of Input Tax Credit.",
];

const GstNoticeService = () => (
  <>
    <div div className="gst-banner">
      <h3 className="gst-banner-title">GST Notice</h3>

      <p className="gst-banner-data">
        Notices under the Goods and Services Tax (GST) Act are a method used by
        tax authorities to communicate with taxpayers. GST notices are often
        sent as a warning voice for any automation marked by authorities
        especially in compliance with the GST, or to collect excess information
        from taxpayers. The GST authorities send out mainly notices where
        taxpayers are acting suspiciously and where there is a supply of goods
        or services that are not possible under the tax license. In ensuring the
        return of GST taxpayers, the authorities act in accordance with the
        advice collected by them, obtained from another government department,
        or a third party.
      </p>
    </div>

    <div className="gst-reason">
      <Divider orientation="center">
        <h3 >Common reasons of GST Notice</h3>
      </Divider>
      <List
        className="reason-list"
        size="large"
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      {/* <Divider orientation="left">Large Size</Divider>
    <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
   */}
    </div>
    <div className="gst-site-card-wrapper">
      <div className="section-header">
        <h1>Different Types of GST Notice</h1>
        <hr className="taxpert-line" />
        <h6>
          Notices under GST are issue to the taxpayers, depending upon the
          purpose or gravity of default or action require from these taxpayers.
        </h6>
      </div>
      
      <Row gutter={16}>
        <Col span={8}>
          <Card id="cards" className="gst-notice-card" title="GSTR-3A" bordered={false}>
            <p>GSTR-3A notification for non-GST Returns files. This is the most
            common notification of all notifications. Applies to GSTR-1,
            GSTR-3B, GSTR-4, GSTR-8 (only for eCommerce Operators) Prepare &
            EFile for GST refunds payable and late payments, interest on GST
            obligation, if there is. for each notice or within 15 days from the
            date of the notice. (Note that this can be up to 7 days and in some
            cases.)</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card id="cards" className="gst-notice-card" title="REG-03" bordered={false}>
            <p>REG-03 specification displayed to display or upload additional
            documents to complete new GST registrations, or amendments to GST
            registrations (key field updates, etc.) Provide clarification of the
            REG-04 notification by specifying or inserting additional
            details/documents requested 7 days of the notification date.</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card id="cards" className="gst-notice-card" title="CMP-05" bordered={false}>
            <p>It is an SCN which questions the taxpayer’s ability to be a
            composition dealer under the GST norms. Indicate the reason for the
            notice to question the taxpayer’s suitability as a designated
            seller. Verify and the reasons why the taxpayer is still eligible
            for the design structure in their field and the amount they hold on
            each notice or within 15 days</p>
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
                Yes, a Chartered Accountant or any other representative he or
                she can be recognise by the taxpayer for the purposes of reply
                to GST notices on his behalf.
              </p>
            </Panel>
          </Collapse>
          <Collapse expandIconPosition={"end"}>
            <Panel header="How can I reply to GST Notices?" key="1">
              <p>
                The reply to GST Notices can be done through submitting response
                online on GST Portal. In addition, while doing so, taxpayers may
                use their own respective digital signature certificate or
                e-signature that is respective recognise personnel.
              </p>
            </Panel>
          </Collapse>
          <Collapse expandIconPosition={"end"}>
            <Panel header="Do I need to upload any documents?" key="1">
              <p>
                The user will be intimate from the Taxpert expert to upload
                the documents in his documents once he place an order regarding
                GST notices. Furthermore, if the user wants to upload any
                document before discussing with the expert at Taxpert he
                still can do so uploading the documents in his designate
                account.
              </p>
            </Panel>
          </Collapse>
        </Space>
      </Card>
    </div>
  </>
);

export default GstNoticeService;
