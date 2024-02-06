import { writable } from "svelte/store";

export const toasts = writable([]);

export const addToast = (toast) => {
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults = {
    id,
    type: "info",
  };

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  setTimeout(() => dismissToast(id), 3000);
};

export const success = async(message) => {
    addToast({
        type: 'success',
        message
    });
}

export const info = async(message) => {
    addToast({
        type: 'info',
        message
    });
}

export const error = async(message) => {
    addToast({
        type: 'error',
        message
    });
}

export const dismissToast = (id) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};