import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import AIDemo from './AIDemo.js';

const endpoints = [
  { path: '/api/greeting', label: 'Greeting Endpoint' },
  { path: '/health', label: 'Health Check' },
  { path: '/readiness', label: 'Readiness Check' },
  { path: '/devsecops-info', label: 'DevSecOps Info' },
  { path: '/metrics', label: 'Prometheus Metrics' },
  { path: '/swagger', label: 'API Docs (Swagger)' },
  { path: '/api', label: 'Preprocess + Generate Demo (AI)'}
];


function HomePage() {
    return(
  <div className="app">
    <h1>Sample Node.js Demo App</h1>
    <p>This is a simple full-stack demo with backend endpoints and DevSecOps integration.</p>

    <div className="endpoint-grid">
      {endpoints.map((endpoint, index) => {
        const isInternalRoute = endpoint.path === '/api';

        return isInternalRoute ? (
          <Link key={index} to={endpoint.path} className = "endpoint-box">
            {endpoint.label}
          </Link>
        ):
        (
        <a key={index} href={endpoint.path} target="_blank" rel="noreferrer" className="endpoint-box">
          {endpoint.label}
        </a>
      );
      })}
    </div>
  </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/api" element = {<AIDemo />} />
      </Routes>
    </Router>
  )
}

export default App;
