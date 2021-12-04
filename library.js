/*
** Moving to class based object

function Book(title, author, numPages, hasBeenRead, id) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasBeenRead = hasBeenRead;
}
*/

class Book {
    title;
    author;
    numPages;
    hasBeenRead;
    id;
    constructor(title, author, numPages, hasBeenRead, id) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.hasBeenRead = hasBeenRead;
    }
}

const mainPage = document.getElementById("mainPage"); //main page div container
const formOverlay = document.getElementById("overlay"); //form Overlay
const addNew = document.getElementById("addNew"); //add new book button
const table = document.getElementById("table"); //tabel element
const form = document.getElementById("myForm"); //new book form
let storage;
let myLibrary = [];

//This code runs when the page loads
if (storageAvailable('localStorage')) storage = window.localStorage;
if (storage.length > 0) {
    myLibrary = JSON.parse(storage.getItem('library'));
    refreshHTMLTable();
}

//When 'Add new book record' clicked then display form
addNew.addEventListener('click', () => {
    formOverlay.style.display = "block";
    mainPage.className += "blur";
});

formOverlay.addEventListener('click', function (e) {
    let isFormClicked = form.contains(e.target);
    if (!isFormClicked) {
        resetForm();
    }
}
);

//Add a new book to the library
function addBookToLibrary(title, author, numPages, read) {
    const book = new Book(title, author, Intl.NumberFormat().format(numPages), read);
    myLibrary.unshift(book);
    if (storage !== 'undefined') storage.setItem('library', JSON.stringify(myLibrary));
    refreshHTMLTable();
}

function refreshHTMLTable() {
    const tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];
    let newRow, newCell, newDelButton;

    // Reset the table
    tbodyRef.innerHTML = "";

    // Build the new table
    myLibrary.forEach(book => {
        newRow = document.createElement("tr");
        tbodyRef.appendChild(newRow);
        for (const property in book) { //loop through book properties adding cells to the row
            newCell = document.createElement("td");
            if (property === 'title' || property === 'author' || property === 'numPages') {
                const newText = document.createTextNode(book[property]);
                newCell.appendChild(newText);
            } else if (property === 'hasBeenRead') {
                const newCheckBox = document.createElement("INPUT");
                newCheckBox.type = 'checkbox';
                newCheckBox.checked = book[property];
                newCheckBox.addEventListener('change', updateCheckBox);
                newCell.appendChild(newCheckBox);
            }
            newRow.appendChild(newCell);
        }
        newCell = document.createElement("td");
        newDelButton = document.createElement("BUTTON");
        newDelButton.addEventListener('click', deleteBookRecord);
        newDelButton.innerHTML = 'Delete';
        newCell.appendChild(newDelButton);
        newRow.appendChild(newCell);
    }
    )
}

function updateCheckBox(e) {
    myLibrary[e.target.parentElement.parentElement.rowIndex - 1].hasBeenRead = e.target.checked;
    console.log('in here!');
    if (storage !== 'undefined') storage.setItem('library', JSON.stringify(myLibrary));
}

function deleteBookRecord(e) {
    myLibrary.splice(e.currentTarget.parentElement.parentElement.rowIndex - 1, 1);
    if (storage !== 'undefined') storage.setItem('library', JSON.stringify(myLibrary));
    refreshHTMLTable();
}

function submitForm(that) {
    addBookToLibrary(that.title.value, that.author.value, that.pages.value, that.read.checked);
    resetForm();
}

function resetForm() {
    document.getElementById("formData").reset();
    formOverlay.style.display = "none";
    mainPage.classList.remove("blur");
}

//Function to test whether localStorage is available in the browser
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

