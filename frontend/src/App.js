import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuth } from './hooks/auth-hook';
import { AuthContext } from './context/auth-context';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home'
import Donate from './screens/Donate'
import ReqForFood from './screens/ReqForFood'
import Contributors from './screens/Contributors'
import Contact from './screens/Contact'
import ViewProfile from './screens/ViewProfile'
import Signup from './screens/Signup';
import Login from './screens/Login';
import ResetPassword from './screens/ResetPassword';
import NewPassword from './screens/NewPassword';
import EditProfile from './screens/EditProfile';
import MapNew from './components/MapNew';
import ReqViewFood from './screens/ReqViewFood';
import UserRecFood from './screens/UserRecFood';
import DetailUserRecFood from './screens/DetailUserRecFood';
import UserDonFood from './screens/UserDonFood';
import DetailUserDonFood from './screens/DetailUserDonFood';
import Timer from './screens/Timer';

function App() {
    const { token, login, logout, userId } = useAuth();
    let routes;
    if (userId) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/donate" exact>
                    <Donate />
                </Route>
                <Route path="/reqforfood" exact>
                    <ReqForFood />
                </Route>          
                <Route path="/food/:foodId/:userId" exact>
                    <ReqViewFood />
                </Route>
                <Route path="/userrecfood" exact>
                    <UserRecFood />
                </Route>   
                <Route path="/userdonfood" exact>
                    <UserDonFood />
                </Route>   
                <Route path="/detailuserrecfood/:foodId/:userId" exact>
                    <DetailUserRecFood />
                </Route>  
                <Route path="/detailuserdonfood/:foodId/:userId" exact>
                    <DetailUserDonFood />
                </Route>  
                <Route path="/contributors" exact>
                    <Contributors />
                </Route>
                <Route path="/contact" exact>
                    <Contact />
                </Route>
                <Route path="/viewprofile" exact>
                    <ViewProfile />
                </Route>
                <Route path="/editprofile" exact>
                    <EditProfile />
                </Route>
                <Route path="/map" exact>
                    <MapNew />
                </Route>
                <Route path="/timer" exact>
                    <Timer />
                </Route>
            </Switch>
        );
    }
    else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/contributors" exact>
                    <Contributors />
                </Route>
                <Route path="/contact" exact>
                    <Contact />
                </Route>
                <Route path="/signup" exact>
                    <Signup />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/reset-password" exact>
                    <ResetPassword />
                </Route>
                <Route path="/reset-password/:token" exact>
                    <NewPassword />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        );
    }
    
    return (
        <>
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout
            }}
        >
            <Header />
            <Router>
                {routes}
            </Router>
        </AuthContext.Provider>
        <Footer />
        </>
    );
}
export default App;