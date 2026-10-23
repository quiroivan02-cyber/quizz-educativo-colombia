import React, { useRef, useState } from "react";
import { unlockAudio } from "../audio/gameSounds";

const categories = ["Matemáticas", "Cultura general de Colombia"];

export default function Start({ onStartGame }) {
  const inputRef = useRef();
  const [selectedTheme, setSelectedTheme] = useState(categories[0]);
  const [selectedMode, setSelectedMode] = useState("money");
  const [nameError, setNameError] = useState(false);

  const handleClick = () => {
    const name = inputRef.current.value.trim();
    if (!name) {
      setNameError(true);
      return;
    }
    unlockAudio();
    onStartGame(name, selectedTheme, selectedMode);
  };

  return (
    <div className="start">
      <h1 className="startTitle">¿Quién quiere ser millonario?</h1>
      <input
        className="startInput"
        placeholder="Tu nombre"
        ref={inputRef}
        onChange={() => setNameError(false)}
        onKeyDown={(event) => event.key === "Enter" && handleClick()}
        aria-label="Tu nombre"
      />
      {nameError && <p className="errorText">Por favor, escribe tu nombre.</p>}
      <div className="themeSelection">
        <label htmlFor="category">Elige una categoría:</label>
        <select
          id="category"
          className="themeDropdown"
          value={selectedTheme}
          onChange={(event) => setSelectedTheme(event.target.value)}
        >
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>
      <div className="themeSelection">
        <label htmlFor="gameMode">Modalidad de juego:</label>
        <select
          id="gameMode"
          className="themeDropdown"
          value={selectedMode}
          onChange={(event) => setSelectedMode(event.target.value)}
        >
          <option value="money">Por dinero</option>
          <option value="grade">Por nota</option>
        </select>
      </div>
      <button className="startButton" onClick={handleClick}>Empezar</button>
    </div>
  );
}
