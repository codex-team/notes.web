/**
 * Scripts that are loaded or loading, so each one is added to the page once
 */
const scripts = new Map<string, Promise<Event>>();

/**
 * Loads script by specified url
 * @param src - script source url
 */
export function loadScript(src: string): Promise<Event> {
  const loading = scripts.get(src) ?? new Promise<Event>((resolve, reject) => {
    const script = document.createElement('script');

    script.src = src;
    script.onload = resolve;
    script.onerror = (event) => {
      script.remove();
      scripts.delete(src);
      reject(event);
    };
    document.head.appendChild(script);
  });

  scripts.set(src, loading);

  return loading;
}
