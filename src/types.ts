export interface BaseCapabilitiesResponse {

}

export interface LibrarySectionResponse {
	MediaContainer: {
		$: {
			size: string,
			title1: string
		},
		Directory: {
			$: {
				key: string,
				title: string,
				type: string,
				updatedAt: string,
				uuid: string
			},
			Location: {
				$: {
					id: string,
					path: string
				}
			}[]
		}[]
	}
}

export interface PlexClientOptions {
	serverIp: string,
	serverPort?: number
}

export interface RequestOptions {
	body?: string,
	method?: METHOD,
	url: string
}

export enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT'
}