const { createComponent } = odom;

const markup = `
  <section class="hide">
    <h2>Signup Successful</h2>
    <a href="/login">Sign In</a>
  </section>
`;

const styles = `
  :scope {
    width: 300px;
    padding: var(--spacer-lg);
    display: grid;
    place-items: center;
    color: var(--success);
  }

  h2 {
    margin: 0;
    margin-bottom: var(--spacer-md);
  }

  a {
    border-radius: var(--spacer-xs);
    padding: var(--spacer-sm) var(--spacer-md);
    background-color: var(--primary);
    text-decoration: none;
    color: white;
  }

  @media (min-width: 576px) {
    :scope {
      border: 2px solid var(--light);
      border-radius: var(--spacer-md);
    }
  }
`;

const AlertMessage = async () => {
  const show = (message) => {
    const text = AlertMessage.select(".text");
    if (message) text.textContent = message;
    AlertMessage.scope.classList.remove(".hide");
  };

  const hide = () => AlertMessage.scope.classList.add(".hide");

  const props = { show };

  const AlertMessage = await createComponent({ markup, styles });
  return AlertMessage;
};

export default AlertMessage;
