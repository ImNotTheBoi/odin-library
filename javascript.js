const dialog = document.querySelector("dialog")
const bookSection = document.querySelector(".bookSection")
const bookCard = document.querySelector(".testCard")
const newBookButton = document.querySelector(".newBook")
const confirmButton = document.querySelector("#confirmButton")
const textInputs = document.querySelectorAll(`input[type="text"]`)
const checkInput = document.querySelector(".dialogCheckbox")
const errorContent = document.querySelector(".errorContent")
console.log(checkInput.checked)
console.log(checkInput)

const myLibrary = [
    {
        bookName: "The Diary of a Wimpy Kid",
        author: "Jeff Kinney",
        numberOfPages: "221",
        hasRead: true
    }, 
    {
        bookName: "Harry Potter and the Philosopher's Stone",
        author: "J. K. Rowling",
        numberOfPages: "309",
        hasRead: true
    }
    ];

class Book {
    constructor(bookName, author, numberOfPages, hasRead) {
        [this.bookName, this.author, this.numberOfPages, this.hasRead] = [bookName, author, numberOfPages, hasRead]
    }
    
    get bookInfo() {
        return {
            bookName: this.bookName,
            author: this.author,
            numberOfPages: this.numberOfPages,
            hasRead: this.hasRead
        }
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    createBookCards()
}

function createBookCards() {
    // * Deletes Books
    const books = document.querySelectorAll(".bookCard")
    console.log(myLibrary)
    books.forEach((element) => bookSection.removeChild(element))
    // * Creates Books
    myLibrary.forEach((book) => {
        const newCard = bookCard.cloneNode(true)
        const heroText = newCard.querySelector(".cardHeroText")
        const authorText = newCard.querySelector(".author")
        const pagesText = newCard.querySelector(".pages")
        const deleteButton = newCard.querySelector("button")
        const hasReadButton = newCard.querySelector("input")
        newCard.classList.add("bookCard")
        heroText.textContent = book.bookName
        authorText.textContent = `By ${book.author},`
        pagesText.textContent = `${book.numberOfPages} Pages`
        hasReadButton.checked = book.hasRead
        deleteButton.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book), 1)
            createBookCards()
            console.log(myLibrary)
        })
        hasReadButton.addEventListener("click", () => {
            console.log("yes")
            book.hasRead = !book.hasRead
            hasReadButton.checked = book.hasRead
        })
        newCard.style.display = "flex"
        bookSection.appendChild(newCard)
    })
}

newBookButton.addEventListener("click", () => {
    dialog.showModal()
    errorContent.textContent = ""
})

confirmButton.addEventListener("click", (event) => {
    if (checkForm() === false) {event.preventDefault()}
    else {
        console.log("closing dialog")
        event.preventDefault()
        const newBook = new Book(...([...textInputs].map(input => input.value)), checkInput.checked)
        console.log(checkInput.checked)
        console.log(newBook.bookInfo)
        addBookToLibrary(newBook.bookInfo)
        dialog.close()
    }
})

createBookCards()

let validity;
function checkForm() {
    validity = true;
    [...textInputs].forEach(input => {
        input.setCustomValidity("")
        if (!input.validity.valid) {    
            console.log("error")
            showError(input)
            validity = false
        }
    })
    return validity
}

//** Form Validation */
function showError(input) {
    if (input.validity.valueMissing) {
        errorContent.textContent = ((input.id.charAt(0).toUpperCase() + input.id.slice(1)) + " is missing")
    }
    else {}
}