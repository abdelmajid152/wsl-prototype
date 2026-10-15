(function () {
  'use strict';

  // Stroke icons (24x24), coloured with currentColor
  var ICONS = {
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    landmark: '<path d="M3 22h18"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="M12 2 20 7H4z"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    access: '<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>',
    drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12.5 5.5 12 3c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/><path d="M12 12.5v5M9.5 15h5"/>',
    house: '<path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="12" cy="12.5" r="2"/><path d="M8.5 20c.6-2 2-3 3.5-3s2.9 1 3.5 3"/>',
    cv: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/>'
  };

  function icon(name, size) {
    size = size || 24;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  var CHEVRON = '<svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';

  var SERVICES = [
    { icon: 'users', title: 'البحث عن المرشحين للعمل', sub: '' },
    { icon: 'handshake', title: 'شركات و افراد', sub: 'تطلب مرشحين للعمل' },
    { icon: 'cap', title: 'تأهيل الموظفين', sub: 'دورات وتدريب' },
    { icon: 'landmark', title: 'الوظائف الحكومية', sub: 'المعلنة من الجهات الرسمية' },
    { icon: 'drop', title: 'التبرع بالدم', sub: 'خدمة مجانية' },
    { icon: 'access', title: 'خدمات كبار السن', sub: 'و ذوي الاحتياجات الخاصة' },
    { icon: 'cv', title: 'إنشاء سيرة ذاتية', sub: 'احترافية' },
    { icon: 'house', title: 'العمالة المنزلية', sub: '' }
  ];

  // The six "add ad" choices. `full` is your original wording (option A);
  // title/sub are the shorter labels used by the alternatives.
  var ITEMS = [
    { icon: 'briefcase', group: 'me', full: 'إضافة إعلان كمرشح يبحث عن عمل', title: 'أبحث عن عمل', sub: 'أعلن عن نفسك كمرشح' },
    { icon: 'users', group: 'others', full: 'إضافة إعلان كفرد لطلب مرشحين للعمل', title: 'أطلب مرشحين للعمل', sub: 'إعلان كفرد يبحث عن موظفين' },
    { icon: 'cap', group: 'others', full: 'إضافة إعلان كفرد لدورات تأهيل و تدريب الموظفين', title: 'دورات وتدريب', sub: 'تأهيل وتدريب الموظفين' },
    { icon: 'access', group: 'others', full: 'إضافة إعلان كفرد لخدمات كبار السن و ذوي الاحتياجات الخاصة', title: 'كبار السن وذوو الاحتياجات', sub: 'أعلن عن خدمتك' },
    { icon: 'drop', group: 'free', full: 'إضافة إعلان طلبات التبرع بالدم ( الخدمة مجانية )', title: 'طلب تبرع بالدم', sub: 'لمن يحتاج متبرعين', free: true },
    { icon: 'cv', group: 'me', full: 'إنشاء سيرة ذاتية احترافية فقط', title: 'سيرة ذاتية احترافية', sub: 'إنشاء فقط، بدون إعلان' }
  ];

  var GROUPS = [
    { key: 'me', label: 'لنفسك' },
    { key: 'others', label: 'تطلب أو تقدّم خدمة' },
    { key: 'free', label: 'خدمات مجانية' }
  ];

  var DESC = {
    a: 'تصميمك كما هو: فقاعة تخرج من زر + وتكبر للأعلى، ثم تظهر الأزرار تباعاً. للإغلاق اضغط + مرة أخرى أو خارج القائمة أو اسحب المقبض للأسفل.',
    b: 'المقترح: نفس الفكرة لكن بأيقونة وعنوان قصير ووصف لكل خيار، مقسّمة إلى مجموعات. اللوحة تطفو فوق الشريط وزر + نفسه يصبح ×.',
    c: 'شبكة بطاقات بنفس أسلوب «خدمات المنصة» في الرئيسية. أهداف لمس كبيرة ومألوفة للمستخدم.',
    d: 'الخيارات تنبثق من زر + مباشرة بدون لوحة. أخف وأسرع، ويناسب إذا كانت الخيارات قصيرة.'
  };

  function $(id) { return document.getElementById(id); }

  var phone = $('phone');
  var addBtn = $('add-btn');
  var homeBtn = $('home-btn');
  var indicator = $('indicator');
  var menusBox = $('menus');
  var variant = 'a';
  var isOpen = false;
  var current = null;
  var keepNavTimer = null;

  // ---------- Home screen ----------
  $('services').innerHTML = SERVICES.map(function (s) {
    return '<div class="tile"><div class="ico">' + icon(s.icon) + '</div><div><b>' + s.title + '</b>' +
      (s.sub ? '<span>' + s.sub + '</span>' : '') + '</div></div>';
  }).join('');

  // ---------- Menus ----------
  function dialogAttrs() {
    return ' role="dialog" aria-modal="true" aria-label="إضافة إعلان"';
  }

  function buildA() {
    return '<section class="menu sheet sheet-a"' + dialogAttrs() + '>' +
      '<svg class="bubble" aria-hidden="true"><polygon fill="#FFFFFF" stroke="#FFFFFF" stroke-linejoin="round"/></svg>' +
      '<div class="body"><button type="button" class="handle" aria-label="إغلاق"></button>' +
      '<div class="list">' + ITEMS.map(function (it, i) {
        return '<button type="button" class="item pill" data-i="' + i + '" style="--i:' + i + '"><span>' + it.full + '</span>' + CHEVRON + '</button>';
      }).join('') + '</div></div></section>';
  }

  // Draws the bubble: a rounded box plus a tail that narrows down to the + button.
  // Rounded corners come from a thick round-joined stroke around an inset polygon.
  var TAIL = 160, R = 34;
  function shapeBubble(sheet) {
    var body = sheet.querySelector('.body');
    if (!body) return;
    var w = sheet.offsetWidth, b = body.offsetHeight, h = b + TAIL;
    sheet.style.height = h + 'px';
    var svg = sheet.querySelector('.bubble');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var poly = svg.querySelector('polygon');
    poly.setAttribute('stroke-width', 2 * R);
    poly.setAttribute('points', [
      [R, R], [w - R, R], [w - R, b - R], [w / 2, h - R], [R, b - R]
    ].map(function (p) { return p.join(','); }).join(' '));
  }

  function buildB() {
    var n = 0;
    var body = GROUPS.map(function (g) {
      var rows = ITEMS.map(function (it, i) {
        if (it.group !== g.key) return '';
        return '<button type="button" class="item row" data-i="' + i + '" style="--i:' + (n++) + '">' +
          '<span class="ico">' + icon(it.icon) + '</span>' +
          '<span class="txt"><b>' + it.title + (it.free ? '<span class="free">مجاني</span>' : '') + '</b><small>' + it.sub + '</small></span>' +
          CHEVRON + '</button>';
      }).join('');
      return '<div class="group-label item" style="--i:' + n + '">' + g.label + '</div>' + rows;
    }).join('');
    return '<section class="menu sheet sheet-b"' + dialogAttrs() + '>' +
      '<button type="button" class="handle" aria-label="إغلاق"></button>' +
      '<div class="sheet-head"><h2>ماذا تريد أن تضيف؟</h2><p>اختر نوع الإعلان</p></div>' +
      body + '</section>';
  }

  function buildC() {
    return '<section class="menu sheet sheet-c"' + dialogAttrs() + '>' +
      '<button type="button" class="handle" aria-label="إغلاق"></button>' +
      '<div class="sheet-head"><h2>ماذا تريد أن تضيف؟</h2></div>' +
      '<div class="tiles">' + ITEMS.map(function (it, i) {
        var wide = i >= 4 ? ' wide' : '';
        return '<button type="button" class="item mini' + wide + '" data-i="' + i + '" style="--i:' + i + '">' +
          '<span class="ico">' + icon(it.icon) + '</span>' +
          '<span><b>' + it.title + (it.free ? '<span class="free">مجاني</span>' : '') + '</b><br><small>' + it.sub + '</small></span></button>';
      }).join('') + '</div></section>';
  }

  function buildD() {
    var last = ITEMS.length - 1;
    return '<div class="menu dial"' + dialogAttrs() + '>' + ITEMS.map(function (it, i) {
      return '<button type="button" class="item chip" data-i="' + i + '" style="--r:' + (last - i) + '">' +
        '<span class="ico">' + icon(it.icon, 18) + '</span>' + it.title +
        (it.free ? '<span class="free">مجاني</span>' : '') + '</button>';
    }).join('') + '</div>';
  }

  var BUILDERS = { a: buildA, b: buildB, c: buildC, d: buildD };

  function render() {
    menusBox.innerHTML = BUILDERS[variant]();
    current = menusBox.firstElementChild;
    wireDrag(current);
    $('desc').textContent = DESC[variant];
  }

  // ---------- Open / close ----------
  function moveIndicator(btn) {
    indicator.style.transform = 'translateX(' + (btn.offsetLeft + btn.offsetWidth / 2 - 12) + 'px)';
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    clearTimeout(keepNavTimer);
    phone.classList.add('keep-nav');
    phone.classList.toggle('rotate-plus', variant !== 'a');
    shapeBubble(current);
    phone.classList.add('open');
    current.style.removeProperty('--drag');
    // Force a style flush so the enter transition always runs
    void current.offsetWidth;
    current.classList.add('in');
    addBtn.setAttribute('aria-expanded', 'true');
    addBtn.classList.add('on');
    homeBtn.classList.remove('on');
    moveIndicator(addBtn);
    var first = current.querySelector('.item[data-i]');
    if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 200);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    current.classList.remove('in');
    phone.classList.remove('open');
    keepNavTimer = setTimeout(function () { phone.classList.remove('keep-nav', 'rotate-plus'); }, 320);
    addBtn.setAttribute('aria-expanded', 'false');
    addBtn.classList.remove('on');
    homeBtn.classList.add('on');
    moveIndicator(homeBtn);
    addBtn.focus({ preventScroll: true });
  }

  var toastTimer = null;
  function toast(text) {
    var t = $('toast');
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  addBtn.addEventListener('click', function () { isOpen ? close() : open(); });
  $('overlay').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  menusBox.addEventListener('click', function (e) {
    if (e.target.closest('[data-close], .handle')) { close(); return; }
    var item = e.target.closest('[data-i]');
    if (!item) return;
    close();
    toast('اخترت: ' + ITEMS[+item.getAttribute('data-i')].title);
  });

  // ---------- Drag the sheet down to close ----------
  function wireDrag(sheet) {
    var handle = sheet.querySelector('.handle');
    if (!handle) return;
    var startY = 0, dy = 0, dragging = false, moved = false;

    handle.addEventListener('pointerdown', function (e) {
      dragging = true; moved = false; dy = 0; startY = e.clientY;
      handle.setPointerCapture(e.pointerId);
      sheet.classList.add('dragging');
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      dy = Math.max(0, e.clientY - startY);
      if (dy > 4) moved = true;
      sheet.style.setProperty('--drag', dy + 'px');
    });
    function end() {
      if (!dragging) return;
      dragging = false;
      sheet.classList.remove('dragging');
      if (dy > 90) close();
      else sheet.style.removeProperty('--drag');
    }
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
    // A drag should not also count as a tap on the handle
    handle.addEventListener('click', function (e) {
      if (moved) { e.stopPropagation(); moved = false; }
    }, true);
  }

  // ---------- Variant switcher ----------
  $('variants').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-v]');
    if (!btn || btn.getAttribute('data-v') === variant) return;
    if (isOpen) close();
    variant = btn.getAttribute('data-v');
    this.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b === btn); });
    render();
    setTimeout(open, 350);
  });

  var startV = (location.hash || '').replace('#', '');
  if (BUILDERS[startV]) {
    variant = startV;
    document.querySelectorAll('#variants button').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-v') === variant);
    });
  }
  render();
  moveIndicator(homeBtn);
})();
