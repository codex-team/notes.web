/**
 * Loads script by specified url
 * @param src - script source url
 */
export function loadScript(src: string): Promise<Event> {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script');

    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
