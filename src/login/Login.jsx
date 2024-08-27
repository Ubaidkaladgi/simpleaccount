import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {getUserDetails, loginIn} from './Action'
import{ getCompanyDetails } from './Action';
import './login.css';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

 
  const onFinish = async (obj) => {
    const { username, password } = obj;
 
    try {
      await loginIn(obj);
      message.success('Log in successfully');
      navigate("/home");
      getCompanyDetails();
      getUserDetails();
      // getCountryDetails();
    } catch (err) {
      message.error(
        err?.obj ? 'Log in failed.' : 'Something went wrong'
      );
    }
  };

  return (
    <div className="login-container">
      <Card>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="formStyle"
        > 
          <div className='heading'>Username</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size='small' prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <div className='heading'>Password</div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
           <Input.Password
           prefix={<LockOutlined />}
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
          </Form.Item>
          <Form.Item>
            <a href="#" className="forgotPasswordStyle">Forgot password?</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
        </Card>
      </div>
  
  );
};

export default Login;
