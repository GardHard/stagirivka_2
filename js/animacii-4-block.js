// --- НОВЫЙ КОД ДЛЯ .foure-block-bottom-buttem ---

// Находим кнопку "Подробнее (четвёртая)" по её классу
const fourMoreButton = document.querySelector('.foure-block-bottom-buttem');

// Добавляем обработчик события 'click' для кнопки "Подробнее (четвёртая)"
if (fourMoreButton) { // Проверяем, существует ли элемент
    fourMoreButton.addEventListener('click', function() {
      // Открываем новую вкладку с указанным URL для кнопки "Подробнее (четвёртая)"
      // Замените 'https://www.fourth-more-example.com/' на нужный адрес
      window.open('https://www.fourth-more-example.com/', '_blank');
    });

    // (Опционально) Обработчик для Enter или Space для кнопки "Подробнее (четвёртая)", если элемент в фокусе
    fourMoreButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Предотвращаем прокрутку при Space
            // Открываем новую вкладку при нажатии Enter или Space для кнопки "Подробнее (четвёртая)"
            window.open('https://www.fourth-more-example.com/', '_blank');
        }
    });
} else {
     console.warn("Кнопка .foure-block-bottom-buttem не найдена в DOM.");
}
