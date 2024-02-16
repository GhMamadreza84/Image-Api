// elements
const loadingImage = document.querySelector(".loading-img");
const photosListContainer = document.getElementById("image-list-container");
// api data
const API_KEY = "DsVjhqaA3DXLZWjYgRTv0YRxQlulmZoUY7AU3UVi1Q0";
const API_URL = `https://api.unsplash.com/photos?page=1&client_id=${API_KEY}`;

// get data from api
const getPhotos = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    loadingImage.style.display = "none";
    
    showPhotos(data);
  } catch (error) {
    photosListContainer.innerHTML = `<h2 class="error-message">${error.message}</h2>`;
    loadingImage.style.display = "none";
  }
};
// show photos in DOM
const showPhotos = (photos) => {
  photosListContainer.innerHTML = "";
  photos.forEach(photo=>{
    const {urls} = photo;

    const image = `
      <div class="image-item">
        <img 
          src=${urls.regular}
          alt="image"
          class="image"
        />
      </div>
    `
    photosListContainer.innerHTML += image;
  })
};

// initial call api
getPhotos(API_URL);
