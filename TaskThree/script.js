// Ваш API-ключ от Unsplash
const apiKey = "ik8xOCcSdgtWtWJ9iaFuhJWV3Dob6gW5nrfOAC-Utmk";
const photoElement = document.getElementById("photo");
const photographerElement = document.getElementById("photographer");
const likeBtn = document.getElementById("likeBtn");
const likeCountElement = document.getElementById("likeCount");

// Считывание количества лайков из локального хранилища
let likeCount = localStorage.getItem("likeCount")
  ? parseInt(localStorage.getItem("likeCount"))
  : 0;
likeCountElement.textContent = `Лайков: ${likeCount}`;

// Функция для получения случайного изображения с Unsplash
function fetchRandomPhoto() {
  fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const photo = data[0];
      photoElement.src = photo.urls.regular;
      photographerElement.textContent = `Фото: ${photo.user.name} (@${photo.user.username})`;
    })
    .catch((error) => console.error("Ошибка при получении данных:", error));
}

// Функция для увеличения лайков
function incrementLikes() {
  likeCount++;
  likeCountElement.textContent = `Лайков: ${likeCount}`;
  localStorage.setItem("likeCount", likeCount); // Сохранение лайков в локальном хранилище
}

// Обработчик клика на кнопку "Лайк"
likeBtn.addEventListener("click", incrementLikes);

// Загрузка случайного изображения при загрузке страницы
window.onload = fetchRandomPhoto;
