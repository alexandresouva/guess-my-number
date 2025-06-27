<div align="center"><img src="public/demo.gif" alt="Game demo where the player enters guesses 15, 20 and correctly guesses the number 17."></div>

## 🇧🇷 Portuguese Version

For the Portuguese version of this documentation, please see [README.pt-BR.md](./docs/README.pt-BR.md).

# Guess My Number

A game where you need to guess the secret number. The less time and attempts you use, the higher your score!

👉 Play the game at: **https://alexandresouva.github.io/guess-my-number**

---

## Index

- [🕹️ About the Game](#about-the-game)
- [✅ Methodologies and Practices](#methodologies-and-practices)
- [🚀 Technologies and Stacks](#technologies-and-stacks)
- [🎯 Features](#features)
- [🛠️ How to Run Locally](#how-to-run-locally)

---

## 🕹️ About the Game

The goal is simple: **Guess the secret number between 1 and 25.**

The game provides hints after each attempt:

- 📈 **"Too high"**
- 📉 **"Too low"**

When you guess the number correctly, you receive your **score** and can compare it with the **current record (highscore)**, representing the best performance achieved so far.

Can you beat the record?

🕹️ [Play now!](https://alexandresouva.github.io/guess-my-number)

---

## ✅ Methodologies and Practices

🔍 BDD (Behavior-Driven Development): using clear business scenarios to define features.

🧪 TDD (Test-Driven Development): guided by specifications obtained with BDD.

---

## 🚀 Technologies and Stacks

- ✅ **Angular 19** (Standalone APIs + Angular Signals)
- ✅ **BDD:** Cucumber + Gherkin + Cypress
- ✅ **TypeScript**
- ✅ **RxJS**
- ✅ **SCSS/CSS**
- ✅ **Semantic HTML**
- ✅ **Web Accessibility (ARIA applied)**
- ✅ **Unit Testing:** Karma + Jasmine
- ✅ **Cypress:** end-to-end testing
- ✅ **GitHub Actions:** CI/CD with automatic deployment to GitHub Pages

---

## 🛠️ Features

- 🎯 Guess the secret number
- ♻️ Restart the game
- ⏱️ Timer display
- 🏆 Highscore saved in the browser (localStorage)
- 🔊 Accessible feedback for screen readers
- 📱 **Responsive for mobile, tablet, and desktop**

---

## 🏗️ How to run locally

### 1. Clone the repository

```bash
git clone https://github.com/alexandresouva/guess-my-number.git
cd guess-my-number
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

Access the game at: **http://localhost:4200**

## How to Test

### 1. Install dependencies:

```bash
npm install
```

### 2. Run unit tests:

```bash
npm test
```

### 3. Run end-to-end tests:

```bash
npm run test:e2e
```

Alternatively, run `ng e2e` to watch end-to-end tests in real time.
