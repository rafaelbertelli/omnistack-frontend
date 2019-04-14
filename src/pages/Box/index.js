import React, { Component } from "react";
import logo from "../../assets/logo.svg";
import { MdInsertDriveFile } from "react-icons/md";
import api from "../../services/api";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";

import "./styles.css";

export default class Box extends Component {
  state = {
    box: {}
  };

  async componentDidMount() {
    const box = this.props.match.params.id;
    const response = await api.get(`/boxes/${box}`);

    this.setState({ box: response.data });
  }

  handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const box = this.props.match.params.id;

      data.append("file", file);

      api.post(`boxes/${box}/files`, data);
    });
  };

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="omnistack-logo" />
          <h1>{this.state.box.title}</h1>
        </header>

        <Dropzone onDrop={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className="upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>

        <section>
          <ul>
            {this.state.box.files &&
              this.state.box.files.map(file => (
                <li key={file._id}>
                  <a
                    className="fileInfo"
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdInsertDriveFile size={24} color="#A5CFFF" />
                    <strong>{file.title}</strong>
                  </a>
                  <span>
                    há{" "}
                    {distanceInWords(file.createdAt, new Date(), {
                      locale: pt
                    })}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    );
  }
}
