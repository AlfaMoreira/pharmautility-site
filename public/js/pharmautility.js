/* PharmaUtility — Design System v1.0
   Sprite de ícones + comportamentos de interface (sem dependências). */
(function () {
  "use strict";

  /* ---------- Ícones: grade 24px, traço 1.75, pontas arredondadas ---------- */
  var ICONS = {
    "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-up-right": '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "chevron-right": '<path d="m9 6 6 6-6 6"/>',
    "plus": '<path d="M12 5v14M5 12h14"/>',
    "close": '<path d="M6 6l12 12M18 6 6 18"/>',
    "menu": '<path d="M4 7h16M4 12h16M4 17h10"/>',
    "search": '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    "check": '<path d="m5 12.5 4.5 4.5L19 7"/>',
    "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.4 2.6 2.6 5-5.2"/>',
    "alert": '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.4v.1"/>',
    "info": '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.1"/>',
    "warning": '<path d="M10.3 4.2 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/><path d="M12 9.5v4M12 16.8v.1"/>',
    "phone": '<path d="M6.6 3.5h-2a1.6 1.6 0 0 0-1.6 1.8 17 17 0 0 0 15.7 15.2 1.6 1.6 0 0 0 1.8-1.6v-2.1a1.5 1.5 0 0 0-1.2-1.5l-3-.7a1.5 1.5 0 0 0-1.5.5l-1.2 1.4a12 12 0 0 1-5.6-5.6L9.4 9.7a1.5 1.5 0 0 0 .5-1.5l-.7-3a1.5 1.5 0 0 0-1.5-1.2Z"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    "chat": '<path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1.2 1.2-4A8 8 0 1 1 20 11.5Z"/><path d="M8.5 11.5h.1M12 11.5h.1M15.5 11.5h.1"/>',
    "pin": '<path d="M12 21s-7-6-7-11.3a7 7 0 0 1 14 0C19 15 12 21 12 21Z"/><circle cx="12" cy="9.7" r="2.5"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    "calendar": '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    "download": '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>',
    "airflow": '<path d="M3 8.5h10.5a2.75 2.75 0 1 0-2.7-3.3"/><path d="M3 12.5h15a3 3 0 1 1-2.9 3.8"/><path d="M3 16.5h7"/>',
    "droplet": '<path d="M12 3.2s6.2 6.4 6.2 11a6.2 6.2 0 0 1-12.4 0c0-4.6 6.2-11 6.2-11Z"/><path d="M9 14.6a3 3 0 0 0 3 3"/>',
    "chip": '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><rect x="10" y="10" width="4" height="4" rx=".6"/><path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21"/>',
    "shield-check": '<path d="M12 3 19 6v5.4c0 4.4-2.9 8-7 9.6-4.1-1.6-7-5.2-7-9.6V6l7-3Z"/><path d="m9 12 2.1 2.1L15.2 10"/>',
    "pulse": '<path d="M3 12h3.8l2.4-5.5 4.6 11 2.4-5.5H21"/>',
    "doc": '<path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    "factory": '<path d="M3 20.5V10l5 3V10l5 3V7.5l3-1.5 1 3.5h3.5v11Z"/><path d="M3 20.5h18M7.5 17h1.5M12 17h1.5M16.5 17H18"/>',
    "server": '<rect x="4" y="3.5" width="16" height="7" rx="1.8"/><rect x="4" y="13.5" width="16" height="7" rx="1.8"/><path d="M8 7h.1M8 17h.1M12 7h4M12 17h4"/>',
    "thermo": '<path d="M10 13.6V5a2 2 0 1 1 4 0v8.6a4 4 0 1 1-4 0Z"/><path d="M12 9v7.5"/>',
    "gauge": '<path d="M4.2 17.5a9 9 0 1 1 15.6 0"/><path d="m12 13.5 4-4.5M12 13.5h.1"/>',
    "users": '<circle cx="9" cy="8" r="3.5"/><path d="M2.8 20c.4-3.3 3-5.5 6.2-5.5s5.8 2.2 6.2 5.5M15.5 4.6a3.5 3.5 0 0 1 0 6.8M17.6 14.8c2 .7 3.3 2.6 3.6 5.2"/>',
    "wrench": '<path d="M14.7 6.3a4 4 0 0 0 5.2 5.2L13 18.4a2.1 2.1 0 0 1-3 0l-.4-.4a2.1 2.1 0 0 1 0-3l6.9-6.9"/><path d="M14.7 6.3 17.4 3.6a5.5 5.5 0 0 1 3 3l-2.7 2.7"/><path d="M8 16 4 20"/>',
    "image": '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m21 15.5-5-5-9.5 9"/>',
    "linkedin": '<rect x="3" y="3" width="18" height="18" rx="3.5"/><path d="M7.5 10.5v6M7.5 7.5v.1M11.5 16.5v-6M11.5 13c0-1.7 1-2.6 2.4-2.6s2.1.9 2.1 2.6v3.5"/>',
    "instagram": '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.3 6.7v.1"/>',
    "youtube": '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',
    "leaf": '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-6.5 9.5-8.5"/>',
    "cert": '<circle cx="12" cy="9" r="5.5"/><path d="m9 14-1.5 7 4.5-2.5 4.5 2.5L15 14"/><path d="m10 9 1.4 1.4L14.2 7.6"/>'
  };

  function buildSprite() {
    if (document.getElementById("pu-icons")) return;
    var s = '<svg xmlns="http://www.w3.org/2000/svg" id="pu-icons" style="display:none" aria-hidden="true">';
    for (var k in ICONS) s += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + "</symbol>";
    s += "</svg>";
    document.body.insertAdjacentHTML("afterbegin", s);
  }
  window.PU_ICONS = Object.keys(ICONS);

  /* ---------- Cabeçalho: estado ao rolar ---------- */
  function header() {
    var h = document.querySelector("[data-header]");
    if (!h) return;
    var on = function () { h.classList.toggle("is-scrolled", window.scrollY > 8); };
    on(); window.addEventListener("scroll", on, { passive: true });
  }

  /* ---------- Mega menu ---------- */
  function mega() {
    document.querySelectorAll("[data-mega-trigger]").forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      var set = function (open) {
        btn.setAttribute("aria-expanded", String(open));
        panel.classList.toggle("is-open", open);
      };
      btn.addEventListener("click", function (e) { e.stopPropagation(); set(btn.getAttribute("aria-expanded") !== "true"); });
      document.addEventListener("click", function (e) { if (!panel.contains(e.target)) set(false); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); } });
    });
  }

  /* ---------- Drawer mobile ---------- */
  function drawer() {
    document.querySelectorAll("[data-drawer-open]").forEach(function (btn) {
      var d = document.getElementById(btn.getAttribute("aria-controls"));
      if (!d) return;
      var closeBtn = d.querySelector("[data-drawer-close]");
      var open = function () { d.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; setTimeout(function () { closeBtn && closeBtn.focus(); }, 50); };
      var close = function () { d.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; btn.focus(); };
      btn.addEventListener("click", open);
      closeBtn && closeBtn.addEventListener("click", close);
      d.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    });
  }

  /* ---------- Abas (WAI-ARIA tabs) ---------- */
  function tabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (root) {
      var list = root.querySelectorAll('[role="tab"]');
      var select = function (tab) {
        list.forEach(function (t) {
          var sel = t === tab;
          t.setAttribute("aria-selected", String(sel));
          t.tabIndex = sel ? 0 : -1;
          var p = document.getElementById(t.getAttribute("aria-controls"));
          if (p) p.hidden = !sel;
        });
      };
      list.forEach(function (t, i) {
        t.addEventListener("click", function () { select(t); });
        t.addEventListener("keydown", function (e) {
          var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!n) return;
          var j = i, guard = 0;
          do { j = (j + n + list.length) % list.length; guard++; } while (list[j].disabled && guard < list.length);
          list[j].focus(); select(list[j]);
        });
      });
    });
  }

  /* ---------- Chips de filtro ---------- */
  function chips() {
    document.querySelectorAll("[data-chip]").forEach(function (c) {
      c.addEventListener("click", function () { c.setAttribute("aria-pressed", String(c.getAttribute("aria-pressed") !== "true")); });
    });
  }

  /* ---------- Validação de formulário (demonstração) ---------- */
  function forms() {
    document.querySelectorAll("[data-validate]").forEach(function (form) {
      form.setAttribute("novalidate", "");
      var check = function (el) {
        var field = el.closest(".field, .check");
        if (!field) return true;
        var ok = el.checkValidity();
        field.classList.toggle("is-error", !ok);
        el.setAttribute("aria-invalid", String(!ok));
        return ok;
      };
      form.querySelectorAll("input, select, textarea").forEach(function (el) {
        el.addEventListener("blur", function () { if (el.value || el.type === "checkbox") check(el); });
        el.addEventListener("input", function () { if (el.closest(".is-error")) check(el); });
      });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var first = null;
        form.querySelectorAll("input, select, textarea").forEach(function (el) { if (!check(el) && !first) first = el; });
        var out = form.querySelector("[data-form-status]");
        if (first) { first.focus(); if (out) out.innerHTML = alertHTML("error", "Revise os campos destacados.", "Alguns dados obrigatórios estão ausentes ou inválidos."); return; }
        var btn = form.querySelector('[type="submit"]');
        if (btn) btn.classList.add("is-loading");
        setTimeout(function () {
          if (btn) btn.classList.remove("is-loading");
          if (out) out.innerHTML = alertHTML("success", "Mensagem enviada.", "Um engenheiro da PharmaUtility retornará em até 1 dia útil.");
          form.reset();
        }, 1100);
      });
    });
  }
  function alertHTML(type, title, text) {
    var icon = type === "success" ? "check-circle" : "alert";
    return '<div class="alert alert--' + type + '" role="' + (type === "error" ? "alert" : "status") + '"><svg class="icon" aria-hidden="true"><use href="#i-' + icon + '"/></svg><div><strong>' + title + "</strong>" + text + "</div></div>";
  }

  /* ---------- Revelação suave ao rolar ---------- */
  function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function init() { buildSprite(); header(); mega(); drawer(); tabs(); chips(); forms(); reveal(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
