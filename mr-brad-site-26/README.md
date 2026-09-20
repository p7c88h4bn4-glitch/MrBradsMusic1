# Mr. Brad — Website

A simple, fast, mobile-friendly website for the Mr. Brad children's music &
performance business. Plain HTML, CSS, and JavaScript — no build tools, no
frameworks, nothing to install. Built to run free on Netlify.

## Files

```
index.html      Home
programs.html   Programs (The Mr. Brad Show, Song Factory, Musical Spaceship)
media.html      Videos, photo gallery, testimonials
lessons.html    Private lessons inquiry + educational apps
booking.html    Booking inquiry form
css/styles.css  All styling
js/content.js   ← YOU EDIT THIS for most changes (text, links, lists)
js/main.js      Wiring that fills the pages from content.js (rarely edited)
images/         Your photos and app screenshots go here
```

**The golden rule:** for almost any update, you only edit **`js/content.js`**.
Keep the quotes `" "`, commas `,`, and brackets `[ ] { }` exactly as they are —
just change the words inside the quotes.

---

## 1. How to edit text in content.js

Open `js/content.js` in any text editor. Each section is labeled with a
comment. Change the text between the quotation marks.

```js
business: {
  phone: "(727) 259-4664",
  email: "add-your-email@example.com",   // <- change this to your real email
  serviceArea: "Tampa Bay & surrounding areas"
}
```

Save the file and refresh the page in your browser to see the change.
Your phone, email, and service area automatically appear everywhere on the site.

**Tip jar (Instrument Repair Fund):** edit the `tips:` section. To turn the
Venmo button into a real link, paste your Venmo URL into `venmoUrl`:

```js
tips: {
  venmoUrl: "https://venmo.com/u/Your-Username",   // when set, the button works
  zellePhone: "(727) 259-4664"
}
```

If `venmoUrl` is left empty (`""`), the button shows "Add Venmo Link Here" and
does nothing — handy until you're ready.

---

## 2. How to replace images

1. Put your photo in the `images/` folder (e.g. `images/hero.jpg`).
2. Point to it in `content.js`.

Anywhere a photo isn't set yet, the site shows a labeled placeholder box
("Add hero photo", etc.). **If an image is missing or misspelled, the layout
does not break** — it just falls back to the placeholder.

- **Hero / lessons / booking photos:** set them in the `images:` block:
  ```js
  images: {
    heroHome: "images/hero.jpg",
    lessonsHero: "images/lessons.jpg",
    bookingHero: ""
  }
  ```
- **Gallery photos (Media page):** edit the `gallery:` list:
  ```js
  gallery: [
    { src: "images/show-1.jpg", label: "Library show" },
    { src: "", label: "Add gallery photo" }
  ]
  ```
- **App screenshots:** set `screenshot` inside each app (see section 4).

Use JPG or PNG, about 1200px wide, under ~400 KB each for fast loading.

---

## 3. How to add YouTube videos

Edit the `videos:` list in `content.js`. You only need the video's **ID** —
the part after `watch?v=` or `youtu.be/`.

```
https://www.youtube.com/watch?v=ABC123XYZ   ->  id is "ABC123XYZ"
https://youtu.be/ABC123XYZ                  ->  id is "ABC123XYZ"
```

```js
videos: [
  { id: "ABC123XYZ", title: "Live at the Library" },
  { id: "", title: "Coming soon" }      // empty id shows a placeholder
]
```

---

## 4. How to add educational apps

Edit the `apps:` list. Copy one `{ ... }` block (don't forget the comma between
blocks) to add another app.

```js
apps: [
  {
    name: "Piano Learning App",
    description: "Short, friendly description.",
    screenshot: "images/piano-app.png",   // or "" for a placeholder
    openUrl: "https://your-app-link.com",  // "" hides the Open App button
    learnMoreUrl: ""                       // "" hides the Learn More button
  }
]
```

---

## 5. How to set up the Google Calendar embed

Upcoming Events on the Home page pulls straight from your Google Calendar, so
you never update the website by hand — just add events to your calendar.

1. Open **Google Calendar** on a computer.
2. Make the calendar **public**: Settings → your calendar → *Access permissions*
   → check **Make available to public**.
3. In that same settings page, scroll to **Integrate calendar** and copy the
   **Embed code**. It looks like:
   `<iframe src="https://calendar.google.com/calendar/embed?src=...">`
4. Copy **only the `src="..."` URL** (the part inside the quotes).
5. Paste it into `content.js`:
   ```js
   googleCalendarEmbedUrl: "https://calendar.google.com/calendar/embed?src=...",
   ```

If you leave it empty (`""`), the site shows a tidy
"Public events calendar coming soon." message instead.

---

## 6. How to deploy on Netlify

**Easiest (drag & drop):**
1. Go to <https://app.netlify.com> and sign up / log in (free).
2. On the **Sites** page, drag the whole project folder onto the
   "drag and drop your site folder here" area.
3. Netlify gives you a live URL in a few seconds. Done.

To update later, drag the folder again, or connect it to GitHub for automatic
deploys.

### Forms (very important)

The **Booking** and **Lesson Inquiry** forms use **Netlify Forms**, which work
automatically once the site is on Netlify — no setup, no server, free tier
included. Submissions appear in your Netlify dashboard under **Forms**, and you
can turn on **email notifications** there (Forms → Settings → Notifications) to
get every inquiry in your inbox.

- Forms do **not** work when you just open the HTML files on your own computer —
  they only work once deployed to Netlify. That's expected.
- After someone submits, they're sent to a thank-you state on the same page.
- To stop spam, each form already includes a hidden "honeypot" field. You can
  also enable Netlify's built-in spam filtering in the dashboard.

---

## Customizing colors (optional)

All colors live at the top of `css/styles.css` in the `:root { ... }` block
(the "Stage Lights" palette). Change a hex value there and it updates site-wide.

## Accessibility & SEO

The site already includes page titles, meta descriptions, alt text, semantic
HTML, labeled form fields, large tap targets, good color contrast, visible
keyboard focus, and respects "reduce motion" settings.
