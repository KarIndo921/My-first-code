/* Claude Certified Associate Foundations — Practice Exam Simulator
   All logic is client-side: this is a self-study tool, not a secure testing
   platform. The "proctoring" below deters casual cheating during self-practice,
   it does not stop someone who opens dev tools and reads questions.js directly. */

const EXAM_QUESTION_COUNT = 60;
const EXAM_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours
const PASSING_SCORE = 720; // out of 1000, mirrors the real score report
const MAX_FLAGS_BEFORE_AUTOSUBMIT = 8;
const STORAGE_KEY = "cca_exam_attempt_v1";

let state = null; // the live attempt, persisted to localStorage
let timerHandle = null;

/* ---------------- utilities ---------------- */

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickExamSet() {
  const chosen = shuffle(QUESTION_BANK).slice(0, EXAM_QUESTION_COUNT);
  return chosen.map(q => ({
    id: q.id,
    section: q.section,
    type: q.type,
    prompt: q.prompt,
    options: shuffle(q.options),
  }));
}

function fmtTime(ms) {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function clearState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------------- start screen ---------------- */

const consentCheck = document.getElementById("consent-check");
const btnStart = document.getElementById("btn-start");

consentCheck.addEventListener("change", () => { btnStart.disabled = !consentCheck.checked; });

btnStart.addEventListener("click", () => {
  startNewAttempt();
});

function startNewAttempt() {
  const questions = pickExamSet();
  state = {
    questions,
    answers: {},           // questionId -> array of selected option keys
    currentIndex: 0,
    startedAt: Date.now(),
    endsAt: Date.now() + EXAM_DURATION_MS,
    flags: [],             // {type, message, time}
    finished: false,
  };
  saveState();
  enterFullscreenBestEffort();
  renderQuestion();
  showScreen("screen-exam");
  startTimer();
  attachProctoring();
}

/* ---------------- resuming an in-progress attempt on load ---------------- */

window.addEventListener("DOMContentLoaded", () => {
  const saved = loadState();
  if (saved && !saved.finished && saved.endsAt > Date.now()) {
    state = saved;
    logFlag("reload", "Page was reloaded during the exam.");
    renderQuestion();
    showScreen("screen-exam");
    startTimer();
    attachProctoring();
  } else if (saved && saved.finished) {
    state = saved;
    renderResults();
    showScreen("screen-results");
  }
});

/* ---------------- timer ---------------- */

function startTimer() {
  if (timerHandle) clearInterval(timerHandle);
  tickTimer();
  timerHandle = setInterval(tickTimer, 1000);
}

function tickTimer() {
  const remaining = state.endsAt - Date.now();
  const el = document.getElementById("timer");
  el.textContent = fmtTime(remaining);
  el.classList.remove("warn", "critical");
  if (remaining <= 5 * 60 * 1000) el.classList.add("critical");
  else if (remaining <= 15 * 60 * 1000) el.classList.add("warn");

  if (remaining <= 0) {
    clearInterval(timerHandle);
    finishExam("time_up");
  }
}

/* ---------------- rendering the question panel ---------------- */

function renderQuestion() {
  const q = state.questions[state.currentIndex];
  document.getElementById("progress-badge").textContent =
    `Question ${state.currentIndex + 1} / ${state.questions.length}`;

  document.getElementById("q-section").textContent = q.section;
  document.getElementById("q-type").textContent =
    q.type === "multi" ? "Select two" : "Select one";

  document.getElementById("q-prompt").textContent = q.prompt;

  const selected = new Set(state.answers[q.id] || []);
  const optsEl = document.getElementById("q-options");
  optsEl.innerHTML = "";
  q.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "q-option" + (selected.has(opt.key) ? " selected" : "");
    div.innerHTML = `<span class="opt-key">${opt.key}</span><span>${escapeHtml(opt.text)}</span>`;
    div.addEventListener("click", () => toggleOption(q, opt.key));
    optsEl.appendChild(div);
  });

  document.getElementById("btn-prev").disabled = state.currentIndex === 0;
  document.getElementById("btn-next").textContent =
    state.currentIndex === state.questions.length - 1 ? "Finish →" : "Next →";

  renderNav();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function toggleOption(q, key) {
  const current = new Set(state.answers[q.id] || []);
  const maxSelectable = q.type === "multi" ? 2 : 1;

  if (current.has(key)) {
    current.delete(key);
  } else {
    if (q.type === "single") current.clear();
    if (current.size >= maxSelectable && q.type === "multi") {
      // drop the oldest selection to make room
      const first = current.values().next().value;
      current.delete(first);
    }
    current.add(key);
  }
  state.answers[q.id] = Array.from(current);
  saveState();
  renderQuestion();
}

function renderNav() {
  const nav = document.getElementById("question-nav");
  nav.innerHTML = "";
  state.questions.forEach((q, i) => {
    const item = document.createElement("div");
    const answered = (state.answers[q.id] || []).length > 0;
    item.className = "nav-item" +
      (answered ? " answered" : "") +
      (i === state.currentIndex ? " current" : "");
    item.textContent = i + 1;
    item.addEventListener("click", () => {
      state.currentIndex = i;
      saveState();
      renderQuestion();
    });
    nav.appendChild(item);
  });
}

document.getElementById("btn-prev").addEventListener("click", () => {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    saveState();
    renderQuestion();
  }
});

document.getElementById("btn-next").addEventListener("click", () => {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex++;
    saveState();
    renderQuestion();
  } else {
    confirmSubmit();
  }
});

document.getElementById("btn-clear").addEventListener("click", () => {
  const q = state.questions[state.currentIndex];
  delete state.answers[q.id];
  saveState();
  renderQuestion();
});

document.getElementById("btn-submit").addEventListener("click", confirmSubmit);

function confirmSubmit() {
  const answeredCount = Object.keys(state.answers).length;
  const unanswered = state.questions.length - answeredCount;
  const msg = unanswered > 0
    ? `You have ${unanswered} unanswered question(s). Submit anyway?`
    : "Submit your exam now?";
  showConfirmModal(msg, () => finishExam("manual"));
}

function showConfirmModal(message, onConfirm) {
  document.getElementById("confirm-message").textContent = message;
  document.getElementById("confirm-modal-overlay").classList.remove("hidden");
  pendingConfirmAction = onConfirm;
}

let pendingConfirmAction = null;

document.getElementById("confirm-modal-yes").addEventListener("click", () => {
  document.getElementById("confirm-modal-overlay").classList.add("hidden");
  const action = pendingConfirmAction;
  pendingConfirmAction = null;
  if (action) action();
});

document.getElementById("confirm-modal-no").addEventListener("click", () => {
  document.getElementById("confirm-modal-overlay").classList.add("hidden");
  pendingConfirmAction = null;
});

/* ---------------- proctoring ---------------- */

function attachProctoring() {
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("blur", onWindowBlur);
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("contextmenu", blockEvent);
  document.addEventListener("copy", blockEvent);
  document.addEventListener("cut", blockEvent);
  document.addEventListener("paste", blockEvent);
  document.addEventListener("keydown", onKeyDown);
  window.addEventListener("beforeunload", onBeforeUnload);
}

function detachProctoring() {
  document.removeEventListener("visibilitychange", onVisibilityChange);
  window.removeEventListener("blur", onWindowBlur);
  document.removeEventListener("fullscreenchange", onFullscreenChange);
  document.removeEventListener("contextmenu", blockEvent);
  document.removeEventListener("copy", blockEvent);
  document.removeEventListener("cut", blockEvent);
  document.removeEventListener("paste", blockEvent);
  document.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("beforeunload", onBeforeUnload);
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

function blockEvent(e) { e.preventDefault(); }

function onVisibilityChange() {
  if (document.hidden && state && !state.finished) {
    logFlag("tab_switch", "You switched away from the exam tab/window.");
  }
}

function onWindowBlur() {
  if (state && !state.finished) {
    logFlag("window_blur", "The exam window lost focus.");
  }
}

function onFullscreenChange() {
  if (!document.fullscreenElement && state && !state.finished) {
    logFlag("fullscreen_exit", "You exited fullscreen mode.");
  }
}

function onKeyDown(e) {
  const blockedCombos = [
    (e.key === "F12"),
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())),
    (e.metaKey && e.altKey && e.key.toUpperCase() === "I"),
    (e.ctrlKey && ["c", "v", "x", "u", "s", "p"].includes(e.key.toLowerCase())),
  ];
  if (blockedCombos.some(Boolean)) {
    e.preventDefault();
    logFlag("devtools_attempt", "A restricted keyboard shortcut was used (dev tools / copy / print).");
  }
}

function onBeforeUnload(e) {
  if (state && !state.finished) {
    e.preventDefault();
    e.returnValue = "";
  }
}

function enterFullscreenBestEffort() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
}

function logFlag(type, message) {
  if (!state || state.finished) return;
  state.flags.push({ type, message, time: Date.now() });
  saveState();
  updateFlagIndicator();
  showProctorOverlay(message);
  if (state.flags.length >= MAX_FLAGS_BEFORE_AUTOSUBMIT) {
    finishExam("too_many_flags");
  }
}

function updateFlagIndicator() {
  const ind = document.getElementById("flag-indicator");
  const count = document.getElementById("flag-count");
  if (!state.flags.length) { ind.classList.add("hidden"); return; }
  ind.classList.remove("hidden");
  count.textContent = state.flags.length;
}

function showProctorOverlay(message) {
  const overlay = document.getElementById("proctor-overlay");
  document.getElementById("proctor-message").textContent = message;
  overlay.classList.remove("hidden");
}

document.getElementById("btn-resume").addEventListener("click", () => {
  document.getElementById("proctor-overlay").classList.add("hidden");
  enterFullscreenBestEffort();
});

/* ---------------- scoring & results ---------------- */

function finishExam(reason) {
  if (!state || state.finished) return;
  state.finished = true;
  state.finishReason = reason;
  state.finishedAt = Date.now();
  saveState();
  if (timerHandle) clearInterval(timerHandle);
  detachProctoring();
  renderResults();
  showScreen("screen-results");
}

function isCorrect(q) {
  const picked = new Set(state.answers[q.id] || []);
  const correctKeys = new Set(q.options.filter(o => o.correct).map(o => o.key));
  if (picked.size !== correctKeys.size) return false;
  for (const k of picked) if (!correctKeys.has(k)) return false;
  return true;
}

function renderResults() {
  const total = state.questions.length;
  let correct = 0, unanswered = 0;
  const bySection = {};

  state.questions.forEach(q => {
    const answered = (state.answers[q.id] || []).length > 0;
    if (!answered) unanswered++;
    const ok = answered && isCorrect(q);
    if (ok) correct++;

    if (!bySection[q.section]) bySection[q.section] = { total: 0, correct: 0 };
    bySection[q.section].total++;
    if (ok) bySection[q.section].correct++;
  });

  const incorrect = total - correct - unanswered;
  const pct = correct / total;
  const scaledScore = Math.round(pct * 1000);
  const pass = scaledScore >= PASSING_SCORE;

  document.getElementById("result-grade").textContent = pass ? "PASS" : "FAIL";
  document.getElementById("result-grade").className = "result-grade " + (pass ? "pass" : "fail");
  document.getElementById("result-score-num").textContent = scaledScore;
  document.getElementById("result-sub").textContent =
    `Passing score is ${PASSING_SCORE}/1000. You answered ${correct} of ${total} questions correctly.`;

  document.getElementById("stat-correct").textContent = correct;
  document.getElementById("stat-incorrect").textContent = incorrect;
  document.getElementById("stat-unanswered").textContent = unanswered;
  document.getElementById("stat-time").textContent =
    fmtTime(Math.max(0, state.finishedAt - state.startedAt));
  document.getElementById("stat-flags").textContent = state.flags.length;

  renderSectionBreakdown(bySection);
  renderFocusSuggestions(bySection);
  renderReviewPanel();
}

function renderSectionBreakdown(bySection) {
  const el = document.getElementById("section-breakdown");
  el.innerHTML = "";
  Object.entries(bySection)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
    .forEach(([section, s]) => {
      const pct = Math.round((s.correct / s.total) * 100);
      const color = pct >= 80 ? "var(--good)" : pct >= 60 ? "var(--warn)" : "var(--bad)";
      const row = document.createElement("div");
      row.className = "section-row";
      row.innerHTML = `
        <div class="section-name">${escapeHtml(section)}</div>
        <div class="section-bar-track"><div class="section-bar-fill" style="width:${pct}%;background:${color}"></div></div>
        <div class="section-pct">${s.correct}/${s.total}</div>
      `;
      el.appendChild(row);
    });
}

function renderFocusSuggestions(bySection) {
  const el = document.getElementById("focus-suggestions");
  el.innerHTML = "";
  const rows = Object.entries(bySection).map(([section, s]) => ({
    section, pct: s.correct / s.total, correct: s.correct, total: s.total
  })).sort((a, b) => a.pct - b.pct);

  const weak = rows.filter(r => r.pct < 0.7);

  if (weak.length === 0) {
    const div = document.createElement("div");
    div.className = "focus-item ok";
    div.innerHTML = `<strong>Strong across the board.</strong> You scored 70% or higher in every section. Light review of any missed questions below is all that's needed before the real exam.`;
    el.appendChild(div);
    return;
  }

  weak.forEach(r => {
    const div = document.createElement("div");
    div.className = "focus-item";
    div.innerHTML = `<strong>${escapeHtml(r.section)}</strong> — ${r.correct}/${r.total} correct (${Math.round(r.pct * 100)}%). This is your biggest opportunity; revisit this topic before your next attempt.`;
    el.appendChild(div);
  });
}

function renderReviewPanel() {
  const panel = document.getElementById("review-panel");
  panel.innerHTML = "";
  state.questions.forEach((q, i) => {
    const picked = new Set(state.answers[q.id] || []);
    const answered = picked.size > 0;
    const ok = answered && isCorrect(q);
    const tagClass = !answered ? "unanswered" : ok ? "correct" : "incorrect";
    const tagText = !answered ? "Unanswered" : ok ? "Correct" : "Incorrect";

    const div = document.createElement("div");
    div.className = "review-q";
    let optsHtml = "";
    q.options.forEach(o => {
      let cls = "";
      if (o.correct) cls = "right-answer";
      else if (picked.has(o.key)) cls = "wrong-picked";
      optsHtml += `<div class="review-opt ${cls}">${o.key}. ${escapeHtml(o.text)}${picked.has(o.key) ? " (your answer)" : ""}</div>`;
    });

    div.innerHTML = `
      <div class="review-q-head">
        <span>Q${i + 1} · ${escapeHtml(q.section)}</span>
        <span class="review-tag ${tagClass}">${tagText}</span>
      </div>
      <div>${escapeHtml(q.prompt)}</div>
      <div style="margin-top:10px">${optsHtml}</div>
    `;
    panel.appendChild(div);
  });
}

document.getElementById("btn-review").addEventListener("click", () => {
  document.getElementById("review-panel").classList.toggle("hidden");
});

document.getElementById("btn-retake").addEventListener("click", () => {
  clearState();
  state = null;
  consentCheck.checked = false;
  btnStart.disabled = true;
  document.getElementById("review-panel").classList.add("hidden");
  showScreen("screen-start");
});
