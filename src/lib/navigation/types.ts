type HiddenEnum = 'MOBILE' | 'DESKTOP' | 'TABLET'

export interface DynamicNavigation {
    type: 'STORE_CATEGORIES' | 'DYNAMIC_PAGE_ITEMS',
    collection_name: string,
    display_field: string,
    hidden: Array<HiddenEnum>,
    dynamic_navigation_parent: boolean
}

export interface Navigation {
    id?: string,
    title?: string,
    url?: string,
    type?: 'PAGE' | 'DYNAMIC_PAGE_TEMPLATE' | 'EXTERNAL_PAGE' | 'ANCHOR' | 'FOLDER' | 'DYNAMIC_NAVIGATION_ITEMS_PLACEHOLDER',
    hidden?: Array<HiddenEnum>,
    dynamic_navigation?: DynamicNavigation,
    parent_id?: string,
    next_sibling_id?: string,
    depth?: number
}

export interface NavigationResponseObject {
    lang: string,
    navigation: Array<Navigation>
}

export interface ListNavigationPayload {
    site_name: string
}

export interface ListNavigationResponse {
    result: Array<NavigationResponseObject>
}

export interface GetByLangNavigationPayload {
    site_name: string,
    lang: string
}

export interface GetByLangNavigationResponse extends NavigationResponseObject {}

export interface CreateNavigationPayload {
    site_name: string,
    lang: string,
    type: 'PAGE' | 'DYNAMIC_PAGE_TEMPLATE' | 'EXTERNAL_PAGE' | 'ANCHOR' | 'FOLDER' | 'DYNAMIC_NAVIGATION_ITEMS_PLACEHOLDER',
    title: string,
    hidden?: Array<HiddenEnum>,
    parent_id: string,
    next_sibling_id: string
}

export interface CreateNavigationResponse extends Navigation {}

export interface UpdateNavigationPayload {
    site_name: string,
    lang: string,
    navigation_id: string,
    hidden?: Array<HiddenEnum>,
    parent_id?: string,
    next_sibling_id?: string
}

export interface UpdateNavigationResponse extends Navigation {}
