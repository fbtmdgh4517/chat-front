import { Dispatch } from "@reduxjs/toolkit"
import { UseSelector } from "react-redux"
import { NavigateFunction } from "react-router-dom"

export const globalRouter = {
    navigate:null,
    dispatch:null,
    useSelector:null
} as {
    navigate:null | NavigateFunction,
    dispatch:null | Dispatch,
    useSelector:null | UseSelector<any>,
    na : (url:string) => {
        
    }
}