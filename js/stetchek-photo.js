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

    // КОНТЕЙНЕРЫ слайдов (картинка + градиент + текст)
    const slideContainers = document.querySelectorAll('.one-photo-container');
    console.log("Найдено контейнеров слайдов:", slideContainers.length);

    // Стрелки слайдера
    const leftArrow = document.querySelector('.one-block-two-center-left');
    const rightArrow = document.querySelector('.one-block-two-center-right');

    // Индикатор текста слайдера (мобильный)
    const indicatorTextElement = document.getElementById('slideCounter');
    console.log("Найден элемент счётчика:", !!indicatorTextElement);

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
            console.log(`Индикатор счётчика обновлён: ${currentSlideNumber}/${numSlides}`);
        } else {
            console.warn("Элемент индикатора текста (#slideCounter) не найден при попытке обновить.");
        }
    }

    // Функция для сброса прогресса и переключения слайда
    function goToSlide(index) {
        console.log("=== goToSlide вызван с индексом:", index, "===");

        // --- ОЧИСТКА ПРЕДЫДУЩЕГО СОСТОЯНИЯ ---
        if (fillInterval) {
            console.log("Очищаем интервал для слайда:", currentSlide);
            clearInterval(fillInterval);
            fillInterval = null;
        }

        // Сбрасываем *все* полоски
        progressBars.forEach((bar, i) => {
            if (bar) {
                bar.style.setProperty('--progress-width', '0%');
                bar.classList.remove('active');
                console.log(`Сброшена полоска ${i + 1}`);
            }
        });

        // Скрываем все КОНТЕЙНЕРЫ слайдов
        slideContainers.forEach((container, i) => {
            container.classList.remove('active');
            // Сбрасываем z-index ТОЛЬКО для картинки (т.к. градиент и текст теперь всегда с фикс. z-index)
            const sliderImg = container.querySelector('.one-photo-slider');
            // const gradientImg = container.querySelector('.one-photo-gradient'); // БОЛЬШЕ НЕ НУЖНО
            // const textDiv = container.querySelector('[class*="one-block-bottom-two-up-text-position-"]'); // БОЛЬШЕ НЕ НУЖНО

            if (sliderImg) {
                sliderImg.style.zIndex = '1'; // Устанавливаем z-index для невидимого слайда
            }
            // if (gradientImg) { // БОЛЬШЕ НЕ НУЖНО
            //     gradientImg.style.zIndex = '2'; // Убираем, т.к. z-index теперь в CSS
            // }
            // if (textDiv) { // БОЛЬШЕ НЕ НУЖНО
            //     textDiv.style.zIndex = '3'; // Убираем, т.к. z-index теперь в CSS
            // }
            console.log(`Сброшен z-index для элементов контейнера слайда ${i + 1}`);
        });

        // --- ПЕРЕКЛЮЧЕНИЕ НА НОВЫЙ СЛАЙД ---
        if (slideContainers[index]) {
            // Показываем только выбранный контейнер
            slideContainers[index].classList.add('active');
            // Устанавливаем z-index для активного слайда (только картинка)
            const activeSliderImg = slideContainers[index].querySelector('.one-photo-slider');
            // const activeGradientImg = slideContainers[index].querySelector('.one-photo-gradient'); // БОЛЬШЕ НЕ НУЖНО
            // const activeTextDiv = slideContainers[index].querySelector('[class*="one-block-bottom-two-up-text-position-"]'); // БОЛЬШЕ НЕ НУЖНО

            if (activeSliderImg) {
                activeSliderImg.style.zIndex = '1'; // Устанавливаем z-index для видимого слайда
            }
            // if (activeGradientImg) { // БОЛЬШЕ НЕ НУЖНО
            //     activeGradientImg.style.zIndex = '2'; // Убираем, т.к. z-index теперь в CSS
            // }
            // if (activeTextDiv) { // БОЛЬШЕ НЕ НУЖНО
            //     activeTextDiv.style.zIndex = '3'; // Убираем, т.к. z-index теперь в CSS
            // }
            console.log(`Установлен z-index для активного контейнера слайда ${index + 1}`);
        } else {
            console.error("Контейнер слайда с индексом", index, "не найден в массиве slideContainers!");
            return;
        }

        if (progressBars[index]) {
            console.log(`Активирована полоска для слайда ${index + 1}`);
        } else {
            console.error("Прогресс-бар с индексом", index, "не найден в массиве progressBars!");
        }

        currentSlide = index;
        console.log("currentSlide установлен в:", currentSlide);
        progress = 0; // Сбрасываем прогресс

        // --- ОБНОВЛЕНИЕ ИНДИКАТОРА ТЕКСТА (Мобильный) ---
        updateCounter();
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
        console.log("--- startFillProgress вызван для слайда:", currentSlide, "---");
        if (currentSlide < 0 || currentSlide >= progressBars.length) {
            console.warn("Некорректный индекс слайда для заполнения:", currentSlide);
            return;
        }

        if (currentSlide >= slideContainers.length) {
             console.error("Индекс слайда", currentSlide, "превышает количество контейнеров:", slideContainers.length);
             return;
        }

        if (fillInterval) {
            console.log("Предупреждение: startFillProgress вызван, но fillInterval не был очищен ранее для слайда:", currentSlide);
            clearInterval(fillInterval);
        }

        const increment = 100 / (fillDuration / 100); // Увеличение % за 100мс
        const targetBar = progressBars[currentSlide];
        const targetContainer = slideContainers[currentSlide]; // Получаем контейнер

        if (!targetBar) {
            console.error("Целевая полоска не найдена для индекса:", currentSlide);
            return;
        }

        if (!targetContainer) {
            console.error("Целевой контейнер слайда не найден для индекса:", currentSlide);
            return;
        }

        console.log("Целевой контейнер слайда для заполнения:", targetContainer); // Отладка

        fillInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                console.log("Заполнение слайда", currentSlide + 1, "завершено.");
                clearInterval(fillInterval);
                fillInterval = null;
                targetBar.style.setProperty('--progress-width', '100%');
                setTimeout(() => {
                    console.log("setTimeout сработал, вызываем goToNextSlide");
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
    // (Логика для кнопок остается без изменений)
    if (myButton) {
        myButton.addEventListener('click', function() {
          window.open('https://www.novostroyki-real-site.com/', '_blank');
        });

        myButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.open('https://www.novostroyki-real-site.com/', '_blank');
            }
        });
    } else {
        console.warn("Кнопка .one-buttom-left не найдена в DOM.");
    }

    if (myRightButton) {
        myRightButton.addEventListener('click', function() {
          window.open('https://www.ipoteka-real-site.com/', '_blank');
        });

        myRightButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.open('https://www.ipoteka-real-site.com/', '_blank');
            }
        });
    } else {
        console.warn("Кнопка .one-buttom-right не найдена в DOM.");
    }

    if (myBottomButton) {
        myBottomButton.addEventListener('click', function() {
          window.open('https://www.podrobnee-real-site.com/', '_blank');
        });

        myBottomButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.open('https://www.podrobnee-real-site.com/', '_blank');
            }
        });
    } else {
        console.warn("Кнопка .one-buttom-bottom-left не найдена в DOM.");
    }

    // --- ЗАПУСК СЛАЙДЕРА ---
    goToSlide(0); // Используем новую функцию, которая также вызывает updateCounter()
});