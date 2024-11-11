// node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// test
import { describe, expect, it } from 'vitest'
import { NetscapeBookmarkParser } from '../src/index'

describe('should', () => {
  it('export netscape bookmark correctly from file', () => {
    const parser = new NetscapeBookmarkParser()

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const bookmarkFilePath = path.resolve(__dirname, '../example/example_bookmark_export.html')
    const bookmarkExportJsonPath = path.resolve(__dirname, '../example/example_bookmark_export.json')
    
    const bookmarkFileContent = fs.readFileSync(bookmarkFilePath, 'utf-8')
    const bookmarExportJsonContent = JSON.parse(fs.readFileSync(bookmarkExportJsonPath, 'utf-8'))

    const tree = parser.parse(bookmarkFileContent)

    expect(tree).toEqual(bookmarExportJsonContent)
  })
})
