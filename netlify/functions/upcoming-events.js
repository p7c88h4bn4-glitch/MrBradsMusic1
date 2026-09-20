// Netlify Function: Fetch upcoming events from Google Calendar
// This runs server-side, so no CORS issues

const https = require('https');

exports.handler = async (event, context) => {
  try {
    // Your public Google Calendar ID
    const calendarId = 'mrbradsmusic@gmail.com';
    const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;

    // Fetch the ICS file
    const icsData = await fetchUrl(icsUrl);
    
    // Parse events
    const events = parseICS(icsData);
    
    // Filter future events and sort by date
    const now = new Date();
    const futureEvents = events
      .map(e => ({
        ...e,
        startDate: parseICSDate(e.start)
      }))
      .filter(e => e.startDate && e.startDate >= now)
      .sort((a, b) => a.startDate - b.startDate)
      .slice(0, 3); // Take first 3

    return {
      statusCode: 200,
      body: JSON.stringify(futureEvents),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600' // Cache for 1 hour
      }
    };
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseICS(text) {
  const events = [];
  const lines = text.replace(/\r\n /g, '').split(/\r?\n/);
  let current = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      current = {};
    } else if (line === 'END:VEVENT' && current) {
      events.push(current);
      current = null;
    } else if (current) {
      const colon = line.indexOf(':');
      if (colon > 0) {
        const key = line.substring(0, colon).split(';')[0];
        const val = line.substring(colon + 1);
        if (key === 'SUMMARY') current.title = val;
        else if (key === 'LOCATION') current.location = val;
        else if (key === 'DTSTART') current.start = val;
      }
    }
  }
  return events;
}

function parseICSDate(s) {
  if (!s || s.length < 8) return null;
  const y = parseInt(s.substr(0, 4), 10);
  const m = parseInt(s.substr(4, 2), 10) - 1;
  const d = parseInt(s.substr(6, 2), 10);
  const h = s.length >= 13 ? parseInt(s.substr(9, 2), 10) : 0;
  const min = s.length >= 13 ? parseInt(s.substr(11, 2), 10) : 0;
  return new Date(y, m, d, h, min);
}
