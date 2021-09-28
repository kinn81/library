let myLibrary = [];

function Book(title, author, numPages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasBeenRead = hasBeenRead;
}

const mainPage = document.getElementById("mainPage"); //main page div container
const form = document.getElementById("myForm"); //new book form
const addNew = document.getElementById("addNew"); //add new book button
const table = document.getElementById("table"); //tabel element

//When add new button clicked, display form and blur background
addNew.addEventListener('click', () => {
    form.style.display = "block";
    mainPage.className += "blur"
});

//Add a new book to the library
function addBookToLibrary(title, author, numPages, read) {
    const book = new Book(title, author, numPages, read);
    myLibrary.unshift(book);
    addBookToTable(book);
}

//Add a new book record to the HTML table
function addBookToTable(book) {
    const tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];
    const newRow = tbodyRef.insertRow(0);

    let cellCounter = 0;
    for (const property in book) {
        var newCell = newRow.insertCell(cellCounter);
        if (property === 'title' || property === 'author' || property === 'numPages') {
            var newText = document.createTextNode(book[property]);
            newCell.appendChild(newText);
        } else if (property === 'hasBeenRead') {
            var newCheckBox = document.createElement("INPUT");
            newCheckBox.type = 'checkbox'; //newCheckBox.setAttribute("type","checkbox");
            newCheckBox.checked = book[property];
            newCell.appendChild(newCheckBox);
        } 
        cellCounter++;
    }
    var newCell = newRow.insertCell(cellCounter);
    var newDelButton = document.createElement("BUTTON");
    newDelButton.innerHTML = 'Delete';
    newCell.appendChild(newDelButton);
}


addBookToLibrary('War and Peace', 'Leo Tolstoy', '1,225', false);