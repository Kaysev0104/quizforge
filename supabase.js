// Supabase client — loaded after config.js
// Uses the CDN version of supabase-js v2

(function(){
  // Inject the supabase-js CDN script synchronously-ish
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  s.async = false;
  document.head.appendChild(s);
})();

// We create the client after the script loads via a small helper
// called in each page after supabase-js is ready
function createClient(){
  if(typeof supabaseJs !== 'undefined'){
    window.supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON);
  } else if(typeof window.supabase === 'undefined'){
    // retry until loaded
    setTimeout(createClient, 50);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  function init(){
    if(typeof window.supabase !== 'undefined') return; // already set
    if(typeof supabaseJs !== 'undefined'){
      window.supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON);
    } else {
      setTimeout(init, 60);
    }
  }
  init();
});
