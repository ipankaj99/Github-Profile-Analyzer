# GitHub Profile Analyzer API 
Hey there! This is a backend API I built to fetch real-time data from GitHub and store the important metrics in a cloud-hosted database. It’s perfect for analyzing developer profiles and keeping a history of the data.

## What’s Under the Hood?
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL (hosted on Supabase)
* **API Client:** Axios
* **Config:** dotenv

## Key Features
* **Live Data:** Grabs up-to-date public information directly from GitHub's official API.
* **Persistent Storage:** Saves all the insights into a cloud database so the data is there when you need it later.
* **Solid Security:** I’ve used parameterized queries throughout to make sure the database is protected from SQL injection.
* **Production Ready:** It's designed to be deployed to the cloud, using secure connection strings rather than hardcoded credentials.

## Getting It Running
It only takes a couple of minutes to get this up and running on your machine:

1.  **Get the code:** Clone this repository and run `npm install` to grab all the dependencies.
2.  **Setup the Database:**
    * Create a free project over at [Supabase](https://supabase.com/).
    * Open their **SQL Editor** and run the `CREATE TABLE` command (you can find this in my `Schema.sql` file) to get your database ready.
3.  **Environment Setup:** Create a `.env` file in your root folder. This is where you’ll put your connection string so the app knows how to talk to the database:
    ```env
    PORT=5000
    DB_CONNECTION_STRING=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres
    ```
    *(Just swap out the password and project ID with your own from your Supabase dashboard).*
4.  **Launch:** Start it up with `npm run dev` and you’re good to go! The server will be listening at `http://localhost:5000`.

## API Endpoints
* `GET /api/gitHub/:username` — Fetches a fresh profile from GitHub and saves it into the database.
* `GET /api/gitHub/fetch/all/data` — Pulls up the entire history of analyzed profiles from the database.
* `GET /api/gitHub/fetch/:username` — Grabs the stored data for one specific user.


*****Note :-A Note on My Database Architecture:-
You might notice I switched from MySQL to PostgreSQL (via Supabase) for this project. I want to explain why, as this was a deliberate design choice for my deployment:

Why I moved to PostgreSQL: While MySQL is perfect for learning on localhost, PostgreSQL is the industry standard for production-level cloud applications. It is incredibly robust and handles concurrent data requests better than any other open-source relational database.

Yes, it is still SQL: I haven't abandoned SQL at all. I am still using the SQL language for every query, every table join, and every schema definition. The only change is the underlying engine, which I upgraded to a professional-grade, managed cloud platform.

Why this matters for production: By using Supabase, I’ve moved from a "local server" mindset to a "cloud-native" architecture. This means the API is now accessible, scalable, and secure, mirroring the way modern full-stack applications are actually built in the professional industry.
