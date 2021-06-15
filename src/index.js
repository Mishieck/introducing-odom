import App from "./components/app.js";

(async () => {
  const app = await App();
  app.render("#app");
})();
