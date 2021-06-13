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
    AlertMessage.scope.classList.remove("hide");
  };

  const props = { show };
  const AlertMessage = await createComponent({ props, markup, styles });
  const text = AlertMessage.select(".text", false);
  return AlertMessage;
};

export default AlertMessage;
