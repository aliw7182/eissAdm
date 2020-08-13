import React, { Component } from 'react';
import { Form, Icon, Input, Button,Typography } from 'antd';
import './Login.css';
import {Redirect} from 'react-router-dom';
import { log } from 'util';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const {Title}=Typography;

export class Login extends Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
      }
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
                if (values.username==="admin" && values.password==="Eiss2020!") { 
                    console.log(this.props);
                    document.location.reload();
                    localStorage.setItem("hello","expiliarmus");
                }
          }
        });
      };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div style={{marginLeft:"500px",marginTop:"100px"}}>
                <Title style={{maxWidth:'300px',margin:"0 auto",textAlign:"center",marginBottom:"30px"}}>Авторизация</Title>
            <Form style={{maxWidth:'300px',margin:"0 auto"}} className="login-form" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Пожалуйста введите ваш логин!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Логин"
                    />,
                )}
                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Пожалуйста введите ваш пароль!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Пароль"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
                </Form.Item>
            </Form>
          </div>
        );
    }
}
const LoginFinal = Form.create({ name: 'normal_login' })(Login);

export default LoginFinal;
