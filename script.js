// Define Library and Book classes

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book)
  }

  printLibrary() {
    console.log(this.books);
  }

  createBook(title, author, pages, read) {
    book = new Book(title, author, pages, read)
  }
  // removeBook
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  updateReadStatus() {
    if (this.read == "on" || this.read == "yes" || this.read == "Yes") {
      this.read = "Yes";
    }
    else {
      this.read = "No";
    }
  };
}

// form functions
function addFormBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  book.updateReadStatus();
  myLibrary.addBook(book);
}

const showButton = document.getElementById("showDialog");
const bookForm = document.getElementById("bookForm");
const outputBox = document.querySelector("output");
const submitBtn = bookForm.querySelector("#submitBtn");

showButton.addEventListener("click", () => {
  bookForm.showModal();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (title.value === "") {
    alert("The book title must be filled!")
    return false;
  } else if (author.value === "") {
    alert("The author name must be filled!")
    return false;
  } else if (pages.value <= 0) {
    alert("Please enter a valid book length")
  }
  else {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    addBookToLibrary(title, author, pages, read);
    formClear();
    tableRefresh();
    bookForm.close();
  }

});

function formClear() {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('pages').value = "";
  document.getElementById('read').checked = false;
};

// table creation functions
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function createHeaderRow(table) {
  const headerRow = document.createElement('thead');
  Object.keys(myLibrary.books[0]).forEach(key => {
    if (key == "id") {
      const th = document.createElement('th');
      th.appendChild(document.createTextNode("Remove"))
      headerRow.appendChild(th);
    }
    else {
      const th = document.createElement('th');
      th.appendChild(document.createTextNode(key));
      headerRow.appendChild(th);
    }
  });
  table.appendChild(headerRow);
};

function createTableBody(table) {
  const tableBody = document.createElement('tbody');
  tableBody.id = "tableBody";

  myLibrary.books.forEach(item => {
    const row = document.createElement('tr');
    Object.values(item).forEach(value => {
      if (getKeyByValue(item, value) == 'id') {
        const button = document.createElement('button');
        removeButton(button, value);
        row.appendChild(button);
      }
      else if (getKeyByValue(item, value) == 'read') {
        const button = document.createElement('button');
        index = myLibrary.books.indexOf(item);
        button.appendChild(document.createTextNode(`${value}`));
        button.addEventListener("click", () => {
          index = myLibrary.books.indexOf(item);
          if (value == "No" && index == myLibrary.books.indexOf(item)) {
            myLibrary.books[index].read = "Yes";
            tableRefresh();
          }
          else if (value == "Yes" && index == myLibrary.books.indexOf(item)) {
            myLibrary.books[index].read = "No";
            tableRefresh();
          }
        });
        row.appendChild(button);
      }
      else {
        const td = document.createElement('td');
        td.appendChild(document.createTextNode(value));
        row.appendChild(td);
      }
    });
    tableBody.appendChild(row);
    table.appendChild(tableBody);
  });
}

function removeButton(button, value) {
  button.appendChild(document.createTextNode('Remove'));
  button.dataset.bookId = value;
  button.addEventListener("click", () => {
    myLibrary.books.forEach(item => {
      if (item.id == button.dataset.bookId) {
        index = myLibrary.books.indexOf(item);
        myLibrary.books.splice(index, 1);
        tableRefresh();
      }
    })
  });
};

function createTable() {
  const table = document.createElement('table');
  table.id = "bookTable"

  createHeaderRow(table);

  const tableBody = document.createElement('tbody');
  tableBody.id = "tableBody";

  createTableBody(table);

  const container = document.getElementById('container')
  container.appendChild(table);
}

function tableClear() {
  const newTableBody = document.createElement('tbody');
  newTableBody.id = "tableBody";
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
}

function tableRefresh() {
  // clear the table
  const newTableBody = document.createElement('tbody');
  newTableBody.id = "tableBody";
  tableBody.parentNode.replaceChild(newTableBody, tableBody);

  // pull in new data
  myLibrary.books.forEach(item => {
    const row = document.createElement('tr');
    Object.values(item).forEach(value => {
      if (getKeyByValue(item, value) == 'id') {
        const button = document.createElement('button');
        removeButton(button, value);
        row.appendChild(button);
      }
      else if (getKeyByValue(item, value) == 'read') {
        const button = document.createElement('button');
        index = myLibrary.books.indexOf(item);
        button.appendChild(document.createTextNode(`${value}`));
        button.addEventListener("click", () => {
          index = myLibrary.books.indexOf(item);
          if (value == "No" && index == myLibrary.books.indexOf(item)) {
            myLibrary.books[index].read = "Yes";
            tableRefresh();
          }
          else if (value == "Yes" && index == myLibrary.books.indexOf(item)) {
            myLibrary.books[index].read = "No";
            tableRefresh();
          }
        });
        row.appendChild(button);
      }
      else {
        const td = document.createElement('td');
        td.appendChild(document.createTextNode(value));
        row.appendChild(td);
      }
    });
    newTableBody.appendChild(row);
  });
}

// set initial books for table
addBookToLibrary("The Devils", "Joe Abercrombie", 576, "No");
addBookToLibrary("The Way of Kings", "Brandon Sanderson", 1008, "Yes");
createTable();

