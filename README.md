# DataSight 🔭 | Full-Stack AI Analytics Engine

A modern, full-stack data analytics dashboard engineered to instantly ingest, analyze, and visualize complex datasets. DataSight bridges a highly responsive React frontend with a powerful Python machine learning backend to run real-time regression models and aggregate massive data points on the fly.

🔴 **Live Production Build:** [View the Dashboard Here](https://data-sight.netlify.app) 

## Architecture Overview

This project demonstrates an advanced client-server architecture designed for heavy data processing. Rather than forcing the browser to compute massive arrays, the frontend acts as a lightning-fast presentation layer. 

The React client securely streams uploaded files to a dedicated FastAPI engine. The Python backend processes the raw data, executes multi-variable regressions, and returns optimized statistical summaries. The frontend then dynamically recalculates state and maps the results onto interactive time-series visualizations.

## Key Features

* **Seamless Data Ingestion:** Secure, client-side file upload engine built to process complex datasets without freezing the user interface.
* **Real-Time Machine Learning:** Python-powered backend that instantly executes statistical regression, trend mapping, and anomaly detection.
* **Interactive Visualizations:** Integrated `recharts` library optimized to render high-volume data summaries (Total Users, Revenue Forecasts) instantly without mutating state.
* **Asynchronous Processing:** Non-blocking API endpoints configured with strict CORS policies to ensure secure, rapid data transfer between the client and the AI engine.

## Tech Stack

**Frontend (Client UI)**
* **Framework:** React 19 (compiled via Vite)
* **Data Visualization:** Recharts
* **Deployment Engine:** Netlify

**Backend (AI & Processing)**
* **Framework:** Python 3 & FastAPI
* **Server & Routing:** Uvicorn
* **Deployment Engine:** Render (Free Tier)

---

## Local Installation & Testing

To run this full-stack application locally on your own machine, you will need to start both the backend server and the frontend development environment.

### 1. Start the Python Backend
Clone the backend repository and start the FastAPI server:
```bash
git clone https://github.com/kartiktiwaridev7/Data-Sight-Backend-.git
cd Data-Sight-Backend-
pip install -r requirements.txt
uvicorn main:app --reload
