import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Booking tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const api_path = '/api/sites/multiscreen/';
  const site_name = 'test_site';
  const appointment_type_id = 'test_id'
  const staff_member_id = 'test_id'
  const appointment_uid = 'test_uid'

  const offset = 0;
  const limit = 1;

  const booking_appointment = {
    absent_host: false,
    appointment_type: {
        id: "2660601",
        slug: "sample-event"
    },
    attendees: [
        {
            absent:false,
            email: "user@example.com",
            language: "en",
            name: "Default",
            time_zone: "Asia/Jerusalem"
        }
    ],
    booking_fields_responses: {
        email: "user@example.com",
        guests: [],
        name: "Default"
    },
    cancellation_reason: "Schedule conflict",
    cancelled_by_email: "user@example.com",
    created_at: "2025-06-16T14:31:58.794Z",
    description: "string",
    duration: 30,
    end: "2025-06-16T18:00:00.000Z",
    hosts: [
        {
            email: "staffmember1@example.com",
            id: 1582498,
            name: "Staff Member 1",
            time_zone: "Asia/Jerusalem",
            username: "staffmember1-example-com"
        }
    ],
    ics_uid: "kko1gv8tFZe8JjpCpct5tG@Cal.com",
    id: 8589828,
    location: "https://app.cal.com/video/kko1gv8tFZe8JjpCpct5tG",
    rating: 5,
    recurring_booking_uid: "rec_kko1gv8tFZe8JjpCpct5tG",
    rescheduled_by_email: "user@example.com",
    rescheduled_from_uid: "abc123defGHIjkl456MNO",
    rescheduling_reason: "Availability changed",
    start: "2025-06-16T17:30:00.000Z",
    status: "accepted",
    title: "Sample Event between Staff Member 1 and Default",
    uid: "kko1gv8tFZe8JjpCpct5tG",
    updated_at: "2025-06-16T14:31:59.219Z"
  }

  const list_booking_appointments_response = {
      limit: 0,
      offset: 0,
      results: [booking_appointment],
      site_name: 'test_site',
      total_responses: 0
  }

  const manage_appointment_links_response = {
    cancel_link: 'https://example.com/cancel',
    reschedule_link: 'https://example.com/reschedule'
  }

  const send_management_email_response = {
    sent_to: 'user@example.com'
  }

  const booking_appointment_types = {
    created_at: 'string',
    description: 'string',
    duration: 30,
    id: appointment_type_id,
    name: 'string',
    price_info: {
      base_price: 'string',
      currency: 'string',
      formatted_base_price: 'string'
    },
    pricing_type: 'string', 
    updated_at: 'string'
  }

  const list_booking_appointment_types_response = {
    limit: 0,
    offset: 0,
    results: [booking_appointment_types],
    site_name: site_name,
    total_responses: 1
  }

  const booking_staff_member = {
    account_name: 'string',
    email: 'string',
    id: staff_member_id,
    name: 'string'
  }

  const list_booking_staff_members_response = {
    limit: 0,
    offset: 0,
    results: [booking_staff_member],
    site_name: site_name,
    total_responses: 1
  }

  const availability = {
    days: ['MONDAY', 'TUESDAY'],
    start_time: 'string',
    end_time: 'string'
  }

  const overrides = {
    date: 'string',
    start_time: 'string',
    end_time: 'string'
  }

  const booking_staff_member_availability = {
    availability: [availability],
    overrides: [overrides],
    time_zone: 'string'
  }

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  describe('booking appointments', () => {
    it('can list all booking appointments', async () => {
      scope.get(`${api_path}${site_name}/booking/appointments?offset=${offset}&limit=${limit}`).reply(200, list_booking_appointments_response)
      return await duda.booking.appointments.list({
          site_name,
          offset,
          limit
      }).then(res => expect(res).to.eql(list_booking_appointments_response))
    })

    it('can book an appointment', async () => {
      scope.post(`${api_path}${site_name}/booking/appointments`, (body) => {
        expect(body).to.eql({
          appointment_type_id,
          attendee: {
            email: 'user@example.com',
            language: 'en',
            name: 'Default',
            phone_number: '+15555555555',
            time_zone: 'Asia/Jerusalem'
          },
          booking_fields_responses: {
            email: 'user@example.com',
            guests: [],
            name: 'Default'
          },
          duration: 30,
          metadata: {
            source: 'qa-test'
          },
          start: '2025-06-16T17:30:00.000Z'
        })
        return body
      }).reply(200, booking_appointment)

      return await duda.booking.appointments.book({
        site_name,
        appointment_type_id,
        attendee: {
          email: 'user@example.com',
          language: 'en',
          name: 'Default',
          phone_number: '+15555555555',
          time_zone: 'Asia/Jerusalem'
        },
        booking_fields_responses: {
          email: 'user@example.com',
          guests: [],
          name: 'Default'
        },
        duration: 30,
        metadata: {
          source: 'qa-test'
        },
        start: '2025-06-16T17:30:00.000Z'
      }).then(res => expect(res).to.eql(booking_appointment))
    })

    it('can cancel a booking appointment', async () => {
      scope.post(`${api_path}${site_name}/booking/appointments/${appointment_uid}/cancel`, (body) => {
        expect(body).to.eql({
          cancellation_reason: 'Schedule conflict'
        })
        return body
      }).reply(200, booking_appointment)

      return await duda.booking.appointments.cancel({
        site_name,
        appointment_uid,
        cancellation_reason: 'Schedule conflict'
      }).then(res => expect(res).to.eql(booking_appointment))
    })

    it('can confirm a booking appointment', async () => {
      scope.post(`${api_path}${site_name}/booking/appointments/${appointment_uid}/confirm`).reply(200, booking_appointment)

      return await duda.booking.appointments.confirm({
        site_name,
        appointment_uid
      }).then(res => expect(res).to.eql(booking_appointment))
    })

    it('can get booking appointment manage links', async () => {
      scope.get(`${api_path}${site_name}/booking/appointments/${appointment_uid}/manage-links?lang=en`).reply(200, manage_appointment_links_response)

      return await duda.booking.appointments.getManageLinks({
        site_name,
        appointment_uid,
        lang: 'en'
      }).then(res => expect(res).to.eql(manage_appointment_links_response))
    })

    it('can send a booking appointment management email', async () => {
      scope.post(`${api_path}${site_name}/booking/appointments/${appointment_uid}/send-management-email`).reply(200, send_management_email_response)

      return await duda.booking.appointments.sendManagementEmail({
        site_name,
        appointment_uid
      }).then(res => expect(res).to.eql(send_management_email_response))
    })

    it('can reschedule a booking appointment', async () => {
      scope.post(`${api_path}${site_name}/booking/appointments/${appointment_uid}/reschedule`, (body) => {
        expect(body).to.eql({
          rescheduling_reason: 'Availability changed',
          start: '2025-06-16T17:30:00.000Z'
        })
        return body
      }).reply(200, booking_appointment)

      return await duda.booking.appointments.reschedule({
        site_name,
        appointment_uid,
        rescheduling_reason: 'Availability changed',
        start: '2025-06-16T17:30:00.000Z'
      }).then(res => expect(res).to.eql(booking_appointment))
    })
  })

  describe('booking appointments types', () => {
    it('can list all booking appointment types', async () => {
      scope.get(`${api_path}${site_name}/booking/appointment-types`).reply(200, list_booking_appointment_types_response)
      return await duda.booking.appointment_types.list({
          site_name
      }).then(res => expect(res).to.eql(list_booking_appointment_types_response))
    })
    
    it('can get a booking appointment type', async () => {
      scope.get(`/api/sites/multiscreen/${site_name}/booking/appointment-types/${appointment_type_id}`).reply(200, booking_appointment_types)
      return await duda.booking.appointment_types.get({
        site_name,
        id: appointment_type_id
      }).then(res => expect(res).to.eql({ ...booking_appointment_types }))
    })

    it('can create a booking appointment type', async () => {
      scope.post(`/api/sites/multiscreen/${site_name}/booking/appointment-types`, (body) => {
        expect(body).to.eql({
          description: 'string',
          duration: 30,
          name: 'string',
          price_info: {
            base_price: 'string'
          },
          pricing_type: 'string'
        })
        return body
      }).reply(200, booking_appointment_types)

      return await duda.booking.appointment_types.create({
        site_name,
        description: 'string',
        duration: 30,
        name: 'string',
        price_info: {
          base_price: 'string'
        },
        pricing_type: 'string'
      })
    })

    it('can update a booking appointment type', async () => {
      scope.put(`/api/sites/multiscreen/${site_name}/booking/appointment-types/${appointment_type_id}`, (body) => {
        expect(body).to.eql({
          description: 'string',
          duration: 30,
          name: 'string',
          price_info: {
            base_price: 'string'
          },
          pricing_type: 'string'
        })
        return body
      }).reply(200, booking_appointment_types)

      return await duda.booking.appointment_types.update({
        site_name,
        id: appointment_type_id,
        description: 'string',
        duration: 30,
        name: 'string',
        price_info: {
          base_price: 'string'
        },
        pricing_type: 'string'
      })
    })

    it('can delete a booking appointment type', async () => {
      scope.delete(`/api/sites/multiscreen/${site_name}/booking/appointment-types/${appointment_type_id}`).reply(204)
      return await duda.booking.appointment_types.delete({
        site_name,
        id: appointment_type_id
      })
    })
  })

  describe('booking staff members', () => {
    it('can list all booking staff members', async () => {
      scope.get(`${api_path}${site_name}/booking/staff-members`).reply(200, list_booking_staff_members_response)
      return await duda.booking.staff_members.list({
          site_name
      }).then(res => expect(res).to.eql(list_booking_staff_members_response))
    })
    
    it('can get a booking staff member', async () => {
      scope.get(`/api/sites/multiscreen/${site_name}/booking/staff-members/${staff_member_id}`).reply(200, booking_staff_member)
      return await duda.booking.staff_members.get({
        site_name,
        id: staff_member_id
      }).then(res => expect(res).to.eql({ ...booking_staff_member }))
    })

    it('can create a booking staff member', async () => {
      scope.post(`/api/sites/multiscreen/${site_name}/booking/staff-members`, (body) => {
        expect(body).to.eql({
          account_name: 'string',
          email: 'string',
          name: 'string',
          timezone: 'string'
        })
        return body
      }).reply(200, booking_staff_member)

      return await duda.booking.staff_members.create({
        site_name,
        account_name: 'string',
        email: 'string',
        name: 'string',
        timezone: 'string'
      })
    })

    it('can update a booking staff member', async () => {
      scope.put(`/api/sites/multiscreen/${site_name}/booking/staff-members/${staff_member_id}`, (body) => {
        expect(body).to.eql({
          account_name: 'string',
          email: 'string',
          name: 'string'
        })
        return body
      }).reply(200, booking_staff_member)

      return await duda.booking.staff_members.update({
        site_name,
        id: staff_member_id,
        account_name: 'string',
        email: 'string',
        name: 'string'
      })
    })

    it('can delete a booking staff member', async () => {
      scope.delete(`/api/sites/multiscreen/${site_name}/booking/staff-members/${staff_member_id}`).reply(204)
      return await duda.booking.staff_members.delete({
        site_name,
        id: staff_member_id
      })
    })

    it('can get a booking staff member availability', async () => {
      scope.get(`/api/sites/multiscreen/${site_name}/booking/staff-members/${staff_member_id}/availability`).reply(200, booking_staff_member_availability)
      return await duda.booking.staff_members.availability.get({
        site_name,
        id: staff_member_id
      }).then(res => expect(res).to.eql({ ...booking_staff_member_availability }))
    })

    it('can update a booking staff member availability', async () => {
      scope.put(`/api/sites/multiscreen/${site_name}/booking/staff-members/${staff_member_id}/availability`, (body) => {
        expect(body).to.eql({ ...booking_staff_member_availability })
        return body
      }).reply(200, booking_staff_member_availability)

      return await duda.booking.staff_members.availability.update({ site_name, id: staff_member_id, ...booking_staff_member_availability })
    })
  })
})