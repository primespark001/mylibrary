
# 📚 Library of Books
### Build your own books. One page at a time.

A sophisticated, client-side web application designed for bibliophiles and writers to catalog their personal collections and manage digital book metadata with ease.

---

## 🚀 Overview
**Library of Books** is a streamlined book management system that allows users to create, organize, and export book data. Built with performance and user experience in mind, the application features a persistent storage system and a modern, responsive interface that adapts to user preferences.

## ✨ Key Features
* 📖 **Dynamic Book Creation:** Generate book entries with detailed metadata, including Title, Author, Genre, Rating, and Page Count.
* 🗂 **Visual Organization:** Assign specific aesthetic colors (Red, Orange, Yellow, Green, Blue, or Grey) to book icons for quick visual identification.
* 💾 **Persistent Storage:** Utilizes `localStorage` to ensure your library remains intact across browser sessions without needing a backend database.
* 🌗 **Adaptive Theming:** A built-in theme engine supporting Dark and Light modes, complete with custom CSS variables for smooth transitions.
* 📥 **Data Portability:** Integrated export functionality allowing users to download book data in professional `.txt` or `.html` formats.
* 🔐 **Safety Controls:** Includes a secure "Clear Library" feature with a double-layered confirmation modal to prevent accidental data loss.

---

## 🛠️ Technical Stack
* **Frontend:** Semantic HTML5 and modern CSS3 (Flexbox/Grid).
* **Logic:** Vanilla JavaScript (ES6+) for DOM manipulation and state management.
* **Styles:** Modular CSS using custom variables for dynamic color mapping and theme switching.
* **Web Storage API:** `localStorage` for data persistence.


```

## 📂 Project Structure

library-app/
│
├── index.html   # Primary application structure and UI components
├── style.css    # Core styling, layout, and theme definitions
└── index.js     # Application logic, storage handling, and interactivity
└── README.md         # Project documentation

```

## ⚙️ Installation & Usage

* **Clone the Repository:**
    ```bash
    git clone [https://github.com/primespark001/mylibrary.git]
    ```
* **Launch:** Open `index.html` in any modern web browser.
* **Manage:** Use the **"+ Create book"** interface to add entries and the **"Clear Library"** button to reset your collection.
* **Export:** Select your preferred file type (`.txt` or `.html`) to generate a portable copy of your book's data.

---

## 🎨 UI/UX Highlights

* **Custom Notifications:** A non-intrusive alert system that provides feedback for user actions like "Deleted" or "Library Cleared".
* **Theme Continuity:** The application checks and applies the user's selected theme upon initialization for a consistent experience.
* **Responsive Design:** Optimized for various viewports using fluid layouts and scalable fonts.

---

## 🛠 Technical Implementation

### State Management & Persistence
The application employs a **"Local-First"** architecture. All book data is serialized into JSON and stored in the browser's `localStorage` under the key `'library'`. This ensures that user data persists across browser restarts and page refreshes without the overhead of a database server.

### Theme Engine
The theming system is built using CSS Custom Properties (Variables). By toggling the `.dark-theme` and `.light-theme` classes on the `<body>` element, the application instantly rebrands the entire UI logic.

```javascript
// Theme switching logic snippet
if(toggle.checked){
    document.body.classList.add('dark-theme');
} else {
    document.body.classList.add('light-theme');
}
  ```

### Data Export Logic
The project includes a robust export utility. When a user exports a book:
 * **TXT Export:** Aggregates the book's metadata and content into a structured plain-text string.
 * **HTML Export:** Wraps the book content in a standalone HTML boilerplate, including embedded styles for immediate high-quality printing or web viewing.

---

## 🎨 Design System
The visual identity relies on a high-contrast palette designed for readability and focus:

| Property | Dark Mode (Default) | Light Mode |
| :--- | :--- | :--- |
| **Background** | `#252422` | `#FFFCF2` |
| **Text** | `#FFFCF2` | `#252422` |
| **Accent** | `#EB5E28` | `#EB5E28` |
| **Secondary** | `#403D39` | `#CCC5B9` |

---

## 🧪 Development & Contributions

### How to customize colors
To modify the primary branding, navigate to `style.css` and update the `:root` variables:

```css
:root {
    --accentcolor: #your-hex-code; /* Primary Action Color */
}
```

### Planned Roadmap
- [ ] **Search & Filter:** Add a search bar to filter through large libraries.
- [ ] **Cloud Sync:** Optional Firebase/Supabase integration for multi-device sync.
- [ ] **Cover Uploads:** Ability to attach image URLs to book covers.
- [ ] **Sort Functionality:** Sort books by rating or page count.

---

### 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

1. **Fork** the Project
2. Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

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
**Your Name**
* GitHub: [@Prime Spark](https://github.com/primespark001)
* LinkedIn: [@Prime Spark](https://linkedin.com/in/primespark001)
* X: [@Prime Spark](https://x.com/primespark001)

## 🛡 License
This project is open-source. Feel free to use and modify it as you see fit!
Happy Reading! 📚
