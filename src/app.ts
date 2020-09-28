import {PlexClient} from './plex-client';
import * as options from './config/config.json';

const client = new PlexClient(options);
client.getBaseServerCapabilities()