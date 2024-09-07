import React, { useState } from "react";
import { Button, Modal, Input, TreeSelect, Form, Select } from "antd";
import { BookTwoTone } from "@ant-design/icons";

const CreateCoa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
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
        shape="round"
        onClick={() => {
          showModal();
          form.resetFields();
        }}
        style={{
          maxWidth: "150px",
          marginLeft: "80%",
          marginBottom: "1%",
        }}
      >
        Add Contact
      </Button>
      <Modal
        title={
          <>
            <p style={{ fontSize: "28px", color: "#2064d8" }}>
              {" "}
              <BookTwoTone /> Create COA
            </p>{" "}
            <hr></hr>
          </>
        }
        open={isModalOpen}
        footer={<></>}
        onCancel={handleCancel}
        width={1100}
      >
        <>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{span: 14, }}
            layout="horizontal"
            style={{maxWidth: "100%"}}
          >
            <Form.Item style={{ marginTop: "3%" }}
             label={
              <span>
               Chart Of Account <span style={{ color: "red" }}>*</span>
              </span>
            }
            rules={[{ required: true, message: "Please enter Chart Of Account" }]}>
              <Input />
            </Form.Item>
            <Form.Item
               label={
                <span>
                  Parent Chart Of Account <span style={{ color: "red" }}>*</span>
                </span>
              }
              rules={[{ required: true, message: "Please enter Parent Chart Of Account" }]}
              style={{ marginLeft: "4%" }}
            >
              <Select>
                <Select.Option value="demo"></Select.Option>
              </Select>
            </Form.Item>

            {/* <Form.Item label="Parent Chart Of Account">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item> */}
            <a style={{ marginLeft: "6%" }}>
              <b>Note</b>: A Chart Of Account cannot be edited if they are
              associated with a product, document or transaction.
            </a>
            <div
              className="row "
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginRight: "20%",
                marginTop: "5%",
              }}
            >
              <Button
                className="col-md-3"
                key="submit"
                type="primary"
                shape="round"
                onClick={() => {
                  form.submit();
                }}
              >
                Add COA
              </Button>
              <Button
                className="col-md-3"
                shape="round"
                key="cancel"
                onClick={() => {
                  form.resetFields();
                  handleCancel();
                }}
              >
                Cancel
              </Button>
              ,
            </div>
          </Form>
        </>
      </Modal>
    </>
  );
};
export default CreateCoa;
