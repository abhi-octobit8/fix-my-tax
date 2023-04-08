import { Avatar, Button, Comment, Form, Input, List } from "antd";
import moment from "moment";
import React, { useState } from "react";
import {
  createTicketComment,
  getAllTicketComments,
} from "../../../../../services/ticket.service";
import { DATE_FORMATS, getLocalTime } from "../../../../../shared/timeUtils";
import { getRandomString, parseNumber } from "../../../../../shared/utils";
const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${
      comments.length > 1 ? "Comments" : "Comments"
    }`}
    itemLayout="horizontal"
    renderItem={(item) => (
      <li>
        <Comment
          actions={item.actions}
          author={item.creatorUserName}
          avatar={item.avatar}
          content={item.text}
          datetime={getLocalTime(
            item.creationTime,
            DATE_FORMATS.LIST_DATE_TIME_FORMAT
          )}
        />
      </li>
    )}
  />
);
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
const CommentDetails = (props) => {
  const { ticketId } = props;
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [value, setValue] = useState("");

  React.useEffect(() => {
    (async () => {
      const commentListData = await getAllTicketComments(parseNumber(ticketId));
      setComments(commentListData);
    })();
  }, [updateData]);

  const handleSubmit = async () => {
    if (!value) return;
    try {
      setSubmitting(true);
      const formData = {
        text: value,
        requestTicketId: parseNumber(ticketId),
      };

      const res = await createTicketComment(formData);
      if (res.requestTicketId) {
        setValue("");
        setUpdateData(getRandomString());
      }
      //   setTimeout(() => {
      //     setSubmitting(false);
      //     setValue("");
      //     setComments([
      //       ...comments,
      //       {
      //         author: "Han Solo",

      //         content: <p>{value}</p>,
      //         datetime: moment("2016-11-22").fromNow(),
      //       },
      //     ]);
      //   }, 1000);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Comment
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
      {comments.length > 0 && <CommentList comments={comments} />}
    </>
  );
};
export default CommentDetails;
