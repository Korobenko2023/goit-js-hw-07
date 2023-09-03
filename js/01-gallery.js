import { galleryItems } from './gallery-items.js';
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
    
    instance = basicLightbox.create(
      `
      <div class="modal">
        <img src="${event.target.dataset.source}" alt="${event.target.alt}" />
      </div>
      `,
      {
        onShow: () => {
         window.addEventListener('keydown', handleKeyPress);
        },
        
        onClose: () => {
          window.removeEventListener('keydown', handleKeyPress);
        },
      }
    );
  
    instance.show();
  }
  
    function handleKeyPress(event) {
    if (event.key === 'Escape') {
      instance.close();
    }
   }

