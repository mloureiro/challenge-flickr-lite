import { el } from 'lib/dom';
import './search.css';
import { loaderButtonComponent } from '~/ui/components/loaderButton';

const ENTER_KEY_CODE = 13;

export const search = ({ onSubmit }, attributes = {}) => {
	const input = el('input', { class: 'search-input', type: 'text' });
	const { element: button, ...actions } = loaderButtonComponent(
		{
			onClick: () => {
				onSubmit(input.value);
			},
		},
		{ class: 'search-submit' },
		'Find',
	);

	const element = el(
		'div',
		{
			...attributes,
			id: 'search-wrapper',
			class: `search-wrapper ${attributes.class || ''}`,
		},
		[input, button],
	);

	if (onSubmit) {
		input.addEventListener('keypress', (event) => {
			if (event.keyCode === ENTER_KEY_CODE) {
				onSubmit(input.value);
			}
		});
	}

	return {
		element,
		...actions,
	};
};
