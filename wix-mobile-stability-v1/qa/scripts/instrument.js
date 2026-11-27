// Injected before any page script. Counters only; does not alter behaviour.
(function(){
  if (window.__n1probe) return;
  var P = window.__n1probe = {raf:0, rafPerSec:0, intervals:new Set(), timeouts:0, obs:{IO:0,MO:0,RO:0}, obsLive:{IO:0,MO:0,RO:0}, winL:0, docL:0, events:[], errors:[], rejections:[]};
  var _raf = window.requestAnimationFrame, rafCount=0;
  window.requestAnimationFrame = function(cb){ rafCount++; return _raf.call(window, cb); };
  setInterval.call(window, function(){ P.rafPerSec = rafCount; rafCount = 0; }, 1000);
  var _si = window.setInterval, _ci = window.clearInterval;
  window.setInterval = function(){ var id=_si.apply(window, arguments); P.intervals.add(id); return id; };
  window.clearInterval = function(id){ P.intervals.delete(id); return _ci.call(window,id); };
  ['IntersectionObserver','MutationObserver','ResizeObserver'].forEach(function(n){
    var O = window[n]; if(!O) return; var k = n==='IntersectionObserver'?'IO':n==='MutationObserver'?'MO':'RO';
    var W = function(cb,o){ var inst = new O(cb,o); P.obs[k]++; var live=false;
      var ob=inst.observe, dc=inst.disconnect;
      inst.observe=function(){ if(!live){live=true;P.obsLive[k]++;} return ob.apply(inst,arguments); };
      inst.disconnect=function(){ if(live){live=false;P.obsLive[k]--;} return dc.apply(inst,arguments); };
      return inst; };
    W.prototype = O.prototype; window[n] = W;
  });
  function wrapTarget(t, key){
    var a=t.addEventListener, r=t.removeEventListener, seen=new Map();
    t.addEventListener=function(type,fn,o){ var c=typeof o==='boolean'?o:!!(o&&o.capture); var id=type+'|'+c; var m=seen.get(fn)||new Set(); if(!m.has(id)){m.add(id);seen.set(fn,m);P[key]++;} return a.call(this,type,fn,o); };
    t.removeEventListener=function(type,fn,o){ var c=typeof o==='boolean'?o:!!(o&&o.capture); var id=type+'|'+c; var m=seen.get(fn); if(m&&m.has(id)){m.delete(id);P[key]--;} return r.call(this,type,fn,o); };
  }
  wrapTarget(window,'winL'); wrapTarget(document,'docL');
  ['pagehide','pageshow','visibilitychange','freeze','resume'].forEach(function(t){
    window.addEventListener(t, function(e){ P.events.push(t+(('persisted' in e)?(':'+e.persisted):'')+'@'+Math.round(performance.now())); }, true);
  });
  window.addEventListener('error', function(e){ if(!(e instanceof ErrorEvent)) return; P.errors.push(String(e.message).slice(0,200)+' @'+(e.filename||'').split('/').slice(-2).join('/')+':'+e.lineno); }, true);
  window.addEventListener('unhandledrejection', function(e){ P.rejections.push(String(e.reason && (e.reason.stack||e.reason.message) || e.reason).slice(0,200)); });
  P.snapshot = function(){
    var vids=[].slice.call(document.querySelectorAll('video'));
    var deep=[]; (function walk(r){ r.querySelectorAll('*').forEach(function(e){ if(e.shadowRoot){ deep=deep.concat([].slice.call(e.shadowRoot.querySelectorAll('video'))); walk(e.shadowRoot);} }); })(document);
    vids=vids.concat(deep);
    var g=window.gsap;
    return {
      url: location.pathname, nav: (performance.getEntriesByType('navigation')[0]||{}).type,
      videos: vids.length,
      videosWithSrc: vids.filter(function(v){return v.currentSrc||v.getAttribute('src')||v.querySelector('source[src]')}).length,
      videosPlaying: vids.filter(function(v){return !v.paused && !v.ended && v.readyState>2}).length,
      videosBuffered: vids.filter(function(v){return v.readyState>=2}).length,
      videosReleased: vids.filter(function(v){return !!v.__n1rel}).length,
      rafPerSec: P.rafPerSec, intervals: P.intervals.size,
      obsCreated: Object.assign({},P.obs), obsLive: Object.assign({},P.obsLive),
      winListeners: P.winL, docListeners: P.docL,
      gsapTweens: g ? g.globalTimeline.getChildren(true,true,true).length : null,
      scrollTriggers: window.ScrollTrigger ? ScrollTrigger.getAll().length : null,
      canvases: document.querySelectorAll('canvas').length,
      nodes: document.getElementsByTagName('*').length,
      events: P.events.slice(-12), errors: P.errors.slice(-10), rejections: P.rejections.slice(-10),
      headerVisible: (function(){ var h=document.querySelector('n1-header'); if(!h) return 'none'; var b=(h.querySelector('.n1h-bar')||h).getBoundingClientRect(); var cs=getComputedStyle(h); return (b.height>0 && cs.visibility!=='hidden' && cs.display!=='none' && +cs.opacity>0.05)?'visible':'hidden'; })(),
      logoVisible: (function(){ var l=document.querySelector('n1-header .n1h-logo'); if(!l) return 'none'; var r=l.getBoundingClientRect(); return (r.width>0&&r.height>0&&r.bottom>0)?'visible':'hidden'; })(),
      menuBtn: (function(){ var l=document.querySelector('n1-header .n1h-burger, n1-header [aria-controls], n1-header button'); if(!l) return 'none'; var r=l.getBoundingClientRect(); return (r.width>0&&r.height>0&&r.bottom>0)?'visible':'hidden'; })()
    };
  };
})();
