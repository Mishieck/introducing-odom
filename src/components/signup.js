import Form from "./form.js";
import ConfirmationMessage from "./confirmation-message.js";
const { createComponent, replaceNode } = odom;

const markup = `
  <div>
    <div odom-src="form"></div>
  </div>
`;

const styles = `
  :scope {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 576px) {
    :scope {
      padding-top: var(--spacer-xl);
    }
  }
`;

const Signup = async () => {
  const onvalid = async () => {
    const confirmationMessage = await ConfirmationMessage();
    const formElement = form.scope;
    const response = await sendForm(formElement);

    if (response.status === 200) replaceNode(formElement, confirmationMessage);
    else form.onSignupFail();
  };

  const form = await Form({ onvalid });

  const signup = await createComponent({
    markup,
    styles,
    utils: {
      components: { form }
    }
  });

  return signup.scope;
};

const sendForm = async (form) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ status: 200 }), 500);
  });

  const formData = new URLSearchParams(new FormData(form));

  return await fetch("/api/signup", {
    method: "POST",
    body: formData
  });
};

export default Signup;
