# CSV → React Apps Generator

This project is a **technical task**:  
You will generate a CSV file with website records, then create **3 separate React apps** (FoodExpress, TechHubBD, BookBazaar).  
Each React app will read from the CSV and show its corresponding **Hero** and **Contact** section.  
Finally, you can build all apps into a `/build` folder (each domain in its own folder).

---

## 🚀 Features

- Node.js script (`generate_csv.js`) creates a `websites.csv` file with 3 records.
- React apps fetch and parse this CSV to show:
  - Hero section (title + description)
  - Contact section (phone + address)
- Each app is domain-specific (configured via `.env`).
- `build-all.js` builds all 3 apps and places them in `/build/<domain>`.

---

## 📂 Project Structure

```bash
project-root/
├─ generate_csv.js # creates websites.csv
├─ copy_csv_to_apps.js # copies websites.csv → each app/public
├─ build-all.js # builds all apps and collects them
├─ websites.csv # CSV with 3 website records
├─ apps/
│ ├─ app-foodexpress/
│ ├─ app-techhubbd/
│ └─ app-bookbazaar/
└─ build/ # final builds (after node build-all.js)
```

```yaml
Copy code
```

---

## 🛠️ Setup & Installation

### 1) Clone & Install

```bash
git clone <repo-url>
cd project-root
npm init -y
```

### 2. Create React Apps

```bash
Copy code
npx create-react-app apps/app-foodexpress
npx create-react-app apps/app-techhubbd
npx create-react-app apps/app-bookbazaar
```

### 3. Add CSV Generator

Run the Node script to generate websites.csv:

```bash
Copy code
node generate_csv.js
```

### 4. ```Copy CSV to React Apps

```bash
Copy code
node copy_csv_to_apps.js
This ensures each app has public/websites.csv.
```

### 5) Configure .env

Inside each app, create a .env file:

```bash
apps/app-foodexpress/.env

ini
Copy code
REACT_APP_TARGET_DOMAIN=foodexpress.com
apps/app-techhubbd/.env
```

```bash
ini
Copy code
REACT_APP_TARGET_DOMAIN=techhubbd.com
apps/app-bookbazaar/.env
```

```bash
ini
Copy code
REACT_APP_TARGET_DOMAIN=bookbazaar.com
▶️ Running the Apps
Go into any app and start the dev server:
```

```bash
Copy code
cd apps/app-foodexpress
npm start
Then open http://localhost:3000.
```

###### It will show the Food Express site (from CSV).

###### Do the same for other apps by running npm start inside their folders.

### 🏗️ Building All Apps

###### To build all 3 apps at once and place them in /build/<domain>:

```bash
Copy code
node build-all.js
Final output:
```

```bash
Copy code
/build
   /foodexpress.com
   /techhubbd.com
   /bookbazaar.com
Each folder contains a standalone production-ready React app.
```
