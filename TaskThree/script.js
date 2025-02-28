const photoElement = document.getElementById("photo");
const photographerElement = document.getElementById("photographer");
const likeBtn = document.getElementById("likeBtn");
const likeCountElement = document.getElementById("likeCount");
const historyBtn = document.getElementById("historyBtn");
const historyListElement = document.getElementById("historyList");

// Считывание количества лайков из локального хранилища
let likeCount = localStorage.getItem("likeCount")
  ? parseInt(localStorage.getItem("likeCount"))
  : 0;
likeCountElement.textContent = `Лайков: ${likeCount}`;

// Считывание истории просмотров из локального хранилища
let photoHistory = JSON.parse(localStorage.getItem("photoHistory")) || [];
updateHistoryList();

//  случайноге изображения с Lorem Picsum
function fetchRandomPhoto() {
  // Получаем случайное изображение с Lorem Picsum
  const photoId = Math.floor(Math.random() * 1000); // Генерация случайного ID фото
  const photoUrl = `https://picsum.photos/800/600?image=${photoId}`;

  // Придуманное имя фотографа (потому что они не прдосавляют данные Lorem Picsum )
  const photographerName = `Фотограф ${photoId}`;
  const photographerUsername = `username_${photoId}`;

  // Отображаем фото
  photoElement.src = photoUrl;
  // придуманное имя фотографа()
  photographerElement.textContent = `Фото: ${photographerName} (@${photographerUsername})`;

  // Добавляем фото в историю, если оно новое
  const newPhoto = {
    id: photoId,
    url: photoUrl,
    photographer: photographerName,
    photographerUsername: photographerUsername,
  };

  // Добвляем фото в историю, если оно еще не было добавлено
  if (!photoHistory.some((item) => item.id === newPhoto.id)) {
    photoHistory.unshift(newPhoto); 
    if (photoHistory.length > 5) {
      photoHistory.pop(); 
    }
    localStorage.setItem("photoHistory", JSON.stringify(photoHistory));
    updateHistoryList(); 
  }
}

// Функция для увеличения лайков
function incrementLikes() {
  likeCount++;
  likeCountElement.textContent = `Лайков: ${likeCount}`;
  localStorage.setItem("likeCount", likeCount); // Сохраняем лайки в локальное хранилище
}

// Обработчик клика на кнопку "Лайк"
likeBtn.addEventListener("click", incrementLikes);

// Функция для отображения истории
function updateHistoryList() {
  historyListElement.innerHTML = "";
  photoHistory.forEach((photo) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<img src="${photo.url}" alt="Фото" style="width: 100px; height: auto; border-radius: 5px; margin-right: 10px;">
                          <strong>${photo.photographer}</strong> (@${photo.photographerUsername})`;
    historyListElement.appendChild(listItem);
  });
}

// Обработчик клика на кнопку "Посмотреть фото дня"
historyBtn.addEventListener("click", () => {
  if (photoHistory.length > 0) {
    alert("Просмотр истории фото дня!");
    
  } else {
    alert("История пуста!");
  }
});

// Загрузка случайного изображения при загрузке страницы
window.onload = fetchRandomPhoto;
