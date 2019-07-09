import React, { Component } from 'react'
import Axios from 'axios';
import {Popconfirm,Table,Button,Drawer,Col,Row,Form,Input,message} from 'antd';


const url="http://78.40.109.172:5000/";

export class SubaruXVfile extends Component {
    state={
        file_list:[],
        modal_show:false,
        file:"",
        title_of_file:"",
        car_model:"subaruxv"
    }
    refresh=()=>{
        Axios.get(url+'files/'+this.state.car_model).then(res=>{this.setState({file_list:res.data});});
    }
    componentWillMount(){
        this.refresh();
    }
    onClose=()=>{
        this.setState({modal_show:false});
    }
    showDrawer=()=>{
        this.setState({modal_show:true})
    }
    handleSubmit=()=>{
        var {title_of_file,file,car_model}=this.state;
        console.log(file[0]);
        var data=new FormData();
        data.append('file',file[0]);
        data.append('title_of_file',title_of_file);
        data.append('car_model',car_model);
        Axios.post(url+"files",data).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно добавлено');
            this.setState({modal_show:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    }
    render() {
        const columns=[
            {
                title:"Id",
                dataIndex:"file_id",
                key:"file_id"
            },
            {
                title:"Название",
                dataIndex:"filename",
                key:"filename",
                render: (text, record) => (
                    <span>
                        <a onClick={()=>{window.open('http://78.40.109.172:5000/'+record.filename)}}>{text}</a> 
                    </span>
                  ),
            },{
                title:"Надпись на кнопке загрузки",
                dataIndex:"title_of_file",
                key:"title_of_file"
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <Popconfirm
                            title="Вы уверены что хотите удалить?"
                            onConfirm={()=>{Axios.post(url+"files/delete"+record.file_id,{info:record}).then(res=>{this.refresh()})}}
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
                <h1 style={{textAlign:'center'}}>Файлы Subaru XV</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Добавить</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.file_list}/>
                <Drawer
                    title="Добавить новый файл"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.modal_show}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Надпись на кнопке загрузить">
                                <Input placeholder="Введите текст" onChange={(e)=>{this.setState({title_of_file:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Файл">
                                <input type="file" onChange={(e)=>{this.setState({file:e.target.files})}}/>
                            </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleSubmit} type="primary">
                        Добавить
                        </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default SubaruXVfile;
