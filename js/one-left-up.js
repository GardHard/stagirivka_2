// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {

    // --- КНОПКА "НОВОСТРОЙКИ" ---

    // Находим кнопку "Новостройки" по её классу
    const myButton = document.querySelector('.one-buttom-left');

    // Добавляем обработчик события 'click'
    myButton.addEventListener('click', function() {
      // Открываем новую вкладку с указанным URL
      // Замените 'https://www.novostroyki-real-site.com/' на нужный адрес
      window.open('https://www.novostroyki-real-site.com/', '_blank');
    });

    // (Опционально) Обработчик для Enter или Space, если элемент в фокусе
    myButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Предотвращаем прокрутку при Space
            // Открываем новую вкладку при нажатии Enter или Space
            window.open('https://www.novostroyki-real-site.com/', '_blank');
        }
    });

    // --- КНОПКА "ИПОТЕКА" ---

    // Находим кнопку "Ипотека" по её классу
    const myRightButton = document.querySelector('.one-buttom-right');

    // Добавляем обработчик события 'click' для второй кнопки
    myRightButton.addEventListener('click', function() {
      // Открываем новую вкладку с указанным URL для второй кнопки
      // Замените 'https://www.ipoteka-real-site.com/' на нужный адрес
      window.open('https://www.ipoteka-real-site.com/', '_blank');
    });

    // (Опционально) Обработчик для Enter или Space для второй кнопки, если элемент в фокусе
    myRightButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Предотвращаем прокрутку при Space
            // Открываем новую вкладку при нажатии Enter или Space для второй кнопки
            window.open('https://www.ipoteka-real-site.com/', '_blank');
        }
    });

    // --- КНОПКА "ПОДРОБНЕЕ" ---

    // Находим кнопку "Подробнее" по её классу
    const myBottomButton = document.querySelector('.one-buttom-bottom-left');

    // Добавляем обработчик события 'click' для кнопки "Подробнее"
    myBottomButton.addEventListener('click', function() {
      // Открываем новую вкладку с указанным URL для кнопки "Подробнее"
      // Замените 'https://www.podrobnee-real-site.com/' на нужный адрес
      window.open('https://www.podrobnee-real-site.com/', '_blank');
    });

    // (Опционально) Обработчик для Enter или Space для кнопки "Подробнее", если элемент в фокусе
    myBottomButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Предотвращаем прокрутку при Space
            // Открываем новую вкладку при нажатии Enter или Space для кнопки "Подробнее"
            window.open('https://www.podrobnee-real-site.com/', '_blank');
        }
    });

    // --- КОНЕЦ КОДА ДЛЯ КНОПОК ---
});