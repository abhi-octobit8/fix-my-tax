import React from "react";
import "./TicketDetails.less";
import { Button, Form, Input, Select, Card, Comment, List } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router-dom";
import Tooltip from "antd/es/tooltip";

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
  console.log(id);
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
  // React.useEffect(() => {
  //   (async () => {
  //     await getAllEmployer();
  //   })();
  // }, []);

  const onFinish = async (values) => {
    console.log("registration values:", values);
  };

  return (
    <Card title="Ticket Details" bordered={false}>
      <Form
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
        <Form.Item label="Id" name="id">
          <Input disabled />
        </Form.Item>

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
      </Form>
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
