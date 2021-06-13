import Form from "./form.js";
import ConfirmMessage from "./confirm-message.js";
const { createComponent, replaceNode } = odom;

const markup = `
  <div class="signup">
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
  const onsuccess = async () => {
    const confirmMessage = await ConfirmMessage();
    const formElement = signup.select("form", false);
    const response = await sendForm(formElement);

    if (response.status === 200) replaceNode(formElement, confirmMessage.scope);
    else form.onSignupFail();
  };

  const form = await Form({ onsuccess });

  const signup = await createComponent({
    markup,
    styles,
    utils: {
      methods: { onsuccess },
      components: { form }
    }
  });

  return signup;
};

const sendForm = async (form) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ status: 200 }), 1000);
  });

  const formData = new URLSearchParams(new FormData(form));

  return await fetch("/api/signup", {
    method: "POST",
    body: formData
  });
};

export default Signup;
