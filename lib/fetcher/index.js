import { client } from './client';

// I'm injecting global fetch here so that it's easier to test
// and this way we have a single place for it, which in case of
// it not being supported (like within NodeJS)
export const fetcher = client(fetch);
