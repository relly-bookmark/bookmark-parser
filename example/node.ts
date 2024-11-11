import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import NetscapeBookmarkParser from '../src/parsers/netscape-bookmark-parser'
import { ray } from 'node-ray';

const parser = new NetscapeBookmarkParser()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const bookmarkFilePath = path.resolve(__dirname, './example_bookmark_export.html')
const bookmarkFileContent = fs.readFileSync(bookmarkFilePath, 'utf-8')

const tree = parser.parse(bookmarkFileContent)
fs.writeFileSync(path.resolve(__dirname, './example_bookmark_export.json'), JSON.stringify(tree, null, 2))

ray(tree).blue();