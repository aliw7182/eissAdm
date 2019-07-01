import React, { Component } from 'react';
import Axios from 'axios';
import { Drawer, Form, Button, Col, Row, Input,Popconfirm, Select,Upload, message, DatePicker, Icon ,Divider,Table} from 'antd';

const url="http://localhost:5000/";

export class Slider extends Component {
    state={
        slider_list:[],
        link_path:[],
        file:"",
        visible:false,
        visibleUpdate:false,
        link_path_update:"",
        image_path_update:""
    }

    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };

    onClose = () => {
        this.setState({
        visible: false,
        });
    };

    onCloseUpdate = () => {
        this.setState({
        visibleUpdate: false,
        });
    };

    refresh=()=>{
        Axios.get(url+"slider").then(res=>{this.setState({slider_list:res.data})});
    };

    handleSubmit=()=>{
        var {link_path,file}=this.state;
        console.log(file[0]);
        var data=new FormData();
        data.append('file',file[0]);
        data.append('link_path',link_path);
        Axios.post(url+"slider",data).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно добавлено');
            this.setState({visible:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    };


    componentWillMount(){
        this.refresh();
    }
    
    render() {
        const columns=[
            {
                title:"Id",
                dataIndex:"slider_id",
                key:"slider_id"
            },
            {
                title:"Название",
                dataIndex:"image_path",
                key:"image_path",
                render: (text, record) => (
                    <span>
                        <a onClick={()=>{window.open('http://localhost:5000/'+record.image_path)}}>{text}</a> 
                    </span>
                  ),
            },{
                title:"Путь куда ведёт кнопка Узнать больше",
                dataIndex:"link_path",
                key:"link_path",
                render: (text, record) => (
                    <span>
                        <a onClick={()=>{window.open(record.link_path)}}>{text}</a> 
                    </span>
                  ),
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a onClick={()=>{this.setState({visibleUpdate:true,link_path_update:record.link_path,image_path_update:record.image_path})}}>Изменить</a>
                    <Divider type="vertical" />
                    <Popconfirm
                            title="Вы уверены что хотите удалить?"
                            onConfirm={()=>{Axios.post(url+"slider/delete",{info:record}).then(res=>{this.refresh()})}}
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
                 <h1 style={{textAlign:'center'}}>Слайдеры</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Добавить</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.slider_list}/>
                <Drawer
                    title="Добавить новый слайдер"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Путь куда ведёт кнопка <<Узнать Больше>>">
                                <Input placeholder="url(Просто скопируйте путь как http://example.com/main)" onChange={(e)=>{this.setState({link_path:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Фотография">
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
                        Создать
                        </Button>
                    </div>
                </Drawer>
                <Drawer
                    title="Изменить слайдер"
                    width={720}
                    onClose={this.onCloseUpdate}
                    visible={this.state.visibleUpdate}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Обновить путь куда ведёт кнопка <<Узнать Больше>>">
                                <Input value={this.state.link_path_update} placeholder="url(Просто скопируйте путь как http://example.com/main)" onChange={(e)=>{this.setState({link_path:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Название старой фотографии">
                                <span>{this.state.image_path_update}</span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Выбрать новую фотографию">
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
                         Изменить
                        </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Slider;
