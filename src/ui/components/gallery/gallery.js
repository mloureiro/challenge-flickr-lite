import { el } from 'lib/dom';
import './gallery.css';

// @TODO display photo info (author, title)

const photo = ({ img }) =>
	el(
		'li',
		{},
		el('div', {
			class: 'gallery--photo',
			style: `background-image: url(${img.small.src});`,
		}),
	);

const emptyGallery = () =>
	el('li', {}, el('p', {}, "It's empty, try to search for something..."));

export const gallery = (attributes = {}) => {
	const element = el(
		'div',
		{
			...attributes,
			id: 'gallery',
			class: `gallery ${attributes.class || ''}`,
		},
		emptyGallery(),
	);
	const reset = () => {
		element.innerHTML = '';
	};

	return {
		element,
		replace(photos) {
			reset();
			if (photos.length === 0) {
				element.append(emptyGallery());
			} else {
				element.append(...photos.map(photo));
			}
		},
		append(photos) {
			element.append(...photos.map(photo));
		},
	};
};
