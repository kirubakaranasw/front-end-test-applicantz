import React from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      usernameF: "",
      reusername: "",
      passwordF: "",
      repassword: ""
    },
    errors: {},
    redirectToLogin: false
  };

  schema = {
    firstname: Joi.string()
      .required()
      .label("Firstname"),
    lastname: Joi.string()
      .required()
      .label("Lastname"),
    usernameF: Joi.string()
      .required()
      .label("Username"),
    reusername: Joi.string()
      .valid(Joi.ref("usernameF"))
      .required()
      .label("Re-type username")
      .options({ language: { any: { allowOnly: "must match username" } } }),
    passwordF: Joi.string()
      // .min(3)
      // .max(15)
      .required()
      .label("Password"),
    repassword: Joi.any()
      .valid(Joi.ref("passwordF"))
      .required()
      .label("Re-type password")
      .options({ language: { any: { allowOnly: "must match password" } } })
  };

  componentDidMount() {
    localStorage.removeItem("username");
    localStorage.removeItem("usernameF");
    localStorage.removeItem("passwordF");
  }
  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
      localStorage.setItem("newUserLogin", this.state.data.usernameF);
      this.setState({ redirectToLogin: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
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
        color: "#000000"
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
        // position: "fixed",
        // left: 0,
        // bottom: 0,
        // width: "100%",
        // textAlign: "center"
      },
      styleError: {
        background: "#dcdcdc",
        border: "1px solid #bbbbbb",
        borderRadius: 4,
        color: "#999999"
      },
      alreadyAccount: {
        marginBottom: 32
      }
    };

    return (
      <>
        {this.state.redirectToLogin ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: this.props.location }
            }}
          />
        ) : null}

        <div className="row loginForm">
          <div className="col-1 col-sm-1 col-md-3"></div>
          <div className="col-10 col-sm-10 col-md-6">
            <h1 style={styles.loginHeading}>Create account</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-6">
                  {this.renderInput(
                    "firstname",
                    "Firstname",
                    "",
                    styles.titleName,
                    styles.titleInput,
                    styles.styleError
                  )}
                </div>
                <div className="col-6">
                  {this.renderInput(
                    "lastname",
                    "Lastname",
                    "",
                    styles.titleName,
                    styles.titleInput,
                    styles.styleError
                  )}
                </div>
              </div>
              {this.renderInput(
                "usernameF",
                "Username",
                "",
                styles.titleName,
                styles.titleInput,
                styles.styleError
              )}
              {this.renderInput(
                "reusername",
                "Re-type Username",
                "",
                styles.titleName,
                styles.titleInput,
                styles.styleError
              )}
              {this.renderInput(
                "passwordF",
                "Password",
                "password",
                styles.titleName,
                styles.titleInput,
                styles.styleError
              )}
              {this.renderInput(
                "repassword",
                "Re-type Password",
                "password",
                styles.titleName,
                styles.titleInput,
                styles.styleError
              )}
              {this.renderButton("Create account", styles.nextButton)}
            </form>
            <p className="text-center" style={styles.alreadyAccount}>
              <span style={styles.newToAutodesk}>Already have an account?</span>{" "}
              <Link to={"/"}>Sign in</Link>
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

export default RegisterForm;
