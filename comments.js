let submit_button = document.getElementById("submit-button")
let clear_button = document.getElementById("clear-button")
let file_input = document.getElementById("file-input")
let image = null

var before_loadtime = new Date().getTime();
window.onload = () => {
    loadComments()
    var after_loadtime = new Date().getTime();
    load_time = (after_loadtime - before_loadtime) / 1000
    setActive()
    document.getElementsByClassName("footer__load-time")[0].innerHTML = "Page load time: " + load_time
};

file_input.onchange = function(event) {
    file = file_input.files[0]
    const reader = new FileReader();
        
    reader.addEventListener('load', function(e) {
        image = reader.result;
    });

    if (file) {
        reader.readAsDataURL(file)
    }
}

function loadComments() {
    comments = localStorage.getItem("comments")
    if (!comments) {
        return
    }

    comments = JSON.parse(comments)
    for (let i = 0; i < comments.length; ++i) {
        showComment(comments[i])
    }
}

function showComment(comment_value) {
    let comments = document.getElementById("comments")

    let comment = document.createElement('div')
    comment.classList.add('comment')

    let comment_image = document.createElement('img')
    comment_image.src = comment_value.image
    comment_image.classList.add("comment__image")

    let comment_title = document.createElement('h2')
    comment_title.textContent = comment_value.user
    comment_title.classList.add("comment__name")
    
    let comment_text = document.createElement('a')
    comment_text.text = comment_value.text
    comment_text.classList.add("comment__text")

    comment.appendChild(comment_image)
    comment.appendChild(comment_title)
    comment.appendChild(comment_text)

    comments.appendChild(comment)
}

function saveToLocalStorage(comment) {
    let comments = localStorage.getItem("comments")
    let list_of_comments = null
    if (comments) {
        list_of_comments = JSON.parse(comments)
        console.log(list_of_comments)
        list_of_comments.push(comment)
    } else {
        list_of_comments = [comment]
    }

    localStorage.setItem("comments", JSON.stringify(list_of_comments))
}


submit_button.addEventListener("click", function(event) {
    event.preventDefault()
    
    let input_box = document.getElementById("input-box")

    if (image == null || input_box.value == null || input_box.value == "") {
        alert("Please write something in comment and add photo")
        return
    }

    let comment_value = {
        user: "User",
        text: input_box.value,
        image: image
    }

    saveToLocalStorage(comment_value)

    document.getElementById("comment-section").reset()

    showComment(comment_value)

    image = null
});

clear_button.addEventListener("click", function(event){
    event.preventDefault()

    const container = document.getElementById("comments");
    localStorage.removeItem("comments");
    for (let i = container.children.length - 1; i >= 2; i--) {
        container.removeChild(container.children[i]);
    }
});