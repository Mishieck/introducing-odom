import Signup from "./signup.js";
const { createComponent } = odom;

const markup = `
  <div>
    <div odom-src="Signup"></div>
  </div>
`;

const styles = `
  :scope {
    --dark: #444;
    --error: #c44;
    --gray: #080808;
    --light: #ccc;
    --primary: #a985f1;
    --success: #4c4;
    --spacer: 1rem;
    --spacer-xs: calc(var(--spacer) * 0.25);
    --spacer-sm: calc(var(--spacer) * 0.5);
    --spacer-md: var(--spacer);
    --spacer-lg: calc(var(--spacer) * 2);
    --spacer-xl: calc(var(--spacer) * 3);
    width: 100vw;
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    color: var(--dark);
  }
`;

const App = async () => {
  return createComponent({
    markup,
    styles,
    utils: {
      components: { Signup }
    }
  });
};

export default App;
