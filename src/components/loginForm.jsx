import React from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { css } from "glamor";
import * as userService from "../services/userService";

class LoginForm extends Form {
  state = {
    data: {
      username: localStorage.getItem("username")
        ? localStorage.getItem("username")
        : localStorage.getItem("newUserLogin")
        ? localStorage.getItem("newUserLogin")
        : ""
    },
    errors: {},
    redirectToPassword: false,
    showVerifying: false
  };

  componentDidMount() {
    const newUserLog = localStorage.getItem("newUserLogin");
    if (newUserLog) {
      toast("Account created successfully", {
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
      localStorage.setItem("username", newUserLog);
    }
    localStorage.removeItem("newUserLogin");
  }
  schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
              err.message = "Username should not be empty.";
              break;
            default:
              err.message = "The username is not recognized.";
              break;
          }
        });
        return errors;
      })
  };

  doSubmit = async () => {
    try {
      this.setState({ showVerifying: true });
      const { username } = this.state.data;
      await userService.checkUser(username);
      this.setState({ redirectToPassword: true }, () => {
        this.setState({ showVerifying: false });
      });
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 404)
      ) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ showVerifying: false }, () => {
          this.setState({ errors });
        });
      }
    }
  };

  render() {
    const styles = {
      loginHeading: {
        fontSize: 22,
        marginTop: 48,
        marginBottom: 24,
        color: "#000000"
      },
      learnMore: {
        color: "#5aaaff"
      },
      titleName: {
        fontSize: 16,
        // marginTop: 22,
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
      }
    };

    return (
      <>
        {this.state.redirectToPassword ? (
          <Redirect
            to={{
              pathname: "/password"
            }}
          />
        ) : null}
        <div className="row loginForm">
          <div className="col-1 col-sm-1 col-md-3"></div>
          <div className="col-10 col-sm-10 col-md-6">
            <h1 style={styles.loginHeading}>Sign in</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput(
                "username",
                "Username",
                "",
                styles.titleName,
                styles.titleInput,
                styles.styleError
              )}
              {/* <Link to="/password"> */}
              {this.renderButton(
                this.state.showVerifying ? "Verifying" : "Next",
                styles.nextButton
              )}
              {/* </Link> */}
            </form>
            <p className="text-center">
              <span style={styles.newToAutodesk}>New to Autodesk?</span>{" "}
              <Link to={"/register"}>Create account</Link>
            </p>
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

export default LoginForm;
