import { useEffect } from "react";
import { useChatDispatch, useChatSelector } from "../store"
import { setEnterUser } from "../store/enterUserSlice";
import { initUser } from "../store/userSlice";

export const Toast = () => {
    const enterUser:any = useChatSelector((state:any) => state.enterUser);
    const loginUser:any = useChatSelector((state:any) => state.user);
    const dispatch = useChatDispatch();
    const user:any = {memberNum: 0, memberName: ''};

    const hideDiv = () => {
        dispatch(initUser(user));
    }

    const printMsg = () => {
        return `${enterUser.memberName}님 ${enterUser.memberNum === loginUser.memberNum ? ' 반갑다.' : '이 입장하였다.'}`;
    }

    return (
        <div>
            {enterUser.memberNum != 0 ? 
                <div className="custom-toast">
                    <p>{printMsg()}</p>
                    <button onClick={hideDiv}>확인</button>
                </div>: ''
            }
        </div>
    )
}