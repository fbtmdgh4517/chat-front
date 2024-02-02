import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { Menu } from './components/Menu';
import { useChatDispatch, useChatSelector } from './store';
import { setUserList } from './store/userListSlice';
import { disconnectClient, initClient } from './service/ChatService';
import { Toast } from './components/Toast';
import { setEnterUser } from './store/enterUserSlice';
import { persistor } from '.';


function App() {
  
  const loginUser = useChatSelector((state: any) => state.user);
  const memberNum = localStorage.getItem('memberNum');
  const tmpObj = useChatSelector((state: any) => state.userList);
  const dispatch = useChatDispatch();
  const configs = [
    {
      url: `/topic/enter-chat`,
      callback: (data: any) => {
        const tmpUsers = JSON.parse(data.body);
        const loginUsers = tmpObj.list.filter((user: any) => {
          if(!user.login){
            for(const tmpUser of tmpUsers){
              if(tmpUser.login && tmpUser.memberNum === user.memberNum){
                console.log(tmpUser);
                return user;
              }
            }
          }
        });

        for(const loginUser of loginUsers){
          dispatch(setEnterUser(loginUser));
        }
        dispatch(setUserList(tmpUsers));
      }
    },
    {
      url: `/topic/chat/${loginUser.memberNum}`,
      callback: (data: any) => {
        const msg = JSON.parse(data.body);
        console.log(msg);
      }
    }]
  useEffect(() => {
    disconnectClient();
    if (!memberNum) {
      persistor.purge();
      return;
    }
    initClient(configs)
    .catch(e=>{
      console.log(e);
    });
  }, [loginUser]);

  return (
    <BrowserRouter>
      <Toast />

      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={loginUser.memberNum===0?'/sign-in':'/main'}>
              Chatting
            </Link>
            
            <Menu />
          </div>
        </nav>

        <div className="auth-wrapper">

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;