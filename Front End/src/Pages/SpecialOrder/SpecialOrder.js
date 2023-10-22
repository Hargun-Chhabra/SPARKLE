// Neha Dadarwala - neha.dadarwala@dal.ca

import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

const defaultValues = {
    name: '',
    address: '',
    phone: '',
    estimatedCost: '',
};


const SpecialOrder = () => {
    const [file, setFile] = useState();
    const [formValues, setFormValues] = useState(defaultValues)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    const submitOrder = async () => {
        let data = new FormData();
        data.append('name', formValues.name);
        data.append('phone', formValues.phone);
        data.append('address', formValues.address);
        data.append('estimatedCost', formValues.estimatedCost);
        data.append('image', file);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sparkle-api.onrender.com/sorder/special',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: data
        };

        try {
            var response = await axios(config);
            setFormValues(defaultValues)
            setFile(null)
        } catch (error) {
            setFormValues(defaultValues)
            setFile(null)
        }
    };

    useEffect(() => {
        let role = localStorage.getItem('role')
        if (role !== 'admin' && role !== 'sales associate') {
            navigate('/Login')
        }
    });

    return (
        <div style={{ marginTop: '5%' }}>
            <form onSubmit={handleSubmit(submitOrder)}>
                <Grid container alignItems="center" direction="column" sx={{ borderColor: 'black', }}>
                    <Grid item>
                        <TextField
                            type="text"
                            value={formValues.name}
                            autoFocus
                            variant="outlined"
                            style={{ width: 250 }}
                            inputProps={{ style: { textAlign: 'left' } }}
                            InputLabelProps={{ style: { color: '#5c6869' } }}
                            {...register("name", {
                                onChange: (e) => { handleInputChange(e) },
                                required: "Customer Name is required.",
                                pattern: {
                                    value: /^[a-zA-Z ]+$/,
                                    message: "Customer Name cannot have numbers or special characters"
                                }
                            })}
                            label={formValues.name ? " " : "Customer Name"}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="text"
                            variant="outlined"
                            value={formValues.phone}
                            style={{ width: 250, marginTop: '10%' }}
                            inputProps={{ style: { textAlign: 'left' } }}
                            InputLabelProps={{ style: { color: '#5c6869' } }}
                            {...register("phone", {
                                onChange: (e) => { handleInputChange(e) },
                                required: "Phone number is required.",
                                pattern: {
                                    value: /[0-9]{10}/,
                                    message: "Should be numbers of minimum length 10"
                                }
                            })}
                            label={formValues.phone ? " " : "Customer Phone number"}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label={formValues.address ? " " : "Customer Address"}
                            type="text"
                            variant="outlined"
                            value={formValues.address}
                            style={{ width: 250, marginTop: '10%' }}
                            inputProps={{ style: { textAlign: 'left' } }}
                            InputLabelProps={{ style: { color: '#5c6869' } }}
                            {...register("address", {
                                onChange: (e) => { handleInputChange(e) },
                                required: "Address is required.",
                            })}
                            error={Boolean(errors.address)}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label={formValues.estimatedCost ? " " : "Estimated Cost"}
                            type="text"
                            variant="outlined"
                            value={formValues.estimatedCost}
                            style={{ width: 250, marginTop: '10%' }}
                            inputProps={{ style: { textAlign: 'left' } }}
                            InputLabelProps={{ style: { color: '#5c6869' } }}
                            {...register("estimatedCost", {
                                onChange: (e) => { handleInputChange(e) },
                                required: "Estimated Cost is required.",
                            })}
                            error={Boolean(errors.estimatedCost)}
                            helperText={errors.estimatedCost?.message}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="file"
                            variant="outlined"
                            value={formValues.image}
                            style={{ width: 250, margin: "20px" }}
                            InputLabelProps={{ style: { color: '#5c6869' } }}
                            {...register("image", {
                                // onChange: (e) => { handleInputChange(e) },
                                onChange: e => setFile(e.target.files[0]),
                                required: "Design is required.",
                            })}
                            inputProps={{ accept: 'image/*' }}
                            error={Boolean(errors.image)}
                            helperText={errors.image?.message}
                        />
                    </Grid>
                    <Grid item>
                        <Button style={{
                            margin: "20px", backgroundColor: '#444454',
                            color: '#bab79d', borderColor: '#b28faa', height: 50, width: 150,
                            borderRadius: 7
                        }} variant="contained" type="submit">
                            Submit Order
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>

    )
}

export default SpecialOrder;