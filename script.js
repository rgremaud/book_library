/*
General flow:
  button with event listener - click and prompt the user to enter a book with a form.
    form has the following fields: title, author, pages, read
  submitting the form then calls addBookToLibrary with the fields populated
  table included that refreshes to display all books in myLibrary

*/

// initial library value
const myLibrary = [];

// object constructor 
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}


function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// book form functions
const showButton = document.getElementById("showDialog");
const bookForm = document.getElementById("bookForm");
const outputBox = document.querySelector("output");
const submitBtn = bookForm.querySelector("#submitBtn");

showButton.addEventListener("click", () => {
  bookForm.showModal();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').value;
  addBookToLibrary(title, author, pages, read);
  // re-factor to move this to a seperate function
  formClear();
  bookForm.close();
});

function formClear() {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('pages').value = "";
  document.getElementById('read').value = "";
}

// table creation


function createTable() {
  const table = document.createElement('table');
  table.id = "bookTable"
  table.setAttribute('border', '1');

  const headerRow = document.createElement('thead');
  Object.keys(myLibrary[0]).forEach(key => {
    if (key == "id") {
      // do nothing
    }
    else {
      const th = document.createElement('th');
      th.appendChild(document.createTextNode(key));
      headerRow.appendChild(th);
    }
  });
  table.appendChild(headerRow);

  const tableBody = document.createElement('tbody');
  tableBody.id = "tableBody";
  myLibrary.forEach(item => {
    const row = document.createElement('tr');
    Object.values(item).forEach(value => {
      if (value == "id") {
        // do nothing
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

  document.body.appendChild(table);
}

function tableRefresh() {
  const newTableBody = document.createElement('tbody');
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
}

// set initial books for table
addBookToLibrary("The Devils", "Joe Abercrombie", 576, "No");
addBookToLibrary("The Way of Kings", "Brandon Sanderson", 1008, "Yes");
createTable();

