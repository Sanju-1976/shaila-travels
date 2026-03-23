import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --bg: #0b0e14;
    --surface: #12161f;
    --surface2: #1a1f2e;
    --orange: #f97316;
    --orange-light: #fb923c;
    --orange-glow: rgba(249,115,22,0.15);
    --white: #ffffff;
    --muted: #8892a4;
    --border: rgba(255,255,255,0.07);
    --card-bg: #141820;
  }

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--white);
    overflow-x: hidden;
  }

  /* ── NAVBAR ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 6%;
    height: 68px;
    background: rgba(11,14,20,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 1.35rem; font-weight: 800;
    color: var(--white); text-decoration: none;
    letter-spacing: -0.02em;
  }
  .nav-logo span { color: var(--orange); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    color: var(--muted); text-decoration: none;
    font-size: 0.9rem; font-weight: 400;
    transition: color 0.2s; letter-spacing: 0.02em;
  }
  .nav-links a:hover { color: var(--white); }
  .nav-cta {
    background: var(--orange); color: var(--white);
    border: none; cursor: pointer;
    padding: 9px 22px; border-radius: 6px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.88rem; font-weight: 500;
    transition: background 0.2s, transform 0.15s;
  }
  .nav-cta:hover { background: var(--orange-light); transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 110px 6% 70px;
    position: relative; overflow: hidden;
    background: var(--bg);
  }
  .hero-glow {
    position: absolute;
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%);
    top: -100px; right: -150px;
    pointer-events: none;
  }
  .hero-glow2 {
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%);
    bottom: 0; left: 5%;
    pointer-events: none;
  }
  .hero-grid-lines {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .hero-content { max-width: 640px; position: relative; z-index: 2; animation: fadeUp 0.8s ease both; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--orange-glow);
    border: 1px solid rgba(249,115,22,0.3);
    color: var(--orange-light);
    padding: 5px 14px; border-radius: 50px;
    font-size: 0.8rem; font-weight: 500;
    margin-bottom: 26px; letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6rem, 5.5vw, 4.2rem);
    font-weight: 800; line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 22px;
  }
  .hero h1 .line2 { color: var(--orange); display: block; }
  .hero p {
    color: var(--muted); font-size: 1.05rem;
    line-height: 1.75; font-weight: 300;
    margin-bottom: 38px; max-width: 500px;
  }
  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-orange {
    background: var(--orange); color: var(--white);
    padding: 13px 28px; border-radius: 8px;
    border: none; cursor: pointer;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem; font-weight: 500;
    transition: all 0.2s;
  }
  .btn-orange:hover { background: var(--orange-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.35); }
  .btn-ghost {
    background: transparent; color: var(--white);
    padding: 13px 28px; border-radius: 8px;
    border: 1px solid var(--border); cursor: pointer;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem; font-weight: 400;
    transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: var(--orange); color: var(--orange); }
  .hero-stats {
    display: flex; gap: 3rem; margin-top: 56px;
    padding-top: 36px;
    border-top: 1px solid var(--border);
  }
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2.2rem; font-weight: 800;
    color: var(--orange);
  }
  .stat-label { color: var(--muted); font-size: 0.82rem; margin-top: 2px; font-weight: 300; }
  .hero-car {
    position: absolute; right: 4%; top: 50%;
    transform: translateY(-50%);
    font-size: 10rem;
    filter: drop-shadow(0 0 60px rgba(249,115,22,0.2));
    animation: carFloat 4s ease-in-out infinite;
    z-index: 1;
  }

  /* ── SEARCH BAR ── */
  .search-wrap {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 28px 6%;
  }
  .search-bar {
    display: flex; gap: 12px; flex-wrap: wrap;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 20px;
    align-items: flex-end;
  }
  .search-field { flex: 1; min-width: 160px; display: flex; flex-direction: column; gap: 6px; }
  .search-field label { color: var(--muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.07em; }
  .search-field input, .search-field select {
    background: transparent; border: none; outline: none;
    color: var(--white); font-family: 'Outfit', sans-serif;
    font-size: 0.95rem; font-weight: 500; padding: 4px 0;
    border-bottom: 1px solid var(--border);
  }
  .search-field input::placeholder { color: var(--muted); font-weight: 300; }
  .search-field select option { background: var(--surface2); }
  .search-divider { width: 1px; background: var(--border); align-self: stretch; margin: 0 8px; }
  .search-btn {
    background: var(--orange); color: var(--white);
    border: none; cursor: pointer; border-radius: 8px;
    padding: 12px 28px; font-family: 'Outfit', sans-serif;
    font-size: 0.92rem; font-weight: 500;
    white-space: nowrap; transition: all 0.2s;
  }
  .search-btn:hover { background: var(--orange-light); }

  /* ── SECTION ── */
  .section { padding: 90px 6%; }
  .sec-tag {
    color: var(--orange); font-size: 0.78rem; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 10px;
  }
  .sec-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.9rem, 3vw, 2.7rem);
    font-weight: 800; letter-spacing: -0.03em;
    margin-bottom: 12px; line-height: 1.15;
  }
  .sec-sub { color: var(--muted); font-size: 1rem; line-height: 1.7; font-weight: 300; max-width: 480px; }
  .sec-head { margin-bottom: 54px; }

  /* ── FLEET ── */
  .fleet-filters {
    display: flex; gap: 10px; margin-bottom: 36px; flex-wrap: wrap;
  }
  .filter-btn {
    padding: 8px 18px; border-radius: 50px;
    border: 1px solid var(--border);
    background: transparent; color: var(--muted);
    font-family: 'Outfit', sans-serif; font-size: 0.85rem;
    cursor: pointer; transition: all 0.2s;
  }
  .filter-btn.active, .filter-btn:hover {
    background: var(--orange); border-color: var(--orange);
    color: var(--white);
  }
  .fleet-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 22px;
  }
  .car-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
    transition: all 0.3s; cursor: pointer;
    position: relative;
  }
  .car-card:hover {
    border-color: rgba(249,115,22,0.4);
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(249,115,22,0.08);
  }
  .car-badge {
    position: absolute; top: 14px; left: 14px;
    background: var(--orange); color: var(--white);
    font-size: 0.72rem; font-weight: 600;
    padding: 4px 10px; border-radius: 50px;
    text-transform: uppercase; letter-spacing: 0.05em;
    z-index: 2;
  }
  .car-visual {
    height: 180px;
    background: linear-gradient(135deg, var(--surface2) 0%, #0d1120 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 5.5rem;
    position: relative; overflow: hidden;
  }
  .car-visual::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 40px;
    background: linear-gradient(transparent, var(--card-bg));
  }
  .car-info { padding: 20px; }
  .car-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem; font-weight: 700;
    letter-spacing: -0.02em; margin-bottom: 4px;
  }
  .car-type { color: var(--orange); font-size: 0.8rem; font-weight: 500; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.04em; }
  .car-specs {
    display: flex; gap: 14px; margin-bottom: 16px; flex-wrap: wrap;
  }
  .spec { display: flex; align-items: center; gap: 5px; color: var(--muted); font-size: 0.82rem; }
  .car-price {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 14px;
    border-top: 1px solid var(--border);
  }
  .price-amount {
    font-family: 'Syne', sans-serif;
    font-size: 1.25rem; font-weight: 700; color: var(--orange);
  }
  .price-unit { color: var(--muted); font-size: 0.78rem; display: block; }
  .book-btn {
    background: var(--orange-glow);
    border: 1px solid rgba(249,115,22,0.3);
    color: var(--orange); padding: 8px 18px;
    border-radius: 6px; cursor: pointer;
    font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 500;
    transition: all 0.2s;
  }
  .book-btn:hover { background: var(--orange); color: var(--white); border-color: var(--orange); }

  /* ── WHY US ── */
  .why-bg { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .why-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 28px;
  }
  .why-card {
    padding: 30px 22px;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 14px; transition: all 0.25s;
    text-align: center;
  }
  .why-card:hover { border-color: rgba(249,115,22,0.3); transform: translateY(-3px); }
  .why-icon {
    width: 54px; height: 54px;
    background: var(--orange-glow);
    border: 1px solid rgba(249,115,22,0.25);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; margin: 0 auto 18px;
  }
  .why-card h3 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
  .why-card p { color: var(--muted); font-size: 0.86rem; line-height: 1.65; font-weight: 300; }

  /* ── DESTINATIONS ── */
  .dest-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
  }
  .dest-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 14px; overflow: hidden;
    transition: all 0.28s; cursor: pointer;
  }
  .dest-card:hover { border-color: rgba(249,115,22,0.35); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
  .dest-img {
    height: 130px;
    background: linear-gradient(135deg, #1a2340 0%, #0d1120 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 3.5rem;
  }
  .dest-info { padding: 16px; }
  .dest-info h4 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
  .dest-info p { color: var(--muted); font-size: 0.82rem; }
  .dest-info .dist { color: var(--orange); font-size: 0.8rem; font-weight: 500; margin-top: 8px; }

  /* ── BOOKING MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(0,0,0,0.75);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 20px; padding: 36px;
    width: 100%; max-width: 500px;
    position: relative;
    animation: slideUp 0.3s ease;
  }
  .modal-close {
    position: absolute; top: 18px; right: 18px;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--muted); width: 32px; height: 32px;
    border-radius: 50%; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .modal-close:hover { color: var(--white); border-color: var(--orange); }
  .modal h3 { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 6px; }
  .modal-car-name { color: var(--orange); font-size: 0.9rem; margin-bottom: 24px; }
  .modal-form { display: flex; flex-direction: column; gap: 14px; }
  .modal-field { display: flex; flex-direction: column; gap: 7px; }
  .modal-field label { color: var(--muted); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.06em; }
  .modal-field input, .modal-field select {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 11px 14px;
    color: var(--white); font-family: 'Outfit', sans-serif; font-size: 0.92rem;
    outline: none; transition: border 0.2s;
  }
  .modal-field input:focus, .modal-field select:focus { border-color: var(--orange); }
  .modal-field select option { background: var(--surface2); }
  .modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .modal-submit {
    margin-top: 8px; padding: 13px;
    background: var(--orange); color: var(--white);
    border: none; border-radius: 8px; cursor: pointer;
    font-family: 'Outfit', sans-serif; font-size: 0.97rem; font-weight: 600;
    transition: all 0.2s;
  }
  .modal-submit:hover { background: var(--orange-light); }
  .modal-success {
    text-align: center; padding: 20px 0;
  }
  .modal-success .check { font-size: 3rem; margin-bottom: 14px; }
  .modal-success h4 { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 700; margin-bottom: 8px; }
  .modal-success p { color: var(--muted); font-size: 0.9rem; }

  /* ── TESTIMONIALS ── */
  .test-bg { background: var(--surface); border-top: 1px solid var(--border); }
  .test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; }
  .test-card {
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: 14px; padding: 26px 22px;
    transition: all 0.25s;
  }
  .test-card:hover { border-color: rgba(249,115,22,0.3); }
  .test-stars { color: var(--orange); font-size: 0.9rem; margin-bottom: 14px; }
  .test-text { color: var(--muted); font-size: 0.9rem; line-height: 1.7; font-weight: 300; margin-bottom: 18px; font-style: italic; }
  .test-author { display: flex; align-items: center; gap: 12px; }
  .test-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--orange-glow); border: 1px solid rgba(249,115,22,0.3);
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
  }
  .test-name { font-weight: 600; font-size: 0.9rem; }
  .test-loc { color: var(--muted); font-size: 0.78rem; }

  /* ── CONTACT ── */
  .contact-wrap {
    display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: start;
  }
  .contact-item { display: flex; gap: 14px; margin-bottom: 26px; align-items: flex-start; }
  .c-icon {
    width: 42px; height: 42px; min-width: 42px;
    background: var(--orange-glow); border: 1px solid rgba(249,115,22,0.25);
    border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
  }
  .contact-item h5 { color: var(--muted); font-size: 0.8rem; margin-bottom: 3px; font-weight: 400; }
  .contact-item p { font-size: 0.95rem; font-weight: 500; }
  .contact-form { background: var(--surface2); border: 1px solid var(--border); border-radius: 18px; padding: 34px; }
  .cf-group { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
  .cf-group label { color: var(--muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; }
  .cf-group input, .cf-group textarea, .cf-group select {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 11px 14px;
    color: var(--white); font-family: 'Outfit', sans-serif; font-size: 0.92rem;
    outline: none; transition: border 0.2s;
  }
  .cf-group input:focus, .cf-group textarea:focus, .cf-group select:focus { border-color: var(--orange); }
  .cf-group select option { background: var(--surface2); }
  .cf-group textarea { resize: vertical; min-height: 90px; }
  .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .cf-submit {
    width: 100%; padding: 13px; background: var(--orange);
    color: var(--white); border: none; border-radius: 8px; cursor: pointer;
    font-family: 'Outfit', sans-serif; font-size: 0.97rem; font-weight: 600; transition: all 0.2s;
  }
  .cf-submit:hover { background: var(--orange-light); }
  .cf-success {
    background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.3);
    color: var(--orange-light); padding: 12px; border-radius: 8px;
    text-align: center; font-size: 0.9rem; margin-top: 12px;
  }

  /* ── FOOTER ── */
  footer {
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 52px 6% 28px;
  }
  .footer-top {
    display: flex; justify-content: space-between; flex-wrap: wrap; gap: 36px;
    padding-bottom: 40px; border-bottom: 1px solid var(--border);
  }
  .footer-brand p { color: var(--muted); font-size: 0.88rem; line-height: 1.7; margin-top: 12px; max-width: 260px; font-weight: 300; }
  .footer-logo { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; }
  .footer-logo span { color: var(--orange); }
  .footer-col h4 { font-size: 0.88rem; font-weight: 600; margin-bottom: 16px; letter-spacing: 0.04em; color: var(--white); }
  .footer-col ul { list-style: none; }
  .footer-col ul li { margin-bottom: 10px; }
  .footer-col ul a { color: var(--muted); text-decoration: none; font-size: 0.87rem; transition: color 0.2s; font-weight: 300; }
  .footer-col ul a:hover { color: var(--orange); }
  .footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 24px; flex-wrap: wrap; gap: 10px;
  }
  .footer-bottom p { color: var(--muted); font-size: 0.82rem; }
  .footer-bottom span { color: var(--orange); }

  /* ── ANIMATIONS ── */
  /* ── TICKER ── */
  .ticker-wrap {
    width: 100%; overflow: hidden;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
    height: 34px; display: flex; align-items: center;
    position: fixed; top: 68px; left: 0; z-index: 100;
  }
  .ticker {
    display: inline-block; white-space: nowrap;
    padding-right: 100%;
    animation: marquee 60s linear infinite;
    color: var(--orange-light); font-size: 0.8rem; font-weight: 500;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .ticker span { margin-right: 50px; }
  @keyframes marquee {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-100%, 0, 0); }
  }

  @keyframes carSwap {
    0% { opacity: 0; transform: translateY(-40%) scale(0.8); }
    10%, 90% { opacity: 1; transform: translateY(-50%) scale(1); }
    100% { opacity: 0; transform: translateY(-60%) scale(0.8); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes carFloat {
    0%, 100% { transform: translateY(-50%) translateX(0px); }
    50% { transform: translateY(-53%) translateX(-12px); }
  }

  @media (max-width: 768px) {
    .nav-links, .hero-car, .search-divider { display: none; }
    .contact-wrap { grid-template-columns: 1fr; }
    .cf-row { grid-template-columns: 1fr; }
    .modal-row { grid-template-columns: 1fr; }
    .hero-stats { gap: 1.5rem; flex-wrap: wrap; }
    .footer-top { flex-direction: column; }
  }
`;

const vehicles = [
  {
    id: 1, emoji: "🚗",
    name: "5 Seater",
    type: "Sedan",
    category: "sedan",
    badge: "Popular",
    seats: "5 Seats",
    ac: "AC",
    fuel: "Petrol/CNG",
    luggage: "2-3 Bags",
    price: "₹12/km",
    perDay: "₹1,200/day",
    desc: "Comfortable 5-seater sedan for small families and city rides.",
  },
  {
    id: 2, emoji: "🚙",
    name: "7 Seater",
    type: "MPV",
    category: "mpv",
    badge: "Family Fav",
    seats: "7 Seats",
    ac: "AC",
    fuel: "Diesel/Petrol",
    luggage: "3-4 Bags",
    price: "₹16/km",
    perDay: "₹1,800/day",
    desc: "Spacious 7-seater MPV (Ertiga/Innova) for family trips.",
  },
  {
    id: 4, emoji: "🚌",
    name: "14 Seater Tempo Traveller",
    type: "Mini Bus",
    category: "bus",
    badge: "Group",
    seats: "14 Seats",
    ac: "AC",
    fuel: "Diesel",
    luggage: "6 Bags",
    price: "₹24/km",
    perDay: "₹4,500/day",
    desc: "Ideal for group tours and large family gatherings.",
  },
  {
    id: 5, emoji: "🚌",
    name: "20 Seater Tempo Traveller",
    type: "Mini Bus",
    category: "bus",
    badge: "Large Group",
    seats: "20 Seats",
    ac: "AC",
    fuel: "Diesel",
    luggage: "8 Bags",
    price: "₹32/km",
    perDay: "₹5,500/day",
    desc: "Perfect for corporate groups and big tour parties.",
  },
];

const destinations = [
  { emoji: "🌊", name: "Dandeli", km: "River Rafting & Jungle Stay", highlight: "Nature's Paradise" },
  { emoji: "🏰", name: "Mysuru", km: "150 km from Bengaluru", highlight: "Palace City" },
  { emoji: "🌊", name: "Goa", km: "580 km from Bengaluru", highlight: "Beach Paradise" },
  { emoji: "🏔️", name: "Coorg", km: "270 km from Bengaluru", highlight: "Scotland of India" },
  { emoji: "🕌", name: "Hampi", km: "340 km from Bengaluru", highlight: "UNESCO Heritage" },
  { emoji: "🌅", name: "Ooty", km: "295 km from Bengaluru", highlight: "Queen of Hills" },
  { emoji: "🏞️", name: "Chikmagalur", km: "245 km from Bengaluru", highlight: "Coffee Land" },
  { emoji: "🏖️", name: "Gokarna", km: "480 km from Bengaluru", highlight: "Temple Town" },
  { emoji: "🐆", name: "Kabini", km: "210 km from Bengaluru", highlight: "Wildlife Safari" },
  { emoji: "🏝️", name: "Murudeshwar", km: "485 km from Bengaluru", highlight: "Beach & Temple" },
];

const whyUs = [
  { icon: "🚗", title: "Well-Maintained Fleet", desc: "All vehicles are regularly serviced and sanitized before every trip." },
  { icon: "👨‍✈️", title: "Expert Drivers", desc: "Verified, licensed drivers with 5+ years of experience and local route knowledge." },
  { icon: "📍", title: "GPS Tracking", desc: "Real-time GPS tracking on all vehicles for your safety and peace of mind." },
  { icon: "💰", title: "Transparent Pricing", desc: "No hidden charges. What you see is what you pay — guaranteed." },
  { icon: "🕐", title: "24/7 Support", desc: "Round-the-clock customer support for bookings, changes, and emergencies." },
  { icon: "🛡️", title: "Fully Insured", desc: "All rides are fully insured. Travel with complete peace of mind." },
];

const testimonials = [
  { name: "Ramesh Gupta", loc: "Bengaluru", rating: 5, text: "Booked an Innova Crysta for a Coorg trip. Driver was punctual, car was immaculate. Will definitely book again!", avatar: "👨" },
  { name: "Priya Nair", loc: "Mysuru", rating: 5, text: "Used Tempo Traveller 17 for our office picnic to Kabini. Excellent service, very comfortable ride for 16 of us.", avatar: "👩" },
  { name: "Ajay Sharma", loc: "Chennai", rating: 5, text: "Swift Dzire for airport pickup — arrived 10 minutes early, clean car, polite driver. Highly recommended!", avatar: "🧑" },
];

export default function App() {
  const [filter, setFilter] = useState("all");
  const [selectedCar, setSelectedCar] = useState(null);
  const [booking, setBooking] = useState({ name: "", phone: "", from: "", to: "", date: "", type: "one-way" });
  const [booked, setBooked] = useState(false);
  const [cfSent, setCfSent] = useState(false);
  const [contact, setContact] = useState({ name: "", phone: "", vehicle: "", msg: "" });
  const [search, setSearch] = useState({ from: "", to: "", date: "", vehicle: "all" });
  const [carIdx, setCarIdx] = useState(0);

  const cars = ["🚐", "🚗", "🚙", "🚌"];
  const sentences = [
    "Travel the world, one unforgettable journey at a time.",
    "Don’t just dream it. Travel it.",
    "Crafting journeys, creating memories.",
    "Turning your travel dreams into reality.",
    "Pack your bags, we’ll handle the rest."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCarIdx(prev => (prev + 1) % cars.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filters = ["all", "sedan", "mpv", "suv", "bus"];
  const filtered = filter === "all" ? vehicles : vehicles.filter(v => v.category === filter);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => { setBooked(false); setSelectedCar(null); }, 3500);
  };

  const handleCf = () => {
    setCfSent(true);
    setTimeout(() => setCfSent(false), 3500);
    setContact({ name: "", phone: "", vehicle: "", msg: "" });
  };

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{css}</style>

      {/* NAVBAR */}
      <nav className="nav">
        <a className="nav-logo" href="#">Shaila<span> Travels</span> 🚗</a>
        <ul className="nav-links">
          {[["home","Home"],["fleet","Our Fleet"],["destinations","Destinations"],["contact","Contact"]].map(([id,label]) => (
            <li key={id}><a href="#" onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("fleet")}>Book a Ride</button>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {sentences.map((s, i) => (
            <span key={i}> {s} • </span>
          ))}
          {/* Repeat for seamless loop */}
          {sentences.map((s, i) => (
            <span key={i + 100}> {s} • </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-grid-lines" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-tag">🌍 Dandeli's Most Trusted Travel Partner</div>
          <h1>
            Travel Anywhere,
            <span className="line2">Anytime.</span>
          </h1>
          <p>From city rides to mountain escapes — book your perfect vehicle in minutes. Swift Dzire, Ertiga, Innova Crysta, Tempo Travellers and more, all at unbeatable prices.</p>
          <div className="hero-btns">
            <button className="btn-orange" onClick={() => scrollTo("fleet")}>Explore Fleet</button>
            <button className="btn-ghost" onClick={() => scrollTo("destinations")}>View Destinations</button>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">5K+</div><div className="stat-label">Happy Customers</div></div>
            <div><div className="stat-num">50+</div><div className="stat-label">Verified Drivers</div></div>
            <div><div className="stat-num">10+</div><div className="stat-label">Years Serving</div></div>
          </div>
        </div>
        <div className="hero-car" key={carIdx} style={{ animation: "carSwap 5s ease-in-out infinite" }}>
          {cars[carIdx]}
        </div>
      </section>

      {/* QUICK SEARCH */}
      <div className="search-wrap">
        <div className="search-bar">
          <div className="search-field">
            <label>From</label>
            <input placeholder="Bengaluru, KA" value={search.from} onChange={e => setSearch({...search, from: e.target.value})} />
          </div>
          <div className="search-divider" />
          <div className="search-field">
            <label>To</label>
            <input placeholder="Mysuru, Goa, Coorg..." value={search.to} onChange={e => setSearch({...search, to: e.target.value})} />
          </div>
          <div className="search-divider" />
          <div className="search-field">
            <label>Date</label>
            <input type="date" value={search.date} onChange={e => setSearch({...search, date: e.target.value})} />
          </div>
          <div className="search-divider" />
          <div className="search-field">
            <label>Vehicle</label>
            <select value={search.vehicle} onChange={e => setSearch({...search, vehicle: e.target.value})}>
              <option value="all">Any Vehicle</option>
              {vehicles.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <button className="search-btn" onClick={() => scrollTo("fleet")}>🔍 Book</button>
        </div>
      </div>

      {/* FLEET */}
      <section id="fleet" className="section">
        <div className="sec-head">
          <div className="sec-tag">Our Fleet</div>
          <h2 className="sec-title">Choose Your Ride</h2>
          <p className="sec-sub">From sedans to tempo travellers — we have the right vehicle for every trip size and budget.</p>
        </div>
        <div className="fleet-filters">
          {filters.map(f => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "All Vehicles" : f === "sedan" ? "🚗 Sedans" : f === "mpv" ? "🚙 MPVs" : f === "suv" ? "🛻 SUVs" : "🚌 Buses"}
            </button>
          ))}
        </div>
        <div className="fleet-grid">
          {filtered.map(car => (
            <div className="car-card" key={car.id}>
              <div className="car-badge">{car.badge}</div>
              <div className="car-visual">{car.emoji}</div>
              <div className="car-info">
                <div className="car-name">{car.name}</div>
                <div className="car-type">{car.type}</div>
                <div className="car-specs">
                  <span className="spec">👥 {car.seats}</span>
                  <span className="spec">❄️ {car.ac}</span>
                  <span className="spec">⛽ {car.fuel}</span>
                  <span className="spec">🧳 {car.luggage}</span>
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: "1.6", margin: "14px 0" }}>{car.desc}</p>
                <button className="book-btn" style={{ width: "100%" }} onClick={() => { setSelectedCar(car); setBooked(false); }}>Book Now →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="section why-bg">
        <div className="sec-head">
          <div className="sec-tag">Why Choose Us</div>
          <h2 className="sec-title">The Shaila Travels Promise</h2>
          <p className="sec-sub">We go beyond just providing a vehicle — we deliver a complete travel experience.</p>
        </div>
        <div className="why-grid">
          {whyUs.map((w, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="section">
        <div className="sec-head">
          <div className="sec-tag">Popular Routes</div>
          <h2 className="sec-title">Top Destinations</h2>
          <p className="sec-sub">Explore South India's most loved destinations with our comfortable fleet.</p>
        </div>
        <div className="dest-grid">
          {destinations.map((d, i) => (
            <div className="dest-card" key={i} onClick={() => scrollTo("fleet")}>
              <div className="dest-img">{d.emoji}</div>
              <div className="dest-info">
                <h4>{d.name}</h4>
                <p>{d.highlight}</p>
                <div className="dist">📍 {d.km}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="sec-head">
          <div className="sec-tag">Get in Touch</div>
          <h2 className="sec-title">Contact Us</h2>
          <p className="sec-sub">Have questions or need a custom package? We're here to help!</p>
        </div>
        <div className="contact-wrap">
          <div>
            <div className="contact-item"><div className="c-icon">📍</div><div><h5>Office Address</h5><p>near ganesh temple, mangala devi road, old dandeli</p></div></div>
            <div className="contact-item"><div className="c-icon">📞</div><div><h5>Phone / WhatsApp</h5><p>+91 6363429773</p></div></div>
            <div className="contact-item"><div className="c-icon">✉️</div><div><h5>Email</h5><p>shailatravelsdandeli@gmail.com</p></div></div>
            <div className="contact-item"><div className="c-icon">🕐</div><div><h5>Working Hours</h5><p>24 Hours, 7 Days a Week</p></div></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">Shaila<span> Travels</span> 🚗</div>
            <p>Dandeli's most trusted travel partner. Comfortable rides, expert drivers, transparent pricing.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {[["home","Home"],["fleet","Our Fleet"],["destinations","Destinations"],["contact","Contact Us"]].map(([id,l]) => (
                <li key={id}><a href="#" onClick={e => { e.preventDefault(); scrollTo(id); }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Our Vehicles</h4>
            <ul>{vehicles.map(v => <li key={v.id}><a href="#">{v.name}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Popular Routes</h4>
            <ul>{destinations.slice(0,4).map(d => <li key={d.name}><a href="#">Bengaluru → {d.name}</a></li>)}</ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Shaila Travels. All rights reserved.</p>
          <p>Made with <span>♥</span> for travellers across Karnataka</p>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {selectedCar && (
        <div className="modal-overlay" onClick={e => { if (e.target.classList.contains("modal-overlay")) setSelectedCar(null); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setSelectedCar(null)}>✕</button>
            {!booked ? (
              <>
                <h3>Book Your Ride</h3>
                <div className="modal-car-name">{selectedCar.emoji} {selectedCar.name} — {selectedCar.price}</div>
                <div className="modal-form">
                  <div className="modal-row">
                    <div className="modal-field"><label>Full Name</label><input placeholder="Your name" value={booking.name} onChange={e => setBooking({...booking, name: e.target.value})} /></div>
                    <div className="modal-field"><label>Phone</label><input placeholder="+91 98765 43210" value={booking.phone} onChange={e => setBooking({...booking, phone: e.target.value})} /></div>
                  </div>
                  <div className="modal-row">
                    <div className="modal-field"><label>From</label><input placeholder="Bengaluru" value={booking.from} onChange={e => setBooking({...booking, from: e.target.value})} /></div>
                    <div className="modal-field"><label>To</label><input placeholder="Mysuru" value={booking.to} onChange={e => setBooking({...booking, to: e.target.value})} /></div>
                  </div>
                  <div className="modal-row">
                    <div className="modal-field"><label>Travel Date</label><input type="date" value={booking.date} onChange={e => setBooking({...booking, date: e.target.value})} /></div>
                    <div className="modal-field">
                      <label>Trip Type</label>
                      <select value={booking.type} onChange={e => setBooking({...booking, type: e.target.value})}>
                        <option value="one-way">One Way</option>
                        <option value="round-trip">Round Trip</option>
                        <option value="local">Local (8 hrs)</option>
                        <option value="outstation">Outstation</option>
                      </select>
                    </div>
                  </div>
                  <button className="modal-submit" onClick={handleBook}>Confirm Booking →</button>
                </div>
              </>
            ) : (
              <div className="modal-success">
                <div className="check">🎉</div>
                <h4>Booking Confirmed!</h4>
                <p>We'll call you within 30 minutes to confirm your {selectedCar.name} booking.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
