import React from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import { css } from "glamor";

class PasswordForm extends Form {
  state = {
    data: { password: "" },
    username: localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "",
    errors: {},
    redirectToLogin: false
  };

  schema = {
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { username, data } = this.state;
      await userService.login(username, data.password);
      toast("Successful login.", {
        autoClose: 5000,
        hideProgressBar: true,
        bodyClassName: css({
          fontSize: "16px",
          color: "#000000",
          background: "#38abdf",
          opacity: 0.7,
          lineHeight: "22px"
        }),
        position: "top-center"
      });
      this.setState({ redirectToLogin: true }, () => {
        localStorage.removeItem("username");
      });
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 404)
      ) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const styles = {
      loginHeading: {
        fontSize: 22,
        marginTop: 48,
        marginBottom: 24,
        color: "#000000",
        textAlign: "center"
      },
      learnMore: {
        color: "#5aaaff"
      },
      titleName: {
        fontSize: 16,
        color: "#3c3c3c"
      },
      titleInput: {
        fontSize: 16,
        marginTop: 8,
        color: "#3c3c3c"
      },
      nextButton: {
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 12,
        fontSize: 16,
        color: "#ffffff"
      },
      newToAutodesk: {
        fontSize: 14,
        lineHeight: 1.428,
        color: "#808080"
      },
      createAccount: {
        fontSize: 14,
        lineHeight: 1.428,
        color: "#006eaf"
      },
      footerText: {
        fontSize: 14,
        lineHeight: 1.428,
        color: "#999999"
      },
      footerBlock: {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        textAlign: "center"
      },
      styleError: {
        background: "#dcdcdc",
        border: "1px solid #bbbbbb",
        borderRadius: 4,
        color: "#999999"
      },
      arrowLeft: {
        fontSize: 20,
        color: "#007bff",
        fontWeight: "bolder",
        float: "left",
        marginTop: 48
      },
      usernameDisplay: {
        fontSize: 14,
        color: "#808080"
      }
    };
    const username = localStorage.getItem("username");
    if (!username) return <Redirect to="/" />;

    return (
      <>
        {this.state.redirectToLogin ? (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ) : null}
        <div className="row loginForm">
          <div className="col-1 col-sm-1 col-md-3"></div>
          <div className="col-10 col-sm-10 col-md-6">
            <Link to="/">
              <i className="fa fa-angle-left" style={styles.arrowLeft}></i>
            </Link>
            <p style={styles.loginHeading}>
              <span>Welcome</span>
              <br />
              <span style={styles.usernameDisplay}>{username}</span>
            </p>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput(
                "password",
                "Password",
                "password",
                styles.titleName,
                styles.titleInput,
                styles.styleError
              )}
              {this.renderButton("Sign in", styles.nextButton)}
            </form>
            <p className="text-center" style={styles.footerBlock}>
              <span style={styles.footerText}>
                Your account for everything Autodesk
              </span>
              <br />
              <span style={styles.learnMore}>
                <a href="/#">Learn more</a>
              </span>
            </p>
          </div>
          <div className="col-1 col-sm-1 col-md-3"></div>
        </div>
      </>
    );
  }
}

export default PasswordForm;
