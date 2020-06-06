

const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const submitButton = document.querySelector(".submit-button")
const form = document.querySelector(".search-form")
const more = document.querySelector('.more')

let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener('input', (e) => {
    searchValue = e.target.value;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=1`
    fetchApi(fetchLink);
    currentSearch = searchValue; 
});

more.addEventListener('click', loadMore)

async function fetchApi(url){
    gallery.innerHTML = 'Loading...'
    searchInput.value = '';
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    gallery.innerHTML = ''
    buildImages(data);

}



function buildImages(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div')
        galleryImg.classList.add('gallery-image')
        galleryImg.innerHTML = `
        <div class="gallery-info"><p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a></div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg)
    });
}


async function loadMore() {
    page++;
    if(currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
        
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }

    const dataFetch = await fetch(fetchLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    buildImages(data);
    
}

fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`
fetchApi(fetchLink);