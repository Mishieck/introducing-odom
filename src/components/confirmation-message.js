const { createComponent } = odom;

const markup = `
  <section>
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

const ConfirmationMessage = async () => {
  const confirmationMessage = await createComponent({ markup, styles });
  return confirmationMessage.scope;
};

export default ConfirmationMessage;
