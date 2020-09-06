import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider, Tag } from 'antd';
import { Drawer, Form, Button, Col, Row, Input, Select,Upload, message, DatePicker, Icon,Popconfirm } from 'antd';
import { log } from 'util';
import Axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';


const { Option } = Select;



const url="http://194.4.58.191:5000/";


export class SpecialOffersMain extends Component {
    state = { 
        visible: false,
        offer_list:[],
        title:"",
        text:"",
        visibleUpdate:false,
        file:"",
        id:"",
        title_update:"",
        text_update:"",
        file_update:""
    };
    

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
        axios.get(url+'news').then(res=>{this.setState({offer_list:res.data})});
    }

    handleSubmit=()=>{
        var {title,text,file}=this.state;
        console.log(file[0]);
        var data=new FormData();
        data.append('file',file[0]);
        data.append('title',title);
        data.append('text',text);
        axios.post(url+"news",data).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно добавлено');
            this.setState({visible:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')})
    }

    componentWillMount(){
        this.refresh();
    }
    handleUpdate=()=>{
        var {title_update,text_update,file_update,id}=this.state;
        var data=new FormData();
        if (file_update[0]) {
            data.append('file',file_update[0]);
        }
        data.append('text',text_update);
        data.append('title',title_update);
        data.append('id',id)
        Axios.post(url+"news/update",data).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно сделано');
            this.setState({visible:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    };
    handleTextEditorChange (content) {
        this.setState({text:content})
      }
    handleTextUpdateEditorChange(content){
        this.setState({text_update:content})
      }
    
    render() {
          const columns=[
            {
                title:"Id",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"Заголовок",
                dataIndex:"title",
                key:"title",
                render: (text, record) => (
                    <span>
                        <a>{text}</a> 
                    </span>
                  ),
            },{
                title:"Дата",
                dataIndex:"date",
                key:"date"
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a onClick={()=>{this.setState({visibleUpdate:true,title_update:record.title,text_update:record.text,id:record.id})}}>Изменить</a>
                    <Divider type="vertical" />
                    <Popconfirm
                            title="Вы уверены что хотите удалить?"
                            onConfirm={()=>{axios.post(url+"news/delete",{info:record}).then(res=>{this.refresh()})}}
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
            <div style={{maxWidth:"110%",marginLeft:"30px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>новости</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Добавить</Button>
                </Button.Group>
                
               <Table bordered columns={columns} dataSource={this.state.offer_list}/>
               <Drawer
                    title="Добавить новость"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Заголовок">
                            <Input onChange={(e)=>{this.setState({title:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Текст">
                            <Editor apiKey="vjtur1dhrumsa5mzoj2rryjwnleo6blz3zpytfkatv4074de"
                                init={{
                                    height: 400,
                                    menubar: false,
                                plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                         ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                                }}
                            onEditorChange={this.handleTextEditorChange.bind(this)}
                            />
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Обложка">
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
                    title="Изменить новость"
                    width={720}
                    onClose={this.onCloseUpdate}
                    visible={this.state.visibleUpdate}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Изменить Заголовок">
                            <Input value={this.state.title_update} onChange={(e)=>{this.setState({title_update:e.target.value})}} type="text"/>

                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Изменить Текст">
                            <Editor apiKey="vjtur1dhrumsa5mzoj2rryjwnleo6blz3zpytfkatv4074de"
                                initialValue = {this.state.text_update}
                                init={{
                                    height: 400,
                                    menubar: false,
                                plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                         ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                                }}
                            onEditorChange={this.handleTextUpdateEditorChange.bind(this)}
                            />                            
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Прикрепить Новую Обложку">
                                <input type="file" onChange={(e)=>{this.setState({file_update:e.target.files})}}/>
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
                        <Button onClick={this.onCloseUpdate} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleUpdate} type="primary">
                        Изменить
                        </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default SpecialOffersMain;
