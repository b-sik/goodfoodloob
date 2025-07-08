/**
 * Strips p tag to make styling easier.
 * @param {string} str
 * @returns {string}
 */
export function excerpt(str: string): string {
    return str.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 100);
}
