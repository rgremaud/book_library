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

/*
function printLibrary() {
  let list = document.getElementById("myList");
  for (i = 0; i < myLibrary.length; i++) {
    let li = document.createElement('li');
    li.innerText = myLibrary[i].title;
    list.appendChild(li);
  }
}

document.getElementById('addBook').addEventListener('click', addBookToLibrary);
*/

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
  bookForm.close
}
)