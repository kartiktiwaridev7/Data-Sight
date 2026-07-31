# Dynamic Data Analytics Dashboard 📊

A frontend data visualization architecture built with React and Vite, engineered to dynamically ingest, parse, and map datasets entirely within the browser.

**🔴 Live Production Build:** [View the Dashboard Here](https://kartiktiwaridev7.github.io/React-learning-/)

## Architecture Overview
This project demonstrates advanced frontend state management and data handling. Rather than relying on a static hardcoded file or a dedicated backend server, this application utilizes the browser's native `FileReader` API to accept custom JSON payloads from the user. It then dynamically recalculates aggregate metrics and renders interactive time-series visualizations in real-time.

## Key Features
*   **Dynamic Data Ingestion:** Client-side file upload engine processing custom JSON arrays.
*   **Real-time Aggregation:** React `useMemo` hooks optimized to compute high-volume data summaries instantly (Total Users, Total Revenue) without mutating state.
*   **Interactive Visualizations:** Integrated `recharts` library for scalable, responsive data mapping.
*   **Modern Layout:** CSS Grid and Flexbox architecture for a clean UI structure.

## Tech Stack
*   **Framework:** React 19 (compiled via Vite)
*   **Data Visualization:** Recharts
*   **Deployment Engine:** GitHub Pages (`gh-pages`)

## Local Installation & Testing
To run this visualization tool locally on your own machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/kartiktiwaridev7/React-learning-.git](https://github.com/kartiktiwaridev7/React-learning-.git)

   
