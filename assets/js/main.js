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

function filterByTag(tag) {
    const allShops = Array.from(document.querySelectorAll('li.shop'));
    const mainList = document.querySelector('ul.main');
    const otherList = document.querySelector('ul.other');
    allShops.forEach(shop => {
        if (!tag) {
            mainList.appendChild(shop);
            return;
        }
        const tagAttribute = shop.getAttribute('tags');
        if (tagAttribute) {
            const tags = tagAttribute.split(',');
            if (!tags.includes(tag)) {
                otherList.appendChild(shop);
            } else {
                mainList.appendChild(shop);
            }
        } else {
            otherList.appendChild(shop);
        }
    });
    Array.from(document.querySelectorAll('button.tag')).forEach(button => {
        if (tag && button.innerHTML.trim() === tag) button.classList.add('active');
        else button.classList.remove('active');
    });
    if (!tag) {
        document.querySelector('.main-content').classList.remove('filtered');
    } else {
        document.querySelector('.main-content').classList.add('filtered');
        document.querySelector('.current-tag').innerHTML = tag;
    }
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

document.querySelectorAll('.tag').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const tag = e.target.innerHTML;
        filterByTag(tag.trim());
    });
});

document.querySelectorAll('button.clear-filter').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        filterByTag();
    });
});