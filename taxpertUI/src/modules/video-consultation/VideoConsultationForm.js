/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Checkbox,
  Tooltip,
  Space,
  DatePicker,
  Spin,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { AVAILABLE_SLOT, FIELD_NAME } from "./constant";
import useUserRole from "../../components/hooks/useUserRole";

import { fixMytaxServiceInfoData } from "../../shared/constant/ServiceInfoData";
import { getObjectFromList, openFile, sleep } from "../../shared/utils";
import { USER_ROLE } from "../../components/application/application-menu/constant";
import RegisterButton from "../../common/register-button/RegisterButton";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { requiredValidator } from "../../shared/validator";
import { getLocalTime } from "../../shared/timeUtils";
import { GetVCAvailableSlots } from "../../services/ticket.service";

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

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const VideoConsultationForm = (props) => {
  const { onFinish, onProceed } = props;
  const [availableSlot, setAvailableSlot] = useState([]);
  const { video_consultation } = fixMytaxServiceInfoData;
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
      sectionList: video_consultation,
    }));
  }, []);

  const onSubmit = (values) => {
    try {
      debugger;
      const sectionObj = getObjectFromList(video_consultation, 1);

      const formData = {
        ...values,
        sectionObj,
        pricingKey: sectionObj.pricingKey,
      };
      onProceed(formData);
    } catch (e) {
      console.error(e);
    }
  };

  const onHandleDateSelectionAPI = async (value) => {
    debugger;
    try {
      setIsLoading(true);
      await sleep();
      const res = await GetVCAvailableSlots(value);
      if (res.items) {
        setAvailableSlot(res.items);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  // const onHandleSection = (value) => {
  //   console.log(value);
  //   if (value) {
  //     const priceValue = getObjectFromList(video_consultation, value).fee;
  //     form.setFieldValue(FIELD_NAME.PRICE, priceValue);
  //   } else {
  //     setOptionData((prevState) => ({
  //       sectionList: [],
  //     }));
  //     form.setFieldValue(FIELD_NAME.PRICE, "");
  //   }
  // };
  const onDateChange = (value) => {
    // console.log(moment(value).format("YYYY-MM-DD"));
    const date = moment(value).format("DD/MM/YYYY");
    onHandleDateSelectionAPI(date);
    // console.log(moment(value).startOf("day"));
  };

  const disabledDate = (current) => {
    return (
      moment(current).day() === 0 ||
      moment(current).day() === 6 ||
      current < moment().add(1) ||
      current > moment().day(15)
    );
  };

  return (
    <Form
      onFinish={onSubmit}
      {...formItemLayout}
      form={form}
      initialValues={{ price: 5100 }}
      name="register"
    >
      <Form.Item
        label="Topic"
        name="query"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <TextArea showCount maxLength={140} />
      </Form.Item>

      <Form.Item name={FIELD_NAME.PRICE} label="Fee">
        <Input disabled={true} addonAfter="INR"></Input>
      </Form.Item>
      <Form.Item
        name={FIELD_NAME.DATE}
        label="Select Date"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          onChange={onDateChange}
        />
      </Form.Item>

      {isLoading ? (
        <Form.Item label="Select Available Slot" name="slot1">
          <Spin spinning={isLoading}>
            <Select placeholder="Select Available Slot" allowClear>
              {availableSlot.map((x, i) => {
                return (
                  <Option value={x.id} key={i}>
                    {x.slotName}
                  </Option>
                );
              })}
            </Select>
          </Spin>
        </Form.Item>
      ) : (
        <Form.Item
          label="Select Available Slot"
          name="slotId"
          rules={[requiredValidator]}
        >
          <Select placeholder="Select Available Slot" allowClear>
            {availableSlot.map((x, i) => {
              return (
                <Option value={x.id} key={i}>
                  {x.slotName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      )}

      <Form.Item
        label=" "
        colon={false}
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
      >
        <Checkbox>
          I have read and I agree to the{" "}
          <a
            href="#"
            onClick={() => openFile("/documents/TERMS_CONDITIONS_FMT.pdf")}
          >
            Terms & Condition.
          </a>
        </Checkbox>
      </Form.Item>

      {/* <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button> */}
      <Form.Item label=" " colon={false}>
        {userRole === USER_ROLE.CUSTOMER ? (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ) : (
          <RegisterButton />
        )}
      </Form.Item>
    </Form>
  );
};

export default VideoConsultationForm;
