import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Modal,
  Row,
  Col,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CreateContactModal = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [isAddressSame, setisAddressSame] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ maxWidth: "150px", marginLeft: "80%", marginBottom: "1%" }}
      >
        Add Contact
      </Button>
      <Modal
        title="Add Contact"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        okText="Save Contact"
        cancelText="Close"
        bodyStyle={{ padding: "20px", maxHeight: "70vh", overflowY: "auto" }}
      >
        <>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Form disabled
          </Checkbox>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="horizontal"
            disabled={componentDisabled}
            style={{ maxWidth: "100%" }}
          >
            <hr />
            <div className="row">
              <div className="col-md-3">
                <Form.Item label="Status">
                  <Radio.Group>
                    <Radio value="apple"> Active </Radio>
                    <Radio value="pear"> InActive </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Contact Name
            </h4>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      First Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter First Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Middle Name">
                  <Input placeholder="Enter Middle Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Last Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Last Name" />
                </Form.Item>
              </div>
            </div>
            <hr />

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Contact Details
            </h4>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Contact Type <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Select placeholder="Select Contact Type">
                    <Select.Option value="customer">Customer</Select.Option>
                    <Select.Option value="supplier">Supplier</Select.Option>
                    <Select.Option value="both">Both</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Organization Name">
                  <Input placeholder="Enter Organization Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Email <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Email" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Currency <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Currency" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Telephone">
                  <Input placeholder="Enter Telephone Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Mobile Number">
                  <Input placeholder="Enter Mobile Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Company Website">
                  <Input placeholder="Enter Company Website" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Tax Treatment <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Tax Treatment" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Tax Treatment Number{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Tax Treatment Number" />
                </Form.Item>
              </div>
            </div>
            <hr />

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Billing Address details
            </h4>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Billing Address <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Billing Address" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Country <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Country" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Emirate <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Emirate" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Billing Email">
                  <Input placeholder="Enter Billing Email" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="City">
                  <Input placeholder="Enter City" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      PO Box Number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter PO Box Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Telephone">
                  <Input placeholder="Enter Telephone Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Fax">
                  <Input placeholder="Enter Fax Number" />
                </Form.Item>
              </div>
            </div>
            <hr />

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Shipping Address details
            </h4>
            <div className="col-md-4">
              <Checkbox
                style={{ paddingBottom: "5%" }}
                // checked={componentDisabled}
                onChange={(e) => setisAddressSame(e.target.checked)}
              >
                Same as Billing Address
              </Checkbox>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Shipping Address <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Shipping Address" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Country <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Country" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      Emirate <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Emirate" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="City">
                  <Input placeholder="Enter City" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label={
                    <span>
                      PO Box Number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter PO Box Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Telephone">
                  <Input placeholder="Enter Telephone Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Fax">
                  <Input placeholder="Enter Fax Number" />
                </Form.Item>
              </div>
            </div>
            <hr />
          </Form>
        </>
      </Modal>
    </>
  );
};
export default CreateContactModal;
