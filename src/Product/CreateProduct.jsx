import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  Modal,
  message,
} from 'antd';
import {
  getexiseTax,
  getProductCategoryList,
  getUnitTypeList,
  getvatCategory,
  getTransactionCategoryListForSalesProduct,
  save // Updated import
} from './Action';

const CreateProductForm = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [salesInfoEnabled, setSalesInfoEnabled] = useState(false);
  const [purchaseInfoEnabled, setPurchaseInfoEnabled] = useState(false);
  const [exciseEnabled, setExciseEnabled] = useState(false);

  const [vatcategorydata, setVatCategoryoptions] = useState([]);
  const [unittypedata, setunittypeptions] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [exciseTaxData, setExciseTaxData] = useState([]);
  const [salesAccountsData, setSalesAccountsData] = useState([]);

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const fetchvatCategories = async () => {
    try {
      const res = await getvatCategory();
      const vatcategorydata = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setVatCategoryoptions(vatcategorydata);
    } catch (error) {
      console.error('Error fetching VAT categories:', error);
    }
  };

  const fetchUnittypelist = async () => {
    try {
      const res = await getUnitTypeList();
      const unittypedata = res.data.map((item) => ({
        value: item.unitTypeId,
        label: item.unitType,
      }));
      setunittypeptions(unittypedata);
    } catch (error) {
      console.error('Error fetching unit types:', error);
    }
  };

  const fetchProductCategories = async () => {
    try {
      const res = await getProductCategoryList();
      const productCategoryData = res.data.map((item) => ({
        value: item.categoryId,
        label: item.categoryName,
      }));
      setProductCategoryData(productCategoryData);
    } catch (error) {
      console.error('Error fetching product categories:', error);
    }
  };

  const fetchExciseTax = async () => {
    try {
      const res = await getexiseTax();
      const exciseTaxData = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setExciseTaxData(exciseTaxData);
    } catch (error) {
      console.error('Error fetching excise tax:', error);
    }
  };

  const fetchSalesAccounts = async () => {
    try {
      const res = await getTransactionCategoryListForSalesProduct();
      const salesAccountsData = res.data.flatMap(category =>
        category.options.map(option => ({
          value: option.value,
          label: option.label,
        }))
      );
      setSalesAccountsData(salesAccountsData);
    } catch (error) {
      console.error('Error fetching sales accounts:', error);
    }
  };

  useEffect(() => {
    fetchvatCategories();
    fetchUnittypelist();
    fetchProductCategories();
    fetchExciseTax();
    fetchSalesAccounts();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.productType) {
        values.productType = values.productType.toUpperCase();
      }

      const response = await save(values); // Use the save function here
      if (!response.isErrorMessage) {
        message.success(response.message || 'Product created successfully!');
        setIsModalOpen(false); // Close modal on success
      } else {
        message.error(response.message || 'Failed to create product. Please try again.');
      }
    } catch (error) {
      if (error?.status === 401) {
        message.error('Unauthorized: Please log in again.');
      } else {
        message.error('An error occurred while creating the product. Please try again.');
      }
    }
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
                <Form.Item
                  label="Product type"
                  name="productType"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Radio.Group>
                    <Radio value="goods">GOODS</Radio>
                    <Radio value="service">SERVICE</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Form.Item label="Status" name="status"
                rules={[{ required: true, message: 'This field is required' }]}>
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
                  <Input disabled={componentDisabled} />
                </Form.Item>
              </div>
              <div className="col-md-2">
                <Form.Item
                  label="VAT Type"
                  name="vatType"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Select placeholder="VAT category" disabled={componentDisabled}>
                    {vatcategorydata.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-2">
                <Form.Item
                  label="Product Code"
                  name="productCode"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Input disabled={componentDisabled} />
                </Form.Item>
              </div>
              <div className="col-md-2">
                <Form.Item label="Unit Type" name="unitType">
                  <Select placeholder="Unit type" disabled={componentDisabled}>
                    {unittypedata.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Item label="Product Category" name="productCategory">
                  <Select placeholder="Select product category" disabled={componentDisabled}>
                    {productCategoryData.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <Checkbox
              checked={exciseEnabled}
              onChange={(e) => setExciseEnabled(e.target.checked)}
            >
              Excise Product?
            </Checkbox>

            {exciseEnabled && (
              <div className="col-md-6">
                <Form.Item label="Excise Tax Type" name="exciseTaxType">
                  <Select placeholder="Select Excise Tax Slab">
                    {exciseTaxData.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            )}

            <hr />

            <Checkbox
              checked={salesInfoEnabled}
              onChange={(e) => setSalesInfoEnabled(e.target.checked)}
            >
              Sales Information
            </Checkbox>

            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  label="Selling price"
                  name="sellingPrice"
                  rules={salesInfoEnabled ? [{ required: true, message: 'This field is required' }] : []}
                >
                  <Input disabled={!salesInfoEnabled} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  label="Accounts"
                  name="salesAccounts"
                  rules={salesInfoEnabled ? [{ required: true, message: 'This field is required' }] : []}
                >
                  <Select disabled={!salesInfoEnabled}>
                    {salesAccountsData.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <Form.Item label="Description" name="salesDescription">
                  <Input disabled={!salesInfoEnabled} />
                </Form.Item>
              </div>
            </div>

            <hr />

            <Checkbox
              checked={purchaseInfoEnabled}
              onChange={(e) => setPurchaseInfoEnabled(e.target.checked)}
            >
              Purchase Information
            </Checkbox>

            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  label="Purchase price"
                  name="purchasePrice"
                  rules={purchaseInfoEnabled ? [{ required: true, message: 'This field is required' }] : []}
                >
                  <Input disabled={!purchaseInfoEnabled} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  label="Accounts"
                  name="purchaseAccounts"
                  rules={purchaseInfoEnabled ? [{ required: true, message: 'This field is required' }] : []}
                >
                  <Select disabled={!purchaseInfoEnabled}>
                    {salesAccountsData.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <Form.Item label="Description" name="purchaseDescription">
                  <Input disabled={!purchaseInfoEnabled} />
                </Form.Item>
              </div>
            </div>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default CreateProductForm;
