const parametersToQuery = (parameters = {}) => {
	return Object.keys(parameters)
		.map(
			(name) =>
				`${encodeURIComponent(name)}=${encodeURIComponent(parameters[name])}`,
		)
		.join('&');
};

const buildUrl = (url, parameters) => {
	const query = parametersToQuery(parameters);
	const separator = url.indexOf('?') === -1 ? '?' : '&';

	return `${url}${query ? separator : ''}${query}`;
};

// very simple (and incomplete) wrapper on top of global Fetch
// by having our own client for requests, in case of having to
// change or adapt to some rule, it's easier to deal with a
// single place instead of searching on the full code base and
// changing all references
export const client = (baseFetch) => ({ method, url, queryParameters, body }) =>
	baseFetch(buildUrl(url, queryParameters), {
		method,
		body,
	});
