    import React from "react";
    import "./imageSelector.style.scss";
    import imageIcon from "../../assets/imageIcon.png"
    const ImageSelector = (props) => (
      <div className="uploader">
        <div>
          <input
            id="file"
            className="uploader-input"
            type="file"
            onChange={props.handleChange}
            placeholder=""
          />
          <label htmlFor="file" >
            <img src={imageIcon}  alt="upload icon" />
          </label>
        </div>
        {/* <div >
      {props.progress > 0 ? <progress value={props.progress} max="100" /> : ""}
      <p style={{ color: "red" }}>{props.error}</p>
    </div> */}
      </div>
    );

    export default ImageSelector;