import React, { useEffect, useState } from 'react'
import { User } from '../types/User.type';
import { useNavigate } from 'react-router-dom';
import { useChatDispatch } from '../store';
import { axiosHttp } from '../api/axiosHttp';
import { setUser } from '../store/userSlice';

export const Login = ()=> {
  const [error, setError] = useState<boolean>(false);
  const [chatUser, setChatUser] = useState<User>({});
  const [rememberId, setRememberId] = useState<boolean>(false);

  const dispatch = useChatDispatch();
  const navigate = useNavigate();

  const changeUser = (evt:any) => {
    setChatUser({
      ...chatUser,
      [evt.target.id]: evt.target.value
    })
  }

  const checkRememberId = (evt:any) => {
    setRememberId(evt.target.checked);
  }

  const login = async () => {
    setError(false);
    try {
      const res = await axiosHttp.post('/api/login', chatUser);
      localStorage.setItem('token', res.data.jwt);
      localStorage.setItem('memberNum', res.data.user.memberNum);
      dispatch(setUser({
        ...res.data.user,
        token: res.data.jwt
      }));
      navigate('/main');
    } catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign In</h3>
          <div className="mb-3">
            {error
              ?
              <div className='text-danger'>
                아이디와 비밀번호를 확인해주세요.
              </div> : ''
            }
            <label>ID</label>
            <input type="text" id='userId' className="form-control" placeholder="아이디" onChange={changeUser} value={chatUser.memberId} />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input type="password" id='userPassword' className="form-control" placeholder="비밀번호" onChange={changeUser} />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1" onChange={checkRememberId} checked={rememberId} />
              <label className="custom-control-label" htmlFor="customCheck1">
                아아디 기억하기
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="button" className="btn btn-primary" onClick={login}>
              Sign In
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="#" onClick={() => navigate('/sign-up')}>회원가입</a>
          </p>
        </form>
      </div>
    </div>
  )
}
