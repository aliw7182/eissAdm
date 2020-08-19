import React, { Component } from 'react';
import Axios from 'axios';
import { Drawer, Tabs, Form, Button, Col, Row, message, Table } from 'antd';
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
        doc_type_id: "1" // 1 = "fiz" | 2 = "юр"
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
            new_file_title: ""
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
        let document_title = this.state.new_file_title ? this.state.new_file_title : this.state.file[0].name;
        let document_type_id = this.state.doc_type_id;
        let document_file_name = this.state.file[0].name;
        let reader = new FileReader();
        if (this.state.file[0]) {
            uploadedFile = this.state.file[0];
        }

        reader.onload = e => {
            let base64file = reader.result;
            let documentData = {
                document_title,
                document_type_id,
                document_file_name,
                document_binary: base64file,
            }
            Axios.post(url + "documents", { documentData } ).then(res => {
                this.refresh();
                message.success('Успешно добавлено');
                this.setState({ visible: false, new_file_title: "", file: "" });
            }).catch(err => { console.log(err); message.error('Произошла ошибка!') });
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
                    <button onClick={this.onDocumentDelete.bind(this, record)}>Удалить файл</button>
                )
            }
        ]

        return (
            <>
                <Table bordered columns={columns} dataSource={this.state.document_list} pagination={false}/>
                <Drawer title="Добавить новый файл" width={720} onClose={this.onClose.bind(this)} visible={this.state.visible}>
                    <h3>Название файла (это будет видно клиенту сайта)<input type="text" value={this.state.new_file_title} onChange={this.handleFileTitleChange.bind(this)}></input></h3>
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={24}>
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
                            Создать
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
