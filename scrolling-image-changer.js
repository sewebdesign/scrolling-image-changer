<!-- This Code is Licensed by schwartz-edmisten.com -->
function initScrollingImageChanger() {
    const containers = document.querySelectorAll('.user-items-list[data-space-below-section-title-value="291"] .user-items-list-simple');
    for (const container of containers) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        const listItems = container.querySelectorAll('.list-item');
         if (container.getAttribute('data-alignment-vertical') === 'stretch') {
            container.closest('.user-items-list').classList.add('split-full');
        }
        listItems.forEach(item => {
            const textContent = item.querySelector('.list-item-content');
            textContainer.appendChild(textContent.cloneNode(true));
            imageContainer.appendChild(item);
        });
        container.appendChild(imageContainer);
        container.appendChild(textContainer);
        container.querySelector('.image-container .list-item').classList.add('active');
        container.querySelector('.text-container .list-item-content').classList.add('active');
        container.querySelector('.text-container').classList.add('list-item');
        const textItems = container.querySelectorAll('.text-container .list-item-content');
        const imageItems = container.querySelectorAll('.image-container .list-item');   
        function handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeText = container.querySelector('.text-container .list-item-content.active');
                    const activeImage = container.querySelector('.image-container .list-item.active');
                    const index = Array.from(textItems).indexOf(entry.target);
                    if (activeText) activeText.classList.remove('active');
                    if (activeImage) activeImage.classList.remove('active');
                    entry.target.classList.add('active');
                    imageItems[index].classList.add('active');
                }
            });
        }
        const options = {rootMargin: '-50% 0% -50% 0%', threshold: 0};
        const observer = new IntersectionObserver(handleIntersection, options);
        textItems.forEach(item => observer.observe(item));
        function updateHeight() {
            const height = imageContainer.querySelector('.list-item-media').clientHeight;
            container.style.setProperty('--scrollimgheight', `${height}px`);
        }
        updateHeight();
        window.addEventListener('resize', updateHeight);
    }
}
document.addEventListener('DOMContentLoaded', function() {
initScrollingImageChanger();
});
