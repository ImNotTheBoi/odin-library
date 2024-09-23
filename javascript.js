const dialog = document.querySelector("dialog")
const bookSection = document.querySelector(".bookSection")
const newBookButton = document.querySelector(".newBook")
const confirmButton = document.querySelector("#confirmButton")
const inputs = document.querySelectorAll("input")

const myLibrary = [
    {
        bookName: "The Diary of a Wimpy Kid",
        author: "Jeff Kinney",
        numberOfPages: "221",
        hasRead: "on"
    }, 
    {
        bookName: "Harry Potter and the Philosopher's Stone",
        author: "J. K. Rowling",
        numberOfPages: "309",
        hasRead: "on"
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
    books.forEach((element) => bookSection.removeChild(element))
    console.log(books)
    // * Creates Books
    myLibrary.forEach((book) => {
        const newCard = document.createElement("div")
        newCard.classList.add("bookCard")
        newCard.textContent = `${book.bookName} by ${book.author}, ${book.numberOfPages} pages, ${book.hasRead}`
        const newDeleteButton = document.createElement("button")
        newDeleteButton.textContent = "Delete"
        newDeleteButton.classList.add("deleteButton")
        newDeleteButton.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book), 1)
            createBookCards()
            console.log(myLibrary)
        })
        newCard.append(newDeleteButton)
        console.log(bookSection)
        bookSection.appendChild(newCard)  
    })
}


newBookButton.addEventListener("click", () => {
    dialog.showModal()
})

confirmButton.addEventListener("click", (event) => {
    event.preventDefault()
    const newBook = new Book(...([...inputs].map(input => input.value)))
    addBookToLibrary(newBook)
    dialog.close()
})

createBookCards()