import React from "react";
import "./TicketDetails.less";
import {
  Button,
  Form,
  Input,
  Select,
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
import { getKeyFromObject } from "../../../../../shared/utils";
import { ServiceType } from "../../../services/constant";
const { Title, Paragraph, Text, Link } = Typography;
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
      span: 14,
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

const TicketDetails = (props) => {
  const { id } = useParams();
  const ticketdetailsData = useSelector((state) => state.request.ticketDetails);
  console.log(id);

  React.useEffect(() => {
    (async () => {
      await getTicketDetails(id);
    })();
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
        <Descriptions.Item label="Section">
          {ticketdetailsData?.section}
        </Descriptions.Item>
        <Descriptions.Item label="Sub Section" span={2}>
          {ticketdetailsData?.subSection}
        </Descriptions.Item>
        <Descriptions.Item label="Attachment" span={3}>
          attachements list come here
        </Descriptions.Item>
      </Descriptions>
      <Title level={5}>Description</Title>
      <Typography>
        <Paragraph>
          <pre>{ticketdetailsData?.subSection}</pre>
        </Paragraph>
      </Typography>

      {/* <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "91",
          id: id,
        }}
        scrollToFirstError
      >
        <Form.Item
          label="Subject"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
      <Comment
        // avatar={
        //   <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        // }
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
