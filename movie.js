
const firebaseConfig = {
apiKey: "AIzaSyArQNG0LYfk7_Qgx0_NcZn47S8IFqUPeeI",
authDomain: "movie1-9e5e3.firebaseapp.com",
projectId: "movie1-9e5e3",
storageBucket: "movie1-9e5e3.appspot.com",
messagingSenderId: "1024472695387",
appId: "1:1024472695387:web:0dca3cbdac4f5dc411357e",
measurementId: "G-T46G25NKW1"
};
 <script>
    const apiKey = "c956160951ee4286746ba263f995b35f"
    const URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=YOUR_API_KEY&page=1"
    const imgURL = "https://cdn.glitch.global/fc8a1bea-734a-45b3-836b-b4634f3a7743/WhatsApp%20Image%202023-09-28%20at%2012.44.16%20PM.jpeg?v=1695885902028"
    const imgURL = https:"https://cdn.glitch.global/fc8a1bea-734a-45b3-836b-b4634f3a7743/WhatsApp%20Image%202023-09-28%20at%201.59.00%20PM.jpeg?v=1695891197886"
    const searchURL = "https://api.themoviedb.org/3/search/movie?&api_key=YOUR_API_KEY&query="
    const form = document.getElementById("search-form")
    const query = document.getElementById("query")
    const director = document.getElementById("director")
    const root = document.getElementById("root")
    let movies = [],
      page = 1,
      inSearchPage = false

    async function fetchData(URL) {
      try {
        const data = await fetch(URL).then((res) => res.json())
        return data
      } catch (error) {
        console.log(error.message)
        return null
      }
    }

    const fetchAndShowResults = async (URL) => {
      const data = await fetchData(URL)
      data && showResults(data.results)
    }

    const getSpecificPage = (page) => {
      const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`
      fetchAndShowResults(URL)
    }

    const movieCard = (movie) =>
      `<div class="col">
          <div class="card">
            <a class="card-media" href="./img-01.jpeg">
              <img src="${movie.poster_path}" alt="Movie Poster" width="100%" />
            </a>

            <div class="card-content">
              <div class="card-cont-header">
                <div class="cont-left">
                  <h3 style="font-weight: 600">${movie.original_title}</h3>
                  <span style="color: #12efec">Director: ${movie.director}</span>
                </div>
                <div class="cont-right">
                  <a href="${movie.poster_path}" target="_blank" class="btn">See image</a>
                </div>
              </div>

              <div class="describe">
                ${movie.overview}
              </div>
            </div>
          </div>
        </div>`

    const showResults = (items) => {
      let content = !inSearchPage ? root.innerHTML : ""
      if (items && items.length > 0) {
        items.map((item) => {
          let {
            poster_path,
            original_title,
            release_date,
            overview
          } = item

          if (poster_path) {
            poster_path = imgURL + poster_path
          } else {
            poster_path = "./img-01.jpeg"
          }

          if (original_title.length > 15) {
            original_title = original_title.slice(0, 15) + "..."
          }

          if (!overview) {
            overview = "No overview yet..."
          }

          if (!release_date) {
            release_date = "No release date"
          }

          const movieItem = {
            poster_path,
            original_title,
            release_date,
            overview,
            director: director.value || "N/A"
          }

          content += movieCard(movieItem)
        })
      } else {
        content += "<p></p>"
      }

      root.innerHTML = content
    }

    const handleLoadMore = () => {
      getSpecificPage(++page)
    }

    const detectEndAndLoadMore = (e) => {
      let el = document.documentElement
      if (
        !inSearchPage &&
        el.scrollTop + el.clientHeight == el.scrollHeight
      ) {
        console.log("BINGO!")
        handleLoadMore()
      }
    }

    form.addEventListener("submit", async (e) => {
      inSearchPage = true
      e.preventDefault()
      const searchTerm = query.value
      const directorName = director.value
      const searchQuery = searchTerm ? `&query=${searchTerm}` : ""
      const directorQuery = directorName ? `&with_crew=${directorName}` : ""
      const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}${searchQuery}${directorQuery}`
      fetchAndShowResults(searchURL)
      query.value = ""
      director.value = ""
    })

    window.addEventListener("scroll", detectEndAndLoadMore)

    function init() {
      inSearchPage = false
      fetchAndShowResults(URL)
    }

    init();
  </script>