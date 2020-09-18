import { el } from 'lib/dom';
import './spinner.css';

/**
 * This spinner is based on source: https://tobiasahlin.com/spinkit/
 */
export const spinner = (attributes = {}) => {
	const element = el(
		'div',
		{
			...attributes,
			class: `spinner ${attributes.class || ''}`,
		},
		[
			el('div', { class: 'spinner--bounce1' }),
			el('div', { class: 'spinner--bounce2' }),
			el('div', { class: 'spinner--bounce3' }),
		],
	);

	return { element };
};
