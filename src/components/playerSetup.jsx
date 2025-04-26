import { useState } from "react";
import { savePlayers } from "../services/gameService";
import { useNavigate } from "react-router-dom";

export default function PlayerSetup() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (player1 && player2) {
      savePlayers({ player1, player2 }); 
      navigate("/game");
    }
  };

  return (
    <div className="min-h-srceen flex flex-col align-middle justify-center text-center py-[10%] bg-slate-800">
 <div className="mx-auto w-3/4 h-1/2 p-10 border-[1px] border-slate-800 rounded-xl bg-slate-500 ">
      <h2 className=" mx-auto text-slate-50 text-3xl my-4 font-medium text-center">  الفرق المتنافسة</h2>
      <label htmlFor="j"></label>
      <input 
      id="j"
      className="focus: outline-none w-full p-3 text-slate-500 font-medium text-lg bg-slate-50 rounded-md mx-auto my-2  border-[1px] border-slate-300"
      value={player1} 
        onChange={(e) => setPlayer1(e.target.value)} 
      />
      <label htmlFor="h" className="text-slate-50 font-medium text-lg">vs</label>
      <input 
      id="h"
      className="focus:outline-none w-full p-3 text-slate-500 font-medium text-lg bg-slate-50 rounded-md mx-auto my-2 border-[1px] border-slate-300"
      value={player2} 
        onChange={(e) => setPlayer2(e.target.value)} 
      />
      <button onClick={handleStart} className="bg-slate-50 p-3 w-1/3 rounded-md border-[1px] border-slate-300 my-3 mx-auto text-slate-500 hover:bg-slate-200 text-xl font-semibold">ابدأ الاختبار</button>
    </div>
    </div>
   
  );
}
