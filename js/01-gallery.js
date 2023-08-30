import { galleryItems } from './gallery-items.js';
// Change code below this line
  const container = document.querySelector('.gallery');
  const markup = createMarkup(galleryItems)
  
  container.insertAdjacentHTML('beforeend', markup);
  container.addEventListener('click', handleGalleryItemsClick);
  let instance = null;

    function createMarkup (arr) {
    return arr.map(({ original, preview, description }) => {
      return `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
      </li>`
    }).join('');
  };

  function handleGalleryItemsClick (event) {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      return;
    }

    const targetElement = event.target.closest('.gallery__image')
    const largeImage = targetElement.dataset.source;

    instance = basicLightbox.create(`
    <div class="modal">
    <img src="${largeImage}" alt="" />
    </div>
   `);

   instance.show();

   window.addEventListener('keydown', handleKeyPress);
   }

   function handleKeyPress(event) {
    if (event.key === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', handleKeyPress);
    }
   }