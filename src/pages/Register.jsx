import React, { useState } from 'react';
import Axios from './callAxios';
import Left from '../components/Left';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        agreeTerms: false,
        plainPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/register', formData)
            .then((response) => {
                
            })
            .catch((error) => {
                // handle error
            });
    };

    return (
        <>
        <Left />
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" onChange={handleChange} />
            </label>
            <label>
                Agree to terms:
                <input type="checkbox" name="agreeTerms" onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="plainPassword" onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </>
    );
};

export default Register;