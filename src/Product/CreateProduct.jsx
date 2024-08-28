import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Cascader,
  Checkbox,
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
  message,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateProduct = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();  
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setIsModalOpen(false);
        console.log('Entered data:', values);
      })
      .catch((errorInfo) => {
        console.error('Validation Failed:', errorInfo);
        message.error('Please fill out the required fields.');
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ maxWidth: '150px', marginLeft: '80%', marginBottom: '1%' }}
      >
        Add Product
      </Button>
      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}
      >
        <>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Form disabled
          </Checkbox>
          <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="horizontal"
            disabled={componentDisabled}
            style={{ maxWidth: '100%' }}
          >
            <div className="row">
              <div className="col-md-3">
                <Form.Item label="Status" name="status">
                  <Radio.Group>
                    <Radio value="active">Active</Radio>
                    <Radio value="inactive">Inactive</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <Form.Item
                  label="Product Name"
                  name="productName"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="col-md-2">
                <Form.Item
                  label="VAT Type"
                  name="vatType"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Select>
                    <Select.Option value="EXEMPT">EXEMPT</Select.Option>
                    <Select.Option value="STANDARD_RATED_TAX">
                      STANDARD RATED TAX (15%)
                    </Select.Option>
                    <Select.Option value="ZERO_RATED_TAX">
                      ZERO RATED TAX (0%)
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-2">
                <Form.Item
                  label="Product Code"
                  name="productCode"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="col-md-2">
  <Form.Item
    label="Unit Type"
    name="unitType"
    rules={[{ required: true, message: 'This field is required' }]}
  >
    <Select>
      <Select.Option value="KG">KG</Select.Option>
      <Select.Option value="GRAMS">GRAMS</Select.Option>
      <Select.Option value="BOX">BOX</Select.Option>
      <Select.Option value="DOZEN">DOZEN</Select.Option>
      <Select.Option value="METER">METER</Select.Option>
      
    </Select>
  </Form.Item>
</div>

            </div>
            <hr />

            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  label="Contact Type"
                  name="contactType"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Select>
                    <Select.Option value="customer">Customer</Select.Option>
                    <Select.Option value="supplier">Supplier</Select.Option>
                    <Select.Option value="both">Both</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Cascader
                    options={[
                      {
                        value: 'UAE',
                        label: 'Country',
                        children: [
                          {
                            value: 'ABU DHABI',
                            label: 'State',
                          },
                        ],
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default CreateProduct;
