const dialog = document.querySelector("dialog")
const bookSection = document.querySelector(".bookSection")
const bookCard = document.querySelector(".testCard")
const newBookButton = document.querySelector(".newBook")
const confirmButton = document.querySelector("#confirmButton")
const textInputs = document.querySelectorAll(`input[type="text"]`)
const checkInput = document.querySelector(".dialogCheckbox")
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

function Book(bookName, author, numberOfPages, hasRead) {
    this.bookName = bookName
    this.author = author
    this.numberOfPages = numberOfPages
    this.hasRead = hasRead
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    createBookCards()
}

// TODO use cloneNode() later on
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
})

confirmButton.addEventListener("click", (event) => {
    event.preventDefault()
    const newBook = new Book(...([...textInputs].map(input => input.value)), checkInput.checked)
    console.log(checkInput.checked)
    addBookToLibrary(newBook)
    dialog.close()
})

createBookCards()