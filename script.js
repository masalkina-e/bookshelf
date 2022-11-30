const books = [
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

    function cleanForm() {
      document.getElementById("title").value = ""
      document.getElementById("authors").value = ""
      document.getElementById("year").value = ""
      document.getElementById("image").value = ""
    }

    let isOpen = false

    function addBook() {
      const newBook = document.getElementById("newBookForm")
      const addIcon = document.getElementById("addIcon")
      const closeIcon = document.getElementById("closeIcon")

      if (isOpen) {
        newBook.style.display = "none"
        addIcon.style.display = "flex"
        closeIcon.style.display = "none"
        isOpen = false
      } else {
        newBook.style.display = "flex"
        addIcon.style.display = "none"
        closeIcon.style.display = "flex"

        cleanForm()
        isOpen = true
      }   
    }

    function deleteBook(id) {
      const book = books.find((book) => {
        return book.id === id
      })

      const bookIndex = books.indexOf(book)
      books.splice(bookIndex, 1)
      renderBooks()
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

      } else {
        myError.innerHTML = "Необходимо заполнить все поля"
        return
      }
    }

    renderBooks()