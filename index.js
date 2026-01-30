
// Change Theme
function changeTheme(){
    const toggle = document.getElementById('toggle');
    const label = document.getElementById('themelabel');
    if(toggle.checked){
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        label.innerHTML = '🌙';
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        label.innerHTML = '🌕';
    }
}

// Alert
function alert(message){
    const alertContainer = document.getElementById('mess');
    alertContainer.innerHTML = message;
    alertContainer.style.top = '2em';
    clearTimeout();
    setTimeout(() => {alertContainer.style.top = '-110%'}, 3000);
}

// Book Color
function bookColor(color){
    switch(color){
        case 'Red':
            return '📕';
        case 'Orange':
            return '📙';
        case 'Yellow':
            return '📒';
        case 'Green':
            return '📗';
        case 'Blue':
            return '📘';
        case 'Grey':
            return '📓';
        case 'Pink':
            return '📔';
    }
}

// No Content HTML
function noContent(){
    return `
        <div class="nocontent">
            <span>🚫</span><i>No books.</i>
        </div>        
    `;
}

// Read & Unread Statement
function statement(status){
    return status === 'Unread' ? 'Read' : 'Unread';
}

// Book HTML
function bookTemplate(book){
    return `
        <div class="imgholder">${bookColor(book.color)}</div>
        <ul class="details">
            <li><strong>id</strong> <span>${book.id}</span></li>
            <li><strong>Title</strong> <span>${book.title}</span></li>
            <li><strong>Author</strong> <span>${book.author}</span></li>
            <li><strong>Genre</strong> <span>${book.genre}</span></li>
            <li><strong>No. of Pages</strong> <span>${book.pages}</span></li>
            <li><strong>Status</strong> <span>${book.status}</span></li>
        </ul>
        <div class="actions">
            <label for="markread" title="markread" onclick="mark(${book.id})">${statement(book.status)}</label>
            <button type="button" onclick="del(${book.id})">Del</label>
        </div>
    `;
}

// Display Books
function refresh(){
    const bookContainer = document.getElementById('bookcontainer');
    const numofBooks = document.getElementById('total');

    let library = JSON.parse(localStorage.getItem('library')) || [];
    numofBooks.innerHTML = library.length;

    if(library.length > 0){
        bookContainer.innerHTML = '';
        library.forEach(book => {
            let aBook = bookTemplate(book);
            const div = document.createElement('div');
            div.classList.add('book');
            div.innerHTML = aBook;
            bookContainer.appendChild(div);
        });
    } else {
        bookContainer.innerHTML = noContent();
    }
}
refresh();


// Book Class
class Book {
    constructor(form){
        this.id = Date.now();
        this.title = form.title.charAt(0).toUpperCase() + form.title.slice(1);
        this.author = form.author.charAt(0).toUpperCase() + form.author.slice(1);
        this.genre = form.genre;
        this.pages = form.pages;
        this.color = form.color;
        this.status = 'Unread';
    }
}

// Collect User Input
function createBook(){    
    const input = document.getElementById('form');    
    const checkBox = document.getElementById('create');    
    
    const formData = new FormData(input);
    const form = Object.fromEntries(formData);
    if(form.title && form.author && form.genre && form.pages && form.color){
        event.preventDefault();
        const book = new Book(form);

        // Library
        let library = JSON.parse(localStorage.getItem('library')) || [];
        library.unshift(book);
        localStorage.setItem('library', JSON.stringify(library));        
        alert('Book Created!');
        refresh();
        checkBox.checked = false;
    }
}

// Make as Read/Unread
function mark(id){
    let text = event.target.innerHTML;
    let library = JSON.parse(localStorage.getItem('library')) || [];
    const bookIndex = library.findIndex(book => book.id === id);

    if(bookIndex !== -1){
        library[bookIndex].status = library[bookIndex].status === 'Unread' ? 'Read' : 'Unread';
        localStorage.setItem('library', JSON.stringify(library));
        alert(text);
        refresh();
    } else {
        alert('Book not found!');
    }

}
// Make as Read/Unread
function del(id){
    let library = JSON.parse(localStorage.getItem('library')) || [];
    library = library.filter(book => book.id !== id);
    localStorage.setItem('library', JSON.stringify(library));
    alert('Deleted!');
    refresh();
}

// Clear Library
function clearLibrary(){
    const checkBox = document.getElementById('clear');
    localStorage.removeItem('library');
    alert('Library Cleared!')
    refresh();
    checkBox.checked = false;

}
