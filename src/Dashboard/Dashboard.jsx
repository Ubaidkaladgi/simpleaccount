import React, { useState } from "react";
import {
  ContainerOutlined,
  BankOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Button,
  theme,
  Space,
  message,
  Dropdown,
  Card,
  Row,
  Col,
  ConfigProvider,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Table } from "antd";
import { getCurrency } from "./action";
import { useEffect } from "react";
import DemoLine from "../componants/Diagrams/DemoLine";
import DemoMemo from "../componants/Diagrams/DemoMemo";
import DemoDualAxes from "../componants/Diagrams/DemoDualAxes";
import Graph from "../componants/Diagrams/Graph";
import { getCompanyDetails } from "../login/Action";
import CountryDetails from "../countryDetails/countryDetails";
import Contact from "../Contact/Contact";
import Product from "../Product/Product";
import Chart_of_accounts from "../coa_category/Chart_of_accounts";
// import ProductCategory from "../Product_category/ProductCategory1";
// import ProductCategory1 from "../Product_category/ProductCategory1";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {Switch } from 'antd';


 
const { Header, Content, Sider, Footer } = Layout;
 
const items1 = ["1", "2", "3"].map((key) => ({
  key,
}));
 
const items2 = [
  { key: "sub1", icon: <DashboardOutlined />, label: "DashBoard",
    children: [
      { key: "7", label: " Dashboard" },
    ],
   },
 
  // {
  //   key: "sub2",
  //   icon: <ContainerOutlined />,
  //   label: "Income",
  //   children: [
  //     { key: "1", label: " Customer Invoice" },
  //     { key: "2", label: "Credit Note" },
  //   ],
  // },
 
  // {
  //   key: "sub3",
  //   icon: <ContainerOutlined />,
  //   label: "Expense",
  //   children: [
  //     { key: "3", label: "Supplier Invoice" },
  //     { key: "4", label: "Debit Note" },
  //   ],
  // },
 
  // {
  //   key: "sub4",
  //   icon: <BankOutlined />,
  //   label: "Banking",
  //   children: [{ key: "5", label: "Bank Account" }],
  // },
  // {
  //   key: "sub5",
  //   icon: <ContainerOutlined />,
  //   label: "Tables",
  //   children: [{ key: "6", label: " Currency" },
  //     { key: "8", label: "Country" },
      
  //   ],
  // },
  {
    key: "sub6",
    icon: <ContainerOutlined />,
    label: "Master",
    children: [{ key: "9", label: "Contact" },
      { key: "10", label: "Product" },
      { key: "11", label: "Chart of Accounts" },
    ],
  },
];
 
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
 
const items = [
  {
    label: "Profile",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "User",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Role",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "Logout",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];
 
const columns = [
  {
    title: "Currency Code",
    dataIndex: "currencyCode",
    width: "30%",
    sorter: (a, b) => a.currencyCode - b.currencyCode,
  },
  {
    title: "Currency Name",
    dataIndex: "currencyName",
    width: "40%",
    sorter: (a, b) => a.currencyName.localeCompare(b.currencyName),
  },
  {
    title: "Currency Symbol",
    dataIndex: "currencySymbol",
    width: "15%",
    sorter: (a, b) => a.currencySymbol.localeCompare(b.currencySymbol),
  },
  {
    title: "Currency Description",
    dataIndex: "currencyDescription",
    width: "15%",
    sorter: (a, b) =>
      a.currencyDescription.localeCompare(b.currencyDescription),
  },
];
 
const Dashboard = (mode) => {
  const navigate = useNavigate();
 
  useEffect(() => {
    getCurrency()
      .then((res) => {
        getCompanyDetails();
        return res;
      })
      .catch((err) => {
        navigate("/login");
        return err;
      });
  }, []);
 
  const [collapsed, setCollapsed] = useState(false);
 
  const [data, setData] = useState([]);
 
  const [activeMenuKey, setActiveMenuKey] = useState("");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrency();
        setData(response.data);
        console.log(mode,"darkMode");
      } catch (error) {
        console.error("Failed to fetch currency data:", error);
      }
    };
    fetchData();
  }, []);
 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
 
  const handleMenuClick = (e) => {
    setActiveMenuKey(e.key);
  
  };
  const handleUserClick = (e) => {
    message.info("Clicked on User item.");
    console.log("click", e);
  };
 
  const menuProps = {
    items,
    onClick: handleUserClick,
  };
 
  // Theme 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };




  return (
    
      <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <Layout>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // backgroundColor: "white",
          padding: "0 20px",
          backgroundColor: isDarkMode ? "black" : "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              fontSize: "18px",
              width: "50px",
              color: "black",
            }}
          />
          <img
            src="https://dev.app.simpleaccounts.io/static/media/logo.f22d56cb.png"
            className="logo"
            alt="logo"
            style={{ marginLeft: "16px" }}
          />
        </div>
        <Switch checkedChildren="🌞" unCheckedChildren="🌙" defaultChecked  style={{marginLeft:'60%'}} onClick={handleClick} >
          Change Theme to {isDarkMode ? 'Light' : 'Dark'}
          </Switch>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Dropdown menu={menuProps}>
            <Button className="button">
              <Space>
                Noumaan
                <UserOutlined />
              </Space>
            </Button>
          </Dropdown>
 
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
              marginLeft: "auto",
            }}
          />
        </div>
      </Header>
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsedWidth={0}
          width={300}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>
              <Link to="/home"> Home </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/login"> Login </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/login"> Login </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 800,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              backgroundColor: isDarkMode ? "black" : "white",
            }}
          >
             <div className="content"> {activeMenuKey === "7" ?
             <>
             <div><Row>
              <Col span={24}><Card><DemoLine /></Card></Col>
            </Row>
            </div>
            <div>
            <Row>
              <Col span={12}> <DemoMemo /></Col>
              <Col span={12}><Graph/></Col>
            </Row>
            <div><Row>
              <Col span={24}> <Card> <DemoDualAxes/></Card></Col>
            </Row>
            </div>
            </div>
             </>
             : ""}</div>
            <div className="content">
              {activeMenuKey === "6" ? (
                <Table columns={columns} dataSource={data} />
              ) : (
                ""
              )}
            </div>
            <div className="content">
              {activeMenuKey === "8" ? <><CountryDetails/></> : ""}
            </div>
            <div className="content">
              {activeMenuKey === "9" ? <><Contact/></> : ""}
            </div>
            <div className="content">
              {activeMenuKey === "10" ? <><Product/></> : ""}
            </div>
             <div className="content">
              {activeMenuKey === "11" ? <><Chart_of_accounts/></> : ""}
            </div>
            {/* <div className="content">
              {activeMenuKey === "11" ? <><ProductCategory1/></> : ""}
            </div> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          Simple Accounts ©{new Date().getFullYear()} By DataInnovations
        </Footer>
        </Layout>
      </Layout>
      </div>
      </Layout>
      </ConfigProvider>
  );
};
export default Dashboard;