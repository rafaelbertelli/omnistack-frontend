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
    debugger;
    const response = await api.get(`/boxes/${box}`);

    this.setState({ box: response.data });
  }

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="omnistack-logo" />
          <h1>{this.state.box.title}</h1>
        </header>

        <section>
          <Dropzone>{(getRootProps, getInputProps) => <p>a</p>}</Dropzone>
        </section>

        <section>
          <ul>
            {this.state.box.files &&
              this.state.box.files.map(file => (
                <li>
                  <a className="fileInfo" href={file.url} target="_blank">
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
