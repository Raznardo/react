import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import "./App.css";

const Header = () => (
  <header className="header">
    <h1 className="logo">PUNCH</h1>
    <nav className="nav">
      <Link to="/" className="nav-link">Accueil</Link>
      <Link to="/info" className="nav-link">Info</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </nav>
  </header>
);

const PlayerFooter = () => (
  <footer className="player-footer">
    <audio controls src="https://demo.azuracast.com/listen/azuratest_radio/radio.mp3" className="audio-player"></audio>
  </footer>
);

const Accueil = () => {
  const [recentTracks, setRecentTracks] = useState([]);

  useEffect(() => {
    fetch("https://demo.azuracast.com/api/nowplaying/azuratest_radio")
      .then(res => res.json())
      .then(data => {
        if (data && data.recent_tracks) {
          setRecentTracks(data.recent_tracks);
        }
      });
  }, []);

  return (
    <div className="page">
      <h2 className="title">Derniers titres joués</h2>
      <div className="track-list">
        {recentTracks.map((track, index) => (
          <Card key={index} className="track-card">
            <div>{track.song.artist} - {track.song.title}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Info = () => (
  <div className="page">
    <h2 className="title">À propos de la radio</h2>
    <p className="text">Nous diffusons de la musique 24h/24 avec les meilleurs hits !</p>
  </div>
);

const Contact = () => (
  <div className="page">
    <h2 className="title">Contact</h2>
    <p className="text">Email : contact@mawebradio.com</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="main-container">
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/info" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <PlayerFooter />
      </div>
    </Router>
  );
}
