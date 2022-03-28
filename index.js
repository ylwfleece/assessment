function generateResultCard(result) {
    return `<div id="result-${result.id}" class="results__grid__card">
        <img class="results__grid__card__cover" src=${result.artworkUrl100}>
        <span class="results__grid__card__title">${result.collectionName}</span>
    </div>`
}

function generateResultsGrid(searchResults, searchTerm) {
    let results = searchResults.results;
    renderResultsText(results.length, searchTerm);
    return results.map(result => generateResultCard(result)).join('');
}

function renderResultsGrid(results, searchTerm) {
    const tmp = generateResultsGrid(results, searchTerm);
    const ele = document.querySelector('.results__grid');
    render(ele, tmp);
}

function render(element, template) {
    element.innerHTML = template;
}

function renderLoader() {
    let prompt = document.querySelector('.searchbar__prompt')
    prompt.innerHTML = `<div class='loader'></div>`;
}

function renderResultsText(count, searchTerm) {
    let prompt = document.querySelector('.searchbar__prompt')
    prompt.innerHTML = `<h1>${count} results for '${searchTerm}'</h1>`;
}

function getResults(searchTerm) {
    return fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`)
        .then(res => res.json())
}

function displayResults(searchTerm) {
    getResults(searchTerm).then(results => {
        renderResultsGrid(results, searchTerm);
    });
}

function initSearchBar() {
    let input = document.querySelector('.searchbar__nav__input');
    let submit = document.querySelector('.searchbar__nav__submit');
    submit.addEventListener('click', (e) => {
        if (input.value) {
            renderLoader();
            displayResults(input.value);
        } else {
            alert('Must input valid search term')
        }
    })
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          submit.click();
        }
      });
}

initSearchBar();



