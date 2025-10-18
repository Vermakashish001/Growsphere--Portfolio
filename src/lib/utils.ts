/**
 * Simple utility function to combine class names
 * For basic class concatenation without external dependencies
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Sleep utility for async functions
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Create a safe area for text content to prevent widows
 */
export const wrapText = (text: string, maxWords: number = 3): string => {
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  
  const lastWords = words.slice(-maxWords).join(' ')
  const firstWords = words.slice(0, -maxWords).join(' ')
  
  return `${firstWords}\u00A0${lastWords}` // Non-breaking space
}
