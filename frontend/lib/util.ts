// @ts-expect-error no types for 'he'
import he from 'he';

/**
 * Strips p tag to make styling easier.
 * Decodes html entities.
 * @param {string} str
 * @returns {string}
 */
export function excerpt(str: string): string {
    return he.decode(str.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 100));
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
