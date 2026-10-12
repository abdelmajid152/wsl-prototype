(function () {
  'use strict';

  var listJobs = [
    { title: 'ممرض', type: 'دوام كامل', region: 'العاصمة', kind: 'شركة صغيرة', company: true },
    { title: 'فني أشعة', type: 'دوام جزئي', region: 'حولي', kind: '', company: false },
    { title: 'صيدلاني', type: 'دوام كامل', region: 'الفروانية', kind: 'شركة متوسطة', company: true },
    { title: 'مدرس خصوصي', type: 'دوام جزئي', region: 'الأحمدي', kind: '', company: false },
    { title: 'فني مختبر', type: 'دوام كامل', region: 'العاصمة', kind: 'شركة صغيرة', company: true }
  ];

  var companyJobs = [
    { title: 'ممرض', type: 'دوام كامل', region: 'العاصمة', kind: 'شركة صغيرة', company: true, current: true },
    { title: 'فني مختبر', type: 'دوام كامل', region: 'العاصمة', kind: 'شركة صغيرة', company: true },
    { title: 'صيدلاني', type: 'دوام جزئي', region: 'العاصمة', kind: 'شركة صغيرة', company: true },
    { title: 'موظف استقبال', type: 'دوام كامل', region: 'العاصمة', kind: 'شركة صغيرة', company: true }
  ];

  var variant = 'a';
  var filter = 'all';

  function $(id) { return document.getElementById(id); }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function jobCard(job, href, showCurrent) {
    var card = el(href ? 'a' : 'article', 'job-card');
    if (href) card.href = href;

    var body = el('div');
    body.appendChild(el('h3', null, 'التخصص المطلوب : ' + job.title));
    var meta = el('div', 'meta');
    var lines = ['النوع : ' + job.type, 'المنطقة : ' + job.region];
    if (job.company) lines.push('نوع الشركة : ' + job.kind);
    lines.forEach(function (line, i) {
      if (i) meta.appendChild(document.createElement('br'));
      meta.appendChild(document.createTextNode(line));
    });
    body.appendChild(meta);

    var tags = el('div', 'tags');
    tags.appendChild(el('span', 'chip', job.company ? 'شركة' : 'فرد'));
    if (showCurrent && job.current) tags.appendChild(el('span', 'chip dark', 'الوظيفة الحالية'));

    card.appendChild(body);
    card.appendChild(tags);
    return card;
  }

  function renderList() {
    var box = $('list-jobs');
    box.textContent = '';
    listJobs.forEach(function (job) {
      if (filter === 'company' && !job.company) return;
      if (filter === 'individual' && job.company) return;
      box.appendChild(jobCard(job, job.company ? '#' + variant : null));
    });
  }

  // Lists on the option screens
  companyJobs.slice(1).forEach(function (job) { $('a-jobs').appendChild(jobCard(job)); });
  companyJobs.forEach(function (job) { $('b-jobs').appendChild(jobCard(job, null, true)); });

  // The focused job card is shared by both options
  var tpl = $('job-focus');
  document.querySelectorAll('.job-slot').forEach(function (slot) {
    slot.replaceWith(tpl.content.cloneNode(true));
  });

  // List screen: variant switch and filters
  function setVariant(v) {
    variant = v;
    $('pick-a').classList.toggle('on', v === 'a');
    $('pick-b').classList.toggle('on', v === 'b');
    renderList();
  }
  $('pick-a').addEventListener('click', function () { setVariant('a'); });
  $('pick-b').addEventListener('click', function () { setVariant('b'); });

  $('filters').addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    filter = btn.getAttribute('data-filter');
    this.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b === btn); });
    renderList();
  });

  // Option A: reveal the company profile on first scroll
  function resetA() {
    $('a-scroll').scrollTop = 0;
    document.querySelectorAll('#screen-a .dim-sec').forEach(function (s) { s.classList.add('is-dim'); });
    $('a-hint').classList.remove('gone');
  }
  $('a-scroll').addEventListener('scroll', function () {
    if (this.scrollTop > 2) {
      document.querySelectorAll('#screen-a .dim-sec').forEach(function (s) { s.classList.remove('is-dim'); });
      $('a-hint').classList.add('gone');
    }
  });

  // Option B: job view <-> company profile
  function showB(company) {
    $('b-job').hidden = company;
    $('b-company').hidden = !company;
    $('b-back-list').hidden = company;
    $('b-back-job').hidden = !company;
    $('b-title').textContent = company ? 'بروفايل الشركة' : 'تفاصيل الوظيفة';
  }
  $('open-company').addEventListener('click', function () { showB(true); $('b-company').scrollTop = 0; });
  $('b-back-job').addEventListener('click', function () { showB(false); });

  // Hash routing between the three screens
  function route() {
    var hash = location.hash.replace('#', '') || 'list';
    if (hash !== 'a' && hash !== 'b') hash = 'list';
    $('screen-list').hidden = hash !== 'list';
    $('screen-a').hidden = hash !== 'a';
    $('screen-b').hidden = hash !== 'b';
    if (hash === 'a') resetA();
    if (hash === 'b') showB(false);
  }
  window.addEventListener('hashchange', route);

  renderList();
  route();
})();
