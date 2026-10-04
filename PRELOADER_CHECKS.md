# Preloader checks

Run the site through a local HTTP server. Repeat these checks on the published site.
Save screenshots of the loading screen and the opened page.

1. Open the page with an empty cache. Confirm that the loader covers the page before the hero appears.
2. Delay the animation script by six seconds. Confirm that the loader stays visible. Confirm that the page opens after setup finishes.
3. Open the page again with a warm cache. Confirm that it opens without a long artificial wait.
4. Block the animation script. Confirm that the loader releases the page within eleven seconds. Confirm that scrolling works.
5. Block a hero image or video. Confirm that a failed resource does not trap the visitor.
6. Open the page at widths of 320, 768, 1024, and 1440 pixels. Confirm that the loader covers the viewport and the logo fits.
7. Enable reduced motion. Confirm that the loader does not move and the page opens without a fade.
8. Disable JavaScript. Confirm that the loader is absent and the page remains readable.
9. Press Tab during loading. Confirm that covered links cannot receive focus. After loading, confirm that links work.
10. Navigate away, then go back. Confirm that the page stays usable and the loader does not return.

The loader must not depend on analytics, embeds, below-the-fold images, or a complete video download.
