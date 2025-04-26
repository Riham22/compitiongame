

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlayers, saveScores } from "../services/gameService";


const questions = [
  { question: "اعلنت مصر عن اطلاق .... للذكاء الاصطناعي عام 2021", answer: "المشتري" },
  { question: "تتطلب الحروق من الدرجة... العلاج في المستشفى", answer: "المحيط الهادئ" },
  { question: "لإنشاء صيغة معينة في برنامج إكسل علىك كتابة أولا .........في الخلية", answer: "المشتري" },
  { question: "قد تستخدم الشركات ....... لتسجيل معلومات الموظفين", answer: "المحيط الهادئ" },
  { question: "تدرجت اعمال النساء في ثورة 1919 من توقيع العرائض الى اطلاق حملات المقاطعة؟", answer: "بيل جيتس" },
  
  { question: "يمكن استخدام علامة التبويب إدراج في باوربوينت لتغيير حجم الشريحة ", answer: "بيل جيتس" },
  { question: ".... يتسبب انخفاض درجة حرارة التحضين عن اقل من 40 -45 درجة مئوية في جعل الزبادي ", answer: "المشتري" },
  { question: " مصطلح علمي :يجب أن يكون المصممون على استعداد لشرح كيفية عمل أدوات الذكاء الاصطناعي", answer: "بيل جيتس" },
  { question: "يمكن تشفير الرسائل المرسلة من خلال خدمات الرسائل النصية؟", answer: "المشتري" },
  { question: "مااسم الطبقة الثانية من الجلد؟", answer: "المحيط الهادئ" },
  { question: "مصطلح علمي :يستخدم في الاواني ذات الفوهة الضيقة، حيث توضع الازهار بشكل متدرج في الطول", answer: "بيل جيتس" },
  { question: "...... لإضافة المعلومات في المخطط الانسيابي يتم النقر على ", answer: "المشتري" },
  { question: "يتبع ... التعليمات حول مكان الوقوف وكيفية التحرك على المسرح", answer: "بيل جيتس" },
  { question: "..... إجراء تدريجي يستخدم لحل المشكلات أو لإجراء العمليات السحابية يسمى", answer: "المحيط الهادئ" },
  { question: "يمكن للطفل صغير السن ان يعمل لفترات محددة من الوقت؟", answer: "بيل جيتس" },
];

export default function GameBoard() {
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(10);
  const [timerId, setTimerId] = useState(null);
  
  const [players, setPlayers] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [cards, setCards] = useState(questions.map((q, idx) => ({ ...q, id: idx, flipped: false, answered: false })));
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [activeCard,setActiveCard] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (activeCard !== null) {
      setTimer(20);
      const intervalId = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      setTimerId(intervalId);
    }
  
    return () => clearInterval(timerId); 
  }, [activeCard]);
  useEffect(() => {
    if (timer === 0 && activeCard !== null) {
      handleAnswer(false);
    }
  }, [timer]);
    
  useEffect(() => {
    const savedPlayers = getPlayers();
    if (!savedPlayers) {
      navigate("/"); 
    } else {
      setPlayers(savedPlayers);
    }
  }, [navigate]);


  const openCard = (id) => {
    if (cards[id].answered || activeCard !==null) return; 
    setActiveCard(id);
    
    setCards((prev) => prev.map(card=> (card.id === id? {...card,flipped:true} : card)));
   
  };

  const handleAnswer = (isCorrect) => {
    clearInterval(timerId);

    if (activeCard === null) return;
  
    const updatedCards = cards.map((card) =>
      card.id === activeCard ? { ...card, answered: true } : card
    );
    setCards(updatedCards);
  
    if (isCorrect) {
      setScore((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }));
    }
  
    setTimeout(() => {
      const finalCards = updatedCards.map((card) =>
        card.id === activeCard ? { ...card, flipped: false } : card
      );
      setCards(finalCards);
  
      setActiveCard(null); 
      setCurrentPlayer((prev) => (prev === "player1" ? "player2" : "player1")); 
    }, 1000);
  };
  

  const resetGame = () => {
    setCards(questions.map((q, idx) => ({ ...q, id: idx, flipped: false, answered: false })));
    setScore({ player1: 0, player2: 0 });
    setCurrentPlayer("player1");
    saveScores({ player1: 0, player2: 0 }); 
  };

  const resetPlayers = () => {
    localStorage.removeItem("players"); // يمسح اللاعبين من التخزين
    navigate("/"); // يرجعك لصفحة اختيار اللاعبين
  };
  
  const renderCards = () => {
    return cards.map((card, idx) => (
    <div key={idx} className="font-semibold w-full h-full p-4 my-2 mx-1 rounded-md border-[1px] bg-slate-500 border-slate-50 card text-center"
 onClick={() => openCard(idx)}>
        {activeCard === idx && (
  <div className="timer text-base font-normal">الوقت المتبقي: {timer}</div>
)}

        <div className={`card-content ${card.flipped ? "flipped" : ""}`}>
          {card.flipped ? (
            <>
              <h3 className="font-medium my-5">{card.question}</h3>
             {!card.answered &&activeCard ===idx &&(
                <div className="answer-buttons"> 
                    <div 
                    onClick={()=>handleAnswer(true)}
                    className=" green-button w-1/3 inline-block bg-slate-50  text-base font-normal p-1 border-[1px] border-green-800  rounded-md my-1 mx-1 text-green-800 hover:bg-green-100 hover:text-green-600 hover:border-green-600">
                        صح
                    </div>
                    <div 
                    onClick={()=>handleAnswer(false)}
                    className=" red-button w-1/3 inline-block bg-slate-50  text-base font-normal p-1 border-[1px] border-red-800  rounded-md my-1 mx-1 text-red-800 hover:bg-red-100 hover:text-red-600 hover:border-red-600">
                        خطأ
                    </div>
                </div>
             )}
             {card.answered && <p>تمت الاجابة</p>}
            </>
          ) : (
            <div className="font-semibold text-3xl text-center align-middle">؟</div>
          )}
        </div>
      </div>
    ));
  };
  useEffect(() => {
    const allAnswered = cards.every(card => card.answered);
    if (allAnswered) {
      setGameOver(true);
    }
  }, [cards]);
  
  return (
    <div className="game-board mx-auto min-h-screen bg-slate-900 text-white text-center font-medium text-3xl p-10">
<h2> {players && players[currentPlayer]}</h2>
{players && (
  <div className="scores my-3 ">
    <h3 className="inline-block w-1/2 my-2">{players.player1}: {score.player1}</h3>
    <h3 className="inline-block w-1/2 my-2">{players.player2}: {score.player2}</h3>
  </div>
)}

      <div className="cards-container">
      {gameOver ? (
  <div className="win-screen">
    <h2>انتهى الاختبار</h2>
    {score.player1 === score.player2 ? (
      <h3>تعادل!</h3>
    ) : (
      <h3>الفائز: {score.player1 > score.player2 ? players.player1 : players.player2}</h3>
    )}
    <button onClick={resetGame} className="reset-btn">ابدأ </button>
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center p-4">
    {renderCards()}
  </div>
)}
      </div>
      <div className="mx-auto">
      <button onClick={resetGame} className="reset-btn bg-slate-50 p-3 w-1/3 rounded-md border-[1px] border-slate-800 my-3 mx-2 text-slate-800 hover:bg-slate-200">إعادة الاختبار</button>
      <button 
  onClick={resetPlayers} 
  className="reset-btn bg-slate-50 p-3 w-1/3 rounded-md border-[1px] border-slate-800 my-3 mx-2 text-slate-800 hover:bg-slate-200"
>
  اختيار متنافسين جدد
</button>
      </div>
      
</div>
  );
}
