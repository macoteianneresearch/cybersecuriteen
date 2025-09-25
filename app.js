// Simple app logic: navigation, login, activity logs, simulation warnings
(() => {
  // Elements
  const panels = { hero: document.getElementById('hero'),
                   learn: document.getElementById('learn'),
                   simulate: document.getElementById('simulate'),
                   dashboard: document.getElementById('dashboard') };
  const btnHome = document.getElementById('btnHome');
  const btnLearn = document.getElementById('btnLearn');
  const btnSim = document.getElementById('btnSim');
  const btnDashboard = document.getElementById('btnDashboard');
  const startLearn = document.getElementById('startLearn');
  const startSim = document.getElementById('startSim');
  const openLogin = document.getElementById('openLogin');
  const modalLogin = document.getElementById('modalLogin');
  const closeLogin = document.getElementById('closeLogin');
  const loginForm = document.getElementById('loginForm');
  const iosWarning = document.getElementById('iosWarning');
  const reportBtn = document.getElementById('reportBtn');
  const dismissBtn = document.getElementById('dismissBtn');
  const activityFeed = document.getElementById('activityFeed');

  let currentUser = JSON.parse(localStorage.getItem('cst_user') || 'null');
  let activityLog = JSON.parse(localStorage.getItem('cst_log') || '[]');

  function showPanel(name){
    Object.values(panels).forEach(p => p.classList.add('hidden'));
    panels[name].classList.remove('hidden');
  }

  // nav
  btnHome.onclick = () => showPanel('hero');
  btnLearn.onclick = () => showPanel('learn');
  btnSim.onclick = () => showPanel('simulate');
  btnDashboard.onclick = () => showPanel('dashboard');

  startLearn.onclick = () => showPanel('learn');
  startSim.onclick = () => showPanel('simulate');

  openLogin.onclick = () => modalLogin.classList.remove('hidden');
  closeLogin.onclick = () => modalLogin.classList.add('hidden');

  // login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const user = {
      name: fd.get('name'),
      birthday: fd.get('birthday'),
      age: fd.get('age'),
      scanId: fd.get('scanId'),
      role: fd.get('role')
    };
    currentUser = user;
    localStorage.setItem('cst_user', JSON.stringify(user));
    modalLogin.classList.add('hidden');
    pushActivity('Signed in');
    renderActivity();
    alert('Welcome ' + user.name + ' — role: ' + user.role);
    showPanel('hero');
  });

  function pushActivity(entry){
    const item = { user: currentUser ? currentUser.name : 'Guest', role: currentUser ? currentUser.role : 'guest', entry, time: new Date().toLocaleString() };
    activityLog.unshift(item);
    localStorage.setItem('cst_log', JSON.stringify(activityLog));
  }

  // lesson buttons
  document.querySelectorAll('[data-action="complete-lesson"]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const title = btn.getAttribute('data-title');
      pushActivity('Completed lesson: ' + title);
      renderActivity();
      btn.innerText = 'Marked ✓';
      btn.disabled = true;
    });
  });

  // simulation interactions
  document.querySelectorAll('.result.suspicious, .email[data-scan], .post[data-scan]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      const reason = el.getAttribute('data-reason') || 'suspicious';
      // show ios warning
      iosWarning.classList.remove('hidden');
      iosWarning.dataset.reason = reason;
      // log that user inspected
      pushActivity('Inspected suspicious item: ' + (el.textContent.trim().slice(0,80)));
      renderActivity();
    });
  });

  // tabs switch
  document.querySelectorAll('.tab').forEach(t=>{
    t.addEventListener('click', ()=>{
      document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      const tab = t.dataset.tab;
      document.querySelectorAll('.sim-screen').forEach(s=>s.classList.add('hidden'));
      document.getElementById('sim-' + tab).classList.remove('hidden');
    });
  });

  // ios warning actions
  reportBtn.onclick = () => {
    const reason = iosWarning.dataset.reason || 'reported';
    pushActivity('Reported suspicious item (' + reason + ')');
    iosWarning.classList.add('hidden');
    alert('Reported. (Simulation only)');
    renderActivity();
  };
  dismissBtn.onclick = () => {
    iosWarning.classList.add('hidden');
    pushActivity('Dismissed warning');
    renderActivity();
  };

  function renderActivity(){
    activityFeed.innerHTML = '';
    if(activityLog.length === 0) activityFeed.innerHTML = '<div class="small">No activity yet</div>';
    activityLog.slice(0,50).forEach(it=>{
      const d = document.createElement('div');
      d.className = 'activity-item';
      d.style.padding='10px';
      d.style.borderBottom='1px solid rgba(255,255,255,0.03)';
      d.innerHTML = '<div style="font-weight:600">'+ it.entry +'</div><div style="font-size:12px;color:rgba(255,255,255,0.6)">'+ it.user + ' • ' + it.time + '</div>';
      activityFeed.appendChild(d);
    });
  }

  // initial render
  renderActivity();
  if(currentUser) pushActivity('Session resumed for ' + currentUser.name);
  // show hero initially
  showPanel('hero');
})();
