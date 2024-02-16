// elements
const loadingImage = document.querySelector(".loading-img");
const photosListContainer = document.getElementById("image-list-container");
const pagination = document.querySelector(".pagination");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const notFoundImage = document.querySelector(".not-found-img");
// api data
const API_KEY = "DsVjhqaA3DXLZWjYgRTv0YRxQlulmZoUY7AU3UVi1Q0";
const API_URL = `https://api.unsplash.com/photos?page=2&client_id=${API_KEY}`;
const API_SEARCH = `https://api.unsplash.com/search/photos?page=1&client_id=${API_KEY}&query=`;
// get data from api
const getPhotos = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    pagination.style.display = "flex";
    loadingImage.style.display = "none";
    notFoundImage.style.display = "none";
    if (data.results) {
      showPhotos(data.results);
    } else {
      showPhotos(data);
    }
  } catch (error) {
    photosListContainer.innerHTML = `<h2 class="error-message">${error.message}</h2>`;
    loadingImage.style.display = "none";
  }
};
// show photos in DOM
const showPhotos = (photos) => {
  photosListContainer.innerHTML = "";
  if (photos.length) {
    photos.forEach((photo) => {
      const { urls } = photo;

      const image = `
        <div class="image-item">
          <img 
            src=${urls.regular}
            alt="image"
            class="image"
          />
        </div>
      `;
      photosListContainer.innerHTML += image;
    });
  } else {
    notFoundImage.style.display = "block";
  }
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = searchInput.value;
  if (inputValue) {
    photosListContainer.innerHTML = "";
    notFoundImage.style.display = "none";
    loadingImage.style.display = "block";
    searchInput.value = "";
    getPhotos(API_SEARCH + inputValue);
  }
});
// initial call api
getPhotos(API_URL);
