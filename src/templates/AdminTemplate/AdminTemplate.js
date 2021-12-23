import React, {useState, Fragment} from "react";
import {Layout, Menu} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ProjectOutlined,
    PoweroffOutlined,
    UserOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {NavLink, Redirect, Route} from "react-router-dom";

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
        return <Route
            path={props.path}
            render={(propsRoute) => {
                return <props.component {...propsRoute}/>
            }}
        />
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
                            <div className="logo" style={{background: 'white'}}>
                                <a
                                    href="/"
                                    aria-label="Go home"
                                    title="Company"
                                    className="inline-flex items-center "
                                >
                                    <svg className="w-10"
                                         xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px"
                                         y="0px"
                                         viewBox="0 0 225 225" style={{
                                        enableBackground: "new 0 0 225 225",
                                        height: 55,
                                        width: '100%',
                                        paddingTop: 10,
                                        paddingBottom: 9,
                                        marginBottom: 10
                                    }}
                                         xmlSpace="preserve">
                                        <style type="text/css"
                                               dangerouslySetInnerHTML={{__html: "\n.st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                "}}/>
                                        <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                            <g>
                                                <path id="Layer0_0_1_STROKES" className="st0"
                                                      d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"/>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </div>
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
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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

