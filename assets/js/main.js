function shuffleArray(array) {
    // Fisher-Yates (Knuth) Shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomizeShops() {
    shuffleArray(Array.from(document.querySelectorAll('li.shop'))).forEach(shop => { shop.parentNode.appendChild(shop) });
}

randomizeShops();


document.querySelectorAll('button.carousel-control-button').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const images = Array.from(e.target.closest('.shop').querySelectorAll('.carousel img'));
        const dots = Array.from(e.target.parentNode.querySelectorAll('.image-dot'));
        const activeIndex = images.findIndex(img => img.classList.contains('active'));
        images[activeIndex].classList.remove('active');
        dots[activeIndex].classList.remove('active');
        let nextIndex = e.target.classList.contains('next') ? activeIndex + 1 : activeIndex - 1;
        if (nextIndex >= images.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = images.length - 1;
        images[nextIndex].classList.add('active');
        dots[nextIndex].classList.add('active');
    })
});

document.querySelectorAll('button.image-dot').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const images = Array.from(e.target.closest('.shop').querySelectorAll('.carousel img'));
        const dots = Array.from(e.target.parentNode.querySelectorAll('.image-dot'));
        const activeIndex = images.findIndex(img => img.classList.contains('active'));
        images[activeIndex].classList.remove('active');
        dots[activeIndex].classList.remove('active');
        const nextIndex = dots.indexOf(e.target);
        images[nextIndex].classList.add('active');
        dots[nextIndex].classList.add('active');
    })
});