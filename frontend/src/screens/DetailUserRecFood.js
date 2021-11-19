/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext} from 'react';
import { useParams} from 'react-router-dom';
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import DisplayDetailUserRecFood from '../components/DisplayDetailUserRecFood';
import {BASE_API_URL} from '../api/api';

const DetailUserRecFood = () => {

    const auth = useContext(AuthContext);
    const foodId = useParams().foodId;
    const { sendRequest } = useHttpClient();
    const [loadedFood, setLoadedFood] = useState();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const responseData = await sendRequest(
                    BASE_API_URL+'/openviewreceivedfood',
                    'POST',
                    JSON.stringify({
                        foodId
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                setLoadedFood(responseData);
            } catch (err) { }
        };
        fetchFoods();
    }, [sendRequest]);

    return (
        <React.Fragment>
            {loadedFood && <DisplayDetailUserRecFood items={loadedFood} />}
        </React.Fragment>
    );
};

export default DetailUserRecFood;
