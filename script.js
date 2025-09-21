/*
General flow:
  button with event listener - click and prompt the user to enter a book with a form.
    form has the following fields: title, author, pages, read
  submitting the form then calls addBookToLibrary with the fields populated
  table included that refreshes to display all books in myLibrary

*/

const myLibrary = [];

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
  bookForm.close();
});


function createTable() {
  const table = document.createElement('table');
  table.setAttribute('border', '1');

  const headerRow = document.createElement('tr');
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
      table.appendChild(row);
    });

  document.body.appendChild(table);
}

// set initial books for table
addBookToLibrary("The Devils", "Joe Abercrombie", 576, "No");
addBookToLibrary("The Way of Kings", "Brandon Sanderson", 1008, "Yes");
createTable();

// add an option to refresh the data on the table