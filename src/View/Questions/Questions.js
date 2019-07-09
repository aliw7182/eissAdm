import React, { Component } from 'react';
import {Table,Button,Divider,Popconfirm,Popover}  from 'antd';
import axios from 'axios';

const url="http://78.40.109.172:5000/";

export class Questions extends Component {
    state={
        test_list:[]
    }

    refresh=()=>{
        axios.get(url+"voprsy").then(res=>{this.setState({test_list:res.data});});
    }
    componentWillMount(){
        this.refresh();
    }
    render() {
        const columns=[
            {
                title:"Id",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"ФИО",
                dataIndex:"name",
                key:"name"
            }, {
                title:"E-mail",
                dataIndex:"email",
                key:"email"
            }
            , {
                title:"Номер Телефона",
                dataIndex:"phone_number",
                key:"phone_number"
            },
            {
                title:"Сообщения и Вопросы",
                dataIndex:"message",
                key:"message",
                render: (text, record) => (
                    <span>
                         <Popover
                            content={record.message}
                            title="Сообщение"
                            trigger="click"
                        >
                        <a>{record.message.substring(0,25)}...</a>
                        </Popover>
                    </span>
                  ),
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                     <Popconfirm
                    title="Вы уверены что хотите удалить?"
                    onConfirm={()=>{axios.post(url+"voprsy/delete",{id:record.id}).then(res=>{this.refresh()})}}
                    okText="Да"
                    cancelText="Нет"
                >
                    <a>Удалить</a>
                </Popconfirm>
                  </span>
                ),
              }
        ]
        return (
            <div style={{maxWidth:"110%",width:"110%",marginLeft:"30px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>Вопросы и Сообщения</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.test_list}/>
            </div>
        )
    }
}

export default Questions
