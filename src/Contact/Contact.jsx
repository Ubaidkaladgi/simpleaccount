import React, { useEffect, useState } from "react";
import { Table, Button , message, Popconfirm  } from "antd";
import { ContactsOutlined, EditOutlined,DeleteOutlined } from "@ant-design/icons";
import ContactModal from "./CreateContactModal";
import CreateContactModal from "./CreateContactModal";
import { getdeleteContact, getContactCouunt, getContactList, getContactTypes } from "./Action";
import UpdateContactModal from "./UpdateContactdetails";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const contact = () => {
  const [contactList, setContact] = useState([]);
  const [contactType, setcontactType] = useState([]);
  const [contactCount, setContactCount] = useState([]);
  const [deleteConatct,setDeleteContact] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';


  const fetchContact = async () => {
    try {
      const res = await getContactList();
      const contactList = res.data;
      setContact(contactList);
      console.log(contactList[0]);
    } catch (error) {
      console.error("Error fetching tax treatment data:", error);
    }
  };

  const fetchContactType = async () => {
    try {
      const res = await getContactTypes();
      const contactType = res.data;
      setcontactType(contactType);
    } catch (error) {
      console.error("Error fetching tax treatment data:", error);
    }
  };

  
  const deleteContact = async (contactId) => {
    try {
      const res = await getdeleteContact(contactId).then(()=>{
        fetchContact();
      }).catch((err)=>{
        console.log("error");
      })
     message.success('Contact deleted successfully');
    } catch (error) {
      console.error("Error fetching tax treatment data:", error);
      message.error('Error deleting Contact');

    }
  };

  const fetchContactCount = async (contactId) => {
    try {
      const res = await getContactCouunt(contactId);
      const ContactCount = res.data;
      setContactCount(ContactCount);
    } catch (error) {
      console.error("Error fetching tax treatment data:", error);
    }
  };

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
    }, 1000);
  };

  useEffect(() => {
    fetchContact();
    fetchContactType();
  }, []);

  
  const confirm = (contactId) => {
    deleteContact(contactId);
  };
  const cancel = (e) => {
    console.log(e);
  };

  const columns = [
    {
      title: "Contact Name",
      dataIndex: "firstName",
      sorter: true,
      // render: (contactList) => `${contactList.firstName} ${contactList.lastName}`,
      width: "20%",
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
          <Table columns={columns} dataSource={contactList} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
export default contact;
