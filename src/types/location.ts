export type ResultSource = 'database' | 'google_api';

export interface LocationRecord {
  // Present for results already saved in the database; absent for
  // fresh Google Places results that haven't been selected/saved yet.
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string | null;
}

export interface SearchLocationMessage {
  type: 'search_location';
  requestId: string;
  query: string;
}

export interface SaveLocationMessage {
  type: 'save_location';
  location: {
    name: string;
    latitude: number;
    longitude: number;
    address: string | null;
  };
}

export type OutgoingMessage = SearchLocationMessage | SaveLocationMessage;

export interface LocationResultsMessage {
  type: 'location_results';
  requestId: string;
  source: ResultSource;
  data: LocationRecord[];
}

export interface LocationSavedMessage {
  type: 'location_saved';
  success: true;
  locationId: number;
}

export interface ErrorMessage {
  type: 'error';
  requestId?: string;
  message: string;
}

export type IncomingMessage = LocationResultsMessage | LocationSavedMessage | ErrorMessage;
