
function Validation(values){
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    const password_pattern = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    
    if(values.name===""){
        error.name="Name Should not be empty";
    }
    else{
        error.name="";
    }

    if(values.email===""){
        error.email="Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email="Email didn't match"
    }
    else{
        error.email=""
    }

    if(values.password===""){
        error.password="Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password="Password must include one (A-Z),(a-z),(0-9) and alteast 6 characters";
    }
    else{
        error.password=""
    }
    
    if(values.password===""){
        error.conpassword="This Field Shoud not be empty";
    }
    else if(values.password[0]!==values.conpassword[0]){
        error.conpassword="Password didn't match";
    }
    else{
        error.conpassword="";
    }
    return error;
}

export default Validation;