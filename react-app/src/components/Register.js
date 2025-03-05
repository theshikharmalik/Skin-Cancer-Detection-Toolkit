import React, {useState,setState} from 'react';
import { useNavigate } from "react-router-dom";
import "./registerStyle.css"
import http from "../http-java";
const Register =() => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [city, setCity] = useState(null);
    const [tin, setTin] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "userName"){
            setUserName(value);
        }
        if(id === "city"){
            setCity(value);
        }
        if(id === "tin"){
            setTin(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

       

    }

    const handleSubmit  = () => {
        //let formData = new FormData();
        let formData = {
            "username":userName,
            "email": email,
            "city": city,
            "tin": tin,
            "description": "this is description",
            "password": password
        }
        // formData.append("username", userName);
        // formData.append("email", email);
        // formData.append("city", city);
        // formData.append("tin", tin);
        // formData.append("description", "this is description");
        // formData.append("password", password);

       http.post("/api/registerUserDetail", formData, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(response => {
          console.log(response)
          //if (response.data == "SUCESS")
            // {navigate("/")}
            navigate("/")
      })
      .catch(
        error => {
            console.log(error)
        });
       
    }

    return(
        <div className="register-form" >
            <div className="register-form-body">
                <div className="username">
                    <label className="register-form__label" for="username">User Name </label>
                    <input className="register-form__input" type="text" value={userName} onChange = {(e) => handleInputChange(e)} id="userName" placeholder="User Name"/>
                </div>
                <div className="email">
                    <label className="register-form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="city">
                    <label className="register-form__label" for="city">City </label>
                    <input  type="text" id="city" className="form__input" value={city} onChange = {(e) => handleInputChange(e)} placeholder="City"/>
                </div>
                <div className="tin">
                    <label className="register-form__label" for="tin">Tin </label>
                    <input  type="text" id="tin" className="form__input" value={tin} onChange = {(e) => handleInputChange(e)} placeholder="Tin"/>
                </div>
                <div className="register-password">
                    <label className="register-form__label" for="password">Password </label>
                    <input className="register-form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="register-confirm-password">
                    <label className="register-form__label" for="confirmPassword">Confirm Password </label>
                    <input className="register-form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="register-footer">
            <button onClick={handleSubmit} type="submit" class="btn">Enroll</button>
            </div>
        </div>
       
    )       
}

export default Register;