
const tvshows=document.querySelector(".tvshow")
const form= document.querySelector("#searchform")

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const searchvalue =form.elements.query.value
    const URL=`https://api.tvmaze.com/search/shows?q=${searchvalue}`
    let response= await fetch(URL);
    let showsData= await response.json();//to convert json responce into js object
    getData(showsData)
   
   
})

const getData = (shows) => {
    tvshows.innerHTML = ''; // Clear previous content before adding new results

    for (let eachshow of shows) {
        if (eachshow.show.image) {
            // Create a div for each show
            const showDiv = document.createElement("div");
            showDiv.classList.add("imgdiv")
            //show image
            const image = document.createElement("img");
            image.src = eachshow.show.image.medium;
            image.classList.add('img')
            showDiv.appendChild(image);
            //show name
            const showName = document.createElement("h4");
            showName.innerText = `${eachshow.show.name} `
            showName.classList.add('h4')

            // Store show details as data attributes on the image element
            image.setAttribute('data-rating', eachshow.show.rating.average || ''); // Assigning rating or an empty string
            image.setAttribute('data-language', eachshow.show.language || ''); // Assigning language or an empty string
            image.setAttribute('data-premiered', eachshow.show.premiered || ''); // Assigning premiered date or an empty string
            image.setAttribute('data-image', eachshow.show.image.medium || ''); // Assigning image or an empty string
            image.setAttribute('data-description', eachshow.show.summary || 'This is an amazing show. It is based on the real life situations. You wil not be disappointed after watching this show. You can trust me I am Batman.'); // Assigning image or an empty string
            image.setAttribute('data-genres', eachshow.show.genres || ''); // Assigning image or an empty string
            image.setAttribute('data-name', eachshow.show.name || ''); // Assigning image or an empty string

            showDiv.appendChild(showName);
            tvshows.appendChild(showDiv);
           
        }

    }
     // After appending all images, add event listeners to each image
     addEventListenerToImages();
};





const horrorshow = async (genery,generyname)=>{

    const Tv=document.querySelector(`.${generyname}`)
    const URL=`https://api.tvmaze.com/search/shows?q=${genery}`
    let response= await fetch(URL);
    let horrorShows= await response.json();
    tvshows.innerHTML = '';
    horrorShows.forEach((horror) => {
        const showDiv = document.createElement("div");
        showDiv.classList.add("imgdiv")
         
        const image = document.createElement('img');
        if (horror.show.image) {
            image.src = horror.show.image.medium;
            image.classList.add('img');
             // Store show details as data attributes on the image element
              // Store show details as data attributes on the image element
            image.setAttribute('data-rating', horror.show.rating.average || ''); // Assigning rating or an empty string
            image.setAttribute('data-language', horror.show.language || ''); // Assigning language or an empty string
            image.setAttribute('data-premiered', horror.show.premiered || ''); // Assigning premiered date or an empty string
            image.setAttribute('data-image', horror.show.image.medium || ''); // Assigning image or an empty string
            image.setAttribute('data-description', horror.show.summary || 'This is an amazing show. It is based on the real life situations. You wil not be disappointed after watching this show. You can trust me I am Batman.'); // Assigning image or an empty string
            image.setAttribute('data-genres', horror.show.genres || ''); // Assigning image or an empty string
            image.setAttribute('data-name', horror.show.name || ''); // Assigning image or an empty string


            showDiv.appendChild(image);
            Tv.appendChild(showDiv);

         
        }
        
    });
    addEventListenerToImages();
}


horrorshow("horror","horror")
horrorshow("comedy","comedy")
horrorshow("action","action")
horrorshow("romance","romance")
horrorshow("thriller","thriller")
horrorshow("Science","Science")


// Function to add event listener to every image
const addEventListenerToImages = () => {
    const images = document.querySelectorAll('.imgdiv img');
    images.forEach(img => {
        img.addEventListener('click', imageClickHandler);
    });
};

const imageClickHandler = (event) => {
    const rating = event.target.getAttribute('data-rating');
    const language = event.target.getAttribute('data-language');
    const premiered = event.target.getAttribute('data-premiered');
    const description = event.target.getAttribute('data-description');
    const image = event.target.getAttribute('data-image');
    const genre = event.target.getAttribute('data-genres');
    const name = event.target.getAttribute('data-name');

    // Construct the URL with image details as parameters
    const url = `details.html?rating=${rating}&language=${language}&premiered=${premiered}&description=${description}&image=${image}&genre=${genre}&name=${name}`;

    // Redirect to details.html with the image details as parameters
    window.location.href = url;

};






