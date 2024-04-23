export interface UpdateSESettingsPayload {
    site_name: string,
    onboarding_required: 'REQUIRED' | 'OPTIONAL'
}

export interface UpdateSESettingsResponse {
    onboarding_required: 'REQUIRED' | 'OPTIONAL'
}
