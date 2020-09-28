import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';
import { CreateClientInput, Library, Movie, PlexClient } from './types';
import { LIBRARIES, LIBRARY_CONTENTS } from './urls';

const makeRequest = async ({ httpClient, token, url, options }: any) => {
	//Handle the raw xml response.
	const xml: string = await httpClient(
		`${url}?X-Plex-Token=${token}`,
		options
	).then((res: { text(): Promise<string> }) => res.text());

	//Parse the xml to json.
	return await parseStringPromise(xml);
};

export const createClient = ({
	httpClient = fetch,
	serverUrl,
	token,
}: CreateClientInput): PlexClient => {
	return {
		async get(resourceUrl: string): Promise<any> {
			//Construct the request.
			const url = `${serverUrl}${resourceUrl}`;
			const options = {
				method: 'GET',
			};

			//Make the request and parse it to json.
			const response = await httpClient(
				`${url}?X-Plex-Token=${token}`,
				options
			);

			return response;
		},
		async getLibraries(): Promise<Library[]> {
			//Construct the request.
			const url = `${serverUrl}${LIBRARIES}`;
			const options = {
				method: 'GET',
			};

			//Make the request and parse it to json.
			const response = await makeRequest({ httpClient, url, options, token });

			//Parse out and return the libraries.
			return response.MediaContainer.Directory.map(
				(library: { $: Library }) => library['$']
			);
		},
		async getVideoLibraryContents(key: number | string) {
			//Construct the request.
			const url = `${serverUrl}${LIBRARY_CONTENTS(key)}`;
			const options = {
				method: 'GET',
			};

			//Make the request and parse it to json.
			const response = await makeRequest({ httpClient, url, options, token });

			//Parse out and return contents.
			return response.MediaContainer.Video.map((vid: { $: Movie }) => vid['$']);
		},
	};
};
