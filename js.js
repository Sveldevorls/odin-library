const newBookDialog = document.body.querySelector("dialog");
const newBookAdd = document.body.querySelector("#newbook-add");
const newBookCancel = document.body.querySelector("#newbook-cancel");
const newBookSubmit = document.body.querySelector("#newbook-submit");
const newBookForm = document.forms["newbook-form"]

newBookAdd.addEventListener("click", () => {
    newBookDialog.showModal();
})

newBookCancel.addEventListener("click", () => {
    newBookDialog.close();
})

newBookSubmit.addEventListener("click", (e) => {
    let formIsValid = newBookForm.checkValidity();
    if (formIsValid) {
        e.preventDefault();
        let formData = new FormData(newBookForm);
        addBookToLibrary(formData.get("title"),
                         formData.get("author"),
                         parseInt(formData.get("pages"), 10),
                         formData.get("read") == "yes" ? true : false);
    }
})

const myLibrary = [];

// constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}