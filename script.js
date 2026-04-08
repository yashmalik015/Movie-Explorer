const API_KEY = "f9742230"; // put your OMDb API key here

const container = document.getElementById("moviesContainer");
const loading = document.getElementById("loading");

function searchMovies() {
    const query = document.getElementById("searchInput").value;

    if (query === "") {
        alert("Please enter a movie name");
        return;
    }

    container.innerHTML = "";
    loading.classList.remove("hidden");

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            loading.classList.add("hidden");

            if (data.Response === "False") {
                container.innerHTML = "<p>No movies found</p>";
                return;
            }

            displayMovies(data.Search);
        })
        .catch(error => {
            loading.classList.add("hidden");
            console.log("Error:", error);
        });
}

function displayMovies(movies) {
    container.innerHTML = "";

    const filteredMovies = movies.filter(movie => movie.Poster !== "N/A");

    const formattedMovies = filteredMovies.map(movie => {
        return {
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        };
    });

    formattedMovies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.poster}" />
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
        `;

        container.appendChild(card);
    });
}