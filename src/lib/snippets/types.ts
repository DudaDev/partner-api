export interface Snippet {
    location: 'BODY' | 'HEADER' | 'CONTENT_END' | 'BEFORE_SCRIPTS',
    markup: string,
    id: string
}

export interface ListSnippetsPayload {
    site_name: string
}

export interface ListSnippetsResponse {
    results: Array<Snippet>
}

export interface GetSnippetPayload {
    site_name: string,
    id: string
}

export interface GetSnippetResponse extends Snippet {}

export interface CreateSnippetPayload {
    site_name: string,
    markup: string,
    location: 'BODY' | 'HEADER' | 'CONTENT_END' | 'BEFORE_SCRIPTS'
}

export interface CreateSnippetResponse extends Snippet {}

export interface UpdateSnippetPayload {
    site_name: string,
    id: string,
    markup: string,
    location: 'BODY' | 'HEADER' | 'CONTENT_END' | 'BEFORE_SCRIPTS'
}

export interface UpdateSnippetResponse {
    id: string
}

export interface PublishSnippetPayload {
    site_name: string,
    id: string
}

export type PublishSnippetResponse = void;

export interface DeleteSnippetPayload {
    site_name: string,
    id: string
}

export type DeleteSnippetResponse = void;
