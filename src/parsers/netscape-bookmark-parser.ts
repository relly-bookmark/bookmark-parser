// models
import { BookmarkType, IBookmark, IBookmark, IParserOptions } from '../models/bookmark'

// third party
import { DateTime } from 'luxon'
import { parseFragment } from 'parse5'

export default class NetscapeBookmarkParser {
  private readonly options = <IParserOptions>{
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
  }

  public constructor(options: IParserOptions = {} as IParserOptions) {
    Object.assign(this.options, options)
  }

  /**
   * Parses a Netscape bookmark tree from the given HTML string.
   *
   * @param {string} html - The HTML string to parse.
   *
   * @return {IBookmark[]} The parsed bookmark tree.
   */
  public parse(html: string): IBookmark[]  {
    const cleanHtml = html.replace(/<!DOCTYPE [\s\S]+?<\/TITLE>|<DT>|<p>/g, '')

    const fragment = parseFragment(cleanHtml)

    return this.treeParser(fragment.childNodes)
  }

  /**
   * Parses a Netscape bookmark tree, given an array of nodes. The optional
   * `subTree` parameter is used to keep track of the current node's path.
   *
   * @param {any[]} nodes - A list of nodes parsed from the Netscape bookmark file.
   * @param {IBookmark[]} [subTree=[]] - The current node's path.
   *
   * @return {IBookmark[]} The parsed bookmark tree.
   */
  private treeParser(nodes: any[], subTree: IBookmark[] = []): IBookmark[]  {
    const _nodes: any[] = []

    nodes.forEach((_node) => {
      const tag = _node.tagName?.toLowerCase()

      // handle link nodes
      if (tag === 'a') {
        _nodes.push(<IBookmark>{
          type: BookmarkType.LINK,
          title: _node.childNodes[0].value,
          url: _node.attrs?.find((item: any) => item.name === 'href')?.value,
          icon: _node.attrs?.find((item: any) => item.name === 'icon')?.value,
          added_at: this.parseDate(_node.attrs?.find((item: any) => item.name === 'add_date')?.value),
        })
      } // handle parent folder nodes
      else if (tag === 'h3' || tag === 'h1') {
        _nodes.push(<IBookmark>{
          type: BookmarkType.FOLDER,
          title: _node.childNodes[0].value,
          added_at: this.parseDate(_node.attrs?.find((item: any) => item.name === 'add_date')?.value),
          modified_at: this.parseDate(_node.attrs?.find((item: any) => item.name === 'last_modified')?.value),
          children: [],
        })
      } // handle sub folder nodes
      else if (tag === 'dl') {
        const lastNode = _nodes[_nodes.length - 1],
          nodePath = subTree.concat(lastNode),
          nextChildNodes = this.treeParser(_node.childNodes, nodePath)

        lastNode.children = nextChildNodes
      }
    })

    return _nodes
  }

  /**
   * Parse a Netscape bookmark timestamp (in seconds since the Unix epoch) into a
   * Luxon DateTime object, formatted according to the parser's configured
   * dateTimeFormat.
   *
   * @param {string} timestamp - the Netscape bookmark timestamp to parse
   * @returns {string|null} - the parsed and formatted timestamp, or null if the
   * input timestamp is empty or invalid
   */
  private parseDate(timestamp: string): string|null {
    if (!timestamp) {
      return null;
    }

    const _timestamp = Number(timestamp)

    return DateTime.fromSeconds(_timestamp).toFormat(this.options.dateTimeFormat)
  }
}

