## Forum-LB

Det här är ett mycket lätt diskutionsforum som är upp byggt med React, Node.js med SQLite för att kunna hantera både trådar och kommentarer. Sedan kan man själv som användare lägga till nya trådar, kommentarer och man kan också redigera och ta bort trådar om man själv vill.

## Teknologier

Backend: Node.js, Express, SQLite, BetterSQLite3, CORS, Nodemon

Frontend: React

## Hur man installerar

# Installera backend

För att installera backend mappen med allt som behövs:

- mkdir backend
- cd backend
- npm install express sqlite3 bettersqlite3 cors nodemon

# Starta backend servern med nodemon

Går man in i terminalen sedan cd backend om man inte redan är där sedan:

node server.js

# Installera frontend

För att installera frontend mappen med allt som behövs:

Gå in i termenalen sendan cd .. om du är i en annan mapp sendan skriver du

- mkdir frontend
- cd frontend
- npm install

# Starta frontend

- cd frontend
- npm run dev

## Kodstruktur

project-root/
├── backend/
│ ├── package.json # Backendens beroenden och skript
│ ├── server.js # Backendens startfil
│ ├── routes/ # API-routes
│ ├── database.db #SQLite-databas
│  
│  
│  
├── frontend/
│ ├── package.json # Frontendens beroenden och skript
│ ├── vite.config.js # Vite-konfiguration
│ ├── src/
│ │ ├── main.jsx # Frontendens startfil
│ │ ├── pages/ # Sidor i applikationen, komponenter som har en route
│ │ ├── context/ # Context API-hantering
│ │ ├── styles/ # Globala och komponentbaserade css-filer, valfritt, går bra som vi har gjort tidigare.
│ │ └── assets/ # Bilder
├── README.md # Instruktioner för att starta applikationen
└── .gitignore # Filer att ignorera i GitHub
