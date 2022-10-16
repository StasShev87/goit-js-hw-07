import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// Creating and rendering markup from the galleryItems data array and provided gallery item template.
const galleryItemsMarkup = galleryItems
  .map((item) => {
    return `
<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>`;
  })
  .join("");

const gallery = document.querySelector("div.gallery");
gallery.insertAdjacentHTML("beforeend", galleryItemsMarkup);

// Implementing delegation to div.gallery and getting the url of a large image.
gallery.addEventListener("click", (event) => {
  // Prevent open <a> link action
  event.preventDefault();

  // Get a large image url
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const largeImageUrl = event.target.dataset.source;

  // Open modal window with image
  const instance = basicLightbox.create(`
    <img src="${largeImageUrl}">
`);
  instance.show(() => {
    document.addEventListener("keydown", onKeyPressed);
  });

  function onKeyPressed(event) {
    if (event.code === "Escape") {
      instance.close(() => {
        document.removeEventListener("keydown", onKeyPressed);
      });
    }
  }
});

// Adding the script and styles of the modal window library basicLightbox. Use the jsdelivrCDN service and add links to minified (.min) library files to your project.
// Opening a modal window by clicking on a gallery item. To do this, check out the documentation and examples.
// Replacing the value of the src attribute of the <img> element in a modal window before opening. Use the ready-made modal window markup with the image from the examples of the basicLightbox library.
