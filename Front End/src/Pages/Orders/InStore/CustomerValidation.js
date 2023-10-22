const CustomerValidation = (values) => {
    let errors={};
    console.log("Inside validation");
    if(!values.firstName){
        errors.firstName="First Name is required !";
    }else if(!/^[a-z ]*[A-Z ]*$/i.test(values.firstName)){
        errors.firstName="Only Letters Allowed !";
    }
    if(!values.lastName){
        errors.lastName="Last Name is required !";
    }else if(!/^[a-z ]*[A-Z ]*$/i.test(values.lastName)){
        errors.lastName="Only Letters Allowed !";
    }
    if(!values.address){
        errors.address="Address is required !";
    }else if(!/^[a-z ]*[A-Z ]*$/i.test(values.address)){
        errors.address="Only Letters Allowed !";
    }
    if(!values.city){
        errors.city="city required !";
    }else if(!/^[a-z ]*[A-Z ]*$/i.test(values.city)){
        errors.city="Only Letters Allowed !";
    }
    if(!values.email){
        errors.email="Email is required !";
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Invalid Email !!";
    }
    if(!values.zip){
        errors.zip="Zip code is required !";
    }else if(!/^[ A-Za-z0-9]{6}$/i.test(values.zip)){
        errors.zip="Postal code(zip) must be 6 characters";
    }
    if(!values.contact){
        errors.contact="Contact number required !";
    }else if(!/^[0-9]{10}$/i.test(values.contact)){
        errors.contact="Cell No must be 10 digits";
    }
    console.log(errors);
  return errors;
}

export default CustomerValidation
