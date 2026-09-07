/* ==========================================================================
   京洗美容贴膜工厂店 - 全局脚本
   ========================================================================== */
(function () {
  "use strict";

  /* 1. 移动端导航开关 */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });
    // 点击导航链接后自动关闭移动端菜单
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  /* 2. 滚动时为 Header 添加阴影 */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 20) {
      header && header.classList.add("scrolled");
    } else {
      header && header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* 3. 高亮当前页面导航项 */
  var currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("#")[0];
    if (href === currentPage) { a.classList.add("active"); }
  });

  /* 4. 数字滚动动画 */
  function animateNumbers() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    nums.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1500, start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var val = Math.round(target * eased);
        el.textContent = val.toLocaleString("zh-CN") + suffix;
        if (progress < 1) { requestAnimationFrame(step); }
      }
      requestAnimationFrame(step);
    });
  }
  // 元素进入视口时触发数字动画
  var numsWrap = document.querySelector("[data-count]");
  if (numsWrap) {
    var countBox = numsWrap.closest(".hero-metrics") || numsWrap.parentElement;
    var inView = false;
    function checkCountView() {
      var rect = numsWrap.getBoundingClientRect();
      if (rect.top < window.innerHeight && !inView) {
        inView = true;
        animateNumbers();
      }
    }
    window.addEventListener("scroll", checkCountView);
    checkCountView();
  }

  /* 5. 表单假提交 */
  var forms = document.querySelectorAll("form[data-js-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : "";
      if (btn) { btn.textContent = "提交成功，我们会尽快联系您"; btn.disabled = true; }
      form.reset();
      setTimeout(function () {
        if (btn) { btn.textContent = original; btn.disabled = false; }
      }, 3000);
    });
  });

  /* 6. 门店内快速拨号（仅演示按钮交互） */
  var callBtns = document.querySelectorAll("[data-call]");
  callBtns.forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      var tel = b.getAttribute("data-call");
      if (tel) { window.location.href = "tel:" + tel; }
    });
  });
})();
