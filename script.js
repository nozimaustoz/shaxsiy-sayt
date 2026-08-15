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

// ===== Bo'limlar scroll paytida yumshoq paydo bo'ladi =====
// Yashirish sinfi shu yerda qo'shiladi — JS ishlamasa, matn baribir ko'rinib turadi
var harakatOchiq = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (harakatOchiq && 'IntersectionObserver' in window) {
  var bolimlar = document.querySelectorAll('.service, #loyihalar, #fikrlar, #savol-javob, #aloqa');

  for (var i = 0; i < bolimlar.length; i++) {
    bolimlar[i].classList.add('reveal');
  }

  var kuzatuvchi = new IntersectionObserver(function (yozuvlar) {
    yozuvlar.forEach(function (yozuv) {
      if (yozuv.isIntersecting) {
        yozuv.target.classList.add('reveal-in');
        kuzatuvchi.unobserve(yozuv.target); // bir marta ko'rinsa yetarli
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  for (var j = 0; j < bolimlar.length; j++) {
    kuzatuvchi.observe(bolimlar[j]);
  }
}

// ===== Rasm hali qo'yilmagan bo'lsa, inisiallar ko'rsatiladi =====
// Rasm HTML'dan butunlay olib tashlangan bo'lishi ham mumkin — shuning uchun tekshiriladi
var photo = document.getElementById('photo');
if (photo) {
  photo.addEventListener('error', function () {
    photo.parentElement.classList.add('no-image');
  });
  if (photo.complete && photo.naturalWidth === 0) {
    photo.parentElement.classList.add('no-image');
  }
}
