/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHttpClient } from "../hooks/http-hook";
import Food from '../components/Food';
import {BASE_API_URL} from '../api/api';

const ReqForFood = () => {

    const { sendRequest } = useHttpClient();
    const [loadedFood, setLoadedFood] = useState();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const responseData = await sendRequest(
                    BASE_API_URL+'/request',
                );
                setLoadedFood(responseData.foods);
            } catch (err) { }
        };
        fetchFoods();
    }, [sendRequest]);

    return (
        <React.Fragment>
            {loadedFood && <Food items={loadedFood} />}
        </React.Fragment>
    );
};

export default ReqForFood;