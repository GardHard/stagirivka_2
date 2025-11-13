document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.foure-block-center-inner');
    const container = document.querySelector('.foure-block-center');
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Убедимся, что элементы существуют
    if (!carouselInner || !container) {
        console.error('Carousel elements not found!');
        return;
    }

    // Создаем внутреннюю обертку, если её нет
    if (carouselInner.parentNode !== container) {
        const existingChildren = Array.from(container.children);
        const innerWrapper = document.createElement('div');
        innerWrapper.className = 'foure-block-center-inner';
        existingChildren.forEach(child => innerWrapper.appendChild(child));
        container.appendChild(innerWrapper);
    }

    const blockWidth = document.querySelector('.foure-block-center-one').offsetWidth;
    const blockGap = parseInt(getComputedStyle(container).gap) || 0; // Используем gap
    const totalBlockWidth = blockWidth + blockGap; // 425 + 30 = 455px
    const containerWidth = container.offsetWidth; // Ширина контейнера

    // Рассчитываем позиции для границ
    // Левая граница: самый левый блок прижат к левой стороне контейнера (его left = 220px)
    // Это означает, что transformX = 220px (стартовая точка)
    const minPosition = 220; // Это начальное положение

    // Правая граница: самый правый блок прижат к правой стороне контейнера (его right = 220px)
    // Общая ширина всех 4 блоков = 4 * 425 + 3 * 30 = 1700 + 90 = 1790px (но gap между 4 блоками - 3)
    // Но gap между 4 блоками = 3 * 30 = 90
    // Общая ширина = 4 * 425 + 3 * 30 = 1700 + 90 = 1790
    // Чтобы правый край последнего блока был в 220px от правого края контейнера,
    // нужно, чтобы левый край последнего блока был в containerWidth - 220 - blockWidth от левого края контейнера
    // Левый край последнего блока = containerWidth - 220 - blockWidth
    // Тогда трансформ должен быть = (containerWidth - 220 - blockWidth) - (3 * totalBlockWidth)
    // Это будет минимальным значением transformX (самое правое положение карусели)
    // maxPosition = containerWidth - 220 - blockWidth - (3 * totalBlockWidth) = 1200 - 220 - 425 - (3 * 455) = 1200 - 220 - 425 - 1365 = -810
    const totalCarouselWidth = 4 * blockWidth + 3 * blockGap; // 4 блока + 3 промежутка
    const maxPosition = containerWidth - 220 - blockWidth - (3 * totalBlockWidth); // containerWidth - 220 - 425 - 3*(425+30)

    carouselInner.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carouselInner.offsetLeft;
        // Получаем текущее значение transformX из стиля
        const currentTransform = window.getComputedStyle(carouselInner).transform;
        if (currentTransform !== 'none') {
            const matrix = new DOMMatrix(currentTransform);
            scrollLeft = matrix.m41; // m41 - это X-компонента трансформации
        } else {
            scrollLeft = 0;
        }
        carouselInner.classList.add('dragging');
        // Отключаем выделение текста при перетаскивании
        e.preventDefault();
    });

    carouselInner.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            carouselInner.classList.remove('dragging');
        }
    });

    carouselInner.addEventListener('mouseup', () => {
        isDragging = false;
        carouselInner.classList.remove('dragging');
    });

    carouselInner.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselInner.offsetLeft;
        const walk = (x - startX) * 1; // множитель для скорости перетаскивания
        let newPosition = scrollLeft + walk;

        // Применяем ограничения
        if (newPosition > minPosition) {
            newPosition = minPosition;
        }
        if (newPosition < maxPosition) {
            newPosition = maxPosition;
        }

        carouselInner.style.transform = `translateX(${newPosition}px)`;
    });

});