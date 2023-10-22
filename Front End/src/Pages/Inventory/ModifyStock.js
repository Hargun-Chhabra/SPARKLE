/**
 * Author : Sakshi Chaitanya Vaidya
 * Banner No : B00917159
 * Email: sakshi.vaidya@dal.ca
 */

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Autocomplete, Grid,Container} from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axiosApi from '../../Common/AxiosApi';
import { useParams } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

function ModifyStock() {

    const location = useLocation();
    const [formValues, setFormValues] = useState([]);
    const [refNumber, setRefNumber] = useState([]);
    const [category, setCategory] = useState([]);
    const [isSearched, setIsSearched] = useState("");
    const [fileSelected, setFileSelected] = useState(false);
    
    const { isFromViewStock } = useParams();
    const navigate = useNavigate();

    const defaultValues = {
        _id: location.state !== null ? location.state._id : "",
        product_name: location.state !== null ? location.state.product_name : "",
        category_id: location.state !== null ? location.state.category_id : "",
        qty: location.state !== null ? location.state.qty : "",
        price: location.state !== null ? location.state.price : "",
        product_description: location.state !== null ? location.state.product_description : "",
        product_ref_number: location.state !== null ? location.state.product_ref_number : "",
        image: location.state !== null ? location.state.image : "",
        image_name :location.state !== null ? location.state.image_name : "",
    };

    useEffect(() => {
        let role = localStorage.getItem('role')
        if (role !== 'admin' && role !== 'sales associate') {
          navigate('/Login')
        }
    });

    //const isViewStock = new URLSearchParams(location.search).get('viewStock') === 'true';

    useEffect(() => {
        const getProductRefNumber = "/inventory/getProductRefNumber"
        const getCategory = "/inventory/category"
        axiosApi.get(getProductRefNumber)
            .then(res => {
                console.log(res.data);
                const refDet = [];
                refDet.push(res.data.product_ref_number);
                refDet.map((refNumber) => {
                    setRefNumber(refNumber);
                    return (<></>)
                });
            });

        axiosApi.get(getCategory)
            .then(res => {
                console.log(res.data);
                const cateDet = [];
                cateDet.push(res.data.category);
                console.log(cateDet);
                cateDet.map((category) => {
                    setCategory(category);
                    return (<></>)
                });
            });

        setFormValues(defaultValues);
        // console.log(location.state)
        // console.log("formvalues" + {formValues})
        // console.log(formValues)

    }, [location.state], []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: location.state
    });

    const handleInputChange = async (e) => {
        console.log(e.target.label);
        const target = e.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;

        console.log("name = " + name);
        console.log("value" + value);

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleImgChange = async (e) => {

        const value = e.target.files[0]

        const options = {
            maxSizeMb: 0.05,
            maxWidthOrHeight: 300,
            useWebWorker: true
        };

        if (value) {
            const compressedFile = await imageCompression(value, options);
            setFileSelected(true);
            console.log(compressedFile)
            setFormValues({
                ...formValues,
                image: compressedFile,
                image_name :value.name
            });
        }
        else
        {
            setFileSelected(false)
        }
        console.log(formValues)
    }
    useEffect(() => {
        console.log(formValues.image_name)
        //console.log(formValues)
    }, [formValues.image]);

    const handleCategoryChange = (event, value) => {
        console.log(value)
        if (value) {
            setFormValues({
                ...formValues,
                category_id: value._id,
            });
        }
        //console.log(formValues)
    }
    useEffect((e) => {
        //console.log(formValues)
    }, [formValues]);

    const handleRefNumberChange = (event, value) => {
        console.log(value)
        if (value) {
            setFormValues({
                ...formValues,
                _id: value._id
            });
        }
        else {
            console.log(defaultValues)
            setFormValues(defaultValues)
        }
        setIsSearched(true)
        //console.log(formValues)
    }

   

    const onClickAdd = async () => {
        handleSubmit(async () => {
            const addProduct = "/inventory/addProduct"

            if (formValues._id === "") {
                await axiosApi.post(addProduct, {
                    product_name: formValues.product_name,
                    category_id: formValues.category_id,
                    qty: formValues.qty,
                    price: formValues.price,
                    product_description: formValues.product_description,
                    image: formValues.image,
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((res) => {
                        console.log(res);
                        console.log(res.data);
                        if (res.status === 200) {
                            Swal.fire({
                                title: "Product Added..!!",
                                icon: 'success',
                                text: "Redirecting in a second...",
                                timer: 1500,
                                showConfirmButton: false
                            }).then(function () {
                                navigate("/viewStock");
                            })
                        }
                    })
                    .catch((err) => console.log(err));
            }
            else {
                Swal.fire({
                    title: "Product is already exists.., Use Modify button to update",
                    icon: 'warning',
                    text: "Redirecting in a second...",
                    timer: 2000,
                    showConfirmButton: false
                }).then(function () {
                    //setFormValues(defaultValues);
                })
            }

        })((errors) => {
            // handle form validation errors here
        });
    };


    useEffect(() => {
        const getProductById = "inventory/getProduct/" + formValues._id
        if (formValues._id !== "") {
            axiosApi.get(getProductById)
                .then(res => {
                    console.log(res.data);
                    const prodDet = [];
                    prodDet.push(res.data.product);
                    console.log(prodDet);
                    prodDet.map((product) => {
                        setFormValues(product);
                        return (<></>)
                    });
                });
            if (formValues._id) {
                setIsSearched(true)
            }
            else {
                setIsSearched(false)
            }
        }
        console.log(isSearched)
    }, [formValues._id]);


    const onClickModify = async () => {
        handleSubmit(async () => {
            console.log(formValues._id)
            const modifyProductUrl = "/inventory/updateStock/" + formValues._id
            console.log(formValues)
    
            if (formValues._id !== "") {
                await axiosApi.put(modifyProductUrl, {
                    product_name: formValues.product_name,
                    category_id: formValues.category_id,
                    qty: formValues.qty,
                    price: formValues.price,
                    product_description: formValues.product_description,
                    ...(formValues.image instanceof Blob && { image: formValues.image })
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((res) => {
                        console.log(res);
                        console.log(res.data);
                        if (res.status === 200) {
                            Swal.fire({
                                title: "Product Updated..!!",
                                icon: 'success',
                                text: "Redirecting in a second...",
                                timer: 1500,
                                showConfirmButton: false
                            }).then(function () {
                                navigate("/viewStock");
                            })
                        }
                    })
                    .catch((err) => console.log(err));
            }
            else {
                Swal.fire({
                    title: "Product is not exists, please add it using Add button",
                    icon: 'warning',
                    text: "Redirecting in a second...",
                    timer: 2000,
                    showConfirmButton: false
                }).then(function () {
                    setFormValues(formValues);
                })
            }

        })((errors) => {
            // handle form validation errors here
        });
    };
    
    // const onClickModify = async () => {
    //     handleSubmit(async () => {
           
    //     })
       
    // };

    return (
        <Container component="main" maxWidth="xs">
        <Grid 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'normal'
            }}>
            <CssBaseline />
            <Box component="form" noValidate autoComplete="off"
                // sx={{}}
                sx={{
                    mt: 1, marginTop: 8,
                    maxWidth: "100%"
                }}
            >
                {/*  */}
                <Grid item>
                    <Autocomplete
                        id="prodRefNumber"
                        options={refNumber}
                        value={
                            refNumber.find((c) => c._id === formValues._id) || { label: "" }
                        }
                        onChange={handleRefNumberChange}
                        getOptionLabel={(option) => option.label}
                        getOptionSelected={(option, value) => option._id === value._id}
                        style={{ height: "150" }}
                        renderInput={(params) => (
                            <TextField {...params} label="Search by Reference Number" variant="outlined"
                                //required
                                size="small"
                                value={formValues._id}
                            />
                        )}
                        InputLabelProps={{ shrink: true }}      
                    />
                </Grid>
                <Grid item style={
                    {
                        marginTop: "5%"
                    }
                }>
                    <TextField
                        autoFocus
                        fullWidth
                        inputRef={refNumber}
                        label="Product Name"
                        name="product_name"
                        value={formValues?.product_name || ''}
                        {...register("product_name", {
                            onChange: (e) => { handleInputChange(e) },
                            //required: "Product Name is required.",
                            pattern: {
                                message: "Product Name is required"
                            },
                            validate: () => {
                                const productName = formValues.product_name.trim()
                                console.log(productName);
                                if ( productName!== "") {
                                    return true;
                                } else {
                                    return "ProductName is required";
                                }
                            }
                        })}
                        error={Boolean(errors.product_name)}
                        helperText={errors.product_name?.message}
                        required
                        InputLabelProps={{ shrink: true }}
                        inputProps ={{style : {textAlign : 'left'}}}
                    //variant="outlined"
                    />
                </Grid>
                <Grid item style={
                    {
                        marginTop: "5%"
                    }}
                >
                    <Autocomplete
                        id="category"
                        paperStyle={{ maxHeight: 200, overflow: 'auto' }}
                        options={category}
                        disabled={(isFromViewStock === true || isSearched === true) && Boolean(formValues.category_id)}
                        value={
                            category.find((c) => c._id === formValues.category_id) || { label: "" }
                        }
                        onChange={handleCategoryChange}
                        getOptionLabel={(option) => option.label}
                        getOptionSelected={(option, value) => option._id === value._id}
                        style={{ height: "150" }}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" variant="outlined"
                                required
                                size="small"
                                value={formValues.category_id}
                                {...register("category_id", {
                                    onChange: (e) => { handleCategoryChange(e) },
                                    //required: "Category is required.",
                                    pattern: {
                                        message: "Category is required"
                                    },
                                    validate: () => {
                                        const cate_id = formValues.category_id.trim()
                                        if (cate_id !=="") {
                                            return true;
                                        } else {
                                            return "Category is required";
                                        }
                                    }
                                })
                                }
                                error={Boolean(errors.category_id)}
                                helperText={errors.category_id?.message}
                                InputLabelProps={{ shrink: true }}
                            //defaultValue={category.find(c => c._id === formValues.category_id)}
                            />
                        )}

                    />

                </Grid>
                <Grid item style={
                    {
                        marginTop: "5%"
                    }}>
                    <TextField
                        value={formValues.qty || ''}
                        type="number"
                        name="qty"
                        label="Qty"
                        id="productQty"
                        style={{
                            marginRight: "1%",
                            width: "49%"
                        }}
                        {...register("qty", {
                            onChange: (e) => { handleInputChange(e) },
                            //required: "Quantity is required",
                            pattern: {
                                value: /^\d+$/,
                                message: "Quantity should be number"
                            },
                            validate: () => {
                                
                                if (formValues.qty !== "") {
                                    return true;
                                } else {
                                    return "Quantity is required";
                                }
                            }
                        })}
                        error={Boolean(errors.qty)}
                        helperText={errors.qty?.message}
                        required
                        InputLabelProps={{ shrink: true }}
                        inputProps ={{style : {textAlign : 'left'}}}
                    />
                    <TextField
                        type="number"
                        value={formValues.price}
                        name="price"
                        label="Price"
                        style={{
                            marginLeft: "1%",
                            width: "49%"
                        }}
                        {...register("price", {
                            onChange: (e) => { handleInputChange(e) },
                            //required: "Price is required",
                            pattern: {
                                value: /^\d+$/,
                                message: "Price should be number"
                            },
                            validate: () => {
                                if (formValues.price !== "") {
                                    return true;
                                } else {
                                    return "Price is required";
                                }
                            }
                            
                        })}
                        error={Boolean(errors.price)}
                        helperText={errors.price?.message}
                        required
                        InputLabelProps={{ shrink: true }}
                        inputProps ={{style : {textAlign : 'left'}}}
                    />
                </Grid>
                <Grid item style={
                    {
                        marginTop: "1%"
                    }}>
                    <TextField
                        multiline
                        rows={3}
                        margin="normal"
                        fullWidth
                        label="Description"
                        name="product_description"
                        value={formValues.product_description}
                        {...register("product_description", {
                            onChange: (e) => { handleInputChange(e) },
                            //required: "Description is required.",
                            pattern: {
                                message: "Description is required"
                            },
                            validate: () => {
                                if (formValues.product_description.trim().length > 0) {
                                    return true;
                                } else {
                                    return "Description is required";
                                }
                            }
                        })
                        }
                        error={Boolean(errors.product_description)}
                        helperText={errors.product_description?.message}
                        required
                        InputLabelProps={{ shrink: true }}
                        inputProps ={{style : {textAlign : 'left'}}}
                    />
                </Grid>
                <Grid item style={
                    {
                        marginTop: "3%"
                    }}>
                    <TextField
                        type="file"
                        id="image"
                        name="image"
                        defaultValue={formValues.image_name}
                        {...register("image_name", {
                            onChange: (e) => { handleImgChange(e) },
                            //required: "Image is required",
                            pattern: {
                                message: "Image is required"
                            },
                            validate: () => {
                                console.log(formValues.image_name.length)
                                if (formValues.image_name.length > 0) {
                                    return true;
                                } else {
                                    return "Please select an Image";
                                }
                            }
                        })}
                        error={Boolean(errors.image_name)}
                        helperText={errors.image_name?.message}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        inputProps ={{style : {textAlign : 'left'}}}
                    />
                    <p>Selected Image: {formValues.image_name}</p>
                </Grid>
                <Grid item>
                    <Button style={{
                        margin: "5%", backgroundColor: '#444454',
                        color: '#bab79d', borderColor: '#b28faa', height: 50, width: 150,
                        borderRadius: 7
                    }} variant="contained"
                        onClick={onClickAdd}
                    >
                        Add
                    </Button>
                    <Button style={{
                        margin: "5%", backgroundColor: '#444454',
                        color: '#bab79d', borderColor: '#b28faa', height: 50, width: 150,
                        borderRadius: 7
                    }} variant="contained"
                        onClick={onClickModify}
                    >
                        Modify
                    </Button>
                </Grid>
            </Box>
        </Grid>
        </Container>
    )
}

export default ModifyStock