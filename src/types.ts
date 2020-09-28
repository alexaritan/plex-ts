export interface CreateClientInput {
	httpClient?(url: string, options: HttpClientOptions): Promise<any>;
	serverUrl: string;
	token: string;
}

interface HttpClientOptions {
	method: string;
	body?: string;
	headers?: {
		'Content-Type': string;
	};
}

export interface PlexClient {
	get(resourceUrl: string): Promise<any>;
	getLibraries(): Promise<Library[]>;
	getVideoLibraryContents(key: number | string): Promise<Movie[]>;
}

export interface Library {
	allowSync: string;
	art: string;
	composite: string;
	filters: string;
	refreshing: string;
	thumb: string;
	key: string;
	type: string;
	title: string;
	agent: string;
	scanner: string;
	language: string;
	uuid: string;
	updatedAt: string;
	createdAt: string;
	scannedAt: string;
	content: string;
	directory: string;
	contentChangedAt: string;
	hidden: string;
}

export interface Movie {
	ratingKey: string;
	key: string;
	guid: string;
	studio: string;
	type: string;
	title: string;
	contentRating: string;
	summary: string;
	rating: string;
	audienceRating: string;
	year: string;
	tagline: string;
	thumb: string;
	art: string;
	duration: string;
	originallyAvailableAt: string;
	addedAt: string;
	updatedAt: string;
	audienceRatingImage: string;
	primaryExtraKey: string;
	ratingImage: string;
}
