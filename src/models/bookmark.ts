export enum BookmarkType {
  FOLDER = 'folder',
  LINK = 'link',
}

export interface IBookmark {
  type: BookmarkType
  title: string | null
  added_at: string | null
  modified_at?: string
  url?: string | null
  icon?: string | null
  children?: IBookmark[]
}

export interface IParserOptions {
  dateTimeFormat: string
}
