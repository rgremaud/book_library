const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary() {
    let title = prompt("Enter your book title ");
    let author = prompt("Enter author");
    let pagesString = prompt("Enter the number of pages");
    let pages = parseInt(pagesString);
    let read = prompt("Have you read the book");
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}