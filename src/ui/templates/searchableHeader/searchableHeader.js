import './searchableHeader.css';
import { el } from 'lib/dom';
import { searchComponent } from '~/ui/components/search';

const headerComponent = ({ onSubmit }) => {
	const { element: search, ...actions } = searchComponent(
		{ onSubmit },
		{ class: 'main-header--search' },
	);
	const element = el(
		'div',
		{ class: 'main-header--wrapper' },
		el('header', { class: 'main-header' }, [
			el('p', { class: 'main-header--title' }, [
				'flickr',
				el('sub', { class: 'main-header--title-sub' }, 'lite'),
			]),
			search,
		]),
	);

	return {
		element,
		search: actions,
	};
};

const footerComponent = () =>
	el('footer', { class: 'main-footer' }, [
		el('span', { class: 'main-footer--message' }, [
			'Check the code at ',
			el(
				'a',
				{
					class: 'main-footer--message--github',
					// @TODO move URL to constant file
					href: 'https://github.com/mloureiro/flickr-lite',
				},
				'GitHub',
			),
		]),
	]);

export const searchableHeader = ({ onSubmit }, attributes = {}, children) => {
	const header = headerComponent({ onSubmit });
	const footer = footerComponent({});
	const element = el(
		'div',
		{
			...attributes,
			class: `main--wrapper ${attributes.class || ''}`,
		},
		[header.element, el('main', { class: 'main--main' }, children), footer],
	);

	return {
		element,
		search: header.search,
	};
};
