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