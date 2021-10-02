$(() => {
  const zipSpace = (str) => str.replace(/ /g, '');
  const $propertyListings = $(`
  <section class="property-listings" id="property-listings">
      <p>Loading...</p>
    </section>
  `);
  window.$propertyListings = $propertyListings;

  window.propertyListings = {};

  function renderPaginationView(pagination) {
    $propertyListings.append(`
      <div>
        <h1> Results</h1>
        <h5>Total: ${pagination.total} / Page: ${pagination.page} </h3>
      </div>
    `)
  }

  function renderPaginatedLinks(pagination, options) {
    const pageNumber = getUrlParams(new URL(window.location.href)).page;
    const totalPageSize = pagination.totalPageSize;
    const entriesPerPage = 10;
    const nextPageNumber = pageNumber + entriesPerPage;

    const link = (props) => (`
      <a
        class="property-listing__pagination_links ${props.skipButton ? ' skip-button' : ''}"
        href="/?page=${props.page}">
        ${props.text || props.page}
      </a>
    `);

    const nextButton = () => {
      if ((nextPageNumber + entriesPerPage) < totalPageSize) {
        return `
            ...
            ${link({ page: nextPageNumber + 10, skipButton: true, text: '>>' })}
          `;
      }
      return '';
    }

    const prevButton = () => {
      if (pageNumber === 1) return '';
      // Continue to render back button while we are beyond page 2
      if ((pageNumber - entriesPerPage) > entriesPerPage) {
        return `
            ${link({ page: pageNumber - 10, skipButton: true, text: '<<' })}
            <span style="padding-right:1em;">
              ...
            </span>
          `;
      } else {
        return link({ page: 1, text: '<<' });
      }
      return '';
    }

    const handleLinkClick = (e) => {
      e.preventDefault();
      const nextUrl = new URL(e.target.href);

      // Update url
      historyPush(`/?${getSearchParams(nextUrl)}`);

      // Fetch new records
      getAllListings(getSearchParams(nextUrl))
        .then(function(json) {
          propertyListings.addProperties(json.data, json.pagination);
          views_manager.show('listings');
        })
        .catch(error => console.error(error));
    }

    if (pageNumber && nextPageNumber) {
      const targetPage = (nextPageNumber <= totalPageSize) ? nextPageNumber : totalPageSize;

      let links = '';
      // Render next
      for (let i = pageNumber; i <= targetPage; i++) {
        links += link({ page: i });
      }

      $propertyListings.append(
        (`
          <div class="property-listing__pagination_container">
            ${prevButton()}
            ${links}
            ${nextButton()}
          </div>
        `)
      ).ready(() => {
        $('.property-listing__pagination_links').on('click', handleLinkClick);
      });
    }
  }

  function addListing(listing) {
    $propertyListings.append(listing);
  }

  function clearListings() {
    $propertyListings.empty();
  }
  window.propertyListings.clearListings = clearListings;

  function addProperties(properties, pagination, isReservation = false) {
    clearListings();
    if (pagination) {
      renderPaginationView(pagination);
    }
    renderPaginatedLinks(pagination);
    for (const propertyId in properties) {
      const property = properties[propertyId];
      const listing = propertyListing.createListing(property, isReservation);
      addListing(listing);
    }
  }
  window.propertyListings.addProperties = addProperties;
});
