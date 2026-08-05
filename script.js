/* PRELOADER */
window.addEventListener('load',()=>{
  const pre=document.getElementById('preloader');
  if(!pre) return;
  const mark=pre.querySelector('.pl-mark');
  const bar=pre.querySelector('.pl-bar');
  setTimeout(()=>{mark.classList.add('show'); if(bar) bar.style.width='100%';},150);
  setTimeout(()=>{pre.classList.add('hide');},1200);
  setTimeout(()=>{pre.style.display='none';},2100);
});

/* CUSTOM CURSOR */
const dot=document.getElementById('cursorDot');
const ring=document.getElementById('cursorRing');
if(dot && ring){
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  function loop(){rx+=(mx-rx)*0.16;ry+=(my-ry)*0.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);}
  loop();
  const bind=(selector,cls)=>{
    document.querySelectorAll(selector).forEach(el=>{
      el.addEventListener('mouseenter',()=>ring.classList.add(cls));
      el.addEventListener('mouseleave',()=>ring.classList.remove(cls));
    });
  };
  bind('[data-hover]','big');
  bind('[data-hover-big]','big');
  bind('[data-hover-view]','view');
  bind('[data-hover-play]','play');
}

/* HEADER SOLID ON SCROLL */
const header=document.getElementById('siteHeader');
if(header){
  window.addEventListener('scroll',()=>{ header.classList.toggle('solid',window.scrollY>40); });
}

/* THEME TOGGLE (persists across pages via localStorage) */
const themeBtn=document.getElementById('themeToggle');
(function initTheme(){
  const saved=localStorage.getItem('os-theme');
  if(saved==='dark'){ document.body.classList.add('dark'); if(themeBtn) themeBtn.textContent='☀️'; }
})();
if(themeBtn){
  themeBtn.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    const isDark=document.body.classList.contains('dark');
    themeBtn.textContent=isDark?'☀️':'🌙';
    localStorage.setItem('os-theme',isDark?'dark':'light');
  });
}

/* SHOWREEL — fast scroll-driven horizontal track */
const reelSection=document.querySelector('.showreel');
const reelTrack=document.getElementById('reelTrack');
const reelCount=document.getElementById('reelCount');
function updateReel(){
  if(!reelSection || !reelTrack || window.innerWidth<=560) return;
  const rect=reelSection.getBoundingClientRect();
  const total=reelSection.offsetHeight-window.innerHeight;
  let progress=(-rect.top)/total;
  progress=Math.min(Math.max(progress,0),1);
  const maxScroll=reelTrack.scrollWidth-window.innerWidth+64;
  reelTrack.style.transform=`translateX(-${progress*maxScroll}px)`;
  const cards=reelTrack.children.length;
  const idx=Math.min(cards,Math.max(1,Math.round(progress*(cards-1))+1));
  if(reelCount) reelCount.textContent=String(idx).padStart(2,'0');
}
window.addEventListener('scroll',updateReel);
window.addEventListener('resize',updateReel);
updateReel();

/* SCROLL REVEAL */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('on'); } });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
