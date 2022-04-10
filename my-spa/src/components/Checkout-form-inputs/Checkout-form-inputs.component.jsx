import React from "react";


const CheckoutFormInputs = ({onInputChange}) => {

    let login = localStorage.getItem('authorization');

    if (!login) {
        return(
            <>
                <input type="text" placeholder="name" name="name" onChange={onInputChange} id=""/> <br/>
                <input type="email" placeholder="email" name="email" onChange={onInputChange} id=""/> <br/>
                <input type="password" placeholder="password" name="password" onChange={onInputChange} id=""/> <br/>
                <input type="password" placeholder="repeat password" name="confirmPassword" onChange={onInputChange} id=""/> <br/>
            </>
        )
    } else {
        return null
    }
    
}

export default CheckoutFormInputs;