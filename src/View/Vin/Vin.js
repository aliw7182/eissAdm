import React, { Component } from 'react';
import {Table,Button,Divider,Popconfirm}  from 'antd';
import axios from 'axios';

const url="http://localhost:5000/";

export class Vin extends Component {
    state={
        test_list:[]
    }

    refresh=()=>{
        axios.get(url+"check_subaru").then(res=>{this.setState({test_list:res.data});});
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
                title:"VIN номер",
                dataIndex:"vin",
                key:"vin"
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm
                    title="Вы уверены что хотите удалить?"
                    onConfirm={()=>{axios.post(url+"check_subaru/delete",{id:record.id}).then(res=>{this.refresh()})}}
                    okText="Да"
                    cancelText="Нет"
                >
                    <a>Удалить</a>
                </Popconfirm>
                )
              }
        ]
        return (
            <div style={{maxWidth:"110%",width:"110%",marginLeft:"30px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>Заявки на проверку Subaru по VIN</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.test_list}/>
            </div>
        )
    }
}

export default Vin;
