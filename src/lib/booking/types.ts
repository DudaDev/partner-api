interface AppointmentType {
    id?: string,
    slug?: string
}

type AppointmentAttendeesLanguage =
    'en' |
    'fr' |
    'it' |
    'ru' |
    'es' |
    'de' |
    'pt' |
    'ro' |
    'nl' |
    'pt-BR' |
    'es-419' |
    'ko' |
    'ja' |
    'pl' |
    'ar' |
    'iw-TL' |
    'zh-HK' |
    'zh-CN' |
    'zh-TW' |
    'cs' |
    'sr' |
    'sv' |
    'no' |
    'fi' |
    'da' |
    'he' |
    'tr' |
    'uk' |
    'vi' |
    'hu' |
    'id' |
    'ms' |
    'th' |
    'sk' |
    'bg' |
    'hr' |
    'lt' |
    'sl' |
    'hi' |
    'et' |
    'lv' |
    'el' |
    'ca';

interface AppointmentAttendees {
    absent?: boolean,
    email?: string,
    language?: AppointmentAttendeesLanguage,
    name?: string,
    phone_number?: string,
    seat_uid?: string,
    time_zone?: string,
    metadata?: {
        [key: string]: string
    }
}

interface BookingFieldsResponses {
    email?: string,
    guests?: Array<string>,
    name?: string
}

interface BookingAppointmentHosts {
    email?: string,
    id?: string,
    name?: string,
    time_zone?: string,
    username?: string
}

type BookingAppointmentStatus =
    'accepted' |
    'cancelled' |
    'pending' |
    'rejected';

export interface BookingAppointment {
    absent_host?: boolean,
    appointment_type?: AppointmentType,
    attendees?: AppointmentAttendees,
    booking_fields_responses?: BookingFieldsResponses,
    cancellation_reason?: string,
    cancelled_by_email?: string,
    created_at?: string,
    description?: string,
    duration?: number,
    end?: string,
    hosts?: BookingAppointmentHosts,
    ics_uid?: string,
    id?: number,
    location?: string,
    rating?: number,
    recurring_booking_uid?: string,
    rescheduled_by_email?: string,
    rescheduled_from_uid?: string,
    rescheduling_reason?: string,
    start?: string,
    status?: BookingAppointmentStatus,
    title?: string,
    uid?: string,
    updated_at?: string
}

export interface ListBookingAppointmentsPayload {
    site_name: string,
    limit?: number,
    offset?: number,
    status?: string
    mode?: string,
    attendee_email?: string,
    appointment_uid?: string,
    appointment_types?: string,
    after_start?: string,
    before_end?: string,
    after_created_at?: string,
    before_created_at?: string
}

export interface ListBookingAppointmentsResponse {
    limit: number,
    offset: number,
    results: Array<BookingAppointment>,
    site_name: string,
    total_responses: number
}

interface BookingAppointmentTypes {
    created_at: string,
    description: string,
    duration: number,
    id: string,
    name: string,
    updated_at: string
}

export interface ListBookingAppointmentTypesPayload {
    site_name: string
}

export interface ListBookingAppointmentTypesResponse {
    limit: number,
    offset: number,
    results: Array<BookingAppointmentTypes>,
    site_name: string,
    total_responses: number
}

export interface GetBookingAppointmentTypesPayload {
    site_name: string,
    id: string
}

export interface GetBookingAppointmentTypesResponse extends BookingAppointmentTypes {}

export interface CreateBookingAppointmentTypesPayload {
    site_name: string,
    description?: string,
    duration: number,
    name: string
}

export interface CreateBookingAppointmentTypesResponse extends BookingAppointmentTypes {}

export interface UpdateBookingAppointmentTypesPayload {
    site_name: string,
    id: string,
    description?: string,
    duration: number,
    name: string
}

export interface UpdateBookingAppointmentTypesResponse extends BookingAppointmentTypes {}

export interface DeleteBookingAppointmentTypesPayload {
    site_name: string,
    id: string
}

export type DeleteBookingAppointmentTypesResponse = null;