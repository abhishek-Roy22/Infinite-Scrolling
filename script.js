const container = document.querySelector('.container');

async function loadImages(numImages = 9) {
  for (let i = 0; i < numImages; i++) {
    try {
      const res = await fetch('<https://dog.ceo/api/breeds/image/random>');
      const data = await res.json();
      const image = document.createElement('img');
      image.src = data.message;
      container.appendChild(image);
    } catch (error) {
      console.log(error);
    }
  }
}

loadImages();

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= container.scrollHeight) {
    console.log('Loading more images');
    loadImages();
  }
};

window.addEventListener('scroll', handleScroll);
