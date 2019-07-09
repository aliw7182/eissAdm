import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import {Switch,Route,Link,Redirect} from 'react-router-dom';
import SpecialOffersMain from '../Special_Offers/SpecialOffersMain';
import Slider from '../Slider/Slider';
import TestDrive from '../TestDrive/TestDrive';
import Vin from '../Vin/Vin';
import Questions from '../Questions/Questions';
import SubaruXVfile from '../Files/SubaruXVfile';
import Legacyfile from '../Files/Legacyfile';
import Foresterfile from '../Files/Foresterfile';
import Outbackfile from '../Files/Outbackfile';
import LoginFinal from '../Login/Login';


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
               {localStorage.getItem("hello")==="expiliarmus" &&  <div style={{width:"250px"}}>
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
                        <Menu.Item key="6">
                        <Link to="/subaruxvfiles">
                                <Icon type="car" />
                                <span>Файлы SubaruXV</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                        <Link to="/legacyfiles">
                                <Icon type="car" />
                                <span>Файлы Legacy</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                        <Link to="/outbackfiles">
                                <Icon type="car" />
                                <span>Файлы Outback</span>
                            </Link>
                        </Menu.Item> <Menu.Item key="9">
                        <Link to="/foresterfiles">
                                <Icon type="car" />
                                <span>Файлы Forester</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>}
                <div>
                    <Switch>
                        <Route path="/" exact render={(props) => (localStorage.getItem("hello")==="expiliarmus" ? (<Redirect to="/main"/>) : (<LoginFinal {...props}/>))}/>
                        <Route exact path="/main" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<SpecialOffersMain/>))}/>
                        <Route exact path="/admin_offers" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<SpecialOffersMain/>))}/>
                        <Route exact path="/admin_slider_images" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Slider/>))}/>
                        <Route exact path="/admin_test_drive" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<TestDrive/>))}/>
                        <Route exact path="/admin_vin_check" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Vin/>))}/>
                        <Route exact path="/admin_questions" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Questions/>))}/>
                        <Route exact path="/subaruxvfiles" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<SubaruXVfile/>))}/>
                        <Route exact path="/legacyfiles" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Legacyfile/>))}/>
                        <Route exact path="/outbackfiles" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Outbackfile/>))}/>
                        <Route exact path="/foresterfiles" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Foresterfile/>))}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default MainOne;
