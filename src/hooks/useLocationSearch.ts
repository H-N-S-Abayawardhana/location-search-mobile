import { useCallback, useEffect, useRef, useState } from 'react';
import { websocketClient } from '../services/websocketClient';
import { LocationRecord } from '../types/location';

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 2;

let requestCounter = 0;
function nextRequestId(): string {
  requestCounter += 1;
  return `${Date.now()}-${requestCounter}`;
}

export function useLocationSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationRecord[]>([]);
  const [similarResults, setSimilarResults] = useState<LocationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savingLocation, setSavingLocation] = useState<string | null>(null);

  const activeRequestId = useRef<string | null>(null);

  useEffect(() => {
    websocketClient.connect();

    return websocketClient.subscribe((message) => {
      if (message.type === 'location_results') {
        if (message.requestId !== activeRequestId.current) {
          return;
        }
        setResults(message.data);
        setSimilarResults(message.similar);
        setLoading(false);
      } else if (message.type === 'location_saved') {
        setSavingLocation(null);
      } else if (message.type === 'error') {
        if (message.requestId && message.requestId !== activeRequestId.current) {
          return;
        }
        setError(message.message);
        setLoading(false);
        setSavingLocation(null);
      }
    });
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      activeRequestId.current = null;
      setResults([]);
      setSimilarResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const timeout = setTimeout(() => {
      const requestId = nextRequestId();
      activeRequestId.current = requestId;
      setLoading(true);
      setError(null);
      websocketClient.send({ type: 'search_location', requestId, query: trimmed });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [query]);

  const selectLocation = useCallback((location: LocationRecord) => {
    setSavingLocation(location.name);
    websocketClient.send({
      type: 'save_location',
      location: {
        placeId: location.placeId,
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address,
      },
    });
  }, []);

  return { query, setQuery, results, similarResults, loading, error, savingLocation, selectLocation };
}
