/* ==========================================================================
   MR. BRAD — SITE CONTENT
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit for most updates.
   Change the text between the quotes. Keep the quotes, commas, and brackets.
   See README.md for step-by-step instructions.
   ========================================================================== */

window.SITE = {

  /* ----------------------------------------------------------------------
     1. BUSINESS INFO  (phone, email, service area)
     ---------------------------------------------------------------------- */
  business: {
    name: "Mr. Brad's Music",
    phone: "(727) 259-4664",
    phoneHref: "tel:+17272594664",
    email: "mrbradsmusic@gmail.com",
    serviceArea: "Florida & beyond — 15 years performing for children and families",
    social: {
      facebook: "https://facebook.com/mrbradsmusic",
      instagram: "https://instagram.com/mrbradsmusic",
      tiktok: "https://www.tiktok.com/@mrbradsmusic"
    }
  },

  /* ----------------------------------------------------------------------
     2. INSTRUMENT REPAIR FUND  (the slim banner at the top of every page)
     ---------------------------------------------------------------------- */
  tips: {
    venmoUrl: "https://venmo.com/mrbradsmusic",
    venmoLabel: "💛 Tip on Venmo",
    zellePhone: "(727) 259-4664",
    note: "Tips help maintain the instruments used in Mr. Brad's shows and music education programs."
  },

  /* ----------------------------------------------------------------------
     3. GOOGLE CALENDAR  (Upcoming Events on the Home page)
     Paste the SRC url from your Google Calendar "Embed code" here.
     Leave it as "" to show a friendly "coming soon" placeholder.
     See README.md → "How to set up the Google Calendar embed".
     ---------------------------------------------------------------------- */
  googleCalendarEmbedUrl: "https://calendar.google.com/calendar/embed?src=mrbradsmusic%40gmail.com",

  /* ----------------------------------------------------------------------
     4. PROGRAMS
     Used on BOTH the Home page (cards) and the Programs page (full details).
     - accent: "coral" | "marigold" | "turquoise" | "grape"
     - programParam: the value sent to the Booking page (keep as-is)
     - comingSoon: true/false
     ---------------------------------------------------------------------- */
  programs: [
    {
      id: "mr-brad-show",
      name: "The Mr. Brad Show",
      accent: "coral",
      image: "images/show-program.jpg",
      comingSoon: false,
      tagline: "An interactive one-man-band musical experience for young children.",
      audience: "Best for ages 0–5 and family audiences.",
      shortDescription:
        "A stage full of instruments, sing-alongs, movement, and hands-on musical fun for little ones and their grown-ups.",
      details:
        "Mr. Brad leads a high-energy, all-ages-friendly concert packed with sing-alongs, movement, instrument demonstrations, and lots of audience participation — mixing classic children's songs with original tunes.",
      features: [
        "Sing-alongs",
        "Movement & dancing",
        "Instrument demonstrations",
        "Audience participation",
        "Classic children's songs",
        "Original songs",
        "Guitar, piano, violin, banjo, mandolin, flute, bass, percussion, looping, and more"
      ],
      buttonLabel: "Book The Mr. Brad Show",
      programParam: "The Mr. Brad Show",
      imageLabel: "Add program photo"
    },
    {
      id: "song-factory",
      name: "Song Factory",
      accent: "turquoise",
      image: "images/workshop.jpg",
      comingSoon: false,
      tagline: "Create, record, and perform an original song in one hour.",
      audience: "Great for classrooms, schools, libraries, camps, and creative workshops.",
      shortDescription:
        "A guided music-creation workshop where students build a brand-new song together — and walk away with a recording.",
      details:
        "A classroom music-creation workshop where Mr. Brad guides students through building a song together. Students help create the lyrics, rhythms, melodies, sounds, and arrangement ideas. Mr. Brad records them and brings up student volunteers when appropriate.",
      features: [
        "Students write the lyrics",
        "Build rhythms & melodies together",
        "Explore sounds & arrangement",
        "Live recording during the session",
        "Student volunteers welcome",
        "A finished original song to share"
      ],
      buttonLabel: "Book Song Factory",
      programParam: "Song Factory",
      imageLabel: "Add classroom workshop photo"
    },
    {
      id: "musical-spaceship",
      name: "Mr. Brad's Musical Spaceship",
      accent: "grape",
      image: "images/spaceship.jpg",
      comingSoon: true,
      tagline: "A musical journey through the solar system.",
      audience: "Designed for school assemblies, libraries, and family science nights.",
      shortDescription:
        "Blast off through the solar system with original planet songs, science concepts, video, and audience participation.",
      details:
        "A musical journey through the solar system featuring original planet songs, science concepts, video elements, and audience participation.",
      features: [
        "Original songs for each planet",
        "Real science concepts",
        "Video & visual elements",
        "Audience participation"
      ],
      buttonLabel: "Request Info",
      programParam: "Mr. Brad's Musical Spaceship",
      imageLabel: "Add spaceship image"
    },
    {
      id: "birthday-parties",
      name: "Birthday Parties",
      accent: "marigold",
      image: "images/birthday.jpg",
      comingSoon: false,
      tagline: "A musical celebration custom-fit for your child.",
      audience: "Perfect for birthday celebrations of all ages.",
      shortDescription:
        "An interactive, personalized musical performance that makes birthdays unforgettable.",
      details:
        "Mr. Brad brings music, laughter, sing-alongs, and interactive fun to birthday celebrations. Every show is tailored to the birthday kid's interests and age group — whether it's dancing, drumming, or playing instruments together.",
      features: [
        "Customized song for the birthday child",
        "Interactive sing-alongs",
        "Instrument demonstrations",
        "Dancing & movement",
        "Age-appropriate for all kids",
        "Indoor or outdoor"
      ],
      buttonLabel: "Book a Birthday Party",
      programParam: "Birthday Parties",
      imageLabel: "Add birthday party photo"
    }
  ],

  /* ----------------------------------------------------------------------
     5. "GOOD FOR" tags (Programs page)
     ---------------------------------------------------------------------- */
  goodFor: [
    "Libraries", "Schools", "Preschools", "Festivals",
    "Camps", "Community events", "Family concerts", "Birthday Parties"
  ],

  /* ----------------------------------------------------------------------
     6. TESTIMONIALS  (Home preview + Media page)
     ---------------------------------------------------------------------- */
  testimonials: [
    { quote: "The kids were completely engaged from start to finish. Mr. Brad had them laughing and singing the whole time.", source: "Sarah, Library Program Coordinator" },
    { quote: "Our preschoolers talked about this for weeks afterward. The hands-on music making really stuck with them.", source: "Michelle, Preschool Director" },
    { quote: "Mr. Brad brings so much genuine enthusiasm and warmth. You can tell he absolutely loves working with kids.", source: "Jennifer, Parent" },
    { quote: "My son's birthday party was absolutely incredible. He's still talking about it! Every kid felt special.", source: "David, Birthday Party Parent" },
    { quote: "The energy and creativity Mr. Brad brings is unmatched. Our whole school had the best assembly.", source: "Lisa, Teacher" }
  ],

  /* ----------------------------------------------------------------------
     7. VIDEOS  (Media page) — YouTube
     Put the part AFTER "youtu.be/" or "watch?v=" as the id.
     Example url: https://www.youtube.com/watch?v=ABC123  ->  id: "ABC123"
     ---------------------------------------------------------------------- */
  videos: [
    { id: "GuKfR0j4ThM", title: "The Ducky Song" },
    { id: "TYAqQip0l7A", title: "Performance Timelapse" }
  ],

  /* ----------------------------------------------------------------------
     8. PHOTO GALLERY  (Media page)
     Put image files in /images and reference them, e.g. "images/show-1.jpg".
     Leave src as "" to show a labeled placeholder box.
     ---------------------------------------------------------------------- */
  gallery: [
    { src: "", label: "Add gallery photo" },
    { src: "", label: "Add gallery photo" },
    { src: "", label: "Add gallery photo" },
    { src: "", label: "Add gallery photo" },
    { src: "", label: "Add gallery photo" },
    { src: "", label: "Add gallery photo" }
  ],

  /* ----------------------------------------------------------------------
     9. EDUCATIONAL APPS / LEARNING TOOLS  (Lessons page)
     - openUrl: link the "Open App" button goes to ("" hides the button)
     - learnMoreUrl: optional second button ("" hides it)
     - screenshot: image path or "" for a placeholder
     ---------------------------------------------------------------------- */
  apps: [
    {
      name: "Mode Wheel",
      description: "An interactive music theory tool for exploring scales, modes, and chords. See and hear how they connect in real time.",
      screenshot: "",
      openUrl: "https://modewheel.netlify.app",
      learnMoreUrl: ""
    },
    {
      name: "More apps coming soon 🎵",
      description: "Piano Learning App, Student Tracker, and other educational music tools are in development. Check back soon!",
      screenshot: "",
      openUrl: "",
      learnMoreUrl: ""
    }
  ],

  /* ----------------------------------------------------------------------
     10. IMAGE PATHS  (optional)
     Drop photos into /images and set the path here. Leave "" to keep the
     labeled placeholder. The layout never breaks if an image is missing.
     ---------------------------------------------------------------------- */
  images: {
    heroHome: "images/hero.jpg",
    logo: "images/mr-brad-logo.jpg",
    lessonsHero: "",
    bookingHero: ""
  }
};
