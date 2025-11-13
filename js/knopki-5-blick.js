// --- КНОПКИ ---

// Находим кнопки по их классам
const companyLifeButton = document.querySelector('.five-center-text-butten');
const announcementsButton = document.querySelector('.five-center-text-butten-two');
const newAnnouncementsButton = document.querySelector('.five-right-text-butten-two');

// --- ФУНКЦИИ ОБРАБОТЧИКОВ ---

// Функция для открытия URL в новой вкладке
function openInNewTab(url) {
  window.open(url, '_blank');
}

// --- ОБРАБОТЧИКИ ДЛЯ КНОПКИ "ЖИЗНЬ КОМПАНИИ" ---
if (companyLifeButton) { // Проверяем, существует ли элемент
    companyLifeButton.addEventListener('click', function() {
      // Открываем новую вкладку с указанным URL для кнопки "Жизнь компании"
      // Замените 'https://www.life-of-company-example.com/' на нужный адрес
      openInNewTab('https://www.life-of-company-example.com/');
    });

    // (Опционально) Обработчик для Enter или Space для кнопки "Жизнь компании", если элемент в фокусе
    companyLifeButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Предотвращаем прокрутку при Space
            // Открываем новую вкладку при нажатии Enter или Space для кнопки "Жизнь компании"
            openInNewTab('https://www.life-of-company-example.com/');
        }
    });
} else {
     console.warn("Кнопка .five-center-text-butten не найдена в DOM.");
}

// --- ОБРАБОТЧИКИ ДЛЯ КНОПКИ "АНОНСЫ" ---
if (announcementsButton) { // Проверяем, существует ли элемент
    announcementsButton.addEventListener('click', function() {
      // Открываем новую вкладку с указанным URL для кнопки "Анонсы"
      // Замените 'https://www.announcements-example.com/' на нужный адрес
      openInNewTab('https://www.announcements-example.com/');
    });

    // (Опционально) Обработчик для Enter или Space для кнопки "Анонсы", если элемент в фокусе
    announcementsButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Предотвращаем прокрутку при Space
            // Открываем новую вкладку при нажатии Enter или Space для кнопки "Анонсы"
            openInNewTab('https://www.announcements-example.com/');
        }
    });
} else {
     console.warn("Кнопка .five-center-text-butten-two не найдена в DOM.");
}

// --- ОБРАБОТЧИКИ ДЛЯ КНОПКИ "АНОНСЫ (НОВАЯ)" ---
if (newAnnouncementsButton) { // Проверяем, существует ли элемент
    newAnnouncementsButton.addEventListener('click', function() {
      // Открываем новую вкладку с указанным URL для новой кнопки "Анонсы"
      // Замените 'https://www.new-announcements-example.com/' на нужный адрес
      openInNewTab('https://www.new-announcements-example.com/');
    });

    // (Опционально) Обработчик для Enter или Space для новой кнопки "Анонсы", если элемент в фокусе
    newAnnouncementsButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Предотвращаем прокрутку при Space
            // Открываем новую вкладку при нажатии Enter или Space для новой кнопки "Анонсы"
            openInNewTab('https://www.new-announcements-example.com/');
        }
    });
} else {
     console.warn("Кнопка .five-right-text-butten-two не найдена в DOM.");
}

// --- НОВЫЙ КОД ДЛЯ .five-bottom-butten ---

// Находим кнопку "Смотреть все" по её классу
const viewAllButton = document.querySelector('.five-bottom-butten');

// Добавляем обработчик события 'click' для кнопки "Смотреть все"
if (viewAllButton) { // Проверяем, существует ли элемент
    viewAllButton.addEventListener('click', function() {
      // Открываем новую вкладку с указанным URL для кнопки "Смотреть все"
      // Замените 'https://www.view-all-example.com/' на нужный адрес
      window.open('https://www.view-all-example.com/', '_blank');
    });

    // (Опционально) Обработчик для Enter или Space для кнопки "Смотреть все", если элемент в фокусе
    viewAllButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Предотвращаем прокрутку при Space
            // Открываем новую вкладку при нажатии Enter или Space для кнопки "Смотреть все"
            window.open('https://www.view-all-example.com/', '_blank');
        }
    });
} else {
     console.warn("Кнопка .five-bottom-butten не найдена в DOM.");
}

// --- КОНЕЦ НОВОГО КОДА ---