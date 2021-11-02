/**
 * document是否可见
 * @returns
 */
export function isDocumentVisible(): boolean {
  if (
    typeof document !== 'undefined' &&
    typeof document.visibilityState !== 'undefined'
  ) {
    return document.visibilityState !== 'hidden';
  }
  return true;
}

/**
 * 是否在线状态(有网络)
 * @returns
 */
export function isOnline(): boolean {
  if (typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  }
  return true;
}
