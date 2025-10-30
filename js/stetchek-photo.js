// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {

    // --- НАСТРОЙКИ СЛАЙДЕРА ---
    const slideDuration = 5000; // Время одного слайда в миллисекундах (например, 5 секунд)
    const fillDuration = slideDuration; // Время заполнения одной полоски (равно времени слайда)
    const numSlides = 4; // Общее количество слайдов/полосок

    // --- ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ ---

    // Прогресс-бары
    const progressBarOne = document.querySelector('.one-photo-taimer-animate-companent-one');
    const progressBarTwo = document.querySelector('.one-photo-taimer-animate-companent-two');
    const progressBarThree = document.querySelector('.one-photo-taimer-animate-companent-three');
    const progressBarFore = document.querySelector('.one-photo-taimer-animate-companent-fore');
    const progressBars = [progressBarOne, progressBarTwo, progressBarThree, progressBarFore];

    // Слайды
    const slides = document.querySelectorAll('.one-photo-slider');
    console.log("Найдено слайдов:", slides.length);

    // Стрелки слайдера
    const leftArrow = document.querySelector('.one-block-two-center-left');
    const rightArrow = document.querySelector('.one-block-two-center-right');

    // Индикатор текста слайдера (мобильный)
    const indicatorTextElement = document.getElementById('slideCounter'); // Используем ID из HTML
    console.log("Найден элемент счётчика:", !!indicatorTextElement); // Отладка

    // Кнопки "Новостройки", "Ипотека", "Подробнее"
    const myButton = document.querySelector('.one-buttom-left');
    const myRightButton = document.querySelector('.one-buttom-right');
    const myBottomButton = document.querySelector('.one-buttom-bottom-left');

    // --- ПЕРЕМЕННЫЕ СОСТОЯНИЯ ---
    let currentSlide = 0; // Индекс текущего слайда
    let fillInterval = null; // Переменная для хранения интервала заполнения
    let progress = 0; // Текущий прогресс заполнения (в %)

    // --- ФУНКЦИИ СЛАЙДЕРА ---

    // Функция для обновления текста индикатора (мобильный)
    function updateCounter() {
        if (indicatorTextElement) {
            const currentSlideNumber = currentSlide + 1; // Индексы начинаются с 0
            indicatorTextElement.textContent = `${currentSlideNumber}/${numSlides}`;
            console.log(`Индикатор счётчика обновлён: ${currentSlideNumber}/${numSlides}`); // Отладка
        } else {
            console.warn("Элемент индикатора текста (#slideCounter) не найден при попытке обновить.");
        }
    }

    // Функция для сброса прогресса и переключения слайда
    function goToSlide(index) {
        console.log("=== goToSlide вызван с индексом:", index, "==="); // Отладка
        // --- ОЧИСТКА ПРЕДЫДУЩЕГО СОСТОЯНИЯ ---
        if (fillInterval) {
            console.log("Очищаем интервал для слайда:", currentSlide); // Отладка
            clearInterval(fillInterval);
            fillInterval = null;
        }

        // Сбрасываем *все* полоски
        progressBars.forEach((bar, i) => {
            if (bar) {
                bar.style.setProperty('--progress-width', '0%');
                bar.classList.remove('active');
                console.log(`Сброшена полоска ${i + 1}`); // Отладка
            }
        });

        // Скрываем все слайды
        slides.forEach((slide, i) => {
            slide.classList.remove('visible');
            console.log(`Скрыт слайд ${i + 1} (SRC: ${slide.getAttribute('src')})`); // Отладка
        });

        // --- ПЕРЕКЛЮЧЕНИЕ НА НОВЫЙ СЛАЙД ---
        if (slides[index]) {
            slides[index].classList.add('visible');
            console.log(`Показан слайд ${index + 1} (SRC: ${slides[index].getAttribute('src')})`); // Отладка
        } else {
            console.error("Слайд с индексом", index, "не найден в массиве slides!"); // Отладка
            return;
        }

        if (progressBars[index]) {
            console.log(`Активирована полоска для слайда ${index + 1}`); // Отладка
        } else {
            console.error("Прогресс-бар с индексом", index, "не найден в массиве progressBars!"); // Отладка
        }

        currentSlide = index;
        console.log("currentSlide установлен в:", currentSlide); // Отладка
        progress = 0; // Сбрасываем прогресс

        // --- ОБНОВЛЕНИЕ ИНДИКАТОРА ТЕКСТА (Мобильный) ---
        updateCounter(); // Вызываем функцию обновления счётчика
        // --- КОНЕЦ ОБНОВЛЕНИЯ ИНДИКАТОРА ---

        startFillProgress();
    }

    // Функция для перехода к следующему слайду
    function goToNextSlide() {
        const nextIndex = (currentSlide + 1) % numSlides;
        goToSlide(nextIndex);
    }

    // Функция для перехода к предыдущему слайду
    function goToPrevSlide() {
        const prevIndex = (currentSlide - 1 + numSlides) % numSlides; // Добавляем numSlides, чтобы избежать отрицательных значений
        goToSlide(prevIndex);
    }

    // Функция запуска анимации заполнения
    function startFillProgress() {
        console.log("--- startFillProgress вызван для слайда:", currentSlide, "---"); // Отладка
        if (currentSlide < 0 || currentSlide >= progressBars.length) {
            console.warn("Некорректный индекс слайда для заполнения:", currentSlide);
            return;
        }

        if (currentSlide >= slides.length) {
             console.error("Индекс слайда", currentSlide, "превышает количество слайдов:", slides.length);
             return;
        }

        if (fillInterval) {
            console.log("Предупреждение: startFillProgress вызван, но fillInterval не был очищен ранее для слайда:", currentSlide); // Отладка
            clearInterval(fillInterval);
        }

        const increment = 100 / (fillDuration / 100); // Увеличение % за 100мс
        const targetBar = progressBars[currentSlide];
        const targetSlide = slides[currentSlide];

        if (!targetBar) {
            console.error("Целевая полоска не найдена для индекса:", currentSlide);
            return;
        }

        if (!targetSlide) {
            console.error("Целевой слайд не найден для индекса:", currentSlide);
            return;
        }

        console.log("Целевой слайд для заполнения: (SRC: ${targetSlide.getAttribute('src')})"); // Отладка

        fillInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                console.log("Заполнение слайда", currentSlide + 1, "завершено. (SRC: ${targetSlide.getAttribute('src')})"); // Отладка
                clearInterval(fillInterval);
                fillInterval = null;
                targetBar.style.setProperty('--progress-width', '100%');
                setTimeout(() => {
                    console.log("setTimeout сработал, вызываем goToNextSlide"); // Отладка
                    goToNextSlide();
                }, 100);
            } else {
                targetBar.style.setProperty('--progress-width', `${progress}%`);
            }
        }, 100);
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ СЛАЙДЕРА ---
    leftArrow.addEventListener('click', goToPrevSlide);
    rightArrow.addEventListener('click', goToNextSlide);

    // --- ФУНКЦИИ И ОБРАБОТЧИКИ ДЛЯ КНОПОК ---

    // Кнопка "Новостройки"
    if (myButton) { // Проверяем, существует ли элемент
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
    } else {
        console.warn("Кнопка .one-buttom-left не найдена в DOM.");
    }

    // Кнопка "Ипотека"
    if (myRightButton) { // Проверяем, существует ли элемент
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
    } else {
        console.warn("Кнопка .one-buttom-right не найдена в DOM.");
    }

    // Кнопка "Подробнее"
    if (myBottomButton) { // Проверяем, существует ли элемент
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
    } else {
        console.warn("Кнопка .one-buttom-bottom-left не найдена в DOM.");
    }

    // --- ЗАПУСК СЛАЙДЕРА ---
    goToSlide(0); // Используем новую функцию, которая также вызывает updateCounter()
});