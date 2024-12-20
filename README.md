# Frontend-MovieRama-Stef_Palaiochoritis

### MovieRama is a web application that fetches and displays movie data from The Movie Database (TMDB) API. The app allows users to view movies currently playing in theaters, search for a specific movie, fetch the next movies page using infinite scrolling and see detailed information about individual movies, including related videos, reviews, and similar movies.
## Installation

### Prerequisites

Node.js (v16 or higher)
npm or yarn

### Steps

1. Clone the repository:
   git clone https://github.com/Armaroth/frontend-MovieRama-Stef_Palaiochoritis.git
   && cd MovieRama

2. Install dependencies:
   npm install

3. Create a .env file at the root of your project and add your TMDB API key and base URL

- VITE_TMDB_API_KEY = Your the movie database api key. For more info see : [tmdb-api](https://developer.themoviedb.org/reference/intro/getting-started)
- VITE_TMDB_BASE_URL = 'https://api.themoviedb.org/3' .

## Usage

1.  Start the development server:
    npm run dev
2.  Open your browser and navigate to:
    http://localhost:5173/

## Technologies Used

- Frontend: TypeScript, HTML, CSS
- API: The Movie Database (TMDB) API
- Data Validation: valibot for schema validation
