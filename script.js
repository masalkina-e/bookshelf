let count = 0

let books = [
    {
      id: count++,
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      authors: 'Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm',
      year: '1994',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg'
    },
    {
      id: count++,
      title: 'JavaScript: The Good Parts',
      authors: 'Douglas Crockford',
      year: '2008',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'
    },
    {
      id: count++,
      title:
      'JavaScript Patterns: Build Better Applications with Coding and Design Patterns',
      authors: 'Stoyan Stefanov',
      year: 2008,
      image:
      'https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg'
    },
    {
      id: count++,
      title:
      'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)',
      authors: 'David Flanagan',
      year: 2011,
      image:
      'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg'
    }
]

function renderBooks() {
    const container = document.getElementById('container')

    container.innerHTML =""
    books.forEach((book) => {
        container.innerHTML += `
        <div class="books">
          <img src="${book.image}" class="image-book"/img>
          <p class="book-title">${book.title}</p>
          <p class="book-year">${book.year}</p>
          <p class="book-authors">${book.authors}</p>
          
          <div class="container-buttons">
          <button id="button-edit-${book.id}" class="button-edit button-edit-change">Изменить</button>
          <button id="button-delete-${book.id}" class="button-edit button-edit-delete">Удалить</button>
          </div> 
        </div>  
        `
    })

    books.forEach((book) => {
        const deleteButton = document.getElementById(`button-delete-${book.id}`)

        function makeDelete() {
            deleteBook(book.id)
        }
        deleteButton.addEventListener('click', makeDelete)

        const editButton = document.getElementById(`button-edit-${book.id}`)

        function makeOpenModalEdit() {
            openModelEdit(book.id)
          }
        editButton.addEventListener('click', makeOpenModalEdit)
      })
}

function openModel() {
    modalWindow.style.display = "flex"
    cleanForm()
    myError.innerHTML = ""
}

function closeModal() {
    modalWindow.style.display = "none"
}

function openModelEdit(id) {
    const book = books.find((book) => {
        return book.id === id
    })  

    modalWindowEdit.style.display = "flex" 

    document.getElementById("title-edit").value = book.title
    document.getElementById("authors-edit").value = book.authors
    document.getElementById("year-edit").value = book.year
    document.getElementById("image-edit").value =  book.image 
    
    function makeUpdate() {
        updateBook(id, makeUpdate)
    }

    const updateButton = document.getElementById("button-update")
    updateButton.addEventListener('click', makeUpdate)
}

function closeModalEdit() {
    modalWindowEdit.style.display = "none" 
}

function updateBook(id, makeUpdate) {
    const titleValue = document.getElementById("title-edit").value
    const authorsValue = document.getElementById("authors-edit").value
    const yearValue = document.getElementById("year-edit").value
    const imageValue = document.getElementById("image-edit").value
    const myErrorEdit = document.getElementById("error-edit")

    if (titleValue.length > 0 && authorsValue.length > 0 && yearValue.length > 0 && imageValue.length > 0) {
        const newBook = {
            id: id,
            title: titleValue,
            authors: authorsValue,
            year: yearValue,
            image: imageValue
        }
    
        const book = books.find((book) => {
            return book.id === id
        })
    
        const bookIndex = books.indexOf(book)
        books.splice(bookIndex, 1, newBook)
        renderBooks()
        closeModalEdit()
    
        const updateButton = document.getElementById("button-update")
        updateButton.removeEventListener('click', makeUpdate)
    
        saveToLocalStorage()
            
    }   else {
        myErrorEdit.innerHTML = "Необходимо заполнить все поля"
        return
    }    
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

function saveBook() {
    const myError = document.getElementById("error")
    const titleValue = document.getElementById("title").value
    const authorsValue = document.getElementById("authors").value
    const yearValue = document.getElementById("year").value
    let imageValue = document.getElementById("image").value
 
    if (titleValue.length === 0 || authorsValue.length === 0 || yearValue.length === 0) {
        myError.innerHTML = "Необходимо заполнить все обязательные поля"
        return
    }

    if (imageValue.length === 0) {
        imageValue = 'None.png'
    }

    const imageFormats = ["jpg", "png"]
    const arr = imageValue.split(".")
    const imageFormat = arr[arr.length - 1]
    const isNeedFormat = imageFormats.includes(imageFormat)

    console.log(arr, imageFormat)

    if (!isNeedFormat) {
        myError.innerHTML = "Формат изображения может быть только .png или .jpg"
        return
    }

    const book = {
      id: count++,
        title: titleValue,
        authors: authorsValue,
        year: yearValue,
        image: imageValue
    }
    
    books.push(book)
    renderBooks()
    closeModal()
    saveToLocalStorage() 
}

const saveBookButton = document.getElementById("button-save")
saveBookButton.addEventListener('click', saveBook)

const booksJson = localStorage.getItem('books')
if (booksJson) {
    books = JSON.parse(booksJson)
}

renderBooks()

const modalWindow = document.getElementById("modal-window")
const openModalButton = document.getElementById("button-add")
const closeModalButton = document.getElementById("button-close-form")
const myError = document.getElementById("error")

closeModalButton.addEventListener('click', closeModal)
openModalButton.addEventListener('click', openModel)

const modalWindowEdit = document.getElementById("modal-window-edit")
const closeModalButtonEdit = document.getElementById("button-close-form-edit")

closeModalButtonEdit.addEventListener('click', closeModalEdit)