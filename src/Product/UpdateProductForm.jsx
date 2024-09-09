import React, { useState, useEffect } from 'react';
import { PlusOutlined,EditOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  updateProduct,
  getTransactionCategoryListForPurchaseProduct,
  getProductById
} from './Action';

const UpdateProductForm = ({ id }) => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [salesInfoEnabled, setSalesInfoEnabled] = useState(false);
  const [purchaseInfoEnabled, setPurchaseInfoEnabled] = useState(false);
  const [exciseEnabled, setExciseEnabled] = useState(false);
  const [InventoryEnabled, setInventoryEnabled] = useState(false);

  const [vatcategorydata, setVatCategoryoptions] = useState([]);
  const [unittypedata, setunittypeptions] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [exciseTaxData, setExciseTaxData] = useState([]);
  const [salesAccountsData, setSalesAccountsData] = useState([]);
  const [PurchaseAccountsData, setPurchaseAccountsData] = useState([]);
  const [productData, setProductData] = useState(null);
  

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
    console.log(id);
      fetchProductData(id);
    
  };

  const fetchProductData = async (id) => {
    try {
      const res = await getProductById(id);
      const product = res.data;
      console.log('Product data:', res.data); 
      form.setFieldsValue({
        ...product,
        vatCategoryId: product.vatCategoryId || undefined,
        unitTypeId: product.unitTypeId || undefined,
        productCategoryId: product.productCategoryId || undefined,
        exciseTaxType: product.exciseTaxId || undefined,
        salesUnitPrice: product.salesUnitPrice || undefined,
        salesTransactionCategoryId: product.salesTransactionCategoryId || undefined,
        purchaseUnitPrice: product.purchaseUnitPrice || undefined,
        purchaseTransactionCategoryId: product.purchaseTransactionCategoryId || undefined,
        inventoryAccountId: product.transactionCategoryId || undefined,
        openingStock: product.openingStock || undefined,
        SupplierName: product.SupplierName || undefined,
        reorderLevel: product.reorderLevel || undefined,
      });
      setSalesInfoEnabled(!!product.salesUnitPrice);
      setPurchaseInfoEnabled(!!product.purchaseUnitPrice);
      setExciseEnabled(!!product.exciseTaxId);
      setInventoryEnabled(!!product.transactionCategoryId);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
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

  const fetchPurchaseAccounts = async () => {
    try {
      const res = await getTransactionCategoryListForPurchaseProduct();
      const PurchaseAccountsData = res.data.flatMap(category =>
        category.options.map(option => ({
          value: option.value,
          label: option.label,
        }))
      );
      setPurchaseAccountsData(PurchaseAccountsData);
    } catch (error) {
      console.error('Error fetching purchase accounts:', error);
    }
  };

  useEffect(() => {
    fetchvatCategories();
    fetchUnittypelist();
    fetchProductCategories();
    fetchExciseTax();
    fetchSalesAccounts();
    fetchPurchaseAccounts();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Construct payload
      const payload = {
        productID: id, // Assuming id is passed as a prop for updating an existing product
        productCode: values.productCode || "",
        productName: values.productName || "",
        productType: values.productType ? values.productType.toUpperCase() : "",
        productPriceType: values.salesUnitPrice && values.purchaseUnitPrice ? "BOTH" : values.salesUnitPrice ? "SALES" : "PURCHASE",
        exciseTaxId: exciseEnabled ? values.exciseTaxType : "",
        isActive: values.isActive,
        isInventoryEnabled: InventoryEnabled,
        transactionCategoryId: InventoryEnabled ? values.inventoryAccountId : "",
        salesTransactionCategoryId: salesInfoEnabled ? values.salesTransactionCategoryId : "",
        salesUnitPrice: salesInfoEnabled ? values.salesUnitPrice : "",
        purchaseTransactionCategoryId: purchaseInfoEnabled ? values.purchaseTransactionCategoryId : "",
        purchaseUnitPrice: purchaseInfoEnabled ? values.purchaseUnitPrice : "",
        vatCategoryId: values.vatCategoryId || "",
        vatIncluded: false,
        unitTypeId: values.unitTypeId || "",
        productCategoryId: values.productCategoryId || "",
      };
  
      // Send update request
      const response = await updateProduct(payload);
  
      // Handle response
      if (!response.isErrorMessage) {
        message.success(response.message || (id ? 'Product updated successfully!' : 'Product created successfully!'));
        setIsModalOpen(false);
        window.location.reload(); 
      } else {
        message.error(response.message || 'Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error while saving the product:', error);
      if (error?.status === 401) {
        message.error('Unauthorized: Please log in again.');
      } else {
        message.error('An error occurred while saving the product. Please try again.');
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
        // style={{ maxWidth: '150px', marginLeft: '80%', marginBottom: '1%' }}
      >
        <EditOutlined />
      </Button>
      <Modal
        title={id ? "Edit Product" : "Add Product"}
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
                <Form.Item label="Status" name="isActive"
                rules={[{ required: true, message: 'This field is required' }]}>
                  <Radio.Group>
                    <Radio value='true'>Active</Radio>
                    <Radio value="false">Inactive</Radio>
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
                  name="vatCategoryId"
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
                <Form.Item label="Unit Type" name="unitTypeId">
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
                <Form.Item label="Product Category" 
                name="productCategoryId">
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
                  name="salesUnitPrice"
                  rules={salesInfoEnabled ? [{ required: true, message: 'This field is required' }] : []}
                >
                  <Input disabled={!salesInfoEnabled} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  label="Accounts"
                  name="salesTransactionCategoryId"
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
                  name="purchaseUnitPrice"
                  rules={purchaseInfoEnabled ? [{ required: true, message: 'This field is required' }] : []}
                >
                  <Input disabled={!purchaseInfoEnabled} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  label="Accounts"
                  name="purchaseTransactionCategoryId" 
                  rules={purchaseInfoEnabled ? [{ required: true, message: 'This field is required' }] : []}
                >
                  <Select disabled={!purchaseInfoEnabled}>
                    {PurchaseAccountsData.map((option) => (
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

            {purchaseInfoEnabled && (
              <Checkbox
                checked={InventoryEnabled}
                onChange={(e) => setInventoryEnabled(e.target.checked)}
              >
                Inventory?
              </Checkbox>
            )}

            {InventoryEnabled && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item
                      label="Inventory Account"
                      name="inventoryAccountId"
                      rules={[{ required: true, message: 'This field is required' }]}
                    >
                      <Select placeholder="Select Inventory Account">
                        {/* Populate inventory accounts here if needed */}
                        <Select.Option value="">Select Inventory Account</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="Opening Balance Quantity"
                      name="openingStock"
                      rules={[{ required: true, message: 'This field is required' }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="Purchase Price"
                      name="purchasePrice"
                      rules={[{ required: true, message: 'This field is required' }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="Supplier Name"
                      name="SupplierName"
                      rules={[{ required: true, message: 'This field is required' }]}
                    >
                      <Select placeholder="Select Supplier Name">
                        {/* Populate supplier names here if needed */}
                        <Select.Option value="">Select Supplier Name</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="Reorder Level"
                      name="reorderLevel"
                      rules={[{ required: true, message: 'This field is required' }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
              </>
            )}
          </Form>
        </>
      </Modal>
    </>
  );
};

export default UpdateProductForm;
