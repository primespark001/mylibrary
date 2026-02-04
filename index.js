
// Change Theme
function changeTheme(){
    const toggle = document.getElementById('toggle');
    const label = document.querySelectorAll('.toggle');
    if(toggle.checked){
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        label.forEach(el => {
            el.style.backgroundColor = el.style.borderColor = 'var(--accentcolor)';
        });
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}
changeTheme();

// Alert
function alert(message){
    const alertContainer = document.getElementById('mess');
    alertContainer.innerHTML = message;
    alertContainer.style.top = '2em';
    clearTimeout();
    setTimeout(() => {alertContainer.style.top = '-110%'}, 5000);
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
    }
}

// No Content HTML
function noContent(){
    return `
        <div class="nocontent">
            <span>⨂</span><i>No books.</i>
        </div>        
    `;
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
            <li><strong>Rated</strong> <span>${book.rated}</span></li>
            <li>
                <strong>Pages</strong> <span>${book.pages.length}</span>
                <strong>File ext</strong> <span>${book.ext}</span>
            </li>
            <li><strong>CreatedAt</strong> <span>${book.createdAt}</span></li>
            <li><strong>UpdatedAt</strong> <span>${book.updatedAt}</span></li>
        </ul>
        <div class="actions">
            <label for="read" onclick="readBook(${book.id})">Read</label>
            <label for="edit" onclick="editBook(${book.id})">Edit</label>
            <button type="button" onclick="del(${book.id})">Del</button>
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
        this.rated = form.rated;
        this.ext = form.fileType;
        this.color = form.color;
        this.createdAt = (new Date()).toLocaleString('en-NG');
        this.updatedAt = (new Date()).toLocaleString('en-NG');
        this.pages = [];
    }
}
// Page Constructor
class Page {
    constructor(text, pageIndex){
        this.number = pageIndex;
        this.content = text;
    }
}

// Collect User Input
function createBook(){    
    const input = document.getElementById('form'); 
    const checkBox = document.getElementById('create');    
    
    const formData = new FormData(input);
    const form = Object.fromEntries(formData);
    if(form.title && form.author && form.genre && form.rated && form.fileType && form.color){
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

// Edit Book
function editBook(id){
    const bookid = document.querySelectorAll('.bookid');
    const booktitle = document.querySelectorAll('.booktitle');
    const bookauthor = document.querySelectorAll('.bookauthor');
    const bookgenre = document.querySelectorAll('.bookgenre');
    const bookrated = document.querySelectorAll('.bookrated');
    const bookpages = document.querySelectorAll('.bookpages');

    const saveChangesBtn = document.getElementById('savechangesbtn');
    
    const content = document.getElementById('content');
    let library = JSON.parse(localStorage.getItem('library')) || [];
    const book = library.find(book => book.id === id);
    content.value = '';
    
    if(book){
        bookid.forEach(el => el.innerHTML = book.id);
        booktitle.forEach(el => el.innerHTML = book.title);
        bookauthor.forEach(el => el.innerHTML = book.author);
        bookgenre.forEach(el => el.innerHTML = book.genre);
        bookrated.forEach(el => el.innerHTML = book.rated);
        bookpages.forEach(el => el.innerHTML = book.pages.length);
        
        book.pages.forEach(page => {
            content.value += page.content;
        });

        saveChangesBtn.title = book.id;
    } else {
        alert('Book not found!');
    }
}

// Save Book
function saveChanges(){
    const id = event.target.title;
    const text = document.getElementById('content').value;
    
    let library = JSON.parse(localStorage.getItem('library')) || [];
    const i = library.findIndex(obj => obj.id == id);
    
    if(i !== -1){
        library[i].pages = [];
        const pages = smartSplit(text, 2000);
        pages.forEach(page => {
            const onePg = new Page(page, (pages.indexOf(page) + 1));            
            library[i].pages.push(onePg);
        });

        library[i].updatedAt = (new Date()).toLocaleString('en-NG'); 
        localStorage.setItem('library', JSON.stringify(library));

        alert('Saved!');
        refresh();
    } else {
        alert('Book not found!');
    }
}


// Smart Split
function smartSplit(text, pageSize){
    const pages = [];
    let start = 0;
    
    while(start < text.length){
        let end = start + pageSize;
        if(end < text.length){
            const lastSpace = text.lastIndexOf(' ', end);
            if(lastSpace > start) end = lastSpace;
        }

        const chunk = text.slice(start, end);
        if(chunk.length) pages.push(chunk);

        start = end;
    }

    return pages;
}


// Read Book
function readBook(id){
    const bookid = document.querySelectorAll('.bookid');
    const booktitle = document.querySelectorAll('.booktitle');
    const bookauthor = document.querySelectorAll('.bookauthor');
    const bookgenre = document.querySelectorAll('.bookgenre');
    const bookrated = document.querySelectorAll('.bookrated');
    const bookpages = document.querySelectorAll('.bookpages');

    const content = document.getElementById('pagecontent');
    
    let library = JSON.parse(localStorage.getItem('library')) || [];
    const book = library.find(obj => obj.id === id);
    
    if(book){
        bookid.forEach(el => el.innerHTML = book.id);
        booktitle.forEach(el => el.innerHTML = book.title);
        bookauthor.forEach(el => el.innerHTML = book.author);
        bookgenre.forEach(el => el.innerHTML = book.genre);
        bookrated.forEach(el => el.innerHTML = book.rated);
        bookpages.forEach(el => el.innerHTML = book.pages.length);
        
        content.innerHTML = '';

        book.pages.forEach(page => {
            const div = document.createElement('div');
            div.classList.add('page');
            div.id = `page${page.number}`;
            div.innerHTML = `
                <div class="text-content">${page.content}</div>                    
                <b>${page.number}</b>
            `;
            content.appendChild(div);
        });
    
        // Setup for scrolling
        const pageNo = document.getElementById('pageno');
        pageNo.addEventListener('change', () => {
            const num = Number(pageNo.value);
            scroll(num);
        });

        // Setup Book for Download
        const a = document.getElementById('downloadbtn');
        let blob;
        let url;

        switch (book.ext) {
            case '.txt':
                blob = downloadTXT(book);
                break;
            case '.html':
                blob = downloadHTML(book);
                break;
        }

        url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `${book.title}${book.ext}`;
        a.addEventListener('click', () =>{
            alert('Downloading...');
        });

    } else {
        alert('Book not found!');
    }
}

// Scroll page
function scroll(num){
    const page = document.getElementById(`page${num}`);
    page.scrollIntoView({behavior: 'smooth', inline: 'center'});
}

function scrollPage(direction){
    const pageNo = document.getElementById('pageno');
    const pages = document.querySelectorAll('.page');
    let num = Number(pageNo.value);
    
    switch (direction) {
        case 'prev':
            if(num > 1){
                num--;                               
            } else num = 1;
            break;
        case 'next':
            if(num < pages.length){
                num++;
            } else num = pages.length;
            break;
    }
    scroll(num);
    pageNo.value = num;
}

// Download as .txt
function downloadTXT(book){
    const txt = book.pages.sort((a, b) => a.number - b.number)
        .map(page => `Page ${page.number}\n\n${page.content}`)
        .join('\n\n=====================================\n\n');
    const text = `Title: ${book.title}\nAuthor: ${book.author}\nGenre: ${book.genre}\nRated: ${book.rated}\nPages: ${book.pages.length}\n\n${txt}`
    const filename = `${title}.txt`;
    const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
    return blob;
}

// Download as .html
function downloadHTML(book){
    const body = book.pages.sort((a, b) => a.number - b.number)
        .map(page => `
            <section>
                <h2>Page ${page.number}</h2>
                <p>${page.content.replace(/\n/g, "<br>")}</p>
            </section>
        `).join("");

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${book.title}</title>
                <style>
                    body {font-family: serif; line-height: 1.7; padding: 40px; }
                    section { page-break-after: always; }
                </style>
            </head>
            <body>
                <h2>
                    <ul>
                        <li><b>Title:</b> ${book.title}</li>
                        <li><b>Author:</b> ${book.author}</li>
                        <li><b>Genre:</b> ${book.genre}</li>
                        <li><b>Rated:</b> ${book.rated}</li>
                        <li><b>Pages:</b> ${book.pages.length}</li>
                    </ul>
                </h2>
                ${body}
            </body>
            </html>
        `;

    const filename = `${title}.html`;
    const blob = new Blob([html], {type:'text/html'});
    return blob;
}

// Delete Book
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
