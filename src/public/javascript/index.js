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

async function setup() {
  console.time('load scripts setup');
  await loadScript('/javascript/network.js');
  await loadScript('/javascript/views_manager.js');
  await Promise.all([
    loadScript('/javascript/components/header.js'),
    loadScript('/javascript/components/login_form.js'),
    loadScript('/javascript/components/new_property_form.js'),
    loadScript('/javascript/components/property_listing.js'),
    loadScript('/javascript/components/property_listings.js'),
    loadScript('/javascript/components/search_form.js'),
    loadScript('/javascript/components/signup_form.js'),
  ]);
  console.timeEnd('load scripts setup');
}

$(() => {
  setup()
    .then(() => getAllListings())
    .then(function( json ) {
      propertyListings.addProperties(json.properties);
      views_manager.show('listings');
    });
});
