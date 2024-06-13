document.addEventListener("DOMContentLoaded", async () => {
  const api_key = "5hU0XqEfx7nLVPHoEnbwz6KddzvTfau8hb9BbHQUs0aqexIKshFEPglt";
  const urlParams = new URLSearchParams(window.location.search);
  const photoId = urlParams.get("photoId");

  if (photoId) {
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
      const photo = await response.json();
      document.getElementById("image-details").innerHTML = `
      <h1>${photo.photographer}</h1>
      <img src="${photo.src.large}" alt="${photo.alt}" />
      <p>${photo.alt}</p>
      <p>Photographer: ${photo.photographer}</p>
      <p>URL: <a href="${photo.url}" target="_blank">${photo.url}</a></p>
    `;
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  }
});
