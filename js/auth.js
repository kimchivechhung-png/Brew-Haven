// js/auth.js
// Include in HTML with: <script type="module" src="js/auth.js"></script>

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail   
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
// (Optional) Analytics — you can skip these two lines entirely if you don’t need GA
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js';

// 🔁 Paste YOUR config below — keep the exact property names (apiKey, authDomain, ...)
const firebaseConfig = {
  apiKey: "AIzaSyCKqoxTekSzitXWoIsBrz_sBeiArL2E2ac",
  authDomain: "brew-haven-2d14e.firebaseapp.com",
  projectId: "brew-haven-2d14e",
  storageBucket: "brew-haven-2d14e.firebasestorage.app",
  messagingSenderId: "476815641175",
  appId: "1:476815641175:web:190f6179f840457decf112",
  measurementId: "G-W6B4RT121S"
};

// --- Initialize once ---
const app  = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // optional
const auth = getAuth(app);

// --- Helpers ---
const $ = (sel) => document.querySelector(sel);
const show = (el, on = true) => { if (el) el.style.display = on ? '' : 'none'; };

// --- REGISTER ---
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = $('#regName')?.value?.trim();
    const email = $('#regEmail')?.value?.trim();
    const pass  = $('#regPassword')?.value;
    const error = $('#regError');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name) await updateProfile(cred.user, { displayName: name });
      window.location.href = 'account.html';
    } catch (err) {
      if (error) { error.textContent = err.message; show(error, true); }
    }
  });
}

// --- LOGIN ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('#loginEmail')?.value?.trim();
    const pass  = $('#loginPassword')?.value;
    const error = $('#loginError');
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      window.location.href = 'account.html';
    } catch (err) {
      if (error) { error.textContent = err.message; show(error, true); }
    }
  });
}
// --- FORGOT PASSWORD ---
const forgotLink = document.getElementById('forgotPasswordLink');

if (forgotLink) {
  forgotLink.addEventListener('click', async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const email = emailInput?.value?.trim();

    if (!email) {
      alert('Please enter your email address first.');
      emailInput.focus();
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (err) {
      alert(err.message);
    }
  });
}
// --- LOGOUT ---
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'login.html';
  });
}

// --- GUARD PRIVATE PAGES ---
const guard = document.getElementById('authGuard');
onAuthStateChanged(auth, (user) => {
  if (!guard) return;
  if (user) {
    const nameEl = document.getElementById('userName');
    const emailEl = document.getElementById('userEmail');
    if (nameEl) nameEl.textContent = user.displayName || '(no name)';
    if (emailEl) emailEl.textContent = user.email || '';
    show(guard, true);
  } else {
    window.location.href = 'login.html';
  }
});