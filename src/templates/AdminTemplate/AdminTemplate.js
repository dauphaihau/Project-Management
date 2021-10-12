import React, {useState, Fragment,useEffect} from "react";
import {Route} from "react-router";
import {Layout, Menu} from "antd";
import {
    PlusOutlined,
    SearchOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ProjectOutlined,
    PoweroffOutlined,
    UserOutlined,
    NotificationOutlined
} from "@ant-design/icons";
import {NavLink, Redirect} from "react-router-dom";

export const AdminTemplate = (props) => {
    const {Header, Sider, Content} = Layout;

    const [state, setState] = useState({collapsed: true});

    if (!localStorage.getItem('accessToken')) {
        return <Redirect to='/login'/>

    }

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    const renderLayout = (props) => {
        return <Route path={props.path} render={(propsRoute) => {
            return <props.component {...propsRoute} />
        }}/>
    }

    return (
        <Route
            path={props.path}
            render={() => {
                return (
                    <Fragment>
                        <Layout>
                            <Sider trigger={null} collapsible collapsed={state.collapsed} style={{padding: '.5rem 0'}}>
                                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                                    <Menu.Item key="1" icon={<ProjectOutlined/>}>
                                        <NavLink to="/projects">
                                            Projects
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<UserOutlined/>}>
                                        <NavLink to="/users">
                                            User Management
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<ProjectOutlined/>}>
                                        <NavLink to="/profile">
                                            My profile
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<PoweroffOutlined/>} style={{color: 'red'}}
                                               onClick={() => {
                                                   localStorage.clear();
                                                   window.location.href = '/login'
                                               }}>
                                        Đăng xuất
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Header
                                    className="site-layout-background d-flex align-items-center justify-content-between"
                                    style={{padding: '0 1rem'}}
                                >
                                    <div className="left-content">
                                        {React.createElement(
                                            state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                            {
                                                className: "trigger left-content",
                                                onClick: toggle,
                                                style: {color: "#fff", fontSize: "20px"},
                                            }
                                        )}
                                    </div>
                                    <div className="right-content">
                                        {/*<div className="notification">*/}
                                        {/*    <NotificationOutlined style={{color: "#fff", fontSize: "20px"}}/>*/}
                                        {/*</div>*/}
                                        <div className="logo text-center">

                                            <img
                                                className="m-2"
                                                width={50}
                                                height={50}
                                                style={{borderRadius: "50%"}}
                                                src="https://picsum.photos/200/200"
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                </Header>
                                <Content
                                    className="site-layout-background"
                                    style={{
                                        margin: "24px 16px",
                                        padding: 24,
                                        minHeight: 280,
                                    }}
                                >
                                    {renderLayout(props)}
                                </Content>
                            </Layout>
                        </Layout>
                    </Fragment>
                );
            }}
        />
    );
};

