document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('threeSlider'); // Наш .three-center

    if (!slider) {
        console.error("animation-3-block.js: Элемент с ID 'threeSlider' не найден.");
        return;
    }

    // --- НОВОЕ: Определение границ ---
    // Получаем ширину контейнера .three (родителя .threeSlider)
    const container = slider.parentElement; // Предполагаем, что .three - родитель .threeSlider
    if (!container) {
        console.error("animation-3-block.js: Родительский контейнер .threeSlider не найден.");
        return;
    }

    // Получаем ширину одного блока (берём первый, предполагая, что они одинаковые или можно использовать среднюю)
    // Можно уточнить, если ширина различается
    const firstBlock = slider.querySelector('.three-center-one'); // или любой другой .three-center-*
    if (!firstBlock) {
        console.error("animation-3-block.js: Элемент блока не найден.");
        return;
    }
    const blockWidth = firstBlock.offsetWidth;
    const blockGap = parseInt(getComputedStyle(slider).gap) || 0; // Используем gap из .three-center
    const containerWidth = container.offsetWidth; // Ширина видимого контейнера .three

    // Рассчитываем количество блоков
    const blockCount = slider.children.length; // Количество дочерних элементов в .three-center

    // Левая граница: первый блок прижат к левой стороне контейнера .three
    // Это соответствует transformX = 0, но мы начали с translateX(270px)
    // Поэтому minPosition (самое левое разрешённое положение) = 270px
    const minPosition = 270;

    // Правая граница: последний блок прижат к правой стороне контейнера .three
    // Общая ширина всех блоков и промежутков между ними
    // Если блоков N, то промежутков между ними N-1
    const totalCarouselWidth = blockCount * blockWidth + (blockCount - 1) * blockGap;
    // Чтобы последний блок касался правой границы .three:
    // Левый край последнего блока = containerWidth - blockWidth
    // Тогда трансформ должен быть = (containerWidth - blockWidth) - (totalCarouselWidth - blockWidth) = containerWidth - totalCarouselWidth
    // Но нам нужно учесть начальное смещение 270px.
    // Если бы не было начального смещения, maxPosition был бы containerWidth - totalCarouselWidth
    // С начальным смещением maxPosition становится (containerWidth - totalCarouselWidth) + 270
    // Однако, если totalCarouselWidth < containerWidth, то maxPosition может быть больше minPosition,
    // что означает, что карусель не нужна. Но логика ограничения всё равно сработает.
    // Используем формулу: maxPosition = containerWidth - totalCarouselWidth + initialOffset
    const extraScroll = containerWidth * 0.7; // 10% ширины контейнера
    const maxPosition = containerWidth - totalCarouselWidth + 270 - extraScroll; // initialOffset = 270

    console.log("animation-3-block.js: blockWidth:", blockWidth, "blockGap:", blockGap, "containerWidth:", containerWidth, "blockCount:", blockCount, "totalCarouselWidth:", totalCarouselWidth);
    console.log("animation-3-block.js: minPosition (left bound):", minPosition, "maxPosition (right bound):", maxPosition);

    // Проверяем, нужно ли ограничение (если контент уже помещается, не ограничиваем)
    const needsBounds = totalCarouselWidth > containerWidth;
    console.log("animation-3-block.js: needsBounds:", needsBounds);

    // --- КОНЕЦ НОВОГО ---

    let isDragging = false;
    let startX;
    let currentTransformX;

    slider.addEventListener('mousedown', (e) => {
        console.log("animation-3-block.js: mousedown сработал на .three-center");
        isDragging = true;

        // Получаем координаты мыши относительно viewport
        startX = e.pageX;

        // Получаем текущее значение transformX из computed styles
        const computedStyle = window.getComputedStyle(slider);
        const matrix = new DOMMatrixReadOnly(computedStyle.transform);
        currentTransformX = matrix.m41; // m41 - это X-компонента трансформации

        slider.style.cursor = 'grabbing';
        e.preventDefault(); // Отключаем выделение текста при перетаскивании
    });

    slider.addEventListener('mouseleave', () => {
        console.log("animation-3-block.js: mouseleave");
        if (isDragging) {
            isDragging = false;
            slider.style.cursor = 'grab';
        }
    });

    slider.addEventListener('mouseup', () => {
        console.log("animation-3-block.js: mouseup");
        isDragging = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        console.log("animation-3-block.js: mousemove, перетаскивание");
        e.preventDefault();

        const currentX = e.pageX;
        const walk = (currentX - startX); // разница в пикселях по X

        let newPosition = currentTransformX + walk; // Вычисляем новую позицию

        // --- ПРИМЕНЯЕМ ОГРАНИЧЕНИЯ ---
        if (needsBounds) { // Применяем только если границы нужны
            if (newPosition > minPosition) {
                newPosition = minPosition; // Не уходить левее первого блока
            }
            if (newPosition < maxPosition) {
                newPosition = maxPosition; // Не уходить правее последнего блока
            }
        } // Если не нужно ограничение, newPosition не изменяется
        // --- КОНЕЦ ОГРАНИЧЕНИЙ ---

        // Применяем новую позицию через transform
        slider.style.transform = `translateX(${newPosition}px)`;
    });
});