import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import {Switch,Route,Link} from 'react-router-dom';
import SpecialOffersMain from '../Special_Offers/SpecialOffersMain';
import Slider from '../Slider/Slider';
import TestDrive from '../TestDrive/TestDrive';
import Vin from '../Vin/Vin';
import Questions from '../Questions/Questions';


const Welcome=()=>{
    return(
        <div>
            <h1>Добро пожаловать</h1>
            <h3>Здесь вы можете настраивать ваш сайт</h3>
        </div>
    )
}

export class MainOne extends Component {
   
    render() {
        return (
            <div className="main" style={{display:"flex"}}>
                <div style={{width:"250px"}}>
                    <Menu
                    style={{width:"250px",textAlign:"left",height:"100vh",position:"fixed"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    >
                    <Menu.Item key="1">
                        <Link to="/admin_offers">
                            <Icon type="pie-chart" />
                            <span>Специальные предложения</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/admin_slider_images">
                            <Icon type="desktop" />
                            <span>Картинки слайдера</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/admin_test_drive">
                            <Icon type="inbox" />
                            <span>Заявки на тест драйв</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/admin_vin_check">
                            <Icon type="inbox" />
                            <span>Заявки на VIN и проверку</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/admin_questions">
                                <Icon type="inbox" />
                                <span>Вопросы и сообщения</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div>
                    <Switch>
                        <Route path="/" exact component={SpecialOffersMain}/>
                        <Route path="/admin_offers" exact component={SpecialOffersMain}/>
                        <Route path="/admin_slider_images" exact component={Slider}/>
                        <Route path="/admin_test_drive" exact component={TestDrive} />
                        <Route path="/admin_vin_check" exact component={Vin} />
                        <Route path="/admin_questions" exact component={Questions} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default MainOne;
