const CLIENT_ID =
  "165437744227-on3jgc0u2peumjho13n5uv8mhbe6nbhn.apps.googleusercontent.com";
const API_KEY = "AIzaSyAEj9rYHpJcJMiSbhMZ_W04zZc-VUh30Bg";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";
let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
}
function createGoogleEvent(eventDetails) {
  return new Promise((resolve, reject) => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        reject(resp.error);
      }
      try {
        await scheduleEvent(eventDetails);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    };
    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  });
}

function getResponse() {
  return true;
}

function scheduleEvent(eventDetails) {
  const event = {
    summary: eventDetails.summary,
    location: eventDetails.location,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [{ email: eventDetails.email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
  request.execute(function (event) {
    console.info("Event created: " + event.htmlLink);
    console.info("Event created: " + event.id);
    console.log("Event created: " + event.description);
  });
}
