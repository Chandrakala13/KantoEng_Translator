# Kannada to English Translator

A full-stack translation application with Node.js backend and React frontend.

## Project Structure

```
KantoEng_Translator/
├── server/           # Node.js backend
│   ├── index.js      # Express server with translation API
│   └── package.json
└── client/           # React frontend
    ├── src/
    │   ├── App.jsx   # Main translator component
    │   ├── main.jsx  # React entry point
    │   └── index.css # Styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation & Running

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Start Backend Server

```bash
npm start
```
Server will run on `http://localhost:5000`

### 3. Install Frontend Dependencies (in a new terminal)

```bash
cd client
npm install
```

### 4. Start Frontend Development Server

```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Enter Kannada text in the input field
3. Click "Translate" button
4. English translation will appear in the output field

## Features

- Kannada to English translation
- Clean, modern UI with gradient background
- Swap button to use translation as input
- Clear button to reset fields
- Error handling for failed translations
- Responsive design for mobile devices