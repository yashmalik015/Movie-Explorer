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

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

        container.appendChild(card);
    });
}