import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'


const AddToCart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    dispatch()


    return (null)
}

export default AddToCart
