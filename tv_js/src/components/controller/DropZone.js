import React from "react";
import classNames from "classnames";
import Dropzone from "react-dropzone";

class MyDropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    if (acceptedFiles) {
      let reader = new FileReader();
      let base64data = null;
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = () => {
        base64data = reader.result;
        this.setState({ image: base64data });
      };
    }
  };

  getImage = () => {
    return this.state.image;
  };

  setImage = image => {
    return this.setState({
      image
    });
  };

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          if (!this.state.image) {
            return (
              <div
                {...getRootProps()}
                className={classNames("dropzone", {
                  "dropzone--isActive": isDragActive
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop files here...</p>
                ) : (
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                )}
              </div>
            );
          } else {
            return (
              <div style={{ position: "relative" }}>
                <img height="300px" src={this.state.image} alt="" />
                <p
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "10px",
                    color: "white",
                    fontSize: "25px"
                  }}
                  onClick={() => this.setState({ image: null })}
                >
                  x
                </p>
              </div>
            );
          }
        }}
      </Dropzone>
    );
  }
}

export default MyDropzone;
