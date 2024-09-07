import React ,{useState, useEffect} from 'react';
import { Table, Tag} from 'antd';
import { getCOAlist } from './Action';
import {
    BookTwoTone
  } from "@ant-design/icons";
import CreateCoa from './CreateCoa';



const App = () => {

    const [coa, setcoa] = useState([]);
    const columns = [
        // {
        //   title: 'Category Id',
        //   dataIndex: 'transactionCategoryId',
        //   showSorterTooltip: {
        //     target: 'full-header',
        //   },
        // },
        {
          title: 'Category Name',
          dataIndex: 'transactionCategoryName',
          defaultSortOrder: 'descend',
          onFilter: (value, record) => record.transactionCategoryName.indexOf(value) === 0,
          sorter: (a, b) => a.transactionCategoryName.length - b.transactionCategoryName.length,
          sortDirections: ['descend'],  
        },
        {
          title: 'Description',
          dataIndex: 'transactionCategoryDescription',
        //   onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Account',
            dataIndex: 'editableFlag',
            sorter: {
              compare: (a, b) => a.editableFlag - b.editableFlag,
              multiple: 2,
            },
            render: (editableFlag) =>
                <Tag color={editableFlag ? 'green' : 'red'}>
                    {editableFlag ? 'Unlocked' : 'Locked'}
                  </Tag>
                  
          //   onFilter: (value, record) => record.address.indexOf(value) === 0,
          },
      ];
     
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
      
      const fetchCOAList = async () => {
        try {
          const res = await getCOAlist();
          const coa = res.data;
          setcoa(coa);
        } catch (error) {
          console.error("Error fetching coa List:", error);
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
          marginTop: "25px auto",
        }}
      >
        <BookTwoTone /> COA
      </div>
      <div>
        <hr></hr>
        <>
         <CreateCoa/>      
         </>
        <Table
            columns={columns}
            dataSource={coa}
            onChange={onChange}
            showSorterTooltip={{
            target: 'sorter-icon',
            }}
        />
        </div>
     </div>
)
}
export default App;