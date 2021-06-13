const { createComponent } = odom;

const markup = `
	<section class="input-group">
		<label for="@props.inputID">
			<span odom-text="label"></span>
		</label>
		<input />
		<span class="message"></span>
	</section>
`;

const styles = `
	:scope {
		display: flex;
		flex-direction: column;
	}
	
	label {
		text-transform: uppercase;
		font-size: 0.8rem;
    font-weight: 600;
	}
	
	input {
		margin: var(--spacer-xs) 0;
    padding: 0.5rem;
    border: 2px solid var(--light);
    border-radius: 0.25rem;
    font-size: 1.2rem;
	}
	
	input:focus {
		outline: 2px solid var(--light);
	}
	
	input.invalid {
		border-color: var(--error);
	}
	
	.message {
		font-size: 0.8rem;
	}
	
	.message.valid {
		color: var(--success);
	}
	
	.message.invalid {
		color: var(--error);
	}
`;

const InputGroup = async (props) => {
  const updateValue = (value) => {
    InputGroup.dynamicData.valid = value;
    return value;
  };

  const updateValidity = (value) => {
    const valid = InputGroup.pattern.test(value);
    updateMessage(valid ? InputGroup.successMessage : InputGroup.errorMessage, valid);
    return valid;
  };

  const updateMessage = (message, valid) => {
    messageElement.textContent = message;
    messageElement.classList.add(valid ? "valid" : "invalid");
    messageElement.classList.remove(valid ? "invalid" : "valid");
  };

  const hasValidValue = () => {
    updateInputBorder();
    return InputGroup.dynamicData.valid;
  };

  const updateInputBorder = () => {
    if (InputGroup.dynamicData.valid) inputElement.classList.remove("invalid");
    else inputElement.classList.add("invalid");
  };

  const valueUpdaters = [updateValue];

  if (props.observer) {
    valueUpdaters.push(props.observer);
    props.observer = undefined;
  }

  const data = {
    dynamic: {
      value: {
        data: "",
        updaters: valueUpdaters
      },
      valid: {
        data: false,
        updaters: [updateValidity]
      }
    }
  };

  props.inputID = `signup-${props.name}`;

  const attributes = {
    input: {
      type: props.type,
      id: props.inputID,
      name: props.name,
      value: "::@data.value"
    }
  };

  const texts = {
    label: props.label,
    successMessage: props.successMessage
  };

  props.hasValidValue = hasValidValue;
  const options = { props, markup, styles, attributes, utils: { data, texts } };
  const InputGroup = await createComponent(options);
  const inputElement = InputGroup.select("input", false);
  const messageElement = InputGroup.select("span", false);
  return InputGroup;
};

export default InputGroup;
