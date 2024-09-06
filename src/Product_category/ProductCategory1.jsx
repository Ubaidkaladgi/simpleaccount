


import React from 'react'

export const ProductCategory1=()=> {
    const [productCategoryList, setProductCategoryList] = useState([]);


    const columns = [
        {
          title: "Product Category Name",
          dataIndex: "firstName",
          // sorter: true,
          width: "20%",
          filters: Array.from(
            new Set(productCategoryList.map((productCategory) => productCategory.firstName))
          ).map((name) => ({ text: name, value: name })),
          onFilter: (value, record) => record.firstName.startsWith(value),
          filterSearch: true,
        },
        {
          title: "Contact Type",
          dataIndex: "contactType",
          sorter: {
            compare: (a, b) => a.contactType - b.contactType,
            multiple: 3,
          },
          render: (value) => {
            const type = contactType.find((type) => type.value === value);
            return type ? type.label : "Unknown";
          },
        },
        {
          title: "Email",
          dataIndex: "email",
          sorter: {
            compare: (a, b) => a.email.localeCompare(b.email),
            multiple: 2,
          },
        },
        {
          title: "Status",
          dataIndex: "isActive",
          sorter: {
            compare: (a, b) => a.isActive - b.isActive,
            multiple: 1,
          },
          render: (isActive) => <span>{isActive ? "Active" : "Inactive"}</span>,
        },
        {
          title: "Action",
          dataIndex: "",
          key: "x",
          render: (text, record) => (
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
               <UpdateContactModal contactId={record.contactId} />
               
              <Popconfirm
                title="Are you sure to delete this contact?"
                onConfirm={() => confirm(record.contactId)}
                onCancel={()=>{cancel
                  console.log(record)
                }}
                okText="Yes"
                cancelText="No"
                
              >
                <Button
                className="col-md-3"
                  htmlType="button"
                >
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </div>
          ),
        },
      ];


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
        <ContactsOutlined/> Contact
      </div>
      <div>
        <hr></hr>
        <>
          <CreateContactModal/>
        </>
        <div style={{marginRight: '1%'}}>
          <Table columns={columns} dataSource={productCategoryList} onChange={onChange} />
        </div>
      </div>
    </div>
  )
};
