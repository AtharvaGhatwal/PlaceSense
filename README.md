# 🌍 PlaceSense

![GitHub stars](https://img.shields.io/github/stars/AtharvaGhatwal/customer-churn-analysis)
![GitHub issues](https://img.shields.io/github/issues/AtharvaGhatwal/customer-churn-analysis)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Google Maps API](https://img.shields.io/badge/Google%20Maps-API-green?logo=googlemaps)

**PlaceSense** is a modern, location-aware place discovery app built with **React + Vite** and **Google Maps API**.  
It helps users find nearby places based on mood, distance, and ratings — with real-time maps, routes, and directions.

---

### 🧠 Project Motivation

PlaceSense was built to explore real-world usage of Google Maps APIs, improve UI/UX design skills, and create a practical, interactive location-based web experience.

---

## ✨ Features

- 📍 **Live Location Detection** (with fallback)
- 🗺️ **Interactive Google Maps**
- 🛣️ **In-app Route Drawing**
- 🧭 **Open Directions in Google Maps**
- 🎯 **Mood-based Filtering** (Work, Date, Quick Bite, Budget)
- ⭐ **Sort by Rating or Distance**
- 🔍 **Instant Search**
- 🧊 **Glassmorphism UI**
- 📱 **Responsive & Mobile-Friendly**

---

## 🧠 How It Works

1. Detects user location using the browser’s Geolocation API  
2. Loads Google Maps + Places API
3. Fetches nearby places in real time
4. Calculates distance using the Haversine formula
5. Allows:
   - focusing places on the map
   - drawing routes directly on the map
   - opening full navigation in Google Maps
   
---

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Maps:** Google Maps JavaScript API, Places API, Directions API
- **Styling:** Custom CSS (Glassmorphism)
- **State Management:** React Hooks
- **Build Tool:** Vite

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AtharvaGhatwal/PlaceSense.git
cd PlaceSense
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Add environment variables
Create a .env file in the root directory:
```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4️⃣ Run the app
```bash
npm run dev
```
The app will be available at:
```bash
http://localhost:5173
```
---

### 📸 Screenshots

![Map View](images/Screenshot%201.png)

![Route Mode](images/Screenshot%202.png)

![Results List](images/Screenshot%203.png)

![Mobile View](images/Screenshot%204.png)

![Full MaP View](images/Screenshot%205.png)

---

### 🚀 Future Improvements

- 📌 Save favorite places
- 🕒 Filter by open hours
- 🚶 Walking / Transit routes
- 🔐 User authentication
- 🌐 Deploy with live demo

---

### 📁 Project Structure

```
PlaceSense/
│
├── public/
│   ├── bg.mp4
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   └── (optional future components)
│   │
│   ├── data/
│   │   └── mockPlaces.js
│   │
│   ├── utils/
│   │   └── moodConfig.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── images/
│   ├── Screenshot 1.png
│   ├── Screenshot 2.png
│   ├── Screenshot 3.png
│   ├── Screenshot 4.png
│   └── Screenshot 5.png
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/AtharvaGhatwal/PlaceSense/blob/main/LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Atharva Ghatwal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

---

## 👨‍💼 Author

Atharva Ghatwal

📚 B.E. in Artificial Intelligence and Data Science

🔗  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/atharvaghatwal)

🌐 [![GitHub](https://img.shields.io/badge/GitHub-181717.svg?logo=github&logoColor=white)](https://github.com/AtharvaGhatwal)

---

## 📞 Questions or Feedback?
Feel free to open an **Issue** or submit a **Pull Request** on GitHub.

---

⭐ If you found this project helpful, consider giving the repository a star!

---

**Last Updated:** January 2026
