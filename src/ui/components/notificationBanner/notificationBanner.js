import './notificationBanner.css';
import { el } from 'lib/dom';

const notification = ({ message, type }) => {
	const closeButton = el(
		'span',
		{ class: 'notification-banner--notification--close' },
		'🆇',
	);

	const element = el(
		'div',
		{ class: `notification-banner--notification ${type}` },
		[
			el(
				'span',
				{ class: 'notification-banner--notification--message' },
				message,
			),
			closeButton,
		],
	);

	closeButton.addEventListener('click', () => element.remove());

	return element;
};

export const notificationBanner = (attributes = {}) => {
	const element = el('div', {
		...attributes,
		id: 'notification-banner',
		class: `notification-banner ${attributes.class || ''}`,
	});

	const addNotification = (props) => {
		const notificationElement = notification(props);
		element.append(notificationElement);
		setTimeout(() => notificationElement.remove(), 3000);
	};

	return {
		element,
		addError: (message) => addNotification({ message, type: 'error' }),
		addWarning: (message) => addNotification({ message, type: 'warn' }),
		addInfo: (message) => addNotification({ message, type: 'info' }),
	};
};
