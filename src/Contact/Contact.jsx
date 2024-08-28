import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { ContactsOutlined, EditOutlined,DeleteOutlined } from "@ant-design/icons";
import ContactModal from "./CreateContactModal";
import CreateContactModal from "./CreateContactModal";
import { getContactList, getContactTypes } from "./Action";
import UpdateContactModal from "./UpdateContactdetails";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const Contact = () => {
  const [contact, setContact] = useState([]);
  const [contactType, setcontactType] = useState([]);

  const fetchContact = async () => {
    try {
      const res = await getContactList();
      const contact = res.data;
      setContact(contact);
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

  useEffect(() => {
    fetchContact();
    fetchContactType();
  }, []);

  const columns = [
    {
      title: "Contact Name",
      dataIndex: "firstName",
      sorter: true,
      // render: (contact) => `${contact.firstName} ${contact.lastName}`,
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
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (isActive) => <span>{isActive ? "Active" : "Inactive"}</span>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <div
          className="row "
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <UpdateContactModal/>
          {/* {/* <Button className="col-md-3" htmlType="submit">
          <EditOutlined />
          </Button> */}
            
          <Button className="col-md-3" htmlType="submit">
          <DeleteOutlined />
          </Button> 
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
        <ContactsOutlined /> Contact
      </div>
      <div>
        <hr></hr>
        <>
          <CreateContactModal />
        </>
        <div>
          <Table columns={columns} dataSource={contact} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
export default Contact;
