import app from "./components/app.js";
const { render } = odom;

(async () => {
  const App = await app();
  App.render("#app");
})();
