import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider } from 'antd';
import { Drawer, Form, Button, Col, Row, Input, Select, message, Popconfirm } from 'antd';
import Axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';


const { Option } = Select;



const url="https://api.eiss.kz/";


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
        file_update:"",
        coverValue: "photo",
        video_link: ""
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
        var {title,text,file, video_link}=this.state;
        console.log(file[0]);
        let data=new FormData();
        let video = false;
        if (file[0]) {
            data.append('file',file[0]);
        }
        else {
            message.error('Прикрепите обложку!');
            return;
        }
        if (video_link) {
            data.append("video_link", video_link);
            video = true;
        }
        data.append('title',title);
        data.append('text',text);
        if (video) {
            axios.post(url+"newsvideo", data).then(res=>{
                console.log(res);
                this.refresh();
                message.success('Успешно добавлено');
            }).catch(err=>{console.log(err);message.error('Произошла ошибка!'); return;})
        }
        else {
            axios.post(url+"news",data).then(res=>{
                console.log(res);
                this.refresh();
                message.success('Успешно добавлено');
                
            }).catch(err=>{console.log(err);message.error('Произошла ошибка!'); return;})
        }
        this.setState({
            visible:false,
            title: "",
            text: "",
            file: "",
            video_link: ""
        });
    }

    componentWillMount(){
        this.refresh();
    }
    handleUpdate=()=>{
        var {title_update,text_update,file_update,id, video_link}=this.state;
        let data=new FormData();
        if (file_update[0]) {
            data.append('file',file_update[0]);
        }
        else {
            message.error('Прикрепите обложку!');
            return;
        }

        if (video_link) {
            data.append("video_link", video_link);
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
    };

    handleTextUpdateEditorChange(content){
        this.setState({text_update:content})
    };

    onCoverValueChange(event) {
        this.setState({
            coverValue: event.target.value,
        });
    }

    handlevideo_linkChange(event) {
        this.setState({
            video_link: event.target.value,
        })
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
                    <Form layout="vertical" hideRequiredMark className="drawer-wrapper">
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
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                Прикрепить картинку
                                <input type="file" onChange={(e)=>{this.setState({file:e.target.files})}}/>
                            </Col>
                            <Col span={12}>
                                Прикрепить видео (YouTube)
                                <Input type="url" placeholder="Ссылка на YouTube видео" onChange={this.handlevideo_linkChange.bind(this)}/>
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
                    <Form layout="vertical" hideRequiredMark className="drawer-wrapper">
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
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Row>
                                    <Col span={24}>
                                        Прикрепить Новую Обложку
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <input type="file" onChange={(e)=>{this.setState({file_update:e.target.files})}}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <Col span={24}>
                                            Прикрепить новое видео
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Input type="url" placeholder="Ссылка на YouTube видео" onChange={this.handlevideo_linkChange.bind(this)}/>
                                    </Col>
                                </Row>
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
