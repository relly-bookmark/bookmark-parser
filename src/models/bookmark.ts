import type { DateTime } from 'luxon'

export interface IBookmarkFolder {
  title: string | null
  added_at: string
  modified_at: string

  children: (IBookmark | IBookmarkFolder)[] 
}

export interface IBookmark {
  title: string | null
  url: string | null
  icon: string | null
  added_at: string | null
}

export interface IParserOptions {
    dateTimeFormat: string
}
