import { API_BASE_URL } from './constants';

export const client = ({ fetcher, apiKey }) => {
	const flickrFetch = ({ method, ...parameters }) =>
		fetcher({
			method: 'GET',
			url: API_BASE_URL,
			queryParameters: {
				api_key: apiKey,
				method,
				format: 'json',
				nojsoncallback: 1,
				...parameters,
			},
		})
			.then((response) => response.json())
			.then((body) => {
				// all responses return a 200 OK, so we have to handle the errors
				// by reading the status ("stat").
				if (body.stat !== 'ok') {
					throw Error(`[${body.code}]: ${body.message}`);
				}

				return body;
			});

	return {
		fetch: flickrFetch,
	};
};
