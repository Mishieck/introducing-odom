import AlertMessage from "./alert-message.js";
import InputGroup from "./input-group.js";
const { createComponent } = odom;

const markup = `
  <form>
    <h2 class="heading">Sign Up</h2>
    <section odom-src="alertMessage"></section>
    <section odom-src="name"></section>
    <section odom-src="email"></section>
    <hr />
    <section odom-src="password"></section>
    <section odom-src="confirmPassword"></section>
    <button type="submit">Sign Up</button>
    <footer id="signup-signin">
      <span>Already have an account? </span>
      <a href="#">Sign in</a>.
    </footer> 
  </form>
`;

const styles = `
  :scope {
    width: 100%;
    padding: var(--spacer-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > *:not(footer) {
    margin-bottom: var(--spacer-md);
  }

  .input-group {
    width: 100%;
  }

  .heading {
    margin: 0;
    margin-bottom: var(--spacer-lg);
  }

  hr {
    width: 100%;
    border-top: 2px solid var(--light);
    margin-bottom: 1.5rem;
  }

  button {
    align-self: flex-end;
    border: none;
    border-radius: var(--spacer-xs);
    padding: var(--spacer-sm) var(--spacer-md);
    background-color: var(--primary);
    color: white;
    cursor: pointer;
  }

  button[disabled] {
    background-color: var(--gray);
  }

  footer {
    align-self: flex-start;
  }

  footer a {
    text-decoration: none;
    font-weight: 600;
    color: var(--primary);
  }

  footer a:hover {
    border-bottom: 2px solid var(--primary);
  }

  @media (min-width: 576px) {
    :scope {
      border: 2px solid var(--light);
      border-top-width: var(--spacer-xs);
      border-radius: var(--spacer-md);
      width: 450px;
    }
  }
`;

const props = {
  name: {
    type: "text",
    name: "name",
    label: "Full Name",
    pattern: /[\w\s]{3,}/,
    instruction: "Name must be at least 3 characters",
    errorMessage: "Name must be 3 characters or more",
    successMessage: "Name is valid"
  },
  email: {
    type: "email",
    name: "email",
    label: "Email",
    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    instruction: "Enter valid email",
    errorMessage: "Email is not valid",
    successMessage: "Email is valid"
  },
  password: {
    type: "password",
    name: "password",
    label: "Password",
    pattern: /[\w\s]{8,}/,
    instruction: "Password must be at least 8 characters",
    errorMessage: "Password must be 8 characters or more",
    successMessage: "Valid password"
  },
  confirmPassword: {
    type: "password",
    name: "confirm-password",
    label: "Confirm Password",
    pattern: /[\w\s]{8,}/,
    instruction: "Passwords must match",
    errorMessage: "Passwords do not match",
    successMessage: "Passwords match"
  }
};

const Form = async ({ onvalid }) => {
  const onsubmit = (event) => {
    event.preventDefault();

    let allInputsValid = true,
      invalidInputGroup = null;

    for (const inputGroup of [name, email, password, confirmPassword]) {
      if (inputGroup.hasValidValue()) continue;
      allInputsValid = false;
      invalidInputGroup = inputGroup;
      break;
    }

    if (allInputsValid) {
      button.disabled = true;
      confirmPassword.select("input", false).removeAttribute("name");
      onvalid();
    } else onerror(invalidInputGroup);
  };

  const onerror = (inputGroup) => alertMessage.show(inputGroup.errorMessage);

  const onSignupFail = (message) => {
    if (!message) message = "Failed to sign up. Please try again.";
    alertMessage.show(message);
    button.disabled = false;
  };

  const name = await InputGroup(props.name);
  const email = await InputGroup(props.email);
  const password = await InputGroup(props.password);
  const confirmPassword = await InputGroup(props.confirmPassword);
  const alertMessage = await AlertMessage();

  password.addObserver((value) => {
    confirmPassword.pattern = new RegExp(`^${value}$`);
    confirmPassword.setValidity(false);
  });

  const eventListeners = {
    ":scope": [
      {
        type: "submit",
        listener: onsubmit
      }
    ]
  };

  const components = {
    name,
    email,
    password,
    confirmPassword,
    alertMessage
  };

  const form = await createComponent({
    props: { onSignupFail },
    markup,
    styles,
    eventListeners,
    utils: { components }
  });

  const button = form.select("button", false);
  return form;
};

export default Form;
