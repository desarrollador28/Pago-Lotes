/**
 * Formatear URL sin saltos de linea
 * @param string url
 * @return string
 */
export const urlFormat = (url: string): string => url.replace(/\r?\n|\r/g, "").replaceAll(' ', "");

/**
 * Agregar token solo a ciertas peticiones
 * @param string[] whitelist
 * @param string url
 * @returns boolean
 */
export const shouldAttachTokenTo = (whitelist: string[], url: string): boolean => whitelist.some(allowed => url.includes(allowed));
