// src/services/gameService.js

export const savePlayers = (players) => {
    localStorage.setItem("players", JSON.stringify(players));
  };
  
  export const getPlayers = () => {
    return JSON.parse(localStorage.getItem("players")) || null;
  };
  
  export const saveScores = (scores) => {
    localStorage.setItem("scores", JSON.stringify(scores));
  };
  
  export const getScores = () => {
    return JSON.parse(localStorage.getItem("scores")) || { player1: 0, player2: 0 };
  };
  