const container = document.querySelector('.container');

const loadingSpinner = () => {
  const loadingDiv = document.createElement('img');
  loadingDiv.className = 'loading';
  loadingDiv.src = 'https://i.gifer.com/7plQ.gif';
  container.append(loadingDiv);
};

async function loadImages(numImages = 9) {
  for (let i = 0; i < numImages; i++) {
    try {
      // Show loading spinner before fetching
      loadingSpinner();

      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      // Remove loading spinner after fetching
      document.querySelector('.loading').remove();

      const image = document.createElement('img');
      image.loading = 'lazy';
      image.src = data.message;
      container.appendChild(image);
    } catch (error) {
      console.log(error);
    }
  }
}

loadImages();

const throttle = (callback, limit) => {
  let lastFun;
  let lastRan;
  return function () {
    const args = arguments;
    if (!lastRan) {
      callback(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFun);
      lastFun = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          callback(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= container.scrollHeight) {
    console.log('Loading more images');
    loadImages();
  }
};

window.addEventListener('scroll', throttle(handleScroll, 2000));
