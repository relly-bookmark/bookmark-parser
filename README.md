# pkg-placeholder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

This library is a general-purpose bookmark file parser. It can parse bookmarks from various browsers and convert them to a common format.

TODOs:

- [x] Add netscape bookmark file parser
- [ ] Add bookmark.bak file parser
- [ ] Add netscape export option
- [ ] Add bookmark.bak export option

## ✂️ Parsers

### 🚩 Netscape Bookmark File

The **[Netscape Bookmark File](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/)** (*check this [message](https://stackoverflow.com/a/73727285/6940144)*) parser can parse bookmarks from browsers that use the Netscape Bookmark File format. This includes Firefox, Chrome, and Safari.

```ts
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import NetscapeBookmarkParser from '@path/to/netscape-bookmark-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const bookmarkFilePath = path.resolve(__dirname, './example_bookmark_export.html')
const bookmarkFileContent = fs.readFileSync(bookmarkFilePath, 'utf-8')

const parser = new NetscapeBookmarkParser()
const tree = parser.parse(bookmarkFileContent)
```

Exmple output:

```json
// ...
{
  "title": "Learning Platforms",
  "added_at": "2023-01-11 20:53:20",
  "modified_at": null,
  "children": [
    {
      "title": "Coursera",
      "url": "https://www.coursera.org/",
      "added_at": "2023-01-11 20:53:21"
    },
    {
      "title": "Udemy",
      "url": "https://www.udemy.com/",
      "added_at": "2023-01-11 20:53:22"
    },
    {
      "title": "Pluralsight",
      "url": "https://www.pluralsight.com/",
      "added_at": "2023-01-11 20:53:23"
    },
    {
      "title": "edX",
      "url": "https://www.edx.org/",
      "added_at": "2023-01-11 20:53:24"
    }
  ]
}
// ...
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/pkg-placeholder
[npm-downloads-src]: https://img.shields.io/npm/dm/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/pkg-placeholder
[bundle-src]: https://img.shields.io/bundlephobia/minzip/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=pkg-placeholder
[license-src]: https://img.shields.io/github/license/relly-bookmark/bookmark-parser.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/relly-bookmark/bookmark-parser/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/pkg-placeholder
