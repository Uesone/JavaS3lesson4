//variabili e dom manipulation

document.addEventListener("DOMContentLoaded", () => {
  const api_key = "5hU0XqEfx7nLVPHoEnbwz6KddzvTfau8hb9BbHQUs0aqexIKshFEPglt";
  const imageContainer = document.getElementById("image-container");
  const loadImagesButton = document.getElementById("load-images");
  const loadSecondaryImagesButton = document.getElementById(
    "load-secondary-images"
  );
  const searchButton = document.getElementById("button-search");
  const searchInput = document.getElementById("search-input");

  // richiesta api
  const fetchImages = async (query) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: api_key,
          },
        }
      );
      const data = await response.json();
      displayImages(data.photos);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // mostrare immagini
  const displayImages = (photos) => {
    imageContainer.innerHTML = "";
    photos.forEach((photo) => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${photo.photographer}</h5>
              <p class="card-text">${photo.alt}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary view-button" data-id="${photo.id}">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary hide-button">Hide</button>
                </div>
                <small class="text-muted">${photo.id}</small>
              </div>
            </div>
          </div>
        `;
      imageContainer.appendChild(col);
    });

    // e listernere "hide" and "view"
    document.querySelectorAll(".hide-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.target.closest(".col-md-4").remove();
      });
    });

    document.querySelectorAll(".view-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const photoId = e.target.getAttribute("data-id");
        window.location.href = `details.html?photoId=${photoId}`;
      });
    });
  };

  // visualizzare dettagli immagine tramite id
  const viewImage = async (photoId) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/photos/${photoId}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      const photo = await response.json();
      alert(`Photographer: ${photo.photographer}\nURL: ${photo.url}`);
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  };

  // e listener primo pulsante
  loadImagesButton.addEventListener("click", () => {
    fetchImages("cat");
  });

  // e listener per secondo pulsante
  loadSecondaryImagesButton.addEventListener("click", () => {
    fetchImages("kangaroos");
  });

  // Event listener per il pulsante "Search"
  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
      fetchImages(query);
    }
  });
});
