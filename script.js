!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K7635FHZ');

gsap.registerPlugin(ScrollTrigger,CustomEase,SplitText,InertiaPlugin,Draggable);

(function() {
  function removeCookieScript() {
    const selectors = [
      '[id*="cookie"]',
      '[class*="cookie"]',
      '[id*="CookieScript"]',
      '[class*="CookieScript"]',
      '[id*="cookiescript"]',
      '[class*="cookiescript"]',
      '.cookiescriptlogo',
      'path.cookiescriptlogo',
      '[data-cookie]',
      '[data-cookiescript]'
    ];
    
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      } catch(e) {}
    });
  }
  
  function blockCookieScriptScripts() {
    const scripts = document.querySelectorAll('script[src*="cookie"], script[src*="CookieScript"], script[src*="cookiescript"]');
    scripts.forEach(script => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      removeCookieScript();
      blockCookieScriptScripts();
    });
  } else {
    removeCookieScript();
    blockCookieScriptScripts();
  }
  
  const observer = new MutationObserver(function(mutations) {
    removeCookieScript();
    blockCookieScriptScripts();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  setInterval(function() {
    removeCookieScript();
    blockCookieScriptScripts();
  }, 1000);
})();

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('wf-form-Access-Form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = form.querySelector('[name="First-Name"]').value;
      const email = form.querySelector('[name="email"]').value;
      const phone = form.querySelector('[name="Phone"]').value || 'Not provided';
      
      const subject = encodeURIComponent('Kabaka Plaza Early Access Request');
      const body = encodeURIComponent(
        'First Name: ' + firstName + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone
      );
      
      const mailtoLink = 'mailto:agyarefredrick22@gmail.com?subject=' + subject + '&body=' + body;
      window.location.href = mailtoLink;
      
      const successNotification = form.parentElement.querySelector('.w-form-done');
      if (successNotification) {
        setTimeout(function() {
          successNotification.style.display = 'flex';
        }, 100);
      }
    });
  }
});
