'use strict';

const imageContainer = document.querySelector('.image-container');
const api_key = '3jhtvjSR0DpxyG9aZzwwSC5M6P8m8GIB4CYl5VA62QjPxBP9PRTZZvzn';
const itemsPerPage = 10; // Number of items to load per request
let page = 1; // Initial page

const createImage = (url) => {
    const image = document.createElement('img');
    image.src = url;
    image.alt = 'Image';
    imageContainer.appendChild(image);
}

const fetchData = async () => {
    const searchQuery = 'people';
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${itemsPerPage}&page=${page}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${api_key}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            data.photos.forEach(photo => {
                createImage(photo.src.large); // Use the appropriate image size you want
            });

            // Increment the page number for the next request
            page++;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to load more data when scrolling to the bottom of the page
const loadMoreData = () => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;

    if (windowHeight + scrollY >= bodyHeight) {
        fetchData();
    }
}

// Attach the scroll event listener to load more data on scroll
window.addEventListener('scroll', loadMoreData);

// Initial data load
fetchData();
