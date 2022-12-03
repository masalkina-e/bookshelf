const modalWindow = document.getElementById('modal-window')
const openModalButton = document.getElementById('button-add')
const closeModalButton = document.getElementById('button-close-form')
const myError = document.getElementById("error")

function closeModal() {
    modalWindow.style.display = "none"
    myError.innerHTML = ""
}

function openModel() {
    modalWindow.style.display = "flex"
    cleanForm()
}

closeModalButton.addEventListener('click', closeModal)
openModalButton.addEventListener('click', openModel)

let books = [
    {
      id:1,
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      authors: 'Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm',
      year: '1994',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg'
    },
    {
      id: 2,
      title: 'JavaScript: The Good Parts',
      authors: 'Douglas Crockford',
      year: '2008',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'
    },
    {
      id: 3,
      title:
      'JavaScript Patterns: Build Better Applications with Coding and Design Patterns',
      authors: 'Stoyan Stefanov',
      year: 2008,
      image:
      'https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg'
    },
    {
      id: 4,
      title:
      'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)',
      authors: 'David Flanagan',
      year: 2011,
      image:
      'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg'
    }
]

const container = document.getElementById('container')

function renderBooks() {
    container.innerHTML =""
    books.forEach((book) => {
        container.innerHTML += `
        <div class="books">
          <img src="${book.image}" class="image-book"/img>
          <p class="book-title">${book.title}</p>
          <p class="book-year">${book.year}</p>
          <p class="book-authors">${book.authors}</p>

          <div class="container-buttons">
          <button class="button-edit button-edit-change">Изменить</button>
          <button onclick="deleteBook(${book.id})" class="button-edit button-edit-delete">Удалить</button>
          </div> 
        </div>  
        `
    })
}

    // <button id=`button-delete-${book.id}` class="button-edit button-edit-delete">Удалить</button>
    
    // books.forEach((book) => {
    //   const deleteButton = document.getElementById("button-delete-${book.id}")

    //   function makeDelete() {
    //     deleteBook(book.id)
    //   }

    //   deleteButton.addEventListener('click', makeDelete)
    // })

function cleanForm() {
    document.getElementById("title").value = ""
    document.getElementById("authors").value = ""
    document.getElementById("year").value = ""
    document.getElementById("image").value = ""
}

function saveToLocalStorage() {
    const booksJson = JSON.stringify(books)
    localStorage.setItem('books', booksJson)
}

function deleteBook(id) {
    const book = books.find((book) => {
        return book.id === id
    })

    const bookIndex = books.indexOf(book)
    books.splice(bookIndex, 1)
    renderBooks()

    saveToLocalStorage()

    }

function saveBook() {
    const myError = document.getElementById("error")
    const titleValue = document.getElementById("title").value
    const authorsValue = document.getElementById("authors").value
    const yearValue = document.getElementById("year").value
    const imageValue = document.getElementById("image").value

    if (titleValue.length > 0 && authorsValue.length > 0 && yearValue.length > 0 && imageValue.length > 0) {
        const book = {
            title: titleValue,
            authors: authorsValue,
            year: yearValue,
            image: imageValue
        }
        
        books.push(book)
        renderBooks()
        closeModal()
        myError.innerHTML = ""

        saveToLocalStorage()
        
    } else {
        myError.innerHTML = "Необходимо заполнить все поля"
        return
    }
}

const saveBookButton = document.getElementById("button-save")
saveBookButton.addEventListener('click', saveBook)

const booksJson = localStorage.getItem('books')
if (booksJson) {
    books = JSON.parse(booksJson)
}

renderBooks()