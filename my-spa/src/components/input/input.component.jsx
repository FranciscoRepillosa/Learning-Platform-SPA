import React from "react";
import "./input.styles.css"


const Input = ({type, placeholder, name, onInputChange, submitHandler}) => {

    if (type !== "submit") {
        return(
            <>
                <label class="lesson-form-input" for="lesson-file">{placeholder}:</label>
                <input type={type}  placeholder={placeholder} name={name} onChange={onInputChange} ></input>
            </>
        )
    } else {
        return(
            <input type={type} className={"cta-button btn-form"} onClick={submitHandler} value={placeholder} ></input>
        )
    }
    
}

export default Input;