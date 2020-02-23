import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import PasswordForm from "./components/passwordForm";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/password" component={PasswordForm} />
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/" component={LoginForm} />
          {/* <Redirect from="/" exact to="/login" /> */}
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
