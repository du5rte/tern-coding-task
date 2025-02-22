import { extractYoutubeIdFromUrl, isYoutubeUrl, cleanYouTubeUrl } from './url'

const TEST_VIDEO_ID = 'dQw4w9WgXcQ'

// Standard youtube.com formats
const STANDARD_URLS = [
  `https://www.youtube.com/watch?v=${TEST_VIDEO_ID}`,
  `https://youtube.com/watch?v=${TEST_VIDEO_ID}`,
  `http://www.youtube.com/watch?v=${TEST_VIDEO_ID}`,
  `https://www.youtube.com/watch?v=${TEST_VIDEO_ID}&feature=featured`,
  `https://www.youtube.com/watch?feature=featured&v=${TEST_VIDEO_ID}`,
]

// URLs with timestamps and other parameters
const PARAMETERIZED_URLS = [
  `https://www.youtube.com/watch?v=${TEST_VIDEO_ID}?t=123`,
  `https://www.youtube.com/watch?v=${TEST_VIDEO_ID}&t=123`,
  `https://www.youtube.com/watch?v=${TEST_VIDEO_ID}?si=tLIDk_IEZMWRXeLy`,
]

// Short youtu.be format
const SHORT_URLS = [
  `https://youtu.be/${TEST_VIDEO_ID}`,
  `http://youtu.be/${TEST_VIDEO_ID}`,
  `https://youtu.be/${TEST_VIDEO_ID}?si=tLIDk_IEZMWRXeLy`,
  `https://youtu.be/${TEST_VIDEO_ID}?t=123`,
]

// Embed formats
const EMBED_URLS = [
  `https://www.youtube.com/embed/${TEST_VIDEO_ID}`,
  `http://www.youtube.com/embed/${TEST_VIDEO_ID}`,
  `https://www.youtube.com/embed/${TEST_VIDEO_ID}?autoplay=1`,
]

// Invalid URLs
const INVALID_URLS = [
  '',
  'https://youtube.com',
  'https://youtu.be',
  'https://youtube.com/watch',
  'https://vimeo.com/123456',
  'invalid-url',
]

describe('YouTube URL Utilities', () => {
  describe('extractYoutubeIdFromUrl', () => {
    const validUrls = [
      ...STANDARD_URLS,
      ...PARAMETERIZED_URLS,
      ...SHORT_URLS,
      ...EMBED_URLS,
    ]

    test.each(validUrls)('should extract video ID from %s', (url) => {
      expect(extractYoutubeIdFromUrl(url)).toBe(TEST_VIDEO_ID)
    })

    test('should return undefined for invalid URLs', () => {
      INVALID_URLS.forEach(url => {
        expect(extractYoutubeIdFromUrl(url)).toBeUndefined()
      })
    })
  })

  describe('isYoutubeUrl', () => {
    test('should identify valid YouTube URLs', () => {
      const validUrls = [
        ...STANDARD_URLS,
        ...SHORT_URLS,
        ...EMBED_URLS,
      ]

      validUrls.forEach(url => {
        expect(isYoutubeUrl(url)).toBe(true)
      })
    })

    test('should identify invalid YouTube URLs', () => {
      INVALID_URLS.forEach(url => {
        expect(isYoutubeUrl(url)).toBe(false)
      })
    })
  })

  describe('cleanYouTubeUrl', () => {
    test('should convert all formats to standard youtube.com URL', () => {
      const urls = [
        ...SHORT_URLS,
        ...EMBED_URLS,
        ...PARAMETERIZED_URLS,
      ]

      const expectedUrl = `https://youtube.com/watch?v=${TEST_VIDEO_ID}`

      urls.forEach(url => {
        expect(cleanYouTubeUrl(url)).toBe(expectedUrl)
      })
    })

    test('should return original URL if not a valid YouTube URL', () => {
      const invalidUrl = 'https://example.com'
      expect(cleanYouTubeUrl(invalidUrl)).toBe(invalidUrl)
    })
  })
})
