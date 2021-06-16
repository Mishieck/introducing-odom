const { createComponent } = odom;

const markup = `
  <section class="hide">
    <span class="text"></span>
  </section>
`;

const styles = `
  :scope {
    border-radius: var(--spacer-sm);
    padding: var(--spacer-sm) var(--spacer-md);
    background-color: var(--error);
    color: white;
  }

  :scope.hide {
    display: none;
  }
`;

const AlertMessage = async () => {
  const show = (message) => {
    if (message) text.textContent = message;
    alertMessage.scope.classList.remove("hide");
  };

  const props = { show };
  const alertMessage = await createComponent({ props, markup, styles });
  const text = alertMessage.select(".text", false);
  return alertMessage;
};

export default AlertMessage;
