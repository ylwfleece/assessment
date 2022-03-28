function generateResultCard(result) {
    return `<div id="result-${result.id}" class="results__grid__card">
        <img class="results__grid__card__cover" src=${result.artworkUrl100}>
        <span  class="results__grid__card__title" >${result.collectionName}</span>
    </div>`
}

function generateResultsGrid(searchResults) {
    let results = searchResults.results;
    return results.map(result => generateResultCard(result)).join('');
}

function renderResultsGrid(results) {
    const tmp = generateResultsGrid(results);
    const ele = document.querySelector('.results__grid');
    render(ele, tmp);
}

function render(element, template) {
    element.innerHTML = template;
}

function getResults(searchTerm) {
    return fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`)
        .then(res => res.json())
}

function displayResults(searchTerm) {
    getResults(searchTerm).then(results => {
        console.log(results)
        renderResultsGrid(results);
    })
}

function initSearchBar() {
    let input = document.querySelector('.searchbar__nav__input');
    let submit = document.querySelector('.searchbar__nav__submit');
    submit.addEventListener('click', (e) => {
        if (input.value) {
            console.log(input.value)
            displayResults(input.value);
        } else {
            alert('must input valid search term')
        }
    })
}

initSearchBar();



