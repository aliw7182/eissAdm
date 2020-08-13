import React, { Component } from 'react';
import Axios from 'axios';
import { Drawer, Form, Button, Col, Row, Input,Popconfirm, Select,Upload, message, DatePicker, Icon ,Divider,Table} from 'antd';

const url="http://194.4.58.191:5000/";

export class Files extends Component {
    state={
        id:"",
        files_list:[],
        file:"",
        visible:false,
        visibleUpdate:false
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
    refresh=()=>{
        Axios.get(url+"files").then(res=>{this.setState({files_list:res.data})});
    };

    handleSubmit=()=>{
        var {file}=this.state;
        console.log(file[0]);
        var data=new FormData();
        data.append('file',file[0]);
        Axios.post(url+"files",data).then(res=>{
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
                dataIndex:"file_id",
                key:"file_id"
            },
            {
                title:"Название",
                dataIndex:"file_path",
                key:"file_path",
                render: (text, record) => (
                    <span>
                        <a onClick={()=>{window.open('http://localhost:5000/'+record.file_path)}}>{text}</a> 
                    </span>
                  ),
            },
        ]
        return (
            <div style={{maxWidth:"110%",width:"110%",marginLeft:"30px",marginTop:"40px"}}>
                 <h1 style={{textAlign:'center'}}>ДОКУМЕНТЫ</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Добавить</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.files_list}/>
                <Drawer
                    title="Добавить новый файл"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="файл">
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
                
            </div>
        )
    }
}

export default Files;
