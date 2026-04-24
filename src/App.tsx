/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Award, 
  BarChart3, 
  RotateCcw, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle,
  Library,
  Lightbulb
} from 'lucide-react';
import { LITERACY_QUESTIONS } from './data/questions';
import { analyzeLiteracyResults } from './services/geminiService';
import { cn } from './lib/utils';
import { Question, UserResult } from './types';

type AppState = 'home' | 'quiz' | 'results';

export default function App() {
  const [state, setState] = useState<AppState>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startQuiz = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAiAnalysis(null);
    setState('quiz');
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers, optionIndex];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < LITERACY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = async (answers: number[]) => {
    let correctCount = 0;
    const categoryResults: Record<string, { total: number; correct: number }> = {};

    answers.forEach((ans, idx) => {
      const q = LITERACY_QUESTIONS[idx];
      if (!categoryResults[q.category]) {
        categoryResults[q.category] = { total: 0, correct: 0 };
      }
      categoryResults[q.category].total += 1;
      
      if (ans === q.correctAnswer) {
        correctCount += 1;
        categoryResults[q.category].correct += 1;
      }
    });

    const finalScore = Math.round((correctCount / LITERACY_QUESTIONS.length) * 100);
    setScore(finalScore);
    setState('results');

    setIsAnalyzing(true);
    const details = answers.map((ans, idx) => {
      const q = LITERACY_QUESTIONS[idx];
      return `Q${idx+1} (${q.category}): ${ans === q.correctAnswer ? 'Benar' : 'Salah'}`;
    }).join(', ');
    
    const analysis = await analyzeLiteracyResults(finalScore, details);
    setAiAnalysis(analysis || "Analisis tidak tersedia.");
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Library className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-indigo-700 leading-none">LITERA<span className="text-slate-400">SMA</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">Platform Literasi Bahasa Indonesia</p>
          </div>
        </div>
        {state !== 'home' ? (
          <button 
            onClick={() => setState('home')}
            className="bg-white text-slate-700 border border-slate-200 px-6 py-2 rounded-2xl font-bold hover:bg-slate-50 text-sm transition-all shadow-sm"
          >
            Beranda
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full border border-slate-200 shadow-sm hidden md:flex">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200 text-xs text-center leading-none">
              <span className="mt-0.5">SMA</span>
            </div>
            <div>
              <p className="text-[10px] font-bold leading-none">Siswa Kelas XII</p>
              <p className="text-[9px] text-slate-400">Kurikulum Merdeka 2024</p>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          {state === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4"
            >
              <div className="md:col-span-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10 flex flex-col relative overflow-hidden h-[450px]">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-60"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex">
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md shadow-indigo-100">Aktif Sekarang</span>
                  </div>
                  <h2 className="text-5xl font-black mt-6 tracking-tighter leading-tight">
                    Simulasi Literasi<br/>
                    <span className="text-indigo-600">Terpadu 2024</span>
                  </h2>
                  <p className="mt-4 text-slate-500 max-w-md text-lg leading-relaxed">
                    Evaluasi kemampuan literasi kritis sesuai standar asesmen nasional untuk jenjang SMA.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <button 
                      onClick={startQuiz}
                      className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                    >
                      Mulai Asesmen
                    </button>
                    <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 text-sm transition-all"> 
                      Panduan Teknis
                    </button>
                  </div>
                  <div className="mt-auto flex gap-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Butir Soal</span>
                      <span className="text-xl font-black">20 Menit • 5 Soal</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Tingkat Kesulitan</span>
                      <span className="text-xl font-black text-indigo-500">Lanjut</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden h-[450px]">
                 <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full -mb-10 -mr-10"></div>
                 <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Informasi Sesi</p>
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                        <BrainCircuit className="w-5 h-5 text-indigo-400" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-xl">Topik Utama</h4>
                      <p className="text-slate-400 text-sm italic">"Pemahaman Bacaan, Struktur Kebahasaan, dan Logika Teks"</p>
                    </div>
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400"></div>
                        <span className="text-xs font-medium text-slate-300">Update Soal Terbaru: Hari ini</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400"></div>
                         <span className="text-xs font-medium text-slate-300">Rekomendasi Konten AI Aktif</span>
                      </div>
                    </div>
                 </div>
                 <div className="relative z-10 pt-8">
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Tips Hari Ini</p>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <p className="text-xs italic text-slate-200 leading-relaxed font-serif">"Fokuslah pada ide pokok setiap paragraf sebelum menganalisis detail teks."</p>
                    </div>
                 </div>
              </div>

              <div className="md:col-span-4 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm h-[200px] flex flex-col justify-center">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                       <BarChart3 className="text-indigo-600" />
                    </div>
                    <h3 className="font-bold">Analisis Statistik</h3>
                 </div>
                 <p className="text-sm text-slate-500 leading-relaxed">Visualisasi performa real-time untuk memetakan kekuatan literasimu.</p>
              </div>

              <div className="md:col-span-4 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm h-[200px] flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                       <Award className="text-emerald-600" />
                    </div>
                    <h3 className="font-bold">Standard Nasional</h3>
                 </div>
                 <p className="text-sm text-slate-500 leading-relaxed">Disesuaikan dengan format penilaian literasi kurikulum SMA terkini.</p>
              </div>

              <div className="md:col-span-4 bg-indigo-600 rounded-[2rem] p-8 text-white shadow-lg h-[200px] flex items-center gap-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                 <div className="text-4xl">📚</div>
                 <div>
                    <h3 className="text-xl font-bold">Smart AI Guide</h3>
                    <p className="text-indigo-100 text-sm mt-1 opacity-80">Rangkuman analisis dari Gemini.</p>
                 </div>
              </div>
            </motion.div>
          )}

          {state === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between px-2">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asesmen Progress</span>
                  <div className="flex items-center gap-3">
                     <div className="h-2 w-48 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-indigo-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuestionIndex + 1) / LITERACY_QUESTIONS.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-indigo-700">{currentQuestionIndex + 1}/{LITERACY_QUESTIONS.length}</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 text-[10px] font-black uppercase tracking-widest">
                  Kategori: {LITERACY_QUESTIONS[currentQuestionIndex].category}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {LITERACY_QUESTIONS[currentQuestionIndex].passage && (
                  <div className="md:col-span-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10 max-h-[500px] md:max-h-none overflow-y-auto">
                    <div className="flex items-center gap-3 mb-6">
                       <BookOpen className="w-5 h-5 text-indigo-600" />
                       <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Teks Bacaan</h4>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-serif text-lg indent-8 text-justify">
                      {LITERACY_QUESTIONS[currentQuestionIndex].passage}
                    </p>
                  </div>
                )}
                <div className={cn("bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10 flex flex-col h-full", LITERACY_QUESTIONS[currentQuestionIndex].passage ? "md:col-span-6" : "md:col-span-12")}>
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight mb-10">
                    {LITERACY_QUESTIONS[currentQuestionIndex].text}
                  </h3>
                  <div className="space-y-4 mt-auto">
                    {LITERACY_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full p-6 text-left border border-slate-100 bg-slate-50/50 rounded-2xl hover:border-indigo-600 hover:bg-white hover:shadow-xl hover:shadow-indigo-50 transition-all flex items-start gap-5 group"
                      >
                        <span className="flex-shrink-0 w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center font-black text-sm bg-white group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="pt-2 text-slate-700 font-bold leading-normal">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {state === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border border-indigo-100 shadow-inner">
                  <Award className="w-12 h-12 text-indigo-600" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Skor Akhir</p>
                <div className="text-8xl font-black tracking-tighter text-slate-900">{score}</div>
                <div className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-lg shadow-indigo-100">
                  {score >= 80 ? 'Luar Biasa!' : score >= 60 ? 'Bagus!' : 'Terus Berusaha!'}
                </div>
              </div>

              <div className="md:col-span-8 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden min-h-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-8">
                     <BrainCircuit className="w-6 h-6 text-indigo-400" />
                     <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Insight Cerdas Gemini AI</h3>
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="space-y-6 flex-grow flex flex-col justify-center">
                      <div className="space-y-3">
                         <div className="h-5 bg-white/10 rounded-full w-full animate-pulse"></div>
                         <div className="h-5 bg-white/10 rounded-full w-[90%] animate-pulse"></div>
                         <div className="h-5 bg-white/10 rounded-full w-[95%] animate-pulse"></div>
                         <div className="h-5 bg-white/10 rounded-full w-[80%] animate-pulse"></div>
                      </div>
                      <p className="text-xs text-slate-500 text-center font-bold tracking-widest italic animate-pulse">MEMPROSES POLA LITERER ANDA...</p>
                    </div>
                  ) : (
                    <div className="flex-grow">
                      <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed font-serif italic pb-10">
                        "{aiAnalysis}"
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
                     <span>Powered by Gemini 1.5 Flash</span>
                     <span>© LiterasiKita AI Labs</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                 {getChartData().map((data) => (
                    <div key={data.subject} className="bg-white rounded-[1.5rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                       <div className="flex justify-between items-start mb-4">
                          <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">{data.subject}</h4>
                          <span className={cn("text-xs font-black", data.A > 70 ? "text-emerald-600" : data.A > 40 ? "text-indigo-600" : "text-amber-600")}>{data.A}%</span>
                       </div>
                       <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${data.A}%` }}
                            className={cn("h-full", data.A > 70 ? "bg-emerald-500" : data.A > 40 ? "bg-indigo-500" : "bg-amber-500")}
                          />
                       </div>
                    </div>
                 ))}
              </div>

              <div className="md:col-span-12 space-y-6 mt-6">
                <h3 className="text-2xl font-black flex items-center gap-3 ml-2">
                  <RotateCcw className="w-6 h-6 text-indigo-600" /> Lembar Evaluasi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LITERACY_QUESTIONS.map((q, idx) => {
                    const isCorrect = userAnswers[idx] === q.correctAnswer;
                    return (
                      <div key={q.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 flex flex-col justify-between group hover:border-indigo-600 transition-all shadow-sm">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Butir {idx + 1}</span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-400" />
                            )}
                          </div>
                          <p className="font-extrabold text-slate-900 text-lg leading-tight">{q.text}</p>
                          <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl italic font-serif leading-relaxed">"{q.explanation}"</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-12 flex justify-center py-10">
                <button 
                  onClick={startQuiz}
                  className="flex items-center gap-3 px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black tracking-tight text-lg hover:bg-slate-900 transition-all flex-shrink-0 shadow-xl shadow-indigo-100 active:scale-95"
                >
                  <RotateCcw className="w-6 h-6" /> Ulangi Asesmen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200 mt-12 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-black text-indigo-700 tracking-tight">LITERA<span className="text-slate-400">SMA</span></h4>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Digital Assessment Laboratory</p>
          </div>
          <div className="flex items-center gap-10 text-slate-400 text-[10px] font-black tracking-widest uppercase">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Feedback</span>
          </div>
        </div>
      </footer>
    </div>
  );

  function getChartData() {
    const categories = ['Informasi', 'Sastra', 'Logika', 'Bahasa'];
    return categories.map(cat => {
      const qInCategory = LITERACY_QUESTIONS.filter(q => q.category === cat);
      const correctIndices = LITERACY_QUESTIONS.map((q, idx) => q.category === cat && userAnswers[idx] === q.correctAnswer ? idx : -1).filter(i => i !== -1);
      const score = qInCategory.length > 0 ? (correctIndices.length / qInCategory.length) * 100 : 0;
      return {
        subject: cat,
        A: score,
        fullMark: 100,
      };
    });
  }
}
