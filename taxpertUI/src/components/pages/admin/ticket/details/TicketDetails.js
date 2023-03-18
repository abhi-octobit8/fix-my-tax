import React from "react";
import {
  Button,
  Form,
  Card,
  Comment,
  List,
  Descriptions,
  Tag,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router-dom";
import Tooltip from "antd/es/tooltip";
import { getTicketDetails } from "../../../../../services/ticket.service";
import { useSelector } from "react-redux";
import { downloaFile, getKeyFromObject } from "../../../../../shared/utils";
import { ServiceType } from "../../../services/constant";

import "./TicketDetails.less";

const { Title, Paragraph } = Typography;

const TicketDetails = (props) => {
  const { id } = useParams();
  const ticketdetailsData = useSelector((state) => state.request.ticketDetails);

  React.useEffect(() => {
    (async () => {
      await getTicketDetails(id);
    })();
  }, []);

  const onHandleDownloadFile = React.useCallback(async (item) => {
    await downloaFile({ id: item.id, name: item.filename });
  }, []);

  const [form] = Form.useForm();
  const testData = [
    {
      author: "Han Solo",
      content: (
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title="2016-11-22 11:22:33">
          <span>8 hours ago</span>
        </Tooltip>
      ),
    },
    {
      author: "Han Solo",
      content: (
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title="2016-11-22 10:22:33">
          <span>9 hours ago</span>
        </Tooltip>
      ),
    },
  ];

  const onFinish = async (values) => {
    console.log("registration values:", values);
  };

  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  return (
    <Card title="Ticket Details" bordered={false}>
      <Descriptions>
        <Descriptions.Item label="Id">
          {" "}
          {ticketdetailsData?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Service Type">
          {getKeyFromObject(ServiceType, ticketdetailsData?.serviceType)}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {" "}
          <Tag color="#2db7f5">{"new"}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Section" span={3}>
          {ticketdetailsData?.section}
        </Descriptions.Item>
        <Descriptions.Item label="Sub Section" span={3}>
          {ticketdetailsData?.subSection}
        </Descriptions.Item>
        <Descriptions.Item
          label="Attachment"
          className="description-item-label"
          span={3}
        >
          {ticketdetailsData?.attachments?.map((item) => {
            return (
              <>
                <Button onClick={() => onHandleDownloadFile(item)} type="link">
                  {item.filename}
                </Button>
              </>
            );
          })}
        </Descriptions.Item>
      </Descriptions>
      <Title level={5}>Description</Title>
      <Typography>
        <Paragraph>
          <pre>{ticketdetailsData?.subSection}</pre>
        </Paragraph>
      </Typography>

      <Comment
        content={
          <Editor
          // onChange={handleChange}
          // onSubmit={handleSubmit}
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
      />
    </Card>
  );
};

export default TicketDetails;
