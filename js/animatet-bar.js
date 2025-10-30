// Настройки
const slideDuration = 5000; // Время одного слайда в миллисекундах (например, 5 секунд)
const fillDuration = slideDuration; // Время заполнения одной полоски (равно времени слайда)
const numSlides = 4; // Общее количество слайдов/полосок

// Получаем элементы прогресс-баров по их новым классам
const progressBarOne = document.querySelector('.one-photo-taimer-animate-companent-one');
const progressBarTwo = document.querySelector('.one-photo-taimer-animate-companent-two');
const progressBarThree = document.querySelector('.one-photo-taimer-animate-companent-three');
const progressBarFore = document.querySelector('.one-photo-taimer-animate-companent-fore');

// Массив для удобного доступа к элементам прогресс-баров
const progressBars = [progressBarOne, progressBarTwo, progressBarThree, progressBarFore];

// Получаем элементы слайдов
const slides = document.querySelectorAll('.one-photo-slider');
console.log("Найдено слайдов:", slides.length); // Отладка: проверим, сколько слайдов найдено
// Выведем src первых и последнего слайдов для проверки
if (slides.length > 0) {
    console.log("SRC первого слайда:", slides[0].getAttribute('src'));
}
if (slides.length > 1) {
    console.log("SRC второго слайда:", slides[1].getAttribute('src'));
}
if (slides.length > 2) {
    console.log("SRC третьего слайда:", slides[2].getAttribute('src'));
}
if (slides.length > 3) {
    console.log("SRC четвертого слайда:", slides[3].getAttribute('src'));
}

// Получаем элементы стрелок
const leftArrow = document.querySelector('.one-block-two-center-left');
const rightArrow = document.querySelector('.one-block-two-center-right');

let currentSlide = 0; // Индекс текущего слайда
let fillInterval = null; // Переменная для хранения интервала заполнения
let progress = 0; // Текущий прогресс заполнения (в %)

// Функция для сброса прогресса и переключения слайда
function goToSlide(index) {
    console.log("=== goToSlide вызван с индексом:", index, "==="); // Отладка
    // --- ОЧИСТКА ПРЕДЫДУЩЕГО СОСТОЯНИЯ ---
    // Очищаем интервал, если он был (например, при клике до окончания таймера)
    if (fillInterval) {
        console.log("Очищаем интервал для слайда:", currentSlide); // Отладка
        clearInterval(fillInterval);
        fillInterval = null;
    }

    // Сбрасываем *все* полоски
    progressBars.forEach((bar, i) => {
        if (bar) {
            // Сбрасываем ширину псевдоэлемента ::after через inline-style
            bar.style.setProperty('--progress-width', '0%');
            // Убираем класс active (он больше не нужен для изменения ширины)
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
    // Проверяем, существует ли слайд с этим индексом
    if (slides[index]) {
        slides[index].classList.add('visible');
        console.log(`Показан слайд ${index + 1} (SRC: ${slides[index].getAttribute('src')})`); // Отладка
    } else {
        console.error("Слайд с индексом", index, "не найден в массиве slides!"); // Отладка
        return; // Прерываем выполнение функции, если слайд не найден
    }

    // Активируем *только* текущую полоску - для изменения opacity фона, если нужно
    if (progressBars[index]) {
        // Добавляем класс для изменения opacity фона, если это нужно
        // progressBars[index].classList.add('active-bg'); // Используйте отдельный класс, если нужно менять только фон
        console.log(`Активирована полоска для слайда ${index + 1}`); // Отладка
    } else {
        console.error("Прогресс-бар с индексом", index, "не найден в массиве progressBars!"); // Отладка
        // Можно вернуть, если критично, но скорее всего это не ошибка в логике, если numSlides и массивы согласованы
    }

    currentSlide = index;
    console.log("currentSlide установлен в:", currentSlide); // Отладка
    progress = 0; // Сбрасываем прогресс

    // Запускаем процесс заполнения *только* текущей полоски
    startFillProgress();
}

// Функция для перехода к следующему слайду (используется таймером и правой стрелкой)
function goToNextSlide() {
    const nextIndex = (currentSlide + 1) % numSlides;
    goToSlide(nextIndex);
}

// Функция для перехода к предыдущему слайду (используется левой стрелкой)
function goToPrevSlide() {
    const prevIndex = (currentSlide - 1 + numSlides) % numSlides; // Добавляем numSlides, чтобы избежать отрицательных значений
    goToSlide(prevIndex);
}

// Функция запуска анимации заполнения
function startFillProgress() {
    console.log("--- startFillProgress вызван для слайда:", currentSlide, "---"); // Отладка
    // Проверяем, что индекс текущего слайда корректен
    if (currentSlide < 0 || currentSlide >= progressBars.length) {
        console.warn("Некорректный индекс слайда для заполнения:", currentSlide);
        return;
    }

    // Проверяем, что слайд существует
    if (currentSlide >= slides.length) {
         console.error("Индекс слайда", currentSlide, "превышает количество слайдов:", slides.length);
         return;
    }

    // Очищаем предыдущий интервал, на всякий случай
    if (fillInterval) {
        console.log("Предупреждение: startFillProgress вызван, но fillInterval не был очищен ранее для слайда:", currentSlide); // Отладка
        clearInterval(fillInterval);
    }

    const increment = 100 / (fillDuration / 100); // Увеличение % за 100мс
    const targetBar = progressBars[currentSlide]; // Получаем *текущую* полоску
    const targetSlide = slides[currentSlide]; // Получаем *текущий* слайд

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
        // console.log(`Текущий прогресс для слайда ${currentSlide + 1}: ${progress}%`); // Отладка (закомментировано, чтобы не засорять консоль)
        if (progress >= 100) {
            progress = 100;
            console.log("Заполнение слайда", currentSlide + 1, "завершено. (SRC: ${targetSlide.getAttribute('src')})"); // Отладка
            clearInterval(fillInterval);
            fillInterval = null;
            // Устанавливаем конечную ширину, на всякий случай
            targetBar.style.setProperty('--progress-width', '100%');
            // Переходим к следующему слайду через таймер
            setTimeout(() => {
                console.log("setTimeout сработал, вызываем goToNextSlide"); // Отладка
                goToNextSlide(); // Используем новую функцию
            }, 100);
        } else {
            // Обновляем ширину *только* активной полоски через inline-style
            // Это свойство будет использовано в CSS для изменения ширины ::after
            targetBar.style.setProperty('--progress-width', `${progress}%`);
        }
    }, 100); // Обновляем каждые 100мс
}

// Добавляем обработчики событий для стрелок
leftArrow.addEventListener('click', goToPrevSlide);
rightArrow.addEventListener('click', goToNextSlide);

// Инициализация: запускаем с первого слайда при загрузке
document.addEventListener('DOMContentLoaded', () => {
    console.log("=== DOM загружен, запускаем слайдер с индекса 0 ==="); // Отладка
    goToSlide(0); // Используем новую функцию
});