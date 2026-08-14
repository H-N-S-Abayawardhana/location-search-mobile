export interface LocationRecord {
  id?: number;
  // Present for unsaved Google Places predictions, which don't carry
  // coordinates until resolved via a Place Details lookup on save.
  placeId?: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
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
    placeId?: string;
    name: string;
    latitude: number | null;
    longitude: number | null;
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
