import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { getCOAlist } from './Action';
import { BookTwoTone } from "@ant-design/icons";
import CreateCoa from './CreateCoa';

const App = () => {
  const [coa, setCoa] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'transactionCategoryName',
      // defaultSortOrder: 'descend',
      // onFilter: (value, record) => record.transactionCategoryName.indexOf(value) === 0,
      sorter: (a, b) => a.transactionCategoryName.length - b.transactionCategoryName.length,
      // sortDirections: ['descend'],
    },
    {
      title: 'Description',
      dataIndex: 'transactionCategoryDescription',
    },
    {
      title: 'Account',
      dataIndex: 'editableFlag',
      sorter: {
        compare: (a, b) => a.editableFlag - b.editableFlag,
        multiple: 2,
      },
      // defaultSortOrder: 'descend',
      render: (editableFlag) => (
        <Tag color={editableFlag ? 'green' : 'red'}>
          {editableFlag ? 'Unlocked' : 'Locked'}
        </Tag>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const fetchCOAList = async () => {
    setLoading(true);
    try {
      const res = await getCOAlist();
      setCoa(res.data);
    } catch (error) {
      console.error("Error fetching COA List:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCOAList();
  }, []);

  return (
    <div>
      <div
        style={{
          color: "#2064d8",
          marginRight: "85%",
          fontWeight: "500",
          fontSize: "135%",
          marginTop: "25px",
          width:"500px"
        }}
      >
        <BookTwoTone /> Chart Of Accounts
      </div>
      <div>
        <hr />
        <CreateCoa />
        <Table
          columns={columns}
          dataSource={coa}
          onChange={onChange}
          loading={loading}
          showSorterTooltip={{ target: 'sorter-icon' }}
        />
      </div>
    </div>
  );
}

export default App;
