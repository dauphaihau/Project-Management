import React, {useState, Fragment } from "react";
import {Route} from "react-router";
import {Layout, Menu} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ProjectOutlined,
    PoweroffOutlined,
    UserOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {NavLink, Redirect} from "react-router-dom";

const {Header, Sider, Content} = Layout;

export const AdminTemplate = (props) => {

    const [state, setStateCollapse] = useState({collapsed: false});

    if (!localStorage.getItem('accessToken')) {
        alert('You are not authorized to access this page !')
        return <Redirect to='/login'/>
    }

    const toggle = () => {
        setStateCollapse({
            collapsed: !state.collapsed,
        });
    };

    const renderLayout = (props) => {
        return <Route path={props.path} render={(propsRoute) => {
            return <props.component {...propsRoute} setStateCollapse={toggle}/>
        }}/>
    }

    return (
        <Route
            path={props.path}
            render={() => {
                return <Fragment>
                    <Layout>
                        <Sider width={200} className="site-layout-background"
                               trigger={null}
                               collapsible
                               breakpoint="lg"
                               onBreakpoint={broken => {
                                   console.log(broken);
                               }}
                               onCollapse={(collapsed, type) => {
                                   console.log(collapsed, type);
                               }}
                               collapsed={state.collapsed}
                        >
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['1']}
                                style={{height: '100%', borderRight: 0}}
                            >
                                <Menu.Item key="1" icon={<ProjectOutlined/>}>
                                    <NavLink to='/projects'>Projects</NavLink>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<UsergroupAddOutlined/>}>
                                    <NavLink to="/users">
                                        Users
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<UserOutlined/>}>
                                    <NavLink to="/profile">
                                        My profile
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="5" icon={<PoweroffOutlined/>}
                                           onClick={() => {
                                               localStorage.clear();
                                               window.location.href = '/login'
                                           }}>
                                    Log out
                                </Menu.Item>
                            </Menu>

                        </Sider>
                        <Layout className="site-layout">
                            <Header
                                className="site-layout-background d-flex align-items-center justify-content-between"
                                style={{padding: '0 1rem', backgroundColor: 'inherit'}}
                            >
                                <div className="left-content">
                                    {React.createElement(
                                        state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                        {
                                            className: "trigger left-content",
                                            onClick: toggle,
                                            style: {color: "#000000", fontSize: "20px"},
                                        }
                                    )}
                                </div>
                                <div className="right-content">
                                    <div className="logo text-center">
                                        <img
                                            className="m-2"
                                            width={50}
                                            height={50}
                                            style={{borderRadius: "50%", cursor: 'pointer'}}
                                            src="https://i.pravatar.cc/300"
                                            alt="..."
                                            onClick={() => {
                                                window.location.href = '/profile'
                                            }}
                                        />
                                    </div>
                                </div>
                            </Header>
                            <Content
                                className="site-layout-background"
                                style={{
                                    margin: "0px 16px",
                                    marginBottom: 8,
                                    padding: 2,
                                    minHeight: 280,
                                }}
                            >
                                {renderLayout(props)}
                            </Content>
                        </Layout>
                    </Layout>
                </Fragment>
            }}
        />
    );
};

