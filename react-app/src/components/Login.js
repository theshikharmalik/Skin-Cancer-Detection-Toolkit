import React, {useState,setState, useHistory} from 'react';
import { useNavigate } from "react-router-dom";
import './style.css'
import http from "../http-java";
import SimpleImageSlider from "react-simple-image-slider";

const Login =(props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);


    const handleInputChange = (e) => {
       
        const {id , value} = e.target;
       
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    
    }

    const handleSubmit  = () => {


    http.get('/api/users/login', {
        params: {
          email:email,
          password: password
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
      )
      .then(response => {
        console.log(response.data)
        if (response.data == "SUCCESS")
            {navigate("/dashboard")}
        else
        {alert("Incorrect Email or password !!")}
    })
    .catch(
      error => {
          console.log(error)
      });

    }


  const images = [
    { url:  process.env.PUBLIC_URL +'/image1.png' },
    { url:  process.env.PUBLIC_URL +'/image15.png' },
    // { url:  process.env.PUBLIC_URL +'/image11.png' },
  ];


    return(
        <div>
            <div className="imagelogin">
                {/* <img src="image1.png" width="800" height="600"/> */}

                <SimpleImageSlider
        width={900}
        height={700}
        images={images}
        showBullets={true}
        // showNavs={true}
        slideDuration={0.5}
        autoPlay={true}
      />
            </div>
        <div className="form">

            <div className="form-body">
                
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
              
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Login</button> <br/> or <br/>
                <button onClick={()=> navigate("/enroll")} type="submit" class="btn">Enroll</button>
                
            </div>
        </div>
        </div>
    )       
}

export default Login;