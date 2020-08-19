import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Switch,Route,Link,Redirect} from 'react-router-dom';
import SpecialOffersMain from '../Special_Offers/SpecialOffersMain';
import Slider from '../Slider/Slider';
import Questions from '../Questions/Questions';
import LoginFinal from '../Login/Login';
import Files from '../Files/Files';

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
                            <span>Новости</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/admin_slider_images">
                            <Icon type="desktop" />
                            <span>Картинки слайдера</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/admin_questions">
                                <Icon type="inbox" />
                                <span>Вопросы и сообщения</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                        <Link to="/admin_files">
                            <Icon type="desktop" />
                            <span>Документы</span>
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
                        <Route exact path="/admin_questions" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Questions/>))}/>
                        <Route exact path="/admin_files" render={() => (localStorage.getItem("hello")!=="expiliarmus" ? (<Redirect to="/"/>) : (<Files/>))}/>

                    </Switch>
                </div>
            </div>
        )
    }
}

export default MainOne;
