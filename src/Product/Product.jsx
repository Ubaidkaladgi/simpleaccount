import React from 'react';
import { Table, Button } from 'antd';
import {ProductOutlined } from  "@ant-design/icons";
// import ContactModal from './CreateContactModal';
// import CreateContactModal from './CreateContactModal';
import CreateProduct from './CreateProduct';
import { getProductList } from './Action';
const columns = [
  {
    title: 'Product Code',
    dataIndex: 'Product_Code',
    sorter: true,
    width: '10%',
  },
  {
    title: 'Product Name',
    dataIndex: 'Product_Name',
    sorter: {
      compare: (a, b) => a.Product_Name.localeCompare(b.Product_Name),
      multiple: 5,
    },
    width: '15%',
  },
  {
    title: 'Product Type',
    dataIndex: 'Product_Type',
    sorter: {
      compare: (a, b) => a.Product_Type.localeCompare(b.Product_Type),
      multiple: 4,
    },
    width: '10%',
  },
  {
    title: 'Inventory',
    dataIndex: 'Inventory',
    sorter: {
      compare: (a, b) => a.Inventory - b.Inventory,
      multiple: 3,
    },
    width: '10%',
  },
  {
    title: 'Unit Price',
    dataIndex: 'Unit_Price',
    sorter: {
      compare: (a, b) => a.Unit_Price - b.Unit_Price,
      multiple: 2,
    },
    width: '10%',
  },
  {
    title: 'VAT (%)',
    dataIndex: 'VAT',
    sorter: {
      compare: (a, b) => a.VAT - b.VAT,
      multiple: 1,
    },
    width: '10%',
  },
  {
    title: 'Excise Slab',
    dataIndex: 'Excise_Slab',
    sorter: true,  // Assuming you want sorting based on some predefined slab values
    width: '15%',
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    sorter: true,  // Assuming you want to sort based on status values
    width: '10%',
  },
];

const data = [
  {
    key: '1',
    Product_Code: 'P001',
    Product_Name: 'Laptop',
    Product_Type: 'Electronics',
    Inventory: 50,
    Unit_Price: 1200,
    VAT: 15,
    Excise_Slab: 'A',
    Status: 'Available',
  },
  {
    key: '2',
    Product_Code: 'P002',
    Product_Name: 'Smartphone',
    Product_Type: 'Electronics',
    Inventory: 150,
    Unit_Price: 800,
    VAT: 10,
    Excise_Slab: 'B',
    Status: 'Available',
  },
  {
    key: '3',
    Product_Code: 'P003',
    Product_Name: 'Tablet',
    Product_Type: 'Electronics',
    Inventory: 80,
    Unit_Price: 600,
    VAT: 12,
    Excise_Slab: 'B',
    Status: 'Out of Stock',
  },
  {
    key: '4',
    Product_Code: 'P004',
    Product_Name: 'Headphones',
    Product_Type: 'Accessories',
    Inventory: 120,
    Unit_Price: 150,
    VAT: 8,
    Excise_Slab: 'C',
    Status: 'Available',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


const Product = () => {
  getProductList();
  return (
    <div>
       <div  style={{color : '#2064d8' , marginRight: '85%', fontWeight : '500', fontSize: '135%', marginTop: '25px auto'}}><ProductOutlined /> Product</div>
       <div>
        <hr></hr>
        <>
        <CreateProduct/>
        </>
        <div>
        <Table columns={columns} dataSource={data} onChange={onChange} /> 
        </div>
       </div>
    </div>
  )
}


export default Product;
