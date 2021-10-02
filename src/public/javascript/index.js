function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    }
    script.onerror = () => {
      reject();
    }
    document.body.appendChild(script);
  });
}

async function loadInitizationScripts() {
  // Base utils
  await loadScript('/javascript/utils.js');
  // Api requests utils
  await loadScript('/javascript/network.js');
  // View manager
  await loadScript('/javascript/views_manager.js');
}

async function setup() {
  console.time('load scripts setup');
  await loadInitizationScripts();
  await Promise.all([
    loadScript('/javascript/components/login_form.js'),
    loadScript('/javascript/components/new_property_form.js'),
    loadScript('/javascript/components/property_listing.js'),
    loadScript('/javascript/components/property_listings.js'),
    loadScript('/javascript/components/search_form.js'),
    loadScript('/javascript/components/signup_form.js'),
  ]);
  await loadScript('/javascript/components/header.js'),
  console.timeEnd('load scripts setup');
}

$(() => {
  setup()
    .then(() => {
      const page = getUrlParams().page;
      return getAllListings(`page=${page}`)
    })
    .then(function( json ) {
      propertyListings.addProperties(json.data, json.pagination);
      views_manager.show('listings');
    });
});
