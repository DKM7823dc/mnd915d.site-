(function initBookingPage() {
  const SERVICES = [
    { id: "full", mins: 60, price: 1899, img: "1", tag: "most", desc: "Head-to-toe relaxation" },
    { id: "deep", mins: 60, price: 2099, img: "2", tag: "pain", desc: "Release knots & tension" },
    { id: "aroma", mins: 90, price: 2399, img: "3", tag: "long", desc: "Essential oils, deep calm" },
    { id: "thai", mins: 60, price: 1999, img: "4", tag: "", desc: "Stretch & flexibility" },
    { id: "back", mins: 45, price: 1599, img: "5", tag: "", desc: "Desk-work back relief" },
    { id: "leg", mins: 45, price: 1499, img: "6", tag: "", desc: "Refresh tired feet" }
  ];
  const THERAPISTS = [
    { id: "any", photo: "", rating: "", sessions: "" },
    { id: "random", photo: "", rating: "", sessions: "" },
    { id: "ananya", photo: "a1", rating: "4.9", sessions: 612 },
    { id: "riya", photo: "a2", rating: "4.8", sessions: 438 },
    { id: "sanya", photo: "b1", rating: "4.9", sessions: 521 },
    { id: "diya", photo: "b2", rating: "4.8", sessions: 389 },
    { id: "aisha", photo: "b3", rating: "4.7", sessions: 456 },
    { id: "naina", photo: "b4", rating: "4.9", sessions: 604 }
  ];
  /** Quick picks only; any city typed in the search box is accepted. */
  const CITIES = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
    "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Indore", "Chandigarh", "Kochi", "Goa",
    "Noida", "Gurgaon", "Nagpur", "Bhopal", "Patna", "Kanpur", "Vadodara", "Ludhiana",
    "Agra", "Nashik", "Coimbatore", "Visakhapatnam", "Bhubaneswar", "Guwahati", "Dehradun",
    "Raipur", "Ranchi", "Amritsar", "Mysore", "Thiruvananthapuram", "Vijayawada", "Madurai",
    "Jodhpur", "Udaipur", "Varanasi"
  ];
  const FIRST_VISIT_OFF = 500;
  const PERIODS = [
    { id: "night", hours: [0, 1, 2, 3, 4, 5] },
    { id: "morning", hours: [6, 7, 8, 9, 10, 11] },
    { id: "afternoon", hours: [12, 13, 14, 15, 16, 17] },
    { id: "evening", hours: [18, 19, 20, 21, 22, 23] }
  ];
  const LEAD_MINUTES = 45;
  const STORAGE_KEY = "homespa_bookings";
  const CITY_KEY = "homespa_city";

  /* ---------- text ---------- */

  const I18N = {
    en: {
      "title": "Royal Touch Spa — Luxury Home Massage App in India",
      "nearby": "nearby",
      "offer.title": "₹500 OFF your first home visit",
      "offer.sub": "Open 24 hours · UPI only after the session",
      "india.title": "Home visits anywhere in India",
      "india.sub": "Every state · every city · 24×7 — now serving",
      "india.change": "Change",
      "s1": "Choose a massage",
      "s2": "Choose a therapist",
      "s2.hint": "Swipe →",
      "s3": "When should we come?",
      "s4": "Your address & contact",
      "s5": "Payment",
      "now.title": "Right now",
      "now.sub": "Therapist at your door in {eta} min",
      "or": "or schedule for later · open 24 hours",
      "f.name": "Your name",
      "f.name.ph": "e.g. Rahul",
      "f.phone": "Mobile number",
      "f.phone.ph": "10-digit mobile",
      "f.address": "Full address",
      "f.address.ph": "Flat / house no., building, street, area",
      "f.landmark": "Landmark",
      "f.optional": "(optional)",
      "f.landmark.ph": "Near…",
      "f.pincode": "Pincode",
      "f.note": "Note for therapist",
      "f.note.ph": "e.g. back pain, ring the bell twice",
      "pay.upi": "📱 UPI after session",
      "pay.cash": "💵 Cash unavailable",
      "pay.note": "Pay only after the session by UPI. Cash is unavailable for therapist safety and verified order records.",
      "consent": "By tapping “{btn}”, you agree that we may call or WhatsApp you on this number to arrange your visit. Read our {link}.",
      "consent.link": "Privacy Policy",
      "trust.india": "📍 Home visits in every city across India",
      "trust.verified": "✅ Verified & trained therapists",
      "trust.kit": "🧴 Bed, oils & fresh towels included",
      "trust.private": "🔒 UPI only after session · no advance payment",
      "book": "Download Now",
      "book.sub": "First visit ₹500 OFF",
      "booking": "Booking…",
      "city.title": "We come to you anywhere in India",
      "city.sub": "Search your city — if it's not listed, just type it.",
      "city.ph": "Search any city or town",
      "city.custom": "📍 Use “{q}” — we come there too",
      "city.toast": "✅ Home visits available in {city}",
      "done.title": "Request received",
      "done.lead": "Our team will call you",
      "done.id": "Request ID",
      "done.note": "We'll call {phone} shortly to confirm your booking and address. Please keep your phone nearby.",
      "done.ok": "OK",
      "done.massage": "Massage",
      "done.therapist": "Therapist",
      "done.when": "When",
      "done.address": "Address",
      "done.pay": "UPI after session",
      "cash": "Cash",
      "upi": "UPI",
      "min": "min",
      "service.full": "Full body relaxing",
      "service.deep": "Deep tissue",
      "service.aroma": "Aroma oil massage",
      "service.thai": "Thai stretch",
      "service.back": "Back & shoulder",
      "service.leg": "Leg & foot",
      "tag.most": "Most booked",
      "tag.pain": "Pain relief",
      "tag.long": "90 min",
      "th.any": "Fastest available",
      "th.random": "Random",
      "th.ananya": "Ananya",
      "th.riya": "Riya",
      "th.sanya": "Sanya",
      "th.diya": "Diya",
      "th.aisha": "Aisha",
      "th.naina": "Naina",
      "th.pickForMe": "Tap to pick for me",
      "th.shuffle": "Tap to shuffle",
      "th.arrives": "Arrives in ~{n} min",
      "th.visits": "{n} visits",
      "th.randomTag": "random pick",
      "th.toast": "🎲 {name} will visit you",
      "day.today": "Today",
      "day.tomorrow": "Tomorrow",
      "day.full": "Full",
      "period.night": "Late night",
      "period.morning": "Morning",
      "period.afternoon": "Afternoon",
      "period.evening": "Evening",
      "range.night": "12–5 AM",
      "range.morning": "6–11 AM",
      "range.afternoon": "12–5 PM",
      "range.evening": "6–11 PM",
      "period.passed": "Passed",
      "bill.fee": "Home visit fee",
      "bill.free": "FREE",
      "bill.offer": "First visit offer",
      "bill.total": "To pay after session",
      "up.badge": "Request received",
      "up.call": "📞 Our team will call {phone} to confirm",
      "up.cancel": "Cancel request",
      "up.confirm": "Cancel this request?",
      "up.cancelled": "Request cancelled",
      "when.asap": "Requested: right now (ASAP)",
      "err.slot": "Please pick a time slot",
      "err.fields": "Please check the highlighted fields",
      "err.network": "Network problem — please try again",
      "err.slotPassed": "That time has passed — please pick another slot"
    }
  };

  let lang = "en";

  /** Values are inserted as-is; callers escape anything user-supplied before it reaches innerHTML. */
  function t(key, vars) {
    let text = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    Object.entries(vars || {}).forEach(([k, v]) => { text = text.replaceAll(`{${k}}`, v); });
    return text;
  }

  /** English text for the booking record, so staff always read the same language. */
  function tEn(key, vars) {
    let text = I18N.en[key] || key;
    Object.entries(vars || {}).forEach(([k, v]) => { text = text.replaceAll(`{${k}}`, v); });
    return text;
  }

  function locale() {
    return "en-IN";
  }

  const state = {
    service: SERVICES[0].id,
    therapist: "any",
    randomPick: null,
    etas: {},
    when: "now",
    day: 0,
    period: null,
    slot: null,
    city: resolveCity(),
    submitting: false
  };

  const $ = (id) => document.getElementById(id);

  function escapeHtml(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function rupees(n) {
    return `₹${n.toLocaleString("en-IN")}`;
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Keeps letters, spaces, dots and hyphens so any Indian city name can be stored and shown. */
  function cleanCity(raw) {
    const clean = String(raw || "").replace(/[^\p{L}\p{M}\s.-]/gu, "").replace(/\s+/g, " ").trim().slice(0, 30);
    if (!clean) return "";
    const known = CITIES.find((c) => c.toLowerCase() === clean.toLowerCase());
    return known || clean.replace(/\b\p{L}/gu, (ch) => ch.toUpperCase());
  }

  /** A city the user picked wins; otherwise the app can pass ?city=Mumbai. */
  function resolveCity() {
    try {
      const saved = cleanCity(localStorage.getItem(CITY_KEY));
      if (saved) return saved;
    } catch (e) { /* ignore */ }
    return cleanCity(new URLSearchParams(window.location.search).get("city")) || CITIES[0];
  }

  function loadBookings() {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveBookings(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 10)));
    } catch (e) { /* ignore */ }
  }

  function formatPhone(phone) {
    return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
  }

  function currentService() {
    return SERVICES.find((s) => s.id === state.service);
  }

  function namedTherapists() {
    return THERAPISTS.filter((t) => t.photo);
  }

  /** "Random" resolves to a real therapist so the booking always names who is coming. */
  function currentTherapist() {
    if (state.therapist === "random") {
      return THERAPISTS.find((th) => th.id === state.randomPick) || namedTherapists()[0];
    }
    return THERAPISTS.find((th) => th.id === state.therapist);
  }

  function rollRandomTherapist() {
    const pool = namedTherapists().filter((th) => th.id !== state.randomPick);
    state.randomPick = pool[rand(0, pool.length - 1)].id;
  }

  function currentEta() {
    return state.etas[currentTherapist().id];
  }

  /** The ₹500 offer goes with one open request at a time. */
  function isFirstVisit() {
    return !loadBookings().some(isActiveBooking);
  }

  function priceFor(service) {
    const off = isFirstVisit() ? FIRST_VISIT_OFF : 0;
    return { base: service.price, off, total: service.price - off };
  }

  function dayDate(offset) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return d;
  }

  /** Local calendar date; toISOString() would shift to UTC and land on the previous day in India. */
  function isoDate(d) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function relativeDay(diff, date) {
    if (diff === 0) return t("day.today");
    if (diff === 1) return t("day.tomorrow");
    return date.toLocaleDateString(locale(), { weekday: "short" });
  }

  function slotLabel(hour) {
    const h = hour % 12 || 12;
    return `${h}:00 ${hour < 12 ? "AM" : "PM"}`;
  }

  /** Open 24 hours; a slot only needs travel lead time, which also covers tomorrow's 12 AM slot late at night. */
  function slotDisabled(dayOffset, hour) {
    const start = dayDate(dayOffset);
    start.setHours(hour);
    return start.getTime() - Date.now() < LEAD_MINUTES * 60000;
  }

  function periodOpen(dayOffset, period) {
    return period.hours.some((h) => !slotDisabled(dayOffset, h));
  }

  function dayOpen(dayOffset) {
    return PERIODS.some((p) => periodOpen(dayOffset, p));
  }

  /** Keep the chosen period unless it has no bookable slots left on that day. */
  function fixPeriod() {
    if (state.slot !== null) {
      state.period = PERIODS.find((p) => p.hours.includes(state.slot)).id;
      return;
    }
    const current = PERIODS.find((p) => p.id === state.period);
    if (current && periodOpen(state.day, current)) return;
    const soonest = new Date(Date.now() + LEAD_MINUTES * 60000).getHours();
    const preferred = PERIODS.find((p) => p.hours.includes(soonest));
    const open = periodOpen(state.day, preferred) ? preferred : PERIODS.find((p) => periodOpen(state.day, p));
    state.period = (open || PERIODS[0]).id;
  }

  function shortDate(d, loc) {
    return d.toLocaleDateString(loc || locale(), { day: "numeric", month: "short" });
  }

  /** Stored with the booking and sent to the backend: English, and never "Today"/"Tomorrow". */
  function whenText() {
    if (state.when === "now") {
      return `${shortDate(new Date(), "en-IN")} · ASAP (~${currentEta()} min)`;
    }
    const d = dayDate(state.day);
    const weekday = d.toLocaleDateString("en-IN", { weekday: "short" });
    return `${weekday}, ${shortDate(d, "en-IN")} · ${slotLabel(state.slot)}`;
  }

  function bookingStart(b) {
    if (b.when === "now") return new Date(b.createdAt);
    const [y, m, d] = b.date.split("-").map(Number);
    return new Date(y, m - 1, d, b.slotHour || 0);
  }

  /** "Now" bookings include travel time before the session starts. */
  function bookingEnd(b) {
    const travel = b.when === "now" ? (b.etaMin || 30) : 0;
    return new Date(bookingStart(b).getTime() + (travel + (b.minutes || 60)) * 60000);
  }

  function isActiveBooking(b) {
    if (!b || b.status !== "requested" || !b.createdAt) return false;
    if (b.when !== "now" && (!b.date || typeof b.slotHour !== "number")) return false;
    return Date.now() < bookingEnd(b).getTime();
  }

  /** Relative label recomputed on every render, so it stays right as the days pass. */
  function upcomingWhen(b) {
    if (b.when === "now") return t("when.asap");
    const start = bookingStart(b);
    const diff = Math.round((new Date(start).setHours(0, 0, 0, 0) - dayDate(0).getTime()) / 86400000);
    return `${relativeDay(diff, start)}, ${shortDate(start)} · ${slotLabel(b.slotHour)}`;
  }

  function serviceName(id) {
    return t(`service.${id}`);
  }

  function therapistLabel(b) {
    if (b.therapist === "any") return t("th.any");
    const name = t(`th.${b.therapist}`);
    return b.therapistPick === "random" ? `${name} (🎲 ${t("th.randomTag")})` : name;
  }

  /* ---------- render ---------- */

  function renderStatic() {
    document.documentElement.lang = "en-IN";
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    $("consent").innerHTML = t("consent", {
      btn: escapeHtml(t("book")),
      link: escapeHtml(t("consent.link"))
    });
    if (!state.submitting) {
      $("book-btn").innerHTML =
        `<svg class="bookbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/></svg>` +
        `<span class="bookbar__cta"><span class="bookbar__cta-label">${escapeHtml(t("book"))}</span><span class="bookbar__cta-sub">${escapeHtml(t("book.sub"))}</span></span>`;
    }
  }

  function renderNowSub() {
    $("now-sub").innerHTML = t("now.sub", { eta: `<b>${currentEta()}</b>` });
  }

  function renderServices() {
    $("services").innerHTML = SERVICES.map((s) => `
      <button class="service ${s.id === state.service ? "is-active" : ""}" data-service="${s.id}" type="button">
        <img class="service__img" src="images/${s.img}.jpg" alt="" loading="lazy" decoding="async">
        ${s.tag ? `<span class="service__tag">${escapeHtml(t(`tag.${s.tag}`))}</span>` : ""}
        <span class="service__body">
          <span class="service__name">${escapeHtml(serviceName(s.id))}</span>
          ${s.desc ? `<span class="service__desc">${escapeHtml(s.desc)}</span>` : ""}
          <span class="service__meta">${s.mins} ${t("min")} · <b>${rupees(s.price)}</b></span>
        </span>
        <span class="service__check" aria-hidden="true">✓</span>
      </button>
    `).join("");
  }

  function initEtas() {
    THERAPISTS.forEach((th) => {
      if (th.id !== "random") state.etas[th.id] = th.id === "any" ? rand(15, 22) : rand(18, 29);
    });
  }

  function randomCard(active) {
    const pick = active ? currentTherapist() : null;
    if (!pick) {
      return `
        <span class="therapist__img therapist__img--random" aria-hidden="true">🎲</span>
        <span class="therapist__name">${escapeHtml(t("th.random"))}</span>
        <span class="therapist__meta">${escapeHtml(t("th.pickForMe"))}</span>
      `;
    }
    return `
      <span class="therapist__pic">
        <img class="therapist__img" src="images/${pick.photo}.jpg" alt="" decoding="async">
        <span class="therapist__dice" aria-hidden="true">🎲</span>
      </span>
      <span class="therapist__name">${escapeHtml(t(`th.${pick.id}`))}</span>
      <span class="therapist__meta">${escapeHtml(t("th.shuffle"))}</span>
      <span class="therapist__eta">🛵 ${state.etas[pick.id]} ${t("min")}</span>
    `;
  }

  function renderTherapists() {
    const cards = THERAPISTS.map((th) => {
      const active = th.id === state.therapist;
      if (th.id === "random") {
        return `<button class="therapist therapist--random ${active ? "is-active" : ""}" data-therapist="random" type="button">${randomCard(active)}</button>`;
      }
      const eta = state.etas[th.id];
      const avatar = th.photo
        ? `<img class="therapist__img" src="images/${th.photo}.jpg" alt="" loading="lazy" decoding="async">`
        : `<span class="therapist__img therapist__img--any" aria-hidden="true">⚡</span>`;
      const meta = th.id === "any"
        ? t("th.arrives", { n: eta })
        : `★ ${th.rating} · ${t("th.visits", { n: th.sessions })}`;
      return `
        <button class="therapist ${active ? "is-active" : ""}" data-therapist="${th.id}" type="button">
          ${avatar}
          <span class="therapist__name">${escapeHtml(t(`th.${th.id}`))}</span>
          <span class="therapist__meta">${escapeHtml(meta)}</span>
          ${th.id === "any" ? "" : `<span class="therapist__eta">🛵 ${eta} ${t("min")}</span>`}
        </button>
      `;
    }).join("");
    $("therapists").innerHTML = cards + cards;
    renderNowSub();
  }

  function renderDays() {
    if (state.when === "later" && !dayOpen(state.day)) {
      state.day = [0, 1, 2, 3].find(dayOpen);
      state.slot = null;
    }
    $("days").innerHTML = [0, 1, 2, 3].map((i) => {
      const d = dayDate(i);
      const open = dayOpen(i);
      const active = state.when === "later" && state.day === i;
      return `
        <button class="day ${active ? "is-active" : ""}" data-day="${i}" type="button" ${open ? "" : "disabled"}>
          <span class="day__label">${escapeHtml(relativeDay(i, d))}</span>
          <span class="day__date">${open ? d.getDate() : escapeHtml(t("day.full"))}</span>
        </button>
      `;
    }).join("");
  }

  function renderSlots() {
    const box = $("slots");
    const tabs = $("periods");
    if (state.when !== "later") {
      box.hidden = true;
      tabs.hidden = true;
      return;
    }
    fixPeriod();
    tabs.hidden = false;
    tabs.innerHTML = PERIODS.map((p) => {
      const open = periodOpen(state.day, p);
      return `
        <button class="period ${p.id === state.period ? "is-active" : ""}" data-period="${p.id}" type="button" ${open ? "" : "disabled"}>
          <span class="period__label">${escapeHtml(t(`period.${p.id}`))}</span>
          <span class="period__range">${escapeHtml(open ? t(`range.${p.id}`) : t("period.passed"))}</span>
        </button>
      `;
    }).join("");
    box.hidden = false;
    const period = PERIODS.find((p) => p.id === state.period);
    box.innerHTML = period.hours.map((h) => {
      const off = slotDisabled(state.day, h);
      return `<button class="slot ${state.slot === h ? "is-active" : ""}" data-slot="${h}" type="button" ${off ? "disabled" : ""}>${slotLabel(h)}</button>`;
    }).join("");
  }

  function renderWhen() {
    $("now-card").classList.toggle("is-active", state.when === "now");
    renderDays();
    renderSlots();
  }

  function renderBill() {
    const s = currentService();
    const p = priceFor(s);
    $("bill").innerHTML = `
      <div class="bill__row"><span>${escapeHtml(serviceName(s.id))} · ${s.mins} ${t("min")}</span><span>${rupees(p.base)}</span></div>
      <div class="bill__row"><span>${escapeHtml(t("bill.fee"))}</span><span class="bill__free">${escapeHtml(t("bill.free"))}</span></div>
      ${p.off ? `<div class="bill__row bill__row--off"><span>${escapeHtml(t("bill.offer"))}</span><span>−${rupees(p.off)}</span></div>` : ""}
      <div class="bill__row bill__row--total"><span>${escapeHtml(t("bill.total"))}</span><span>${rupees(p.total)}</span></div>
    `;
    const barTotal = $("bar-total");
    const barWas = $("bar-was");
    if (barTotal) barTotal.textContent = rupees(p.total);
    if (barWas) barWas.textContent = p.off ? rupees(p.base) : "";
    $("offer").hidden = !p.off;
  }

  function renderCity() {
    $("city-label").textContent = state.city;
    $("india-city").textContent = state.city;
    const query = cleanCity($("city-search").value);
    const q = query.toLowerCase();
    const matches = CITIES.filter((c) => c.toLowerCase().includes(q));
    const exact = matches.some((c) => c.toLowerCase() === q);
    const custom = query.length >= 3 && !exact
      ? `<button class="city city--custom" data-city="${escapeHtml(query)}" type="button">${t("city.custom", { q: escapeHtml(query) })}</button>`
      : "";
    const list = matches.map((c) => `
      <button class="city ${c === state.city ? "is-active" : ""}" data-city="${escapeHtml(c)}" type="button">${escapeHtml(c)}</button>
    `).join("");
    $("city-list").innerHTML = matches.length ? list + custom : custom;
  }

  function renderUpcoming() {
    const box = $("upcoming");
    const latest = loadBookings().find(isActiveBooking);
    if (!latest) {
      box.hidden = true;
      return;
    }
    box.hidden = false;
    box.innerHTML = `
      <div class="upcoming__head">
        <span class="upcoming__badge">${escapeHtml(t("up.badge"))}</span>
        <span class="upcoming__id">#${escapeHtml(latest.id)}</span>
      </div>
      <p class="upcoming__call">${t("up.call", { phone: escapeHtml(formatPhone(latest.phone)) })}</p>
      <p class="upcoming__title">${escapeHtml(serviceName(latest.service))} · ${escapeHtml(therapistLabel(latest))}</p>
      <p class="upcoming__when">🕒 ${escapeHtml(upcomingWhen(latest))}</p>
      <p class="upcoming__addr">📍 ${escapeHtml(latest.address)}</p>
      <button class="upcoming__cancel" data-cancel="${escapeHtml(latest.id)}" type="button">${escapeHtml(t("up.cancel"))}</button>
    `;
  }

  function renderAll() {
    renderStatic();
    renderServices();
    renderTherapists();
    renderWhen();
    renderBill();
    renderCity();
    renderUpcoming();
  }

  /* ---------- sheets & toast ---------- */

  function openSheet(el) {
    el.hidden = false;
    window.requestAnimationFrame(() => el.classList.add("is-open"));
  }

  function closeSheet(el) {
    el.classList.remove("is-open");
    window.setTimeout(() => { el.hidden = true; }, 250);
  }

  let toastTimer = 0;
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("is-show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => el.classList.remove("is-show"), 2600);
  }

  /* ---------- validation & submit ---------- */

  /** Accepts pasted "+91 98765 43210" / "098765 43210" and keeps the 10-digit number. */
  function normalizePhone(value) {
    let digits = value.replace(/\D/g, "");
    if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
    if (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1);
    return digits.slice(0, 10);
  }

  function readForm() {
    return {
      name: $("f-name").value.trim(),
      phone: normalizePhone($("f-phone").value),
      address: $("f-address").value.trim(),
      landmark: $("f-landmark").value.trim(),
      pincode: $("f-pincode").value.replace(/\D/g, ""),
      note: $("f-note").value.trim()
    };
  }

  function markError(input, bad) {
    input.closest(".field").classList.toggle("has-error", bad);
    return bad;
  }

  /** Returns the first element that needs attention, or null when the booking is complete. */
  function validate(form) {
    if (state.when === "later" && state.slot === null) {
      toast(t("err.slot"));
      return $("block-time");
    }
    const checks = [
      [$("f-name"), form.name.length < 2],
      [$("f-phone"), !/^[6-9]\d{9}$/.test(form.phone)],
      [$("f-address"), form.address.length < 8],
      [$("f-pincode"), !/^[1-9]\d{5}$/.test(form.pincode)]
    ];
    let first = null;
    checks.forEach(([input, bad]) => {
      if (markError(input, bad) && !first) first = input;
    });
    if (first) toast(t("err.fields"));
    return first;
  }

  function makeBookingId() {
    return `HS${Date.now().toString().slice(-6)}${rand(10, 99)}`;
  }

  async function submit() {
    if (state.submitting) return;
    const form = readForm();
    const problem = validate(form);
    if (problem) {
      problem.scrollIntoView({ behavior: "smooth", block: "center" });
      if (problem.focus && problem.tagName !== "SECTION") problem.focus({ preventScroll: true });
      return;
    }

    const service = currentService();
    const therapist = currentTherapist();
    const price = priceFor(service);
    const picked = state.therapist === "random" ? "random" : "direct";
    const booking = {
      id: makeBookingId(),
      service: service.id,
      serviceName: tEn(`service.${service.id}`),
      minutes: service.mins,
      therapist: therapist.id,
      therapistPick: picked,
      therapistName: therapist.id === "any" ? tEn("th.any")
        : picked === "random" ? `${tEn(`th.${therapist.id}`)} (random pick)` : tEn(`th.${therapist.id}`),
      when: state.when,
      date: state.when === "now" ? "" : isoDate(dayDate(state.day)),
      slot: state.when === "now" ? "" : slotLabel(state.slot),
      slotHour: state.when === "now" ? null : state.slot,
      etaMin: currentEta(),
      whenText: whenText(),
      city: state.city,
      pay: document.querySelector("input[name=pay]:checked").value,
      price: price.base,
      discount: price.off,
      total: price.total,
      lang,
      consent: true,
      ...form
    };

    const btn = $("book-btn");
    state.submitting = true;
    btn.disabled = true;
    btn.textContent = t("booking");
    try {
      const res = await fetch("book.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      booking.id = data.id || booking.id;
      // A real Subscribe is recorded only after the backend validates and stores the booking.
      try {
        if (typeof window.fbq === "function") {
          window.fbq("track", "Subscribe", {
            value: Number(booking.total || 0),
            currency: "INR",
            content_name: booking.serviceName,
            booking_id: booking.id
          });
        }
      } catch (_) {}
    } catch (err) {
      toast(t("err.network"));
      state.submitting = false;
      btn.disabled = false;
      btn.textContent = t("book");
      return;
    }

    booking.status = "requested";
    booking.createdAt = Date.now();
    saveBookings([booking, ...loadBookings()]);
    showDone(booking);

    state.submitting = false;
    btn.disabled = false;
    btn.textContent = t("book");
    renderUpcoming();
    renderBill();
  }

  function showDone(b) {
    $("done-id").textContent = b.id;
    $("done-note").innerHTML = t("done.note", { phone: `<b>${escapeHtml(formatPhone(b.phone))}</b>` });
    $("done-card").innerHTML = `
      <p><span>${escapeHtml(t("done.massage"))}</span><b>${escapeHtml(serviceName(b.service))} · ${b.minutes} ${t("min")}</b></p>
      <p><span>${escapeHtml(t("done.therapist"))}</span><b>${escapeHtml(therapistLabel(b))}</b></p>
      <p><span>${escapeHtml(t("done.when"))}</span><b>${escapeHtml(upcomingWhen(b))}</b></p>
      <p><span>${escapeHtml(t("done.address"))}</span><b>${escapeHtml(b.address)}</b></p>
      <p><span>${escapeHtml(t("done.pay"))}</span><b>${rupees(b.total)} · ${escapeHtml(t(b.pay === "cash" ? "cash" : "upi"))}</b></p>
    `;
    openSheet($("done-sheet"));
  }

  /** Tells the backend so staff don't call a customer who already cancelled. */
  function reportCancel(b) {
    fetch("book.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel", id: b.id, phone: b.phone }),
      keepalive: true
    }).catch(() => {});
  }

  /* ---------- events ---------- */

  function bind() {
    $("services").addEventListener("click", (e) => {
      const el = e.target.closest("[data-service]");
      if (!el) return;
      state.service = el.dataset.service;
      renderServices();
      renderBill();
    });

    $("therapists").addEventListener("click", (e) => {
      const el = e.target.closest("[data-therapist]");
      if (!el) return;
      const id = el.dataset.therapist;
      state.therapist = id;
      if (id === "random") {
        rollRandomTherapist();
        toast(t("th.toast", { name: t(`th.${currentTherapist().id}`) }));
      }
      renderTherapists();
    });

    $("now-card").addEventListener("click", () => {
      state.when = "now";
      state.slot = null;
      renderWhen();
    });

    $("days").addEventListener("click", (e) => {
      const el = e.target.closest("[data-day]");
      if (!el || el.disabled) return;
      state.when = "later";
      state.day = Number(el.dataset.day);
      if (state.slot !== null && slotDisabled(state.day, state.slot)) state.slot = null;
      if (state.slot === null) state.period = null;
      renderWhen();
    });

    $("periods").addEventListener("click", (e) => {
      const el = e.target.closest("[data-period]");
      if (!el || el.disabled) return;
      state.period = el.dataset.period;
      state.slot = null;
      renderSlots();
    });

    $("slots").addEventListener("click", (e) => {
      const el = e.target.closest("[data-slot]");
      if (!el || el.disabled) return;
      state.slot = Number(el.dataset.slot);
      renderSlots();
    });

    const contactForm = $("contact-form");
    if (contactForm) {
      contactForm.addEventListener("input", (e) => {
        const field = e.target.closest(".field");
        if (field) field.classList.remove("has-error");
        if (e.target.id === "f-phone") e.target.value = normalizePhone(e.target.value);
        if (e.target.id === "f-pincode") e.target.value = e.target.value.replace(/\D/g, "");
      });
      contactForm.addEventListener("submit", (e) => e.preventDefault());
      contactForm.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" || e.target.tagName === "TEXTAREA") return;
        e.preventDefault();
        const fields = Array.from(document.querySelectorAll("#contact-form input, #contact-form textarea"));
        const next = fields[fields.indexOf(e.target) + 1];
        if (next) next.focus();
        else e.target.blur();
      });
    }

    setupKeyboardMode();

    $("city-btn").addEventListener("click", () => {
      $("city-search").value = "";
      renderCity();
      openSheet($("city-sheet"));
    });
    $("india-change").addEventListener("click", () => $("city-btn").click());
    $("city-search").addEventListener("input", renderCity);
    $("city-search").addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      const first = $("city-list").querySelector("[data-city]");
      if (first) first.click();
    });
    $("city-list").addEventListener("click", (e) => {
      const el = e.target.closest("[data-city]");
      if (!el) return;
      state.city = cleanCity(el.dataset.city) || state.city;
      try { localStorage.setItem(CITY_KEY, state.city); } catch (err) { /* ignore */ }
      $("city-search").value = "";
      $("city-search").blur();
      renderCity();
      closeSheet($("city-sheet"));
      toast(t("city.toast", { city: state.city }));
    });

    document.querySelectorAll(".sheet").forEach((sheet) => {
      sheet.addEventListener("click", (e) => {
        if (e.target.closest("[data-close]")) closeSheet(sheet);
      });
    });

    $("upcoming").addEventListener("click", (e) => {
      const el = e.target.closest("[data-cancel]");
      if (!el) return;
      if (!window.confirm(t("up.confirm"))) return;
      const target = loadBookings().find((b) => b.id === el.dataset.cancel);
      const list = loadBookings().map((b) => (b.id === el.dataset.cancel ? { ...b, status: "cancelled" } : b));
      saveBookings(list);
      if (target) reportCancel(target);
      renderUpcoming();
      renderBill();
      toast(t("up.cancelled"));
    });

    $("book-btn").addEventListener("click", k2);
  }

  function restoreContact() {
    const last = loadBookings()[0];
    if (!last || !$("f-name")) return;
    $("f-name").value = last.name || "";
    $("f-phone").value = last.phone || "";
    $("f-address").value = last.address || "";
    $("f-landmark").value = last.landmark || "";
    $("f-pincode").value = last.pincode || "";
  }

  function setupOnlineCount() {
    const el = $("online-count");
    let n = rand(34, 58);
    el.textContent = n;
    window.setInterval(() => {
      n = Math.min(70, Math.max(28, n + rand(-2, 2)));
      el.textContent = n;
    }, 6000);
  }

  /**
   * Android WebViews resize for the keyboard, so the fixed book bar rides up and covers the field.
   * Hide it only while the keyboard really takes screen space: the Android back key closes the
   * keyboard without blurring the input, and a focus-based check would leave "Book now" hidden.
   */
  function setupKeyboardMode() {
    const vv = window.visualViewport;
    let fullHeight = vv ? vv.height : window.innerHeight;
    function update() {
      const h = vv ? vv.height : window.innerHeight;
      const el = document.activeElement;
      const inForm = !!el && !!el.closest && !!el.closest("#contact-form");
      if (!inForm) fullHeight = Math.max(fullHeight, h);
      const keyboardOpen = inForm && h < fullHeight - 150;
      document.body.classList.toggle("is-typing", keyboardOpen);
    }
    (vv || window).addEventListener("resize", update);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", () => window.setTimeout(update, 100));
    window.addEventListener("orientationchange", () => { fullHeight = 0; window.setTimeout(update, 300); });
  }

  /** The app may keep this page alive for hours or across midnight. */
  function setupClock() {
    function refresh() {
      if (state.slot !== null && slotDisabled(state.day, state.slot)) {
        state.slot = null;
        toast(t("err.slotPassed"));
      }
      renderWhen();
      renderUpcoming();
      renderBill();
    }
    window.setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") refresh();
    });
  }

  initEtas();
  renderAll();
  restoreContact();
  setupOnlineCount();
  setupClock();
  bind();
})();
