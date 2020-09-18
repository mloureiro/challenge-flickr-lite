import { el } from 'lib/dom';
import { galleryComponent } from '~/ui/components/gallery';
import { loaderButtonComponent } from '~/ui/components/loaderButton';
import './gallery.css';

export const gallery = ({ onLoadMore }) => {
	const { element: galleryElement, ...galleryActions } = galleryComponent({
		class: 'home--gallery',
	});
	const {
		element: loadMoreButtonElement,
		...loadMoreButtonActions
	} = loaderButtonComponent(
		{
			onClick: () =>
				onLoadMore().then((photos) => photos && gallery.append(photos)),
		},
		{},
		'Load more',
	);

	const loadMoreButtonWrapper = el(
		'div',
		{ class: 'home--gallery-load-more hidden' },
		loadMoreButtonElement,
	);

	const element = el('div', { class: 'home--gallery-wrapper' }, [
		galleryElement,
		loadMoreButtonWrapper,
	]);

	return {
		element,
		...galleryActions,
		...loadMoreButtonActions,
		showLoadMoreButton() {
			loadMoreButtonWrapper.classList.remove('hidden');
		},
		hideLoadMoreButton() {
			loadMoreButtonWrapper.classList.add('hidden');
		},
	};
};
