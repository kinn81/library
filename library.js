const myLibrary = [];

function Book(title, author, numPages, hasBeenRead, id) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasBeenRead = hasBeenRead;
}

const mainPage = document.getElementById("mainPage"); //main page div container
const formOverlay = document.getElementById("overlay"); //form Overlay
const addNew = document.getElementById("addNew"); //add new book button
const table = document.getElementById("table"); //tabel element
const form = document.getElementById("myForm"); //new book form



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
    myLibrary[e.target.parentElement.parentElement.rowIndex -1].hasBeenRead = e.target.checked;
}

function deleteBookRecord(e) {
    myLibrary.splice(e.currentTarget.parentElement.parentElement.rowIndex - 1, 1);
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

addBookToLibrary('War and Peace', 'Leo Tolstoy', '1225', false);
