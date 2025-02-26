// Данные о занятиях
const classes = [
  {
    name: "Йога",
    time: "10:00 - 11:00",
    maxParticipants: 20,
    currentParticipants: 15,
  },
  {
    name: "Пилатес",
    time: "12:00 - 13:00",
    maxParticipants: 15,
    currentParticipants: 10,
  },
  {
    name: "Танцы",
    time: "15:00 - 16:00",
    maxParticipants: 25,
    currentParticipants: 20,
  },
];

// Функция для отображения расписания
function displayClasses() {
  const scheduleDiv = document.getElementById("schedule");
  scheduleDiv.innerHTML = ""; // Очищаем предыдущее расписание

  classes.forEach((classItem, index) => {
    const classDiv = document.createElement("div");
    classDiv.classList.add("card", "mb-3");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const className = document.createElement("h5");
    className.classList.add("card-title");
    className.innerText = classItem.name;

    const classTime = document.createElement("p");
    classTime.classList.add("card-text");
    classTime.innerText = `Время: ${classItem.time}`;

    const classDetails = document.createElement("p");
    classDetails.classList.add("card-text");
    classDetails.innerText = `Записано: ${classItem.currentParticipants} из ${classItem.maxParticipants}`;

    // Кнопка для записи
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("d-flex", "justify-content-between");

    const signUpButton = document.createElement("button");
    signUpButton.classList.add("btn", "btn-primary");
    signUpButton.innerText = "Записаться";
    signUpButton.disabled =
      classItem.currentParticipants >= classItem.maxParticipants;

    signUpButton.addEventListener("click", () => {
      if (classItem.currentParticipants < classItem.maxParticipants) {
        classItem.currentParticipants++;
        displayClasses();
      }
    });

    // Кнопка для отмены записи
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-danger");
    cancelButton.innerText = "Отменить запись";
    cancelButton.disabled = classItem.currentParticipants === 0;

    cancelButton.addEventListener("click", () => {
      if (classItem.currentParticipants > 0) {
        classItem.currentParticipants--;
        displayClasses();
      }
    });

    buttonDiv.appendChild(signUpButton);
    buttonDiv.appendChild(cancelButton);

    cardBody.appendChild(className);
    cardBody.appendChild(classTime);
    cardBody.appendChild(classDetails);
    cardBody.appendChild(buttonDiv);

    classDiv.appendChild(cardBody);
    scheduleDiv.appendChild(classDiv);
  });
}

// Отображаем расписание на странице при загрузке
window.onload = displayClasses;
