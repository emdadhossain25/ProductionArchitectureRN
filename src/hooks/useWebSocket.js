import { useEffect, useCallback } from 'react';
import websocketService from '../services/websocket/websocket.service';
import websocketEvents from '../services/websocket/events';
import { useAppState } from '@react-native-community/hooks';

export function useWebSocket() {
  const appState = useAppState();

  useEffect(() => {
    // Setup event listeners
    websocketEvents.setupEventListeners();

    // Connect when app starts
    websocketService.connect();

    return () => {
      websocketEvents.cleanup();
      websocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    // Handle app state changes
    if (appState === 'active') {
      websocketService.connect();
    } else if (appState === 'background') {
      websocketService.disconnect();
    }
  }, [appState]);

  const subscribe = useCallback((channel) => {
    websocketService.subscribe(channel);
  }, []);

  const unsubscribe = useCallback((channel) => {
    websocketService.unsubscribe(channel);
  }, []);

  const send = useCallback((type, data) => {
    return websocketService.send(type, data);
  }, []);

  const on = useCallback((event, callback) => {
    return websocketService.on(event, callback);
  }, []);

  return {
    subscribe,
    unsubscribe,
    send,
    on,
    isConnected: websocketService.isConnected(),
  };
}
