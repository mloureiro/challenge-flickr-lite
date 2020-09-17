import { FLICKR_API_KEY } from '../../.env.json';

import { client } from 'lib/flickr';

export const flickr = client(FLICKR_API_KEY);
