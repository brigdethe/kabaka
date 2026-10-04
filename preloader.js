(() => {
  const root = document.documentElement;
  let finished = false;
  let release;
  let setupComplete;
  const ready = new Promise(resolve => { release = resolve; });
  const setup = new Promise(resolve => { setupComplete = resolve; });

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(deadline);
    root.classList.remove('kabaka-loading');
    const loader = document.querySelector('.kabaka-loader');
    const page = document.querySelector('.page-wrapper');
    page?.removeAttribute('aria-busy');
    if (page) page.inert = false;
    loader?.setAttribute('aria-hidden', 'true');
    release();
    window.lenis?.start();
    window.ScrollTrigger?.refresh();
    setTimeout(() => loader?.remove(), 350);
  }

  // Start before styles and page scripts; failed dependencies cannot hold the page forever.
  const deadline = setTimeout(finish, 10000);
  root.classList.add('kabaka-loading');
  window.kabakaPreloader = { ready, setupComplete };

  function imageReady(image) {
    image.loading = 'eager';
    if (image.decode) return image.decode().catch(() => {});
    if (image.complete) return Promise.resolve();
    return new Promise(resolve => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });
  }

  function videoReady(video) {
    if (video.readyState >= 2 || video.error) return Promise.resolve();
    return new Promise(resolve => {
      video.addEventListener('loadeddata', resolve, { once: true });
      video.addEventListener('error', resolve, { once: true });
      // Mobile data-saving modes can suppress loadeddata. The poster can stand in.
      setTimeout(resolve, 3000);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (finished) {
      document.querySelector('.kabaka-loader')?.remove();
      return;
    }
    const page = document.querySelector('.page-wrapper');
    page.inert = true;
    page.setAttribute('aria-busy', 'true');
    const images = [...document.querySelectorAll('.kabaka-loader img, .header__logo, #cover img')];
    const videos = [...document.querySelectorAll('#cover video')];
    const posters = videos.filter(video => video.poster).map(video => {
      const poster = new Image();
      poster.src = video.poster;
      return imageReady(poster);
    });
    Promise.allSettled([
      setup, document.fonts?.ready,
      ...images.map(imageReady), ...videos.map(videoReady), ...posters
    ]).then(() => requestAnimationFrame(() => requestAnimationFrame(finish)));
  }, { once: true });

  window.addEventListener('pageshow', event => {
    if (event.persisted) finish();
  });
})();
