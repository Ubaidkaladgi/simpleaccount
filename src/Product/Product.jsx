import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Tag } from 'antd';
import { ProductOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Import EditOutlined
import CreateProduct from './CreateProduct';
import { getProductList, getdeleteProduct } from './Action';
import UpdateProductForm from './UpdateProductForm';
// import {UpdateProduct} from './UpdateProduct'

const Product = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductList();
        const productData = response.data.data;
        if (Array.isArray(productData)) {
          setData(productData.map(item => ({ ...item, key: item.id })));
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      message.error("Invalid Product ID");
      return;
    }

    try {
      await getdeleteProduct(id);
      // Re-fetch the product list after deletion
      const response = await getProductList();
      setData(response.data.data.map(item => ({ ...item, key: item.id })));
      message.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting Product:", error);
      message.error("Error deleting Product");
    }
  };

  const confirm = (id) => {
    handleDelete(id);
  };

  const cancel = (e) => {
    console.log(e);
  };

  const handleEdit = (id) => {
    
    console.log("Edit Product ID:", id);
  };

  const columns = [
    {
      title: 'Product Code',
      dataIndex: 'productCode',
      sorter: true,
      width: '10%',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '15%',
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      sorter: (a, b) => a.productType.localeCompare(b.productType),
      width: '10%',
    },
    {
      title: 'Inventory',
      dataIndex: 'isInventoryEnabled',
      sorter: (a, b) => a.isInventoryEnabled - b.isInventoryEnabled,
      width: '10%',
      render: (isInventoryEnabled) => (
        <Tag color={isInventoryEnabled ? 'green' : 'red'}>
          {isInventoryEnabled ? 'True' : 'False'}
        </Tag>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      sorter: (a, b) => a.unitPrice - b.unitPrice,
      width: '10%',
      render: (unitPrice) => (
        <span>{`AED ${unitPrice.toFixed(2)}`}</span>
      ),
    },
    {
      title: 'VAT (%)',
      dataIndex: 'vatPercentage',
      // sorter: (a, b) => a.vatPercentage - b.vatPercentage,
      width: '10%',
    },
    {
      title: 'Excise Slab',
      dataIndex: 'exciseTax',
      // sorter: true,
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      // sorter: true,
      width: '10%',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          
          
            
            <UpdateProductForm id={record.id} />
         

          {/* Delete Button */}
          <Popconfirm
            title="Are you sure to delete this Product?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              htmlType="button"
              aria-label="Delete Product"
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div style={{ color: '#2064d8', marginRight: '85%', fontWeight: '500', fontSize: '135%', marginTop: '25px auto' }}>
        <ProductOutlined /> Product
      </div>
      <div>
        <hr />
        <CreateProduct />
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </div>
  );
};

export default Product;
