// import * as Sentry from "@sentry/browser";

// import Raven from "raven-js";

function init() {
  // Sentry.init({
  //   dsn: "https://2d11f9b4f0b549378f962eadfe39fddb@sentry.io/1888552"
  // });
  // Raven.config("https://2d11f9b4f0b549378f962eadfe39fddb@sentry.io/1888552", {
  //   release: "1.0.0",
  //   environment: "development-test"
  // }).install();
  // Sentry.init({
  //   dsn: "https://ec637d24f41e4b53b14216458d431c00@sentry.io/1888557"
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log(error);
}

export default {
  init,
  log
};
