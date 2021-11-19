/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import DisplayUserDonFood from '../components/DisplayUserDonFood';
import {BASE_API_URL} from '../api/api';

const UserDonFood = () => {

    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [loadedFood, setLoadedFood] = useState();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const responseData = await sendRequest(
                    BASE_API_URL+'/viewdonatedfood',
                    'POST',
                    JSON.stringify({
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
            {loadedFood && <DisplayUserDonFood items={loadedFood} />}
        </React.Fragment>
    );
};

export default UserDonFood;
