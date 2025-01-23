export interface ImportBlog {
    feed_url: string,
    import_type: 'APPEND' | 'OVERWRITE'
}

export interface ImportBlogPayload extends ImportBlog {
    site_name: string
}

export interface ImportBlogResponse extends ImportBlog {}

export interface BlogImage {
    url: string
}

export interface ImportBlogPost {
    title: string,
    description: string,
    content: string,
    author?: string,
    thumbnail?: BlogImage,
    main_image?: BlogImage
}

export interface ImportBlogPostPayload extends ImportBlogPost {
    site_name: string
}

export interface ImportBlogPostResponse extends ImportBlogPost {}

export interface PublishBlogPostPayload {
    site_name: string,
    post_id: string
}

export type PublishBlogPostResponse = null;

export interface UnpublishBlogPostPayload {
    site_name: string,
    post_id: string
}

export interface UpdateBlogPostPayload {
    site_name: string,
    post_id: string,
    author_name?: string,
    description?: string,
    meta_title?: string,
    no_index?: boolean,
    path?: string,
    publish_date?: string,
    tags?: Array<string>,
    title?: string
}

export interface BlogPost {
    author_name?: string,
    creation_date?: string,
    description?: string,
    id?: string,
    meta_title?: string,
    no_index?: boolean,
    path?: string,
    publish_date?: string,
    status?: string,
    tags?: Array<string>,
    title?: string
}

export interface UpdateBlogPostResponse extends BlogPost {}

export type UnpublishBlogPostResponse = null;

export interface ListBlogPostsPayload {
    site_name: string,
    limit?: number,
    offset?: number
}

export interface ListBlogPostsResponse {
    limit: number,
    offset: number,
    results: Array<BlogPost>,
    total_responses: number
}

export interface GetBlogPostPayload {
    site_name: string,
    post_id: string
}

export interface GetBlogPostResponse extends BlogPost {}

export interface DeleteBlogPostPayload {
    site_name: string,
    post_id: string
}

export type DeleteBlogPostResponse = null;

export interface DeleteBlogPayload {
    site_name: string,
    delete_backups: boolean
}

export type DeleteBlogResponse = void;
