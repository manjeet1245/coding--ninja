const galleryContainer = document.querySelector('.image-container');

const images = [];
let currentImageIndex = 0;

fetch(`https://picsum.photos/v2/list?limit=100`)
  .then(response => response.json())
  .then(data => {
     
    data.forEach((image, index) => {
        images.push(image.download_url);
        
      const imgElement = document.createElement('img');
      imgElement.setAttribute('loading', 'lazy')
      const url = image.download_url
      imgElement.src =url;
      imgElement.addEventListener('click', () => showImage(index));
      galleryContainer.appendChild(imgElement);
    });
  })
  .catch(error => console.log(error));


  function showImage(index) {
    const enlargedImage = document.createElement('img');
    enlargedImage.src = images[index];
    enlargedImage.classList.add('enlarged');
    document.body.appendChild(enlargedImage);
    currentImageIndex = index;
  
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Next';
    prevButton.classList.add('prev-button');
    prevButton.addEventListener('click', () => showNextImage());
    document.body.appendChild(prevButton);
  
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Prev';
    nextButton.classList.add('next-button');
    nextButton.addEventListener('click', () => showPrevImage());
    document.body.appendChild(nextButton);

    const crossButton = document.createElement('button');
    crossButton.innerHTML = '&times;'
    crossButton.classList.add('cross-btn');
    crossButton.addEventListener('click', () => {
      nextButton.remove()
      prevButton.remove()
      enlargedImage.remove()
      crossButton.remove()
    })
    document.body.appendChild(crossButton)
  }
  
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const enlargedImage = document.querySelector('.enlarged');
    enlargedImage.src = images[currentImageIndex];
  }
  
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const enlargedImage = document.querySelector('.enlarged');
    enlargedImage.src = images[currentImageIndex];
  }
  
