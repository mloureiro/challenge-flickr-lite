import { fetcher } from 'lib/fetcher';
import { client as baseClient } from './client';
import { search } from './services/search';

export const client = (apiKey) => {
	const clientWithFetcher = baseClient({ fetcher, apiKey });

	return {
		search: search(clientWithFetcher),
	};
};
