# Property Search Application

A Zillow/Redfin-style property search application for California residential listings backed by MLS data, including:
- A searchable, filterable listings page with pagination
- Sorting controls for price, listing date, square footage, and beds
- A property detail page with photos, location, and open house schedule
  
This repository contains the full product path: the backend running on a local MySQL database, the frontend running on React, the Node/Express REST API connecting React to MySQL, and tests.

The following README explains the system design, setup process, and example use cases of the application.

## System Design

### Technical Stack
- Backend: Node.js + Express
- Frontend: React (Vite)
- Database: MySQL 8 running in Docker
- Testing: Jest + Babel

### Data Flow
`React (port 3000) --> Express API (port 5000) --> MySQL (port 3306)`

## Setup Process

### Prerequisites
Before proceeding with setup, make sure you install:
- Node.js and npm
- Git
- MySQL 8
- Docker Desktop (recommended)

This application relies on two SQL datasets titled "rets_property" and "rets_openhouse".

### 1. Clone the Repository
```
git clone https://github.com/brendp252/IDX-Exchange-Property-Search.git
cd IDX-Exchange-Property-Search
```

### 2. Set Up the Datasets
Import the datasets into your database. If you are using Docker, for example, start a MySQL 8 container on port 3306 with a new database. Then, pipe the datasets in directly while the container is running:
```
docker exec -i <container-name> mysql -u <username> -p<password> <db-name> < path/rets_file.sql
```
To verify that you successfully imported your datasets, run simple checks:
```
SELECT COUNT(*)
FROM rets_property;

SELECT COUNT(*)
FROM rets_openhouse;
```

### 3. Set Up the Backend
First, install necessary dependencies:
```
cd backend
npm install
```
