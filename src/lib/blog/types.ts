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

export interface DeleteBlogPayload {
    site_name: string,
    delete_backups: boolean
}

export type DeleteBlogResponse = void;
