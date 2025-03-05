import React, { useState, useEffect, useRef } from "react";
import "./provider.css";
import UploadService from "../services/FileUploadService";
import MapSection from "./Map";

const Result = () => {
  const [latitude, setLat] = useState(37.42216);
  const [longitude, setLong] = useState(-122.08427);
  const progressInfosRef = useRef(null);

  function isEmpty(obj) {
    console.log(obj);
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {}, []);

  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: latitude,
    lng: longitude,
  };

  const handleSubmit = () => {
    let x = document.getElementById("button-submit");

    if (x.style.display == "none") {
    } else {
      x.style.display = "none";
    }
  };

  const handleDropDown = (e) =>{
    console.log(e.target.value)
  }

  return (
    <div className="result-div">
      <div className="provider-div-1">
        <img src="provider1.png" width="300" height="408" />
      </div>
      <div className="provider-div-2">
        <img src="provider2.png" width="300" height="408" />
      </div>
      <div className="provider-div-3">
        <img src="provider3.png" width="300" height="408" />
      </div>
      <div class="button-contact" id="button-submit">
        <button
          onClick={() => handleSubmit()}
          type="submit"
          class="btn-contact"
        >
          Contact us for appointment
        </button>
      </div>
      <div class="paragraph-foot">
        <p>
          <b>Success!</b>
        </p>
        <br />
        <p> Our customer care representives will contact you shortly.</p>
      </div>

      <div>
        <select onChange={handleDropDown}>
          <option value={`37.42216, -122.08427`}>New york</option>
          <option value={`37.42216, -122.08427`}>City2</option>
          <option value={`37.42216, -122.08427`}>City3</option>
          <option value={`37.42216, -122.08427`}>City 4</option>
    
        </select>
      </div>

      <div id="map">
        <MapSection location={location} zoomLevel={17} />
      </div>
    </div>
  );
};

export default Result;
