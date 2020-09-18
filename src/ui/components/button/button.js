import { el } from 'lib/dom';
import './button.css';

export const button = ({ onClick }, attributes = {}, children) => {
	const element = el(
		'button',
		{
			...attributes,
			class: `button ${attributes.class || ''}`,
		},
		children,
	);

	if (onClick) {
		element.addEventListener('click', onClick);
	}

	return {
		element,
		setDisableState(isDisabled) {
			element.disabled = isDisabled;
		},
	};
};
