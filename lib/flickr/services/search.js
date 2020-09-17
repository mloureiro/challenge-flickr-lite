import { mapPhoto } from './mappers';

export const search = (client) => (terms, { page = 1, total = 50 } = {}) =>
	client
		.fetch({
			method: 'flickr.photos.search',
			text: terms, // @TODO understand why using terms shows unrelated content
			// workaround for above use tags instead
			// tags: terms.split(' ').join(','),
			// text: '',
			page,
			per_page: total,
			content_type: 1, // exclude screenshots
			media: 'photos', // only photos @TODO add video support
			extras: 'owner_name,tags,url_q,url_n,url_z,url_b,url_k',
			sort: 'interestingness-desc',
			safe_search: 1,
		})
		.then((response) => {
			const {
				page: currentPage,
				pages,
				total: totalPhotos,
				photo,
			} = response.photos;

			return {
				pageInfo: {
					current: currentPage,
					total: pages,
					totalPhotos,
					hasNextPage: page < pages,
				},
				nodes: photo.map(mapPhoto),
			};
		});
