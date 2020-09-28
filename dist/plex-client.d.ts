import { RequestOptions, BaseCapabilitiesResponse, LibrarySectionResponse, PlexClientOptions } from './types';
export declare class PlexClient {
    #private;
    constructor(options: PlexClientOptions);
    getBaseServerCapabilities(): Promise<BaseCapabilitiesResponse>;
    getLibrarySections(): Promise<LibrarySectionResponse>;
    getServerUrl(): string;
    _request(options: RequestOptions): Promise<any>;
}
