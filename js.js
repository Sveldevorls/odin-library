const newBookDialog = document.body.querySelector("dialog");
const newBookAdd = document.body.querySelector("#newbook-add");
const newBookCancel = document.body.querySelector("#newbook-cancel");
const newBookSubmit = document.body.querySelector("#newbook-submit");
const newBookForm = document.forms["newbook-form"]

const myLibrary = [];
let bookID = 0;

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
        let thisBook = addBookToLibrary(formData.get("title"),
                         formData.get("author"),
                         parseInt(formData.get("pages"), 10),
                         formData.get("read") == "yes" ? true : false,
                         parseInt(bookID, 10));
        renderBook(thisBook);
        bookID += 1;
    }
})

// constructor
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read, bookID) {
    let newBook = new Book(title, author, pages, read, bookID);
    myLibrary.push(newBook);
    return newBook;
}


const booksDisplay = document.body.querySelector(".display");

function renderBook(book) {
    let card = document.createElement("div");
    card.className = "card";
    card.id = book.id;
    let title = document.createElement("p");
    title.innerText = book.title;
    title.className = "title"
    let author = document.createElement("p");
    author.innerText = `by ${book.author}`;
    let pages = document.createElement("p");
    pages.innerText = book.pages == 1? `${book.pages} page` : `${book.pages} pages`;
    let read = document.createElement("p");
    read.innerText = book.read ? "Read ✔" : "Not read ✘";
    read.className = book.read ? "read yes" : "read no";
    let readToggle = document.createElement("button");
    readToggle.innerText = book.read ? "Mark as not read" : "Mark as read";
    readToggle.className = book.read ? "read no" : "read yes";
    readToggle.addEventListener("click", (e) => {
        let thisButton = e.target;
        let thisBookID = thisButton.parentNode.id;
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == thisBookID) {
                book.read = !book.read;
            } 
        }
        thisButton.innerText = book.read ? "Mark as not read" : "Mark as read";
        thisButton.className = book.read ? "read no" : "read yes";
        read.innerText = book.read ? "Read ✔" : "Not read ✘";
        read.className = book.read ? "read yes" : "read no";
    })
    let removeButton = document.createElement("button");
    let targetID = 0;
    removeButton.innerText = "Remove this book";
    removeButton.addEventListener("click", (e) => {
        let removalID = e.target.parentNode.id;
        for (let i = 0; i < myLibrary.length; i++) {
            console.log(myLibrary[i])
            if (myLibrary[i].id == removalID) {
                targetID = i;
            } 
        }
        myLibrary.splice(targetID, 1)
        e.target.parentNode.remove();
    })
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(readToggle);
    card.appendChild(removeButton);
    booksDisplay.appendChild(card);
}