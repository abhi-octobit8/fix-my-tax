import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Card,
  Comment,
  List,
  Descriptions,
  Tag,
  Typography,
  Tooltip,
  Upload,
  Row,
  Col,
} from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { getTicketDetails } from "../../../../../services/ticket.service";
import {
  downloaFile,
  getKeyFromObject,
  getRandomString,
  message,
} from "../../../../../shared/utils";
import { ServiceType } from "../../../services/constant";

import "./TicketDetails.less";
import TextArea from "antd/lib/input/TextArea";
import { uploadRequestFile } from "../../../../../services/register.service";
import { useState } from "react";
import CheckableTag from "antd/lib/tag/CheckableTag";
import SidePanel from "./side-panel/SidePanel";
import CommentDetails from "./CommentDetails";
import { DATE_FORMATS, getLocalTime } from "../../../../../shared/timeUtils";

const { Title, Paragraph } = Typography;

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const TicketDetails = (props) => {
  const { id } = useParams();
  const [isUplaoding, setIsUploading] = useState(false);
  const [updateData, setUpdateData] = useState();
  const ticketdetailsData = useSelector((state) => state.request.ticketDetails);

  React.useEffect(() => {
    (async () => {
      await getTicketDetails(id);
    })();
  }, [updateData]);

  const onHandleDownloadFile = React.useCallback(async (item) => {
    await downloaFile({
      id: item.id,
      name: item.filename,
      url: `services/app/FileService/DownloadFile?id=${item.id}`,
    });
  }, []);

  const [updloadForm] = Form.useForm();

  const onUploadSubmit = async (values) => {
    try {
      setIsUploading(true);
      const res = await uploadRequestFile(values.uploadDocument, id);
      if (res) {
        message.success(res);
        setUpdateData(getRandomString());
        updloadForm.resetFields();
        // navigate(PATH.TICKET_REQUEST_LIST);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  // const Editor = ({ onChange, onSubmit, submitting, value }) => (
  //   <>
  //     <Form.Item>
  //       <TextArea rows={4} onChange={onChange} value={value} />
  //     </Form.Item>
  //     <Form.Item>
  //       <Button
  //         htmlType="submit"
  //         // loading={isUplaoding}
  //         onClick={onSubmit}
  //         type="primary"
  //       >
  //         Add Comment
  //       </Button>
  //     </Form.Item>
  //   </>
  // );

  return (
    <Card
      title="Ticket Details (N.B. - Dear Assessee kindly check the comment box and respond promptly till resolution of your case.)"
      bordered={false}
    >
      <Row gutter={20}>
        <Col xs={24} xl={18}>
          <Descriptions>
            <Descriptions.Item label="Ticket #">
              {" "}
              {ticketdetailsData?.id}
            </Descriptions.Item>
            <Descriptions.Item label="Service Type" span={2}>
              {getKeyFromObject(ServiceType, ticketdetailsData?.serviceType)}
            </Descriptions.Item>

            <Descriptions.Item label="Section" span={3}>
              {ticketdetailsData?.section}
            </Descriptions.Item>
            {ticketdetailsData?.serviceType === 2 ? (
              <Descriptions.Item label="Sub Section" span={3}>
                {ticketdetailsData?.subSection}
              </Descriptions.Item>
            ) : null}
            {ticketdetailsData?.serviceType === 1 ? (
              <Descriptions.Item label="Video Conferencing Date" span={3}>
                {getLocalTime(
                  ticketdetailsData?.slot?.date,
                  DATE_FORMATS.DEFAULT_DATE_FORMAT2
                )}
              </Descriptions.Item>
            ) : null}
            {ticketdetailsData?.serviceType === 1 ? (
              <Descriptions.Item label="Video Conferencing Time" span={3}>
                {ticketdetailsData?.slot?.slotName}
              </Descriptions.Item>
            ) : null}
            <Descriptions.Item
              contentStyle={{
                display: "inline",
              }}
              label="Attachment"
              className="description-item-label"
              span={3}
            >
              {ticketdetailsData?.attachments?.map((item, index) => {
                return (
                  <span key={index}>
                    <Button
                      loading={isUplaoding}
                      onClick={() => onHandleDownloadFile(item)}
                      type="link"
                    >
                      {item.filename}
                    </Button>
                  </span>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} xl={6}>
          <SidePanel ticketdetailsData={ticketdetailsData} />
        </Col>
      </Row>

      <Title level={5}>Description</Title>
      <Typography>
        <Paragraph>
          <pre>
            {ticketdetailsData?.subSection
              ? ticketdetailsData?.subSection
              : ticketdetailsData?.description}
          </pre>
        </Paragraph>
      </Typography>

      <Form
        form={updloadForm}
        name="register"
        onFinish={onUploadSubmit}
        layout="inline"
        scrollToFirstError
      >
        <Form.Item
          name="uploadDocument"
          label="Upload File"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={(file) => {
              return false;
            }}
            multiple={false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Tooltip title="Start Upload">
            {/* <CheckCircleOutlined /> */}
            <Button
              size="small"
              icon={<CheckOutlined />}
              type="default"
              htmlType="submit"
            ></Button>
          </Tooltip>
        </Form.Item>
      </Form>
      <CommentDetails ticketId={id} />

      {/* <Comment
        content={
          <Editor
            // onChange={handleChange}
            onSubmit={onHandleCommentSubmit}
            // submitting={submitting}
            // value={value}
          />
        }
      />
      <List
        className="comment-list"
        header={`Comments`}
        itemLayout="horizontal"
        dataSource={testData}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      /> */}
    </Card>
  );
};

export default TicketDetails;
