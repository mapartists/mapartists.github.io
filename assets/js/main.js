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

let activeTag;

function filterByTag(tag) {
    if (tag === activeTag) activeTag = null;
    else activeTag = tag;
    const allShops = Array.from(document.querySelectorAll('li.shop'));
    const mainList = document.querySelector('ul.main');
    const otherList = document.querySelector('ul.other');
    allShops.forEach(shop => {
        if (!activeTag) {
            mainList.appendChild(shop);
            return;
        }
        const tagAttribute = shop.getAttribute('tags');
        if (tagAttribute) {
            const tags = tagAttribute.split(',');
            if (!tags.includes(activeTag)) {
                otherList.appendChild(shop);
            } else {
                mainList.appendChild(shop);
            }
        } else {
            otherList.appendChild(shop);
        }
    });
    Array.from(document.querySelectorAll('button.tag')).forEach(button => {
        if (activeTag && button.innerHTML.trim() === activeTag) button.classList.add('active');
        else button.classList.remove('active');
    });
    if (!activeTag) {
        document.querySelector('.main-content').classList.remove('filtered');
    } else {
        document.querySelector('.main-content').classList.add('filtered');
        document.querySelector('.current-tag').innerHTML = activeTag;
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

let startX;

document.querySelectorAll('.carousel').forEach(c => {
    c.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });
    
    c.addEventListener('touchend', (event) => {
        const endX = event.changedTouches[0].clientX;
      
        const diffX = endX - startX;

        let next = 0;
      
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            // Swipe right
            next = -1;
          } else {
            // Swipe left
            next = 1;
          }
        }
        
        if (next !== 0) {
            const images = Array.from(c.querySelectorAll('.carousel img'));
            const dots = Array.from(c.parentNode.querySelectorAll('.image-dot'));
            const activeIndex = images.findIndex(img => img.classList.contains('active'));
            images[activeIndex].classList.remove('active');
            dots[activeIndex].classList.remove('active');
            let nextIndex = activeIndex + next;
            if (nextIndex >= images.length) nextIndex = 0;
            if (nextIndex < 0) nextIndex = images.length - 1;
            images[nextIndex].classList.add('active');
            dots[nextIndex].classList.add('active');
        }
      });
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

document.querySelector('div.tag-list h3').addEventListener('click', e => {
    document.querySelector('div.tag-list').classList.toggle('open');
});