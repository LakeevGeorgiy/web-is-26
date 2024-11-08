function fetchData() {

    let cntRequests = localStorage.getItem("cntRequests")
    if (cntRequests) {
        cntRequests %= 50
        ++cntRequests
    } else {
        cntRequests = 1
    }

    localStorage.setItem("cntRequests", cntRequests)
    cntRequests *= 100

    for (let i = 0; i < 2; ++i) {
        fetch('https://jsonplaceholder.typicode.com/photos/' + (cntRequests + 1))
        .then((response) => {
            document.getElementById('preloader').classList.add("none")
            return response.json()
        })
        .then((data) => {
            let comment_value = {
                user: "User",
                text: data.title,
                image: data.url + '.png'
            }
            showComment(comment_value)
            document.getElementById("fetch-error").classList.remove("visible")
            document.getElementById("fetch-error").classList.add("none")
        })
        .catch((error) => {
            document.getElementById("fetch-error").classList.remove("none")
            document.getElementById("fetch-error").classList.add("visible")

        });
    }
}

fetchData()