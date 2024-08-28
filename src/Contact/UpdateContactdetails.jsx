import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Checkbox, Form, Input, Radio, Select, Modal } from "antd";
import {
  getActiveCurrencyConversion,
  getContactTypes,
  getcountry,
  getState,
  getTaxTreatment,
  save,
} from "./Action";
import { EditOutlined } from "@ant-design/icons";

const UpdateContactModal = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [form] = Form.useForm();
  const [taxTreatmentOptions, setTaxTreatmentOptions] = useState([]);
  const [country, setcountry] = useState([]);
  const [statelist, setstatelist] = useState([]);
  const [currency, setcurrency] = useState([]);
  const [contactType, setcontactType] = useState([]);
  const [isAddressSame, setIsAddressSame] = useState(false);

  const preprocessFormValues = (values) => {
    const processValue = (value) => {
      if (value === null || value === undefined) {
        return '';
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Handle nested objects
        return Object.keys(value).reduce((acc, key) => {
          acc[key] = processValue(value[key]);
          return acc;
        }, {});
      } else {
        return value;
      }
    };
    
    return processValue(values);
  };

  const onFinish = async (values) => {
    // Process values to replace nulls with empty strings
    const processedValues = preprocessFormValues(values);

    console.log("Processed Form values:", processedValues); // Debugging line

    try {
      // Simulate a save function
      await save(processedValues);
      message.success("Save successful");
    } catch (err) {
      message.error(err?.obj ? "Save failed." : "Something went wrong");
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
         className="col-md-2"
      >
       <EditOutlined />
      </Button>
      <Modal
        title={<p>Update Contact</p>}
        footer={<></>}
        loading={loading}
        width={1200}
        open={open}
        onCancel={() => setOpen(false)}
        bodyStyle={{ padding: "20px", maxHeight: "70vh", overflowY: "auto" }}
      >
        <>
          <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="horizontal"
            style={{ maxWidth: "100%" }}
            onFinish={onFinish}
            initialValues={{ isBillingAndShippingAddressSame: false }}
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
                  name="firstName"
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
                <Form.Item label="Middle Name" name="middleName">
                  <Input placeholder="Enter Middle Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="lastName"
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
                  name="contactType"
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
                <Form.Item name="organization" label="Organization Name">
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
                  name="currencyCode"
                  label={
                    <span>
                      Currency <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Please enter Email" }]}
                >
                  <Select placeholder="Select currency">
                    {currency.map((option) => (
                      <Select.Option
                        key={option.currencyCode}
                        value={option.currencyCode}
                      >
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
                <Form.Item label="Mobile Number" name="mobileNumber">
                  <Input placeholder="Enter Mobile Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Company Website" name="website">
                  <Input placeholder="Enter Company Website" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="taxTreatmentId"
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
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="vatRegistrationNumber"
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
                  name="addressLine1"
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
                  name="billingcountryId"
                  label={
                    <span>
                      Country <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Please Enter Country" }]}
                >
                  <Select
                    placeholder="Select Country"
                    onChange={(value) => fetchStatelist(value)}
                  >
                    {country.map((option) => (
                      <Select.Option
                        key={option.countryCode}
                        value={option.countryCode}
                      >
                        {option.countryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="billingStateProvince"
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
                <Form.Item label="Billing Email" name="billingEmail">
                  <Input placeholder="Enter Billing Email" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="City" name="city">
                  <Input placeholder="Enter City" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="billingPoBoxNumber"
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
                <Form.Item label="Telephone" name="billingTelephone">
                  <Input placeholder="Enter Telephone Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Fax" name="fax">
                  <Input placeholder="Enter Fax Number" />
                </Form.Item>
              </div>
            </div>
            <hr />

            <h4 style={{ marginBottom: "2rem", color: "#2064d8" }}>
              Shipping Address details
            </h4>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  name="isBillingAndShippingAddressSame"
                  valuePropName="checked"
                >
                  <Checkbox>Same as Billing Address</Checkbox>
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  name="addressLine2"
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
                  name="shippingCountryId"
                  label={
                    <span>
                      Country <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Please Enter Country" }]}
                >
                  <Select
                    placeholder="Select Country"
                    onChange={(value) => fetchStatelist(value)}
                  >
                    {country.map((option) => (
                      <Select.Option
                        key={option.countryCode}
                        value={option.countryCode}
                      >
                        {option.countryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="shippingStateId"
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
                <Form.Item label="City" name="shippingCity">
                  <Input placeholder="Enter City" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  name="shippingPoBoxNumber"
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
                <Form.Item label="Telephone" name="shippingTelephone">
                  <Input placeholder="Enter Telephone Number" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Fax" name="shippingFax">
                  <Input placeholder="Enter Fax Number" />
                </Form.Item>
              </div>
              <div
                className="row "
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Button className="col-md-2" type="primary" htmlType="submit" >
                  Create
                </Button>
                <Button className="col-md-2" type="primary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
            <hr />
          </Form>
        </>
      </Modal>
    </>
  );
};
export default UpdateContactModal;
