// elements
const loadingImage = document.querySelector(".loading-img");
const photosListContainer = document.getElementById("image-list-container");
const pagination = document.querySelector(".pagination");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const notFoundImage = document.querySelector(".not-found-img");
const pageButtons = document.querySelectorAll(".page-btn");

let currentPage = 1;
let lastUrl = null;
// api data
const API_KEY = "DsVjhqaA3DXLZWjYgRTv0YRxQlulmZoUY7AU3UVi1Q0";
const API_URL = `https://api.unsplash.com/photos?page=${currentPage}&client_id=${API_KEY}`;
const API_SEARCH = `https://api.unsplash.com/search/photos?page=${currentPage}&client_id=${API_KEY}&query=`;
// get data from api
const getPhotos = async (url) => {
  lastUrl = url;
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
    pagination.style.display = "none";
  }
};
// search photos from api
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = searchInput.value;
  if (inputValue) {
    photosListContainer.innerHTML = "";
    notFoundImage.style.display = "none";
    loadingImage.style.display = "block";
    pagination.style.display = "none";
    // remove active class
    pageButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector("[data-page='1']").classList.add("active");
    searchInput.value = "";
    getPhotos(API_SEARCH + inputValue);
  }
});

pageButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    // remove active class
    pageButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    // add active class when click btn
    btn.classList.add("active");
    // get page and call api
    const buttonPage = btn.dataset.page;
    callPage(buttonPage);
  });
});
//
const callPage = (page) => {
  const urlSplit = lastUrl.split("?");
  const searchParams = new URLSearchParams(urlSplit[1]);
  searchParams.set("page", page);
  const url = urlSplit[0] + "?" + searchParams.toString();
  getPhotos(url);
};
// initial call api
getPhotos(API_URL);
