import './App.css';
import {Router, Switch} from 'react-router-dom'
import Login from './pages/Login/Login';
import {UserTemplate} from './templates/UserTemplate/UserTemplate';
import Register from './pages/Register/Register';
import {AdminTemplate} from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectList from './pages/Projects/ProjectList';
import ProjectTasks from './pages/Tasks/ProjectTasks';
import {history} from "./utils/settings";
import LoadingComponent from "./components/Loading/LoadingComponent";
import UserList from "./pages/User/UserList";
import Drawer from "./HOC/Drawer";
import Profile from './pages/Profile/Profile';
import NotificationMui from "./utils/NotificationMui";


function App() {
    return (
        <Router history={history}>
            <LoadingComponent/>
            <NotificationMui/>
            <Drawer/>
            <Switch>
                <UserTemplate exact path="/login" component={Login}/>
                <UserTemplate exact path="/register" component={Register}/>
                <AdminTemplate exact path="/" component={Dashboard}/>
                <AdminTemplate exact path="/projects" component={ProjectList}/>
                <AdminTemplate exact path="/project/task/:id" component={ProjectTasks}/>
                <AdminTemplate exact path="/users" component={UserList}/>
                <AdminTemplate exact path="/profile" component={Profile}/>

                <AdminTemplate exact path="/" component={ProjectList}/>
            </Switch>
        </Router>
    );
}

export default App;
