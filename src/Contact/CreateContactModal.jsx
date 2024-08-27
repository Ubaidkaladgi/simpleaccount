import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Modal,
  Row,
  Col,
} from "antd";
import {
  getActiveCurrencyConversion,
  getContactTypes,
  getcountry,
  getState,
  getTaxTreatment,
  save,
} from "./Action";

const CreateContactModal = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [form] = Form.useForm();
  const [taxTreatmentOptions, setTaxTreatmentOptions] = useState([]);
  const [country, setcountry] = useState([]);
  const [statelist, setstatelist] = useState([]);
  const [currency, setcurrency] = useState([]);
  const [contactType, setcontactType] = useState([]);


  const onFinish = async (obj) => {
    const {
      firstname,
      middlename,
      lastname,
      contacttype,
      organizationname,
      email,
      currency,
      telephone,
      mobilenumber,
      companywebsite,
      taxtreatment,
      taxtreatmentnumber,
      billingaddress,
      billingcountry,
      billingstate,
      billingemail,
      billingcity,
      billingpoboxnumber,
      billingtelephone,
      billingfax,
      shippingaddress,
      shippingcountry,
      shippingstate,
      shippingcity,
      shippingpoboxnumber,
      shippingtelephone,
      shippingfax,
    } = obj;

    try {
      await save(obj);
      message.success("Log in successfully");
    } catch (err) {
      message.error(err?.obj ? "Log in failed." : "Something went wrong");
    }
  };
  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const fetchTaxTreatment = async () => {
    try {
      const res = await getTaxTreatment();
      const taxtreatmentdata = res.data;
      setTaxTreatmentOptions(taxtreatmentdata);
    } catch (error) {
      console.error("Error fetching tax treatment data:", error);
    }
  };

  const fetchCountry = async () => {
    try {
      const res = await getcountry();
      const country = res.data;
      setcountry(country);
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

  const fetchStatelist = async (countryCode) => {
    try {
      const res = await getState(countryCode);
      const statelist = res.data;
      setstatelist(statelist);
    } catch (error) {
      console.error("Error fetching tax treatment data:", error);
    }
  };

  const fetchCurrency = async () => {
    try {
      const res = await getActiveCurrencyConversion();
      const currency = res.data;
      setcurrency(currency);
    } catch (error) {
      console.error("Error fetching tax treatment data:", error);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchCurrency();
    fetchContactType();
    fetchTaxTreatment();
  }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={showLoading}
        style={{
          maxWidth: "150px",
          marginLeft: "80%",
          marginBottom: "1%",
        }}
      >
        Open Modal
      </Button>
      <Modal
        title={<p>Loading Modal</p>}
        // footer={<></>}
        loading={loading}
        width={1200}
        open={open}
        onCancel={() => setOpen(false)}
        bodyStyle={{ padding: "20px", maxHeight: "70vh", overflowY: "auto" }}
      >
        <>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Form disabled
          </Checkbox>
          <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="horizontal"
            disabled={componentDisabled}
            style={{ maxWidth: "100%" }}
            onFinish={onFinish}
          >
            <hr />
            <div className="row">
              <div className="col-md-3">
                <Form.Item label="Status">
                  <Radio.Group defaultValue="apple">
                    <Radio value="apple"> Active </Radio>
                    <Radio value="pear"> InActive </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Contact Name
            </h4>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  name="firstname"
                  label={
                    <span>
                      First Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter Firstname" },
                  ]}
                >
                  <Input placeholder="Enter First Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Middle Name" name="middlename">
                  <Input placeholder="Enter Middle Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="lastname"
                  label={
                    <span>
                      Last Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Please enter Lastname" }]}
                >
                  <Input placeholder="Enter Last Name" />
                </Form.Item>
              </div>
            </div>
            <hr />

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Contact Details
            </h4>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  name="contacttype"
                  label={
                    <span>
                      Contact Type <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Contact type required" }]}
                >
                  <Select placeholder="Select currency">
                    {contactType.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item name="organizationname" label="Organization Name">
                  <Input placeholder="Enter Organization Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="email"
                  label={
                    <span>
                      Email <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <Input placeholder="Enter Email" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="currency"
                  label={
                    <span>
                      Currency <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Please enter Email" }]}
                >
                  <Select placeholder="Select currency">
                    {currency.map((option) => (
                      <Select.Option key={option.currencyConversionId} value={option.currencyConversionId}>
                        {option.currencyName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Telephone" name="telephone">
                  <Input placeholder="Enter Telephone Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Mobile Number" name="mobilenumber">
                  <Input placeholder="Enter Mobile Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Company Website" name="companywebsite">
                  <Input placeholder="Enter Company Website" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="taxtreatment"
                  label={
                    <span>
                      Tax Treatment <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter Taxtreatment" },
                  ]}
                >
                  <Select placeholder="Select Tax Treatment">
                    {taxTreatmentOptions.map((option) => (
                      <Select.Option key={option.id} value={option.name}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="taxtreatmentnumber"
                  label={
                    <span>
                      Tax Treatment Number
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter Taxtreatment Number",
                    },
                  ]}
                >
                  <Input placeholder="Enter Tax Treatment Number" />
                </Form.Item>
              </div>
            </div>
            <hr />

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Billing Address details
            </h4>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  name="billingaddress"
                  label={
                    <span>
                      Billing Address <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: " Please Enter Billing Address",
                    },
                  ]}
                >
                  <Input placeholder="Enter Billing Address" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="billingcountry"
                  label={
                    <span>
                      Country <span style={{ color: "red" }}>*</span>
                    </span>
                  }                
                  rules={[{ required: true, message: "Please Enter Country" }]}
                >
                  <Select placeholder="Select Country" onChange={(value) => fetchStatelist(value)}>
                    {country.map((option) => (
                      <Select.Option key={option.countryCode} value={option.countryCode}>
                        {option.countryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="billingstate"
                  label={
                    <span>
                      Emirate <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Please Enter Emirate" }]}
                >
                 <Select placeholder="Select State">
                    {statelist.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Billing Email" name="billingemail">
                  <Input placeholder="Enter Billing Email" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="City" name="billingcity">
                  <Input placeholder="Enter City" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="billingpoboxnumber"
                  label={
                    <span>
                      PO Box Number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please Enter PO Box Number" },
                  ]}
                >
                  <Input placeholder="Enter PO Box Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Telephone" name="billingtelephone">
                  <Input placeholder="Enter Telephone Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Fax" name="billingfax">
                  <Input placeholder="Enter Fax Number" />
                </Form.Item>
              </div>
            </div>
            <hr />

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Shipping Address details
            </h4>
            <div className="col-md-4">
              <Checkbox
                style={{ paddingBottom: "5%" }}
                // checked={componentDisabled}
                onChange={(e) => setisAddressSame(e.target.checked)}
              >
                Same as Billing Address
              </Checkbox>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  name="shippingaddress"
                  label={
                    <span>
                      Shipping Address <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Shipping Address",
                    },
                  ]}
                >
                  <Input placeholder="Enter Shipping Address" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="shippingcountry"
                  label={
                    <span>
                      Country <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Please Enter Country" }]}
                >
                  <Select placeholder="Select Country" onChange={(value) => fetchStatelist(value)}>
                    {country.map((option) => (
                      <Select.Option key={option.countryCode} value={option.countryCode}>
                        {option.countryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="shippingstate"
                  label={
                    <span>
                      Emirate <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Please Enter Emirate" }]}
                >
                  <Select placeholder="Select State">
                    {statelist.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="City" name="shippingcity">
                  <Input placeholder="Enter City" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="shippingpoboxnumber"
                  label={
                    <span>
                      PO Box Number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please Enter PO Box Number" },
                  ]}
                >
                  <Input placeholder="Enter PO Box Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Telephone" name="shippingtelephone">
                  <Input placeholder="Enter Telephone Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Fax" name="shippingfax">
                  <Input placeholder="Enter Fax Number" />
                </Form.Item>
              </div>
              {/* <div
                  className="row "
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                    <Button className="col-md-2" type="primary">Create</Button>
                    <Button className="col-md-2" type="primary">Cancel</Button> 
                </div> */}
            </div>
            <hr />
          </Form>
        </>
      </Modal>
    </>
  );
};
export default CreateContactModal;
