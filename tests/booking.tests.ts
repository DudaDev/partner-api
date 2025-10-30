import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Booking tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const api_path = '/api/sites/multiscreen/';
  const site_name = 'test_site';

  const offset = 0;
  const limit = 1;

  const booking_appointment =
    {
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
                timeZone: "Asia/Jerusalem"
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
                timeZone: "Asia/Jerusalem",
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

  const list_booking_appointments_response = 
    {
        limit: 0,
        offset: 0,
        results: [booking_appointment],
        site_name: 'test_site',
        total_responses: 0
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
    // it('can list all booking appointments', async () => {
    //   scope.get(`/api/sites/multiscreen/test_site/booking/appointments`).reply(200, list_booking_appointments_response)
    //   return await duda.booking.appointments.list()
    // })

    it('can list all booking appointments', async () => {
    scope.get(`${api_path}${site_name}/booking/appointments?offset=${offset}&limit=${limit}`).reply(200, list_booking_appointments_response)
    return await duda.booking.appointments.list({
        site_name,
        offset,
        limit
    }).then(res => expect(res).to.eql(list_booking_appointments_response))
    })
  })
})