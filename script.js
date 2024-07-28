"use strict";

// elements
const imgContainer = document.querySelector(".img__container");

// API INFO
const API_KEY = "r1uMKxYiqNEGfyZi-oIsmvnagn8DJ-khpGo1h2OagOs";
const COUNT = 30;
const API_URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${COUNT}`;

// Init values
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const imageLoaded = function () {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
  }
};

const setAttributes = function (element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(`${key}`, value);
  }
};

const createImages = function () {
  totalImages = photosArray.length;
  console.log(totalImages);
  photosArray.forEach((photo) => {
    const anchor = document.createElement("a");
    setAttributes(anchor, {
      href: `${photo.links.html}`,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: `${photo.urls.regular}`,
      title: `${photo.alt_description}`,
      alt: `${photo.alt_description}`,
      class: `img__content`,
    });

    img.addEventListener("load", imageLoaded);
    anchor.appendChild(img);
    imgContainer.appendChild(anchor);
  });
};

const getImages = async function () {
  const res = await fetch(API_URL);
  photosArray = await res.json();
  console.log(photosArray);

  createImages();
};

getImages();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 1000 &&
    ready
  ) {
    console.log(
      window.innerHeight + window.pageYOffset,
      document.body.offsetHeight
    );
    ready = false;
    imagesLoaded = 0;

    getImages();
  }
});
