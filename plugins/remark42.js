const loadRemark42Script = () => {
  // Do not run on server-side
  if (process.server) return;

  // Check if the script is already loaded
  if (document.getElementById('remark42-script')) return;

  // If remark42 is not loaded, load it
  const remark42 = document.createElement('script');
  remark42.src = '/remark42.js';
  remark42.async = true;
  remark42.id = 'remark42-script';

  document.head.appendChild(remark42);
};

const setRemark42Config = (host, site_id, page_title) => {
  // Do not run on server-side
  if (process.server) return;

  // Set remark42 config
  window.remark_config = {
    host,
    site_id,
    page_title,
    components: ['embed', 'last-comments'],
    max_shown_comments: 100,
    theme: 'dark',
    locale: 'en',
    show_email_subscription: false,
    simple_view: true
  }
};

const bootRemark42 = (host, site_id, page_title) => {
  // Do not run on server-side
  if (process.server) return;

  // Set remark42 config
  setRemark42Config(host, site_id, page_title);

  const remark42 = window.REMARK42;

  // Check if remark42 is loaded
  if (remark42) {
    remark42.createInstance(window.remark_config);
  } else {
    // Load remark42 script
    loadRemark42Script();
  }
};

export {
  loadRemark42Script,
  setRemark42Config,
  bootRemark42
}
