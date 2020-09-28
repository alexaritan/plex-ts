import fetch from 'node-fetch';
import {parseStringPromise} from 'xml2js';
import {
	RequestOptions,
	BaseCapabilitiesResponse,
	LibrarySectionResponse,
	METHOD,
	PlexClientOptions
} from './types';

export class PlexClient {

	#serverIp: string;
	#serverPort: number | undefined

	constructor(options: PlexClientOptions) {
		this.#serverIp = options.serverIp;
		this.#serverPort = options.serverPort;
	}

	async getBaseServerCapabilities(): Promise<BaseCapabilitiesResponse> {
		const options: RequestOptions = {
			url: `${this.getServerUrl()}`
		};
		const xml: BaseCapabilitiesResponse = await this._request(options);
		return xml;
	}

	async getLibrarySections(): Promise<LibrarySectionResponse> {
		const options: RequestOptions = {
			url: `${this.getServerUrl()}/library/sections`
		};
		const xml: LibrarySectionResponse = await this._request(options);
		return xml;
	}

	getServerUrl(): string {
		const url = this.#serverIp;
		return this.#serverPort === undefined ? url : `${url}:${this.#serverPort}`
	}

	private async _request(options: RequestOptions): Promise<any> {
		//Set default method to GET if not provided.
		if(!options.method) options.method = METHOD.GET;
		const rawxml = await fetch(options.url, options).then(res => res.text());
		const xml = await parseStringPromise(rawxml);
		return xml;
	}

}