import { gallery as galleryComponent } from './gallery';

import { flickr } from '~/api/flickrClient';
import { notificationBannerComponent } from '~/ui/components/notificationBanner';
import { searchableHeaderTemplate } from '~/ui/templates/searchableHeader';

export const home = () => {
	// these are required due to the eslint rule 'no-use-before-define'
	// even though all the variables are used within callbacks
	let gallery;
	let search;
	let notificationBanner;

	const state = {
		terms: '',
		pageInfo: null,
		isLoading: false,
	};

	// terms have to be passed in so that we ensure that the loaded
	// data belongs to the latest search, concurrency issues
	// (ex: slow connection)
	const handleFetchResponse = (terms) => ({ pageInfo, nodes }) => {
		if (state.terms !== terms) {
			return null;
		}

		state.pageInfo = pageInfo;
		if (pageInfo.hasNextPage) {
			gallery.showLoadMoreButton();
		} else {
			gallery.hideLoadMoreButton();
		}

		return nodes;
	};

	const handleErrorResponse = (error) =>
		notificationBanner.addError(error.message);

	const performSearch = ({ terms }) => {
		state.terms = terms;
		state.isLoading = true;
		search.setLoadingState(true);

		return flickr
			.search(terms)
			.then(handleFetchResponse(terms))
			.catch(handleErrorResponse)
			.finally(() => {
				state.isLoading = false;
				search.setLoadingState(false);
			});
	};

	const fetchMore = () => {
		const emptyReturn = Promise.resolve();

		if (state.isLoading) {
			return emptyReturn;
		}

		if (!state.pageInfo) {
			notificationBanner.addError('Something unexpected happen.');

			return emptyReturn;
		}

		if (!state.pageInfo.hasNextPage) {
			notificationBanner.addInfo('End of the list');

			return emptyReturn;
		}

		state.isLoading = true;
		gallery.setLoadingState(true);

		return flickr
			.search(state.terms, { page: state.pageInfo.current + 1 })
			.then(handleFetchResponse(state.terms))
			.catch(handleErrorResponse)
			.finally(() => {
				state.isLoading = false;
				gallery.setLoadingState(false);
			});
	};

	gallery = galleryComponent({
		onLoadMore: () =>
			fetchMore().then((photos) => photos && gallery.append(photos)),
	});
	notificationBanner = notificationBannerComponent();

	const onSubmit = (terms) =>
		performSearch({ terms }).then(
			(photos) => photos && gallery.replace(photos),
		);

	const template = searchableHeaderTemplate({ onSubmit }, {}, [
		notificationBanner.element,
		gallery.element,
	]);
	search = template.search;

	// just to fill the contents with something
	onSubmit('');

	return { element: template.element };
};
