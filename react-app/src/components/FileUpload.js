import React, { useState, useEffect, useRef } from "react";
import "./DashboardStyle.css";
import { useNavigate } from "react-router-dom";
import UploadService from "../services/FileUploadService";
import Result from "./Result";
import SimpleImageSlider from "react-simple-image-slider";

const FileUpload = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [result, setResult] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const progressInfosRef = useRef(null);

  function isEmpty(obj) {
    console.log(obj);
    return Object.keys(obj).length === 0;
  }

  const images = [
    { url:  process.env.PUBLIC_URL +'/image9.png' },
    // { url:  process.env.PUBLIC_URL +'/image10.png' },
    { url:  process.env.PUBLIC_URL +'/image11.png' },
  ];

  useEffect(() => {
    // UploadService.getFiles().then((response) => {
    //   setFileInfos(response.data);
    // });
  }, []);

  const selectFiles = (event) => {
    setSelectedFiles(event.target.files);
    setProgressInfos({ val: [] });
  };

  const upload = (idx, file) => {
    console.log("sdsds" + file);

    return UploadService.upload(file)
      .then((response) => {
        console.log(response.data);
        setResult(response.data);
      })
      .catch(() => {});
  };

  const uploadMul = (files) => {
    return UploadService.uploadMul(files)
      .then(() => {
        console.log("success");
      })
      .catch(() => {
        console.log("failed");
      });
  };

  const FileUpload = () => {
    const files = Array.from(selectedFiles);

    // let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));

    // progressInfosRef.current = {
    //   val: _progressInfos,
    // }

    const uploadPromises = files.map((file, i) => upload(i, file));

    Promise.all(uploadPromises)
      .then(() => UploadService.getFiles())
      .then((files) => {
        setFileInfos(files.data);
      });

    // return new Promise((resolve, reject) => {
    //     if(uploadMul(files)) {
    //        resolve()
    //     } else {
    //        reject();
    //     }
    //  });

    // setMessage([]);
  };

  return (
    <div className="Dashboard-div">
      {/* {progressInfos && progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))} */}

      <div className="row my-1 d-flex justify-content-center">
        <div className="col-4">Cancer Detection</div>
      </div>

      <div className="row my-3 d-flex justify-content-center">
        <div className="col-5">
          <label className="btn-file btn-default p-0">
            <input type="file" multiple onChange={selectFiles} />
          </label>

          <button
            className="btn-file btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={FileUpload}
          >
            Upload
          </button>
        </div>

        {/* <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={FileUpload}
          >
            Upload
          </button>
        </div> */}
      </div>
      <br />
      {/* <br />
      <br />
      <br /> */}
      {!isEmpty(result) && (
        <div className="row  d-flex justify-content-left">
          <div className="col-5">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ fontWeight: "900", fontSize: "large" }}
                  >
                    CATEGORY
                  </th>
                  <th
                    scope="col"
                    style={{ fontWeight: "900", fontSize: "large" }}
                  >
                    PERCENTAGE
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result).map(([key, value], index) => (
                  
                  <tr style={{ fontWeight: "700", color: index == 0 ? "red" : ""}}>
                    <td scope="row">{key}</td>
                    <td key={key}> {value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

{
  isEmpty(result) && 
  <div className="row justify-content-center">
      <SimpleImageSlider
        width={800}
        height={600}
        images={images}
        showBullets={true}
        // showNavs={true}
        slideDuration={0.5}
        autoPlay={true}
      />
    </div>
}

      {/* {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )} */}

      {/* <div className="card">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
        </ul>
      </div> */}
      {!isEmpty(result) && (
        <div>
          <br />
          <div className="col-text-center">
            *Our model displays result with upto 92% accuracy.
          </div>
          <br />
          <button onClick={() => navigate("/result")} type="submit" class="btn">
            Click to find Doctors near you
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
