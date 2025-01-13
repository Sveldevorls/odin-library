const newBookDialog = document.body.querySelector("dialog");
const newBookAdd = document.body.querySelector("#newbook-add");
const newBookCancel = document.body.querySelector("#newbook-cancel");
const newBookSubmit = document.body.querySelector("#newbook-submit");
const newBookForm = document.forms["newbook-form"]

const booksDisplay = document.body.querySelector(".display");

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

function newElement(type, ...attributesArr) {
    let thisElement = document.createElement(type);
    if (attributesArr) {
        for ([attribute, value] of attributesArr) {
            thisElement[attribute] = value;
        }
    }
    return thisElement
}

function renderBook(book) {
    let card = newElement("div", ["className", "card"], ["id", book.id]);
    let title = newElement("p", ["className", "title"], ["innerText", book.title]);
    let author = newElement("p", ["innerText", `by ${book.author}`]);
    let pages = newElement("p", ["innerText", book.pages == 1 ? `${book.pages} page` : `${book.pages} pages`]);
    let read = newElement("p", ["className", book.read ? "read yes" : "read no"],
                                ["innerText", book.read ? "Read ✔" : "Not read ✘"]);
    let readToggle = newElement("button", ["className", book.read ? "read no" : "read yes"],
                                           ["innerText", book.read ? "Mark as not read" : "Mark as read"]);
    let removeButton = newElement("button", ["innerText", "Remove this book"])
    
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

    removeButton.addEventListener("click", (e) => {
        let removalID = e.target.parentNode.id;
        let targetID = 0;
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == removalID) {
                targetID = i;
            } 
        }
        myLibrary.splice(targetID, 1)
        e.target.parentNode.remove();
    })

    for (childElement of [title, author, pages, read, readToggle, removeButton]) {
        card.appendChild(childElement);
    }

    booksDisplay.appendChild(card);
}