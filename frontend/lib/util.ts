/**
 * Strips p tag to make styling easier.
 * @param {string} str
 * @returns {string}
 */
export function excerpt(str: string): string {
    return str.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 100);
}

/**
 * Returns human-readable date in Toroton timezone.
 * @param {string} str
 * @returns {string}
 */
export function humanReadableDate(str: string): string {
    return new Date(str).toLocaleDateString('en-US', {
        timeZone: 'America/Toronto',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
