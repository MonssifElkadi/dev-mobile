const apiUrl = "https://dog.ceo/api/breeds/list/all";
const breedsSelect = document.getElementById("breeds");
const searchInput = document.getElementById("search");
const imagesEl = document.getElementById("images");

let allBreeds = [];

function renderBreeds(list) {
  breedsSelect.innerHTML = "";
  list.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    breedsSelect.appendChild(option);
  });
}

async function loadBreeds() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  allBreeds = Object.keys(data.message);
  renderBreeds(allBreeds);
}

async function loadImages(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await response.json();
  imagesEl.innerHTML = "";
  data.message.slice(0, 24).forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = breed;
    imagesEl.appendChild(img);
  });
}

breedsSelect.addEventListener("change", () => {
  const breed = breedsSelect.value;
  if (breed) {
    loadImages(breed);
  }
});

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = allBreeds.filter((b) => b.toLowerCase().includes(q));
  renderBreeds(filtered);
});

loadBreeds();
