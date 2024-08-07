export interface Section {
    uuid: string,
    name: string,
    thumbnail: string,
    category: string,
    visiblity: 'PUBLIC' | 'TEAM' | 'PRIVATE',
    order: number,
    editor: 'ADVANCED' | 'ADVANCED-2.0'
}

export type ListSectionPayload = void;

export interface ListSectionResponse {
    results: Array<Section>
}

export interface GetSectionPayload {
    section_uuid: string
}

export interface GetSectionResponse extends Section {}
