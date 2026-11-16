
const KEY = 'sayawsuri_static_v1';

const $ = (s, r = document) => r.querySelector(s);

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {
      users: [],
      results: [],
      session: null,
      progress: {}
    };
  } catch {
    return { users: [], results: [], session: null, progress: {} };
  }
};

const write = d => localStorage.setItem(KEY, JSON.stringify(d));

const questions = [
  ["Dance Step: Bleking", [
    "heel-place R | starting position | heel-place L",
    "step R foot sideways | step L foot to the right | step L foot sideways | step R foot to the left",
    "starting position | step R | hop R",
    "step R foot sideways | close R foot"
  ], 0],

  ["Dance Step: Touch Step", [
    "heel-place R | starting position | heel-place L",
    "point R foot in front | step R foot back to starting position | point L foot in front",
    "step R foot sideway | slightly swing L foot to the R | step L foot to the L side",
    "step R foot sideways | close R foot | step L foot sideways | cose L foot"
  ], 1],

  ["Dance Step: Step Swing", [
    "step R foot sideway | point L foot in front | step L foot sideway | point right foot in front",
    "point R foot in front | step R foot back to starting position | point L foot in front",
    "step R foot sideway | slightly swing L foot to the R | step L foot to the L sideway | slightly swing R foot to the L | back to starting position",
    "step R foot sideways | close R foot"
  ], 2],

  ["Dance Step: Step Point", [
    "step R foot sideway | point L foot in front | step L foot sideway | point right foot in front",
    "point R foot in front | step R foot back to starting position | point L foot in front",
    "step R foot sideway | step L foot to the R | step L foot sideways | step R foot to the R",
    "step R foot sideways | close R foot"
  ], 0],

  ["Dance Step: Cut Step", [
    "step R foot sideway | point L foot in front | step L foot sideway | point right foot in front",
    "point R foot in front | step R foot back to starting position | point L foot in front",
    "step R foot sideway | hop slightly, lifting and bending R knee in front | land L foot from the hop with feet to the L | hop slightly, lifting and bending L knee in front | land R foot from the hop with feet to starting position",
    "lift R foot slightly outward to the side | step R foot, shifting weight | step L foot, shifting weight | standing position | repeat on L side"
  ], 3],

  ["Dance Step: Hop Step", [
    "step R foot sideway | hop slightly, lifting and bending R knee in front | land L foot from the hop with feet to the L | hop slightly, lifting and bending L knee in front | land R foot from the hop with feet to starting position",
    "point R foot in front | step R foot back to starting position | point L foot in front",
    "step R foot sideway | step L foot to the R | step L foot sideways | step R foot to the R",
    "step R foot sideway | slightly swing L foot to the R | step L foot to the L sideway | slightly swing R foot to the L | back to starting position"
  ], 0],

  ["Dance Step: Close Step", [
    "step R foot sideway | hop R foot slightly | land to starting position | repeat on the L side",
    "step R foot sideways | step L foot to the R | step L foot sideways | step R foot to the R | the foot in rear and raise the foot in front",
    "step R foot sideway | step L foot to the R | step L foot sideways | step R foot to the R",
    "fall on one foot in front with the other foot raised in rear | fall on the foot in rear | raise the foot in front"
  ], 1],

  ["Dance Step: Rocking", [
    "jump with one foot in front and the other in rear (alternately)",
    "step R foot sideways | step L foot to the R | step L foot sideways | step R foot to the R | the foot in rear and raise the foot in front",
    "fall on one foot in front with the other foot raised in rear | fall on the foot in rear | raise the foot in front",
    "step R foot sideway | hop R foot slightly | land to starting position | repeat on the L side"
  ], 2],

  ["Dance Step: Changing Step", [
    "jump with one foot in front and the other in rear (alternately)",
    "step R foot sideways | step L foot to the R | step L foot sideways | step R foot to the R | the foot in rear and raise the foot in front",
    "fall on one foot in front with the other foot raised in rear | fall on the foot in rear | raise the foot in front",
    "step R foot sideway | hop R foot slightly | land to starting position | repeat on the L side"
  ], 0]
];

// All 9 descriptions removed.
const lessons = [
  {
    id: 1,
    title: "BLEKING",
    image: "Bleking.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Heel-place Right | Close Right or Spring and Heel-place Right | Left alternately."
  },
  {
    id: 2,
    title: "CHANGING STEP (PALIT-PALIT)",
    image: "cha.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Jump (with one foot in front and the other in rear) alternately"
  },
  {
    id: 3,
    title: "CLOSE STEP",
    image: "Close.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Step Right | Close Left."
  },
  {
    id: 4,
    title: "CUT STEP",
    image: "cut.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Cut or Displace one foot with the foot alternately."
  },
  {
    id: 5,
    title: "ROCKING",
    image: "rock.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Fall on one foot in front with the other foot raised in rear. Fall on the foot in rear and raise the foot in front"
  },
  {
    id: 6,
    title: "STEP-HOP",
    image: "hop.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Step Right | Hop Right."
  },
  {
    id: 7,
    title: "STEP-POINT",
    image: "step.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Step Right | Point Left"
  },
  {
    id: 8,
    title: "STEP-SWING",
    image: "swi.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Step Right | Swing Left."
  },
  {
    id: 9,
    title: "TOUCH STEP",
    image: "top.jpg",
    note: "♪ ♪",
    count: "1, 2",
    measure: "1 Measure (1M)",
    movement: "Point Right | Close Right."
  }
];

const adminName = 'Administrator';

function seed() {
  let d = read();

  if (!d.users.some(u => u.username === 'admin')) {
    d.users.push({
      id: 'admin',
      fullName: adminName,
      username: 'admin',
      password: 'SayawAdmin2026!',
      role: 'admin',
      createdAt: new Date().toISOString()
    });
  }

  write(d);
}

function current() {
  const d = read();
  return d.users.find(u => u.id === d.session) || null;
}

function route() {
  return (location.hash.slice(1) || (current() ? 'home' : 'login')).split('/');
}

function go(p) {
  location.hash = p;
}

function notice(s, type = 'error') {
  return `<div class="alert alert-${type}">${esc(s)}</div>`;
}

function shell(content) {
  document.body.className = '';
  $('#app').innerHTML = content;
}

function nav() {
  let u = current();

  return `<header class="site-header">
    <a href="#home" class="brand">
      <span class="brand-icon">✦</span> SayawSuri
    </a>
    <nav class="header-nav">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      ${u?.role === 'admin' ? '<a href="#admin">Admin</a>' : ''}
      ${u?.role === 'user' ? '<a href="#results">My Results</a>' : ''}
      <button class="nav-logout" id="logout">Log out</button>
    </nav>
  </header>`;
}

function bindLogout() {
  const b = $('#logout');

  if (b) {
    b.onclick = () => {
      let d = read();
      d.session = null;
      write(d);
      go('login');
    };
  }
}

function authPage(register = false, msg = '') {
  document.body.className = 'auth-page';

  shell(`<main class="auth-shell ${register ? 'auth-shell-compact' : ''}">
    <section class="auth-visual">
      <div class="brand-mark">✦</div>
      <p class="eyebrow">Sining • Galaw</p>
      <h1>SayawSuri</h1>
      <p class="auth-intro">
        An Innovative Digital Platform for Interpreting Filipino Folk Dance Literature.
      </p>
      <div class="woven-rule"></div>
      <p class="auth-note">“Lagi't lagi para sa Sining at Kultura.”</p>
    </section>

    <section class="auth-panel">
      <div class="section-kicker">${register ? 'Get started' : 'Welcome back'}</div>
      <h2>${register ? 'Create your account' : 'Sign in to continue'}</h2>
      <p class="muted">Explore Basic Filipino Dance Literature.</p>

      ${msg}

      <form id="authForm" class="form-stack">
        ${register ? '<label>Full name</label><input name="fullName" maxlength="120" required>' : ''}
        <label>Username</label>
        <input name="username" minlength="3" maxlength="50" required>

        <label>Password</label>
        <input name="password" type="password" minlength="${register ? 12 : 1}" required>

        ${register ? '<p class="field-hint">Use at least 12 characters.</p>' : ''}

        <button class="btn btn-primary btn-full">
          ${register ? 'Create Account' : 'Log In'} →
        </button>
      </form>

      <p class="auth-switch">
        ${register ? 'Already registered?' : 'New to the site?'}
        <a href="#${register ? 'login' : 'register'}">
          ${register ? 'Back to login' : 'Create an account'}
        </a>
      </p>

      <p class="fine-print">
        Accounts and results are saved in this browser only.
      </p>
    </section>
  </main>`);

  $('#authForm').onsubmit = e => {
    e.preventDefault();

    let f = new FormData(e.currentTarget);
    let username = String(f.get('username')).trim();
    let password = String(f.get('password'));
    let d = read();

    if (register) {
      let fullName = String(f.get('fullName')).trim();

      if (!fullName || !/^[A-Za-z0-9_.-]{3,50}$/.test(username) || password.length < 12) {
        authPage(true, notice('Enter a name, valid username (3–50 characters), and password with at least 12 characters.'));
        return;
      }

      if (d.users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        authPage(true, notice('That username is already taken.'));
        return;
      }

      d.users.push({
        id: crypto.randomUUID(),
        fullName,
        username,
        password,
        role: 'user',
        createdAt: new Date().toISOString()
      });

      write(d);
      authPage(false, notice('Account created. You can now sign in.', 'success'));

    } else {
      let u = d.users.find(x =>
        x.username.toLowerCase() === username.toLowerCase() &&
        x.password === password
      );

      if (!u) {
        authPage(false, notice('Incorrect username or password.'));
        return;
      }

      d.session = u.id;
      write(d);
      go('home');
    }
  };
}

function home() {
  let u = current();

  shell(`${nav()}

  <main class="page-wrap">

    <section class="hero-card">
      <div class="hero-content">
        <p class="eyebrow">Sining • Kultura</p>
        <h1>SayawSuri</h1>

        <p class="hero-copy">
          An Innovative Digital Platform for Interpreting Filipino Folk Dance Literature.
        </p>

        <div class="hero-actions">
          <a class="btn btn-primary" href="#lesson/1">Start Image Lessons →</a>
          <a class="btn btn-outline" href="#about">About</a>
          <button class="btn btn-outline" id="creatorToggle"
            type="button" aria-expanded="false" aria-controls="creatorPanel">
            Meet the Creators
          </button>
        </div>

        <p class="welcome-line">
          Welcome, <strong>${esc(u.fullName)}</strong>
        </p>
      </div>

      <div class="hero-art"></div>
    </section>

    <section class="feature-grid">
      <article class="feature-card">
        <span class="feature-number">01</span>
        <h2>Basic Dances Literature</h2>
        <p>Explore the Basic Dance Literature featuring visual demonstrations.</p>
      </article>

      <article class="feature-card">
        <span class="feature-number">02</span>
        <h2>Formative Quiz</h2>
        <p>Test your understanding of Basic Dance Literature.</p>
      </article>

      <article class="feature-card">
        <span class="feature-number">03</span>
        <h2>Image Lessons</h2>
        <p>Learn traditional dance steps through visual lessons.</p>
      </article>
    </section>

    <section class="creator-panel card" id="creatorPanel" hidden>
      <div class="section-kicker">The people behind the project</div>
      <h2>Meet the Student Creators</h2>
      <p class="muted">This educational website was created by:</p>

      <div class="creator-list">
        <article class="creator-card">
          <span class="creator-avatar" aria-hidden="true">N</span>
          <strong>Nadia T. Autriz</strong>
          <span>Bachelor of Culture and Arts Education student</span>
        </article>

        <article class="creator-card">
          <span class="creator-avatar" aria-hidden="true">C</span>
          <strong>Camille T. Lorenzo</strong>
          <span>Bachelor of Culture and Arts Education student</span>
        </article>

        <article class="creator-card">
          <span class="creator-avatar" aria-hidden="true">S</span>
          <strong>Sherla Mae B. Pascua</strong>
          <span>Bachelor of Culture and Arts Education student</span>
        </article>
      </div>
    </section>

  </main>

  <footer class="site-footer">Copyright © 2026 SayawSuri.</footer>
  `);

  bindLogout();

  const creatorToggle = $('#creatorToggle');
  const creatorPanel = $('#creatorPanel');

  if (creatorToggle && creatorPanel) {
    creatorToggle.onclick = () => {
      const opening = creatorPanel.hidden;
      creatorPanel.hidden = !opening;
      creatorToggle.setAttribute('aria-expanded', String(opening));
      creatorToggle.textContent = opening
        ? 'Hide Creator Information'
        : 'Meet the Creators';
    };
  }
}

function about() {
  shell(`${nav()}

  <main class="page-wrap narrow">

    <section class="page-heading">
      <p class="eyebrow">About the project</p>
      <h1>Discover Basic Dance Literature</h1>
      <p class="hero-copy">
        Explore Basic Dance Literature through engaging lessons,
        visual presentations, and interactive learning activities.
      </p>
    </section>

    <section class="info-grid">

      <article class="info-card">
        <span class="feature-number">01 / DESCRIPTION</span>
        <h2>What is Basic Dance Literature?</h2>
        <p>
          Basic dance step literature provides information about the
          fundamental steps and movements used in different types of dance.
          It includes the names, descriptions, and proper execution of basic
          steps and helps students understand, learn, and perform dance
          movements correctly.
        </p>
      </article>

      <article class="info-card">
        <span class="feature-number">02 / OBJECTIVES</span>
        <h2>What you will learn</h2>
        <ul>
          <li><b>Knowledge and Understanding:</b> Become familiar with dance steps and step patterns.</li>
          <li><b>Application:</b> Interpret dance literature and perform folk dances.</li>
          <li><b>Analysis:</b> Analyze and interpret dances.</li>
          <li><b>Evaluation:</b> Assess dance performance and execution.</li>
          <li><b>Creation:</b> Select movements appropriate for a presentation.</li>
        </ul>
      </article>

      <article class="info-card info-card-wide">
        <span class="feature-number">03 / PURPOSE</span>
        <h2>Preserving Filipino Dance Heritage</h2>
        <p>
          SayawSuri aims to preserve and promote Filipino folk dances by
          transforming written dance literature into visual demonstrations
          and accessible learning opportunities.
        </p>
      </article>

    </section>

    <a class="btn btn-primary" href="#lesson/1">Enter Image Lessons →</a>

  </main>`);

  bindLogout();
}

// LESSON PAGES — NO DANCE DESCRIPTIONS

function lesson(id) {
  let l = lessons[id - 1];

  if (!l) {
    go('lesson/1');
    return;
  }

  let d = read();
  let u = current();
  let p = d.progress[u.id] || [];

  if (!p.includes(id)) {
    p.push(id);
    d.progress[u.id] = p;
    write(d);
  }

  let all = p.length === lessons.length;

  shell(`${nav()}

  <main class="page-wrap">

    <div class="lesson-heading">
      <div>
        <p class="eyebrow">
          Image lesson ${id} of ${lessons.length}
        </p>

        <h1>${esc(l.title)}</h1>
      </div>

      <span class="count-pill">
        ${p.length} / ${lessons.length} visited
      </span>
    </div>

    <div class="progress-track">
      <span style="width:${p.length / lessons.length * 100}%"></span>
    </div>

    <p class="muted small-text">
      Learning progress: ${Math.round(p.length / lessons.length * 100)}% of lessons opened
    </p>

    <div class="lesson-layout">

      <section>

        <div class="gallery-grid">
          <figure class="lesson-photo">
            <img src="${esc(l.image)}" alt="${esc(l.title)}">
            <figcaption>${esc(l.title)}</figcaption>
          </figure>
        </div>

        <div class="card lesson-copy">

          <p class="feature-number">NOTE PATTERN AND COUNTING</p>

          <p>Note Pattern: ${esc(l.note)}</p>

          <p>Counting: ${esc(l.count)}</p>

          <p>= ${esc(l.measure)}</p>

          <h3>Movement and presentation</h3>

          <p>${esc(l.movement)}</p>

        </div>

        <nav class="lesson-nav">

          ${id > 1
            ? `<a class="btn btn-outline" href="#lesson/${id - 1}">← Previous lesson</a>`
            : '<a class="btn btn-outline" href="#about">← About</a>'
          }

          ${id < lessons.length
            ? `<a class="btn btn-primary" href="#lesson/${id + 1}">Next lesson →</a>`
            : all
              ? '<a class="btn btn-primary" href="#quiz">Take the Quiz →</a>'
              : '<a class="btn btn-primary" href="#lesson/1">Review lessons</a>'
          }

        </nav>

      </section>

      <aside class="description-panel">

        <p class="feature-number">LESSON GUIDE</p>

        <h2>What to remember</h2>

        <p>
          Study the dance images, note patterns, counting,
          and movements for all ${lessons.length} lessons.
        </p>

        <h3>Lesson checklist</h3>

        <ol class="lesson-checklist">

          ${lessons.map(x => `
            <li class="${p.includes(x.id) ? 'done' : ''}">
              ${esc(x.title)} ${p.includes(x.id) ? '✓' : ''}
            </li>
          `).join('')}

        </ol>

      </aside>

    </div>

    ${all ? `
      <section class="card quiz-cta">
        <h2>All lessons visited!</h2>
        <p>You can now take the examination.</p>
        <a class="btn btn-primary" href="#quiz">Take the Quiz</a>
      </section>
    ` : ''}

  </main>`);

  bindLogout();
}

function quiz() {
  let d = read();
  let u = current();
  let p = d.progress[u.id] || [];

  if (p.length < lessons.length) {
    shell(`${nav()}
      <main class="page-wrap">
        <div class="alert alert-warning">
          Please visit all lessons before taking the examination.
          <a href="#lesson/1">Return to lessons</a>
        </div>
      </main>
    `);

    bindLogout();
    return;
  }

  let pass = Math.ceil(questions.length * .7);

  shell(`${nav()}

  <main class="page-wrap narrow">

    <div class="page-heading">
      <p class="eyebrow">Knowledge check</p>
      <h1>Filipino Traditional Dance Examination</h1>
      <p class="muted">
        ${questions.length} questions · 4 choices each · Passing score: ${pass}/${questions.length}
      </p>
    </div>

    <nav class="question-jump">
      ${questions.map((q, i) => `<a href="#q${i + 1}">${i + 1}</a>`).join('')}
    </nav>

    <form id="quizForm" class="quiz-form">

      ${questions.map((q, i) => `
        <fieldset class="question-card" id="q${i + 1}">

          <legend>
            <span class="question-number">
              QUESTION ${i + 1} / ${questions.length}
            </span>
            <strong>${esc(q[0])}</strong>
          </legend>

          <div class="choice-list">

            ${q[1].map((c, j) => `
              <label class="choice">
                <input type="radio" name="q${i}" value="${j}" required>
                <span>
                  <b>${String.fromCharCode(65 + j)}.</b> ${esc(c)}
                </span>
              </label>
            `).join('')}

          </div>
        </fieldset>
      `).join('')}

      <div class="quiz-submit">
        <button class="btn btn-primary">Submit Answers</button>
      </div>

    </form>

  </main>`);

  bindLogout();

  $('#quizForm').onsubmit = e => {
    e.preventDefault();

    let fd = new FormData(e.currentTarget);

    let answers = questions.map((q, i) => {
      let v = Number(fd.get('q' + i));

      return {
        question: q[0],
        selected: q[1][v],
        correct: q[1][q[2]],
        isCorrect: v === q[2]
      };
    });

    let score = answers.filter(a => a.isCorrect).length;

    let result = {
      id: crypto.randomUUID(),
      userId: u.id,
      fullName: u.fullName,
      score,
      total: questions.length,
      percentage: Math.round(score / questions.length * 10000) / 100,
      status: score >= pass ? 'PASS' : 'FAIL',
      date: new Date().toISOString(),
      answers
    };

    d = read();
    d.results.unshift(result);
    d.progress[u.id] = [];
    write(d);

    go('result/' + result.id);
  };
}

function result(id) {
  let d = read();

  let r = d.results.find(x =>
    x.id === id &&
    (x.userId === current().id || current().role === 'admin')
  );

  if (!r) {
    go('results');
    return;
  }

  shell(`${nav()}

  <main class="page-wrap narrow">

    <section class="result-hero">
      <p class="eyebrow">Examination result</p>
      <h1>${esc(r.fullName)}</h1>
      <div class="score-display">${r.score}/${r.total}</div>
      <h2>
        ${r.percentage}% ·
        <span class="${r.status.toLowerCase()}">${r.status}</span>
      </h2>
      <p>Examined: ${new Date(r.date).toLocaleString()}</p>
    </section>

    <h2>Answer Review</h2>

    ${r.answers.map((a, i) => `
      <article class="answer-review ${a.isCorrect ? 'answer-correct' : 'answer-wrong'}">
        <strong>${i + 1}. ${esc(a.question)}</strong>
        <p>Your answer: ${esc(a.selected || 'No answer')}</p>
        <p>Correct answer: ${esc(a.correct)}</p>
        <span>${a.isCorrect ? 'Correct' : 'Incorrect'}</span>
      </article>
    `).join('')}

    <div class="page-actions">
      <a class="btn btn-primary" href="#results">View My Results</a>
      <a class="btn btn-outline" href="#home">Home</a>
    </div>

  </main>`);

  bindLogout();
}

function results() {
  let d = read();
  let u = current();
  let rows = d.results.filter(r => r.userId === u.id);

  shell(`${nav()}

  <main class="page-wrap">

    <div class="page-heading">
      <p class="eyebrow">Student records</p>
      <h1>My Examination Results</h1>
      <p class="muted">
        Your examination history saved in this browser.
      </p>
    </div>

    <section class="info-card">
      <div class="table-wrap">

        <table>
          <thead>
            <tr>
              <th>Date & time</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            ${rows.map(r => `
              <tr>
                <td>${new Date(r.date).toLocaleString()}</td>
                <td>${r.score}/${r.total}</td>
                <td>${r.percentage}%</td>
                <td>${r.status}</td>
                <td>
                  <a class="text-link" href="#result/${r.id}">View answers</a>
                </td>
              </tr>
            `).join('') || `
              <tr>
                <td colspan="5" class="empty-state">
                  No examination results yet.
                </td>
              </tr>
            `}
          </tbody>
        </table>

      </div>
    </section>

  </main>`);

  bindLogout();
}

function admin() {
  let d = read();
  let users = d.users;
  let results = d.results;

  let avg = results.length
    ? results.reduce((s, r) => s + r.percentage, 0) / results.length
    : 0;

  shell(`${nav()}

  <main class="page-wrap">

    <div class="page-heading">
      <p class="eyebrow">Administration</p>
      <h1>Admin Dashboard</h1>
      <p class="muted">
        Review examination performance and registered accounts.
      </p>
    </div>

    <div class="alert alert-warning">
      Demo/local-only admin. This dashboard is not secure against technically skilled visitors on a public GitHub Pages site.
    </div>

    <div class="stats-grid">
      <article class="stat-card">
        <span>Total examinations</span>
        <strong>${results.length}</strong>
      </article>

      <article class="stat-card">
        <span>Average score</span>
        <strong>${avg.toFixed(1)}%</strong>
      </article>

      <article class="stat-card">
        <span>Registered accounts</span>
        <strong>${users.length}</strong>
      </article>
    </div>

    <section class="info-card">

      <div class="section-heading">
        <div>
          <p class="feature-number">EXAMINATION RECORDS</p>
          <h2>Student Results</h2>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Exam date</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            ${results.map(r => `
              <tr>
                <td>${esc(r.fullName)}</td>
                <td>${new Date(r.date).toLocaleString()}</td>
                <td>${r.score}/${r.total}</td>
                <td>${r.percentage}%</td>
                <td>${r.status}</td>
                <td>
                  <a class="text-link" href="#result/${r.id}">View answers</a>
                </td>
              </tr>
            `).join('') || `
              <tr>
                <td colspan="6">No examinations yet.</td>
              </tr>
            `}
          </tbody>
        </table>
      </div>

    </section>

    <section class="info-card">

      <div class="section-heading">
        <div>
          <p class="feature-number">ACCOUNT DIRECTORY</p>
          <h2>Registered Accounts</h2>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Created</th>
              <th>Test</th>
            </tr>
          </thead>

          <tbody>
            ${users.map(u => `
              <tr>
                <td>${esc(u.fullName)}</td>
                <td>${esc(u.username)}</td>
                <td>${u.role}</td>
                <td>${new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  ${u.role === 'user'
                    ? `<button class="btn btn-outline" data-reset="${u.id}">Reset Test</button>`
                    : '—'
                  }
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

    </section>

    <section class="info-card">

      <h2>Backup / Restore</h2>
      <p>
        Download a backup of all accounts and test results on this browser,
        or restore a previous backup.
      </p>

      <button class="btn btn-primary" id="backup">
        Download Backup
      </button>

      <label class="btn btn-outline">
        Restore Backup
        <input type="file" id="restore" accept="application/json" hidden>
      </label>

      <button class="btn btn-outline" id="clearAll">
        Clear All Student Results
      </button>

    </section>

  </main>`);

  bindLogout();

  document.querySelectorAll('[data-reset]').forEach(b => {
    b.onclick = () => {
      if (confirm('Delete all saved test results and lesson progress for this account?')) {
        d.results = d.results.filter(r => r.userId !== b.dataset.reset);
        delete d.progress[b.dataset.reset];
        write(d);
        admin();
      }
    };
  });

  $('#backup').onclick = () => {
    let blob = new Blob(
      [JSON.stringify(d, null, 2)],
      { type: 'application/json' }
    );

    let a = document.createElement('a');
    let url = URL.createObjectURL(blob);

    a.href = url;
    a.download = 'sayawsuri-backup.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  $('#restore').onchange = async e => {
    try {
      let x = JSON.parse(await e.target.files[0].text());

      if (!Array.isArray(x.users) || !Array.isArray(x.results)) {
        throw Error();
      }

      write(x);
      alert('Backup restored.');
      admin();

    } catch {
      alert('Invalid backup file.');
    }
  };

  $('#clearAll').onclick = () => {
    if (confirm('Clear all saved student test results?')) {
      d.results = [];
      d.progress = {};
      write(d);
      admin();
    }
  };
}

function render() {
  seed();

  let u = current();
  let [page, arg] = route();

  if (!u && !['login', 'register'].includes(page)) {
    go('login');
    return;
  }

  if (u && ['login', 'register'].includes(page)) {
    go('home');
    return;
  }

  if (page === 'login') {
    authPage(false);
  } else if (page === 'register') {
    authPage(true);
  } else if (page === 'home') {
    home();
  } else if (page === 'about') {
    about();
  } else if (page === 'lesson') {
    lesson(Number(arg));
  } else if (page === 'quiz') {
    quiz();
  } else if (page === 'results') {
    results();
  } else if (page === 'result') {
    result(arg);
  } else if (page === 'admin') {
    if (u.role !== 'admin') {
      go('home');
      return;
    }
    admin();
  } else {
    go(u ? 'home' : 'login');
  }
}

window.addEventListener('hashchange', render);
render();
