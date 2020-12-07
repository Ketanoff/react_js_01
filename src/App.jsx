import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import Dialogs from './components/Dialogs/Dialogs';
// import store from './redux/store';

const App = (props) => {
    return (
        
        <div className={s.app_Wrapper}>
            < Header/>
            < Navbar friends={props.state.sideBar}/>
            <div className={s.app_Wrapper_Content}>
                <Route path='/dialogs' render={() =>
                    <Dialogs store={props.store}/>}/>
                <Route path='/profile' render={() =>
                    <Profile
                        profilePage={props.state.profilePage}
                        dispatch={props.dispatch}/>}/>
                {/*<Route path='/news' component={ News }/>*/}
                {/*<Route path='/music' component={ Music }/>*/}
                {/*<Route path='/settings' component={ Settings }/>*/}
            
            </div>
        </div>
    
    );
};
export default App;