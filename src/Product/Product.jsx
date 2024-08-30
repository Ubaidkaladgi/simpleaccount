import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { ProductOutlined } from "@ant-design/icons";
import CreateProduct from './CreateProduct';
import { getProductList } from './Action';

const columns = [
  {
    title: 'Product Code',
    dataIndex: 'productCode', // Update based on API response
    sorter: true,
    width: '10%',
  },
  {
    title: 'Product Name',
    dataIndex: 'name', // Update based on API response
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 5,
    },
    width: '15%',
  },
  {
    title: 'Product Type',
    dataIndex: 'productType', // Update based on API response
    sorter: {
      compare: (a, b) => a.productType.localeCompare(b.productType),
      multiple: 4,
    },
    width: '10%',
  },
  {
    title: 'Inventory',
    dataIndex: 'inventory', // Update based on API response
    sorter: {
      compare: (a, b) => a.inventory - b.inventory,
      multiple: 3,
    },
    width: '10%',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice', // Update based on API response
    sorter: {
      compare: (a, b) => a.unitPrice - b.unitPrice,
      multiple: 2,
    },
    width: '10%',
  },
  {
    title: 'VAT (%)',
    dataIndex: 'vat', // Update based on API response
    sorter: {
      compare: (a, b) => a.vat - b.vat,
      multiple: 1,
    },
    width: '10%',
  },
  {
    title: 'Excise Slab',
    dataIndex: 'exciseSlab', // Update based on API response
    sorter: true,
    width: '15%',
  },
  {
    title: 'Status',
    dataIndex: 'status', // Update based on API response
    sorter: true,
    width: '10%',
  },
];

const Product = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductList();
        // Access the nested data field
        const productData = response.data.data;
        if (Array.isArray(productData)) {
          setData(productData);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchData();
  }, []);

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
