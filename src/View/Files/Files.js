import React, { Component } from 'react';
import Axios from 'axios';
import { Drawer, Tabs, Form, Button, Col, Row, message, Table, Popconfirm, Divider } from 'antd';
import './files.css';

const url = "http://194.4.58.191:5000/";//"http://127.0.0.1:5000/";
const { TabPane } = Tabs;

export class Files extends Component {
    state = {
        id: "",
        files_list: [],
        document_list: [],
        file: "",
        new_file_title: "",
        visible: false,
        visibleUpdate: false,
        doc_type_id: "1", // 1 = "fiz" | 2 = "юр"
        document_edit: undefined,
    }

    componentDidMount() {
        this.refresh();
    }

    showDrawer() {
        this.setState({
            visible: true,
        });
    };

    onClose() {
        this.setState({
            visible: false,
            file: "",
            new_file_title: "",
            document_edit: undefined,
        });
    };

    refresh() {
        let defaultDocType = this.state.doc_type_id;
        this.getAllDocumentsByType(defaultDocType);
    };

    getAllDocumentsByType(doc_type_id) {
        Axios.get(url + "documents/" + doc_type_id).then(res => { 
            if (res.data && res.data.length > 0) {
                res.data.forEach(doc => {
                    doc.key = doc.id;
                });
            }
            this.setState({ doc_type_id: doc_type_id, document_list: res.data }) 
        });
    }

    handleSubmit() {
        let uploadedFile = "";
        if (this.state.file[0]) {
            uploadedFile = this.state.file[0];
        }
        else if(!this.state.document_edit) {
            message.error("Загрузите файл!");
            return;
        }
        let reader = new FileReader();
        if (this.state.document_edit) { //При изменении существуещего
            if (this.state.file[0]) {
                reader.onload = e => {
                    let documentData = {
                        document_title: this.state.new_file_title ? this.state.new_file_title : this.state.file[0].name,
                        document_type_id: this.state.doc_type_id,
                        document_file_name: this.state.file[0].name,
                        document_binary: reader.result,
                        document_id: this.state.document_edit.id
                    }
                    Axios.post(url + "documents", { documentData } ).then(res => {
                        this.refresh();
                        message.success('Успешно изменен');
                        this.setState({ visible: false, new_file_title: "", file: "", document_edit: undefined });
                    }).catch(err => { console.log(err); message.error('Произошла ошибка!') });
                }
            }
            else {
                let documentData = {
                    document_title: this.state.new_file_title ? this.state.new_file_title : this.state.document_edit.document_title,
                    document_type_id: this.state.doc_type_id,
                    document_file_name: this.state.document_edit.document_file_name,
                    document_id: this.state.document_edit.id,
                }
                Axios.post(url + "documents", { documentData } ).then(res => {
                    this.refresh();
                    message.success('Успешно изменен');
                    this.setState({ visible: false, new_file_title: "", file: "", document_edit: undefined });
                }).catch(err => { console.log(err); message.error('Произошла ошибка!') });
            }
        }
        else {//При создании нового дока
            reader.onload = e => {
                let documentData = {
                    document_title: this.state.new_file_title ? this.state.new_file_title : this.state.file[0].name,
                    document_type_id: this.state.doc_type_id,
                    document_file_name: this.state.file[0].name,
                    document_binary: reader.result,
                }
                Axios.put(url + "documents", { documentData } ).then(res => {
                    this.refresh();
                    message.success('Успешно добавлено');
                    this.setState({ visible: false, new_file_title: "", file: "" });
                }).catch(err => { console.log(err); message.error('Произошла ошибка!') });
            }
        }

        if (uploadedFile instanceof Blob)
            reader.readAsDataURL(uploadedFile);
    };

    onDocumentTypeChange(value) {
        this.getAllDocumentsByType(value);
    }

    onDownloadClick(record, event) {
        let doc_id = record.id;
        window.location.assign(url + "documents/download/" + doc_id ,"_blank");
    }

    handleFileTitleChange(event) {
        this.setState({ new_file_title: event.target.value });
    }

    onDocumentDelete(doc_id) {
        Axios.delete(url + "documents/" + doc_id ).then(res => {
            this.refresh();
            message.success('Успешно удален!');
            this.setState({ visible: false });
        }).catch(err => { console.log(err); message.error('Произошла ошибка!') });
    }

    onDocumentEdit(doc_id) {
        let foundDoc = this.state.document_list.find((doc) => { return doc.id === doc_id });
        this.setState({document_edit: foundDoc, visible: true, new_file_title: foundDoc.document_title})
    }
    /** render methods */
    getDocumentTable() {
        const columns = [
            {
                title: "Id",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "Название",
                dataIndex: "document_title",
                key: "document_title",
                render: (text, record) => (
                    <span>
                        <a onClick={this.onDownloadClick.bind(this, record)}>{record.document_title}</a>
                    </span>
                ),
            },
            {
                title: "Действие",
                dataIndex: "id",
                key: "id",
                render: (record) => (
                    <>
                        <Popconfirm
                            title="Вы уверены что хотите удалить?"
                            onConfirm={this.onDocumentDelete.bind(this, record)}
                            okText="Да"
                            cancelText="Нет">
                            <a>Удалить</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a onClick={this.onDocumentEdit.bind(this, record)}>Изменить</a>
                    </>
                )
            }
        ]

        return (
            <>
                <Table bordered columns={columns} dataSource={this.state.document_list} pagination={false}/>
                <Drawer title="Добавить новый файл" width={720} onClose={this.onClose.bind(this)} visible={this.state.visible}>
                    {
                        this.state.document_edit
                        ?
                            <h3>Название файла (это будет видно клиенту сайта)<input type="text" value={this.state.new_file_title} onChange={this.handleFileTitleChange.bind(this)}></input></h3>
                        : 
                            <h3>Новое название файла (это будет видно клиенту сайта)<input type="text" value={this.state.new_file_title} onChange={this.handleFileTitleChange.bind(this)}></input></h3>
                    }
                    
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={24}>
                                { this.state.document_edit ? "Загрузить другой файл" : "" }
                                <Form.Item label="файл">
                                    <input type="file" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div className="button-group-div">
                        <Button onClick={this.onClose.bind(this)} className="margin-right-8" >
                            Отменить
                        </Button>
                        <Button onClick={this.handleSubmit.bind(this)} type="primary">
                            {
                                this.state.document_edit ? "Изменить" : "Создать"
                            }
                        </Button>
                    </div>
                </Drawer>
            </>
        )
    }

    render() {
        return (
            <>
                <div className="files-container">
                    <h1 className="files-text-center">ДОКУМЕНТЫ</h1>
                    <Tabs defaultActiveKey={this.state.doc_type_id} onChange={this.onDocumentTypeChange.bind(this)}>
                        <TabPane tab="Для физических лиц" key="1"/>
                        <TabPane tab="Для юридеческих лиц" key="2"/>
                    </Tabs>
                    {this.getDocumentTable()}
                    <Button.Group className="files-button-group">
                        <Button onClick={this.refresh.bind(this)} type="primary">Обновить</Button>
                        <Button onClick={this.showDrawer.bind(this)} type="primary">Добавить</Button>
                    </Button.Group>
                </div>
            </>
        )
    }
}

export default Files;
