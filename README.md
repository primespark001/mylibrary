# 📚 Library of Books

A simple, interactive **Library Management Web App** built with **HTML, CSS, and Vanilla JavaScript**.  
The application allows users to create, view, update, and delete books, with data persisted using **Browser Local Storage**.

---

## 🚀 Features

- 📖 **Create Books** with title, author, genre, number of pages, and color  
- 🗂 **View Library** with all saved books  
- 🔁 **Mark Books as Read / Unread**  
- ❌ **Delete Individual Books**  
- 🗑 **Clear Entire Library** (with confirmation)  
- 🌗 **Dark & Light Theme Toggle**  
- 💾 **Persistent Storage** using `localStorage`  
- ⚡ **Instant UI Updates** without page reloads  

---

## 🛠 Technologies Used

- **HTML5** – Structure and layout  
- **CSS3** – Styling and themes (light & dark mode)  
- **JavaScript (ES6)** – Application logic and DOM manipulation  
- **Web Storage API** – `localStorage` for data persistence  

---

## 📂 Project Structure

```
library-app/
│
├── index.html        # Main HTML structure
├── index.js          # JavaScript logic
├── style.css         # Application styling
└── README.md         # Project documentation
```

---

## 🧠 How It Works

### 1️⃣ Book Creation
- Users fill out a form with book details  
- On submission:
  - A `Book` object is created
  - A unique ID is generated using `Date.now()`
  - The book is stored in `localStorage`

### 2️⃣ Data Storage
- All books are stored under the key:
  ```js
  localStorage.setItem('library', JSON.stringify(library))
  ```
- Data persists even after page refresh

### 3️⃣ Rendering Books
- On page load, the app:
  - Reads from `localStorage`
  - Dynamically renders books to the DOM
  - Displays a “No books” message if the library is empty

### 4️⃣ Read / Unread Toggle
- Each book can be marked as **Read** or **Unread**
- Status is updated in `localStorage` and re-rendered instantly

### 5️⃣ Theme Switching
- A checkbox toggles between:
  - 🌙 Dark Theme
  - 🌕 Light Theme
- Themes are applied by switching CSS classes on `<body>`

---

## 📘 Book Object Structure

```js
{
  id: Number,
  title: String,
  author: String,
  genre: String,
  pages: Number,
  color: String,
  status: "Read" | "Unread"
}
```

---

## 🎨 Book Color Mapping

| Color  | Icon |
|------|------|
| Red | 📕 |
| Orange | 📙 |
| Yellow | 📒 |
| Green | 📗 |
| Blue | 📘 |
| Grey | 📓 |
| Pink | 📔 |

---

## ▶️ How to Run the Project

1. Clone or download the project  
2. Open `index.html` in any modern web browser  
3. Start adding books 🚀  

> No server or build tools required.

---

## ⚠️ Notes & Limitations

- Data is stored **per browser**
- Clearing browser storage will erase the library
- Intended for learning and small-scale use

---

## 🌱 Possible Improvements

- User authentication  
- Cloud-based database (Firebase / MongoDB)  
- Search and filter books  
- Edit book details  
- Responsive mobile-first layout  

---

## 👤 Author

**Prime Spark**  
© 2026
