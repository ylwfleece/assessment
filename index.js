function generateResultCard(result) {
    return `<div id="todo-${result.id}" class="results__grid__card">
        <img class="results__grid__card__cover" src=${result.artworkUrl100}>
        <span  class="results__grid__card__title" >${result.collectionName}</span>
    </li>`

}

function generateResultsGrid(results) {
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
    fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`)
        .then(res => res.json())
        .then(json => console.log(json))
}

function displayResults() {
    getResults().then(results => {
        renderResultsGrid(results);
    })
}

function initSearchBar() {
    let input = document.querySelector('.searchbar__nav__input');
    let submit = document.querySelector('.searchbar__nav__submit')
}

