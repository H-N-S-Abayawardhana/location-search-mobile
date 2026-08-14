export interface LocationRecord {
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
  data: LocationRecord[];
  similar: LocationRecord[];
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
