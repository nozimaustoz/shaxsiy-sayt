// ===== TEMA (yorug' / qorong'i) =====
var root = document.documentElement;
var toggle = document.getElementById('themeToggle');

// Ba'zi holatlarda brauzer xotirani bloklaydi — shuning uchun himoyalangan funksiyalar
function readTheme() {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
}
function saveTheme(value) {
  try { localStorage.setItem('theme', value); } catch (e) { /* saqlab bo'lmadi */ }
}

// Oldingi tanlov saqlangan bo'lsa, o'shani qo'llaymiz
var saved = readTheme();
if (saved === 'dark' || saved === 'light') {
  root.setAttribute('data-theme', saved);
}

toggle.addEventListener('click', function () {
  // Hozirgi holatni aniqlaymiz: tanlov bo'lmasa, tizim sozlamasiga qaraymiz
  var current = root.getAttribute('data-theme');
  if (!current) {
    current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  var next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  saveTheme(next);
});

// ===== Footerdagi yil =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Rasm hali qo'yilmagan bo'lsa, inisiallar ko'rsatiladi =====
var photo = document.getElementById('photo');
photo.addEventListener('error', function () {
  photo.parentElement.classList.add('no-image');
});
if (photo.complete && photo.naturalWidth === 0) {
  photo.parentElement.classList.add('no-image');
}
