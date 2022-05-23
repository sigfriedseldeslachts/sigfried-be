const loadCommento = (commentoUrl, pageId) => {
  console.log(!window.commento);

  if (typeof window !== 'undefined' && !window.commento) {
    // Init empty object so commento.js script extends this with global functions
    window.commento = {};
    const script = document.createElement('script');

    script.src = commentoUrl;
    script.defer = true;

    // Set default attributes for first load
    script.setAttribute('data-auto-init', false);
    script.setAttribute('data-page-id', pageId);
    script.setAttribute('data-id-root', 'commento-box');
    script.onload = () => {
      // Tell commento.js to load the widget
      window.commento.main();
    }

    document.getElementsByTagName('head')[0].appendChild(script);
  } else if (typeof window !== 'undefined' && window.commento) {
    // In-case the commento.js script has already been loaded reInit the widget with a new pageId
    window.commento.reInit({
      pageId: pageId,
    });
  }
}

export {
  loadCommento,
}
