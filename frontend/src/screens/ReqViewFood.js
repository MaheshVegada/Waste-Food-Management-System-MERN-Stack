/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/auth-context";
import { useParams } from 'react-router-dom';
import { useHttpClient } from "../hooks/http-hook";
import ViewFood from '../components/ViewFood';
import RecViewFood from '../components/RecViewFood';
import {BASE_API_URL} from '../api/api';

const ReqViewFood = () => {

    const auth = useContext(AuthContext);
    const foodId = useParams().foodId;
    const { sendRequest } = useHttpClient();

    const [loadedFood, setloadedFood] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    BASE_API_URL+'/viewfood',
                    'POST',
                    JSON.stringify({
                        foodId
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                setloadedFood(responseData);
            } catch (err) { }
        };
        fetchUsers();
    }, [sendRequest]);
    return (
        <React.Fragment>
            {loadedFood && <ViewFood items={loadedFood} /> } 
            {loadedFood && <RecViewFood items={loadedFood} />}  
        </React.Fragment>
    );
};

export default ReqViewFood;