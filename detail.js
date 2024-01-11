const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const rating = urlParams.get('rating');
const language = urlParams.get('language');
const premiered = urlParams.get('premiered');
const image = urlParams.get('image');
const description = urlParams.get('description');
let genre = urlParams.get('genre');
const name = urlParams.get('name');

const showAlldetails=document.createElement('div')
const showAlldata=document.createElement('div')
showAlldetails.classList.add('showall')
const showDetails = document.querySelector('.show-details');
const showimg=document.createElement('img')
const heading=document.createElement('h1')
const genres=document.createElement('h4')
heading.classList.add('name')
const heading3=document.createElement('h3')
const headingpremiered=document.createElement('p')
const showdescription = document.createElement('p');

showimg.src=image;
heading.innerText=name;
headingpremiered.innerText=premiered
heading3.innerText=`${rating} ${language}  `
genres.innerText=` ${genre} `;
showdescription.innerHTML = ` ${description}`;

showAlldetails.appendChild(showimg);
showAlldata.appendChild(heading);
showAlldata.appendChild(headingpremiered);
showAlldata.appendChild(heading3);
showAlldata.appendChild(genres);


showAlldata.appendChild(showdescription);


showDetails.appendChild(showAlldetails);
showDetails.appendChild(showAlldata);



// Show recomendation*****************
const horrorshow = async (generyname)=>{

    const Tv=document.querySelector(`.${generyname}`)
    const URL=`https://api.tvmaze.com/search/shows?q=${genre[0]}`
    let response= await fetch(URL);
    let horrorShows= await response.json();
   
    horrorShows.forEach((horror) => {
        const showDiv = document.createElement("div");
        showDiv.classList.add("imgdiv")
         
        const image = document.createElement('img');
        if (horror.show.image) {
            image.src = horror.show.image.medium;
            image.classList.add('img');
            showDiv.appendChild(image);
            Tv.appendChild(showDiv);

         
        }
        
    });
    addEventListenerToImages();
}


horrorshow("recomend")



// Function to add event listener to every image
const addEventListenerToImages = () => {
    const images = document.querySelectorAll('.imgdiv img');
    images.forEach(img => {
        img.addEventListener('click', imageClickHandler);
    });
};

const imageClickHandler = async (event) => {
    const URL = `https://api.tvmaze.com/search/shows?q=${genre[0]}`;
    try {
      let response = await fetch(URL);
      let horrorShows = await response.json();
  
      const showDetails = document.querySelector('.show-details');
      showDetails.innerHTML = ''; // Clear previous content
  
      horrorShows.forEach((horror) => {
        if (horror.show.image && horror.show.image.medium === event.target.src) {
          const showAlldetails = document.createElement('div');
          showAlldetails.classList.add('showall');
  
          const showAlldata = document.createElement('div');
  
          const showimg = document.createElement('img');
          showimg.src = horror.show.image.medium;
  
          const heading = document.createElement('h1');
          heading.classList.add('name');
          heading.innerText = horror.show.name;
  
          const heading3 = document.createElement('h3');
          heading3.innerText = `${horror.show.rating.average ||''} ${horror.show.language||''}`;
  
          const genres = document.createElement('h4');
          genres.innerText = `${horror.show.genres||''}`;
  
          const showdescription = document.createElement('p');
          showdescription.innerHTML = `${horror.show.summary||'This is an amazing show. It is based on the real life situations. You wil not be disappointed after watching this show. You can trust me I am Batman.'}`;
  
          showAlldetails.appendChild(showimg);
          showAlldata.appendChild(heading);
          showAlldata.appendChild(heading3);
          showAlldata.appendChild(genres);
          showAlldata.appendChild(showdescription);
  
          showDetails.appendChild(showAlldetails);
          showDetails.appendChild(showAlldata);
        }
      });
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  