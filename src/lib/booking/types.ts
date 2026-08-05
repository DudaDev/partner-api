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
    'ca' |
    string;

interface BookingFieldsResponses {
    email?: string,
    guests?: Array<string>,
    name?: string
}

interface AppointmentAttendees {
    absent?: boolean,
    booking_fields_responses?: BookingFieldsResponses,
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

interface AppointmentAttendee {
    email?: string,
    language?: AppointmentAttendeesLanguage,
    name: string,
    phone_number?: string,
    time_zone: string,
}

interface BookingAppointmentHosts {
    email?: string,
    id?: number,
    name?: string,
    time_zone?: string,
    username?: string
}

type BookingAppointmentStatus =
    'accepted' |
    'cancelled' |
    'pending' |
    'rejected' |
    string;

export interface BookingAppointment {
    absent_host?: boolean,
    appointment_type?: AppointmentType,
    attendees?: Array<AppointmentAttendees>,
    booking_fields_responses?: BookingFieldsResponses,
    cancellation_reason?: string,
    cancelled_by_email?: string,
    created_at?: string,
    description?: string,
    duration?: number,
    end?: string,
    hosts?: Array<BookingAppointmentHosts>,
    ics_uid?: string,
    id?: number,
    location?: string,
    metadata?: {
        [key: string]: string
    },
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

export interface  BookAppointmentPayload {
    site_name: string,
    appointment_type_id: string,
    attendee: AppointmentAttendee,
    booking_fields_responses?: BookingFieldsResponses,
    duration?: number,
    guests?: Array<string>,
    metadata?: {
        [key: string]: string
    }
    start: string,
}

export interface BookAppointmentResponse extends BookingAppointment {}

export interface ManageAppointmentPayload {
    site_name: string,
    appointment_uid: string,
}
export interface CancelBookingAppointmentPayload extends ManageAppointmentPayload {
    cancellation_reason?: string
}

export interface GetAppointmentManageLinksPayload extends ManageAppointmentPayload {
    lang?: AppointmentAttendeesLanguage
}

export interface SendAppointmentManagementEmailPayload extends ManageAppointmentPayload {}

export interface SendAppointmentManagementEmailResponse {
    sent_to?: string,
}

export interface ConfirmBookingAppointmentPayload extends ManageAppointmentPayload {}

export interface CancelBookingAppointmentResponse extends BookingAppointment {}

export interface ConfirmBookingAppointmentResponse extends BookingAppointment {}

export interface RescheduleBookingAppointmentPayload extends ManageAppointmentPayload {
    rescheduling_reason?: string,
    start: string,
}

export interface RescheduleBookingAppointmentResponse extends BookingAppointment {}

export interface GetAppointmentManageLinksResponse {
    cancel_link?: string,
    reschedule_link?: string,
}

interface PriceInfo {
    base_price: string
}

interface ListPriceInfo extends PriceInfo {
    currency: string,
    formatted_base_price: string
}

type PricingType =
    'FREE' |
    'PAID' |
    string;

interface BookingAppointmentTypes {
    created_at: string,
    description: string,
    duration: number,
    id: string,
    name: string,
    price_info: ListPriceInfo,
    pricing_type: PricingType
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
    name: string,
    price_info: PriceInfo,
    pricing_type: PricingType
}

export interface CreateBookingAppointmentTypesResponse extends BookingAppointmentTypes {}

export interface UpdateBookingAppointmentTypesPayload {
    site_name: string,
    id: string,
    description?: string,
    duration: number,
    name: string,
    price_info: PriceInfo,
    pricing_type: PricingType
}

export interface UpdateBookingAppointmentTypesResponse extends BookingAppointmentTypes {}

export interface DeleteBookingAppointmentTypesPayload {
    site_name: string,
    id: string
}

export type DeleteBookingAppointmentTypesResponse = null;

interface BookingStaffMember {
    account_name?: string,
    email: string,
    id: string,
    name: string
}

export interface ListBookingStaffMembersPayload {
    site_name: string
}

export interface ListBookingStaffMembersResponse {
    limit: number,
    offset: number,
    results: Array<BookingStaffMember>,
    site_name: string,
    total_responses: number
}

export interface GetBookingStaffMembersPayload {
    site_name: string,
    id: string
}

export interface GetBookingStaffMembersResponse extends BookingStaffMember {}

export interface CreateBookingStaffMembersPayload {
    site_name: string,
    account_name?: string,
    email?: string,
    name?: string,
    timezone?: string
}

export interface CreateBookingStaffMembersResponse extends BookingStaffMember {}

export interface UpdateBookingStaffMembersPayload {
    site_name: string,
    id: string,
    account_name?: string,
    email?: string,
    name?: string
}

export interface UpdateBookingStaffMembersResponse extends BookingStaffMember {}

export interface DeleteBookingStaffMembersPayload {
    site_name: string,
    id: string
}

export type DeleteBookingStaffMembersResponse = null;

type StaffMemberAvailabilityDays =
    'MONDAY' |
    'TUESDAY' |
    'WEDNESDAY' |
    'THURSDAY' |
    'FRIDAY' |
    'SATURDAY' |
    'SUNDAY' |
    string;

interface StaffMemberAvailability {
    days?: Array<StaffMemberAvailabilityDays>,
    start_time?: string,
    end_time?: string
}

interface StaffMemberOverrides {
    date?: string,
    start_time?: string,
    end_time?: string
}

interface BookingStaffMemberAvailability {
    availability?: Array<StaffMemberAvailability>,
    overrides?: Array<StaffMemberOverrides>,
    time_zone?: string
}

export interface GetBookingStaffMembersAvailabilityPayload {
    site_name: string,
    id: string
}

export interface GetBookingStaffMembersAvailabilityResponse extends BookingStaffMemberAvailability {}

export interface UpdateBookingStaffMembersAvailabilityPayload extends BookingStaffMemberAvailability {
    site_name: string,
    id: string
}

export interface UpdateBookingStaffMembersAvailabilityResponse extends BookingStaffMemberAvailability {}

export interface GetBookingAvailabilityPayload {
    site_name: string,
    appointment_type_id?: string,
    start?: string,
    end?: string,
    time_zone?: string
    duration?: number,
}

export interface BookingAvailabilitySlot {
    start?: string,
    end?: string,
 }
export interface GetBookingAvailabilityResponse {
    slots?: {
        [date: string]: Array<BookingAvailabilitySlot>
    },
    time_zone?: string
}

type DesignStyle = "site-theme" | "basic" 

export interface WidgetEmbedStageConfig {
    is_title_visible?: boolean,
    title?: string,
}

export interface AppointmentStageConfig extends WidgetEmbedStageConfig {}

export interface StaffMemberStageConfig extends WidgetEmbedStageConfig {
    is_stage_shown?: boolean,
}

export interface CreateBookingWidgetEmbedPayload {
    site_name: string,
    appointment_type_ids: Array<string>,
    show_free_price?: boolean,
    design_style?: DesignStyle,
    lang?: AppointmentAttendeesLanguage,
    choose_appointment_stage_config?: AppointmentStageConfig,
    choose_staff_member_stage_config?: StaffMemberStageConfig,
}

export interface CreateBookingWidgetEmbedResponse {
    iframe_html?: string,
}