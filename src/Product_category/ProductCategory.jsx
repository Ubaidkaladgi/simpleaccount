import React from 'react';
import { Table, Button, Modal } from 'antd';

const columns = [
  {
    title: 'Product Category Code',
    dataIndex: 'productCategoryCode',   
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.productCategoryCode - b.productCategoryCode,
  },
  {
    title: 'Product Category Name',
    dataIndex: 'productCategoryName',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];

const data = [
  {
    key: '1',
    productCategoryCode: 'P001',
    productCategoryName: 'Category A',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    productCategoryCode: 'P002',
    productCategoryName: 'Category B',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    productCategoryCode: 'P003',
    productCategoryName: 'Category C',
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    productCategoryCode: 'P004',
    productCategoryName: 'Category D',
    address: 'London No. 2 Lake Park',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const handleButtonClick = () => {
  console.log('Button clicked!');
};

const ProductCategory = () => (
  <div>
    <h1 style={{ marginRight:'900px',fontSize:'20px',color:'#1890ff'}}> Product Category </h1>
    <Button type="primary" onClick={handleButtonClick} style={{maxWidth:'210px',marginLeft:'80%'}}>
      Add New Product category
      
    </Button>
    <hr>
</hr>
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
    />
  </div>
);

export default ProductCategory;
