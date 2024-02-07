// eventBus.js
import { ref, provide, inject } from "vue";

// Create a reactive reference to store event handlers
const eventHandlers = ref({});

// Function to emit events
function emitEvent(event, data) {
  const handlers = eventHandlers.value[event];
  if (handlers) {
    handlers.forEach((handler) => handler(data));
  }
}

// Function to listen to events
function onEvent(event, handler) {
  if (!eventHandlers.value[event]) {
    eventHandlers.value[event] = [];
  }
  eventHandlers.value[event].push(handler);
}

// Export event bus functions
export function useEventBus() {
  return {
    emitEvent,
    onEvent,
  };
}

// Provide the event bus to be used in components
export function provideEventBus() {
  provide("eventBus", useEventBus());
}

// Inject the event bus in components
export function injectEventBus() {
  return inject("eventBus");
}
