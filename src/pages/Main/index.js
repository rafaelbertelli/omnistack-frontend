import React, { Component } from "react";
import logo from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";

export default class Main extends Component {
  state = {
    newBox: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.newBox);

    const response = await api.post("/boxes", {
      title: this.state.newBox
    });

    console.log(response.data);

    this.props.history.push(`/box/${response.data._id}`);
  };

  handleInputChange = e => {
    this.setState({ newBox: e.target.value });
  };

  render() {
    return (
      <div className="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="omnistack-logo" />
          <input
            placeholder="Criar um box"
            value={this.state.newBox}
            onChange={this.handleInputChange}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}
