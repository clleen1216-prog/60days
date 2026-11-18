import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Copy, Layers, Play, RotateCcw, Volume2, Award, Calendar, Mic } from 'lucide-react';
import { TASK_APP_DATA } from './data/taskDeliverables';

const COURSE_CONTENT = [
  { week: 1, title: '破冰與基礎語感', scenes: ['打招呼', '自我介紹', '日常寒暄'] },
  { week: 2, title: '社交與延展', scenes: ['談天氣', '談興趣', 'Small Talk'] },
  { week: 3, title: '機艙與簽證', scenes: ['美國簽證面試', '機場廣播', '機上點餐'] },
  { week: 4, title: '入境與交通', scenes: ['海關問答', '叫車服務', '交通詢問'] },
  { week: 5, title: '食宿安頓', scenes: ['飯店入住', '餐廳訂位', '餐點客製'] },
  { week: 6, title: '觀光與應變', scenes: ['景點導覽', '遺失物協尋', '退換貨'] },
  { week: 7, title: '綜合流暢度', scenes: ['旅遊情境綜合', '社交對話練習'] },
  { week: 8, title: '實戰驗收', scenes: ['無字幕高壓測試', '全真模擬'] }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'study' | 'progress' | 'docs'>('study');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">English 60-Day Crash</h1>
          <nav className="flex gap-2">
            <button onClick={() => setActiveTab('study')} className={`p-2 rounded-lg ${activeTab === 'study' ? 'bg-blue-50' : ''}`}><BookOpen size={20}/></button>
            <button onClick={() => setActiveTab('progress')} className={`p-2 rounded-lg ${activeTab === 'progress' ? 'bg-blue-50' : ''}`}><Award size={20}/></button>
            <button onClick={() => setActiveTab('docs')} className={`p-2 rounded-lg ${activeTab === 'docs' ? 'bg-blue-50' : ''}`}><Layers size={20}/></button>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        {activeTab === 'study' && (
          <div className="space-y-4">
            {COURSE_CONTENT.map((week) => (
              <div key={week.week} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold flex items-center gap-2"><Calendar size={18}/> 第 {week.week} 週：{week.title}</h2>
                  <button onClick={() => handleSpeak(`Week ${week.week}, ${week.title}`)} className="text-blue-500"><Volume2 size={18}/></button>
                </div>
                <div className="grid gap-2">
                  {week.scenes.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span>{s}</span>
                      <button className="bg-blue-600 text-white p-2 rounded-full"><Play size={14}/></button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold mb-4">學習進度追蹤</h2>
            <div className="flex items-center gap-4 text-slate-500">
              <CheckCircle2 className="text-green-500" />
              <span>目前進度：第 1 週 (完成 12%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-2"><div className="bg-blue-600 h-2 rounded-full" style={{width: '12%'}}></div></div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold mb-4">{TASK_APP_DATA.title}</h2>
            <div className="prose prose-sm">
              <p>{TASK_APP_DATA.goal}</p>
              <h3 className="font-bold mt-4">執行步驟</h3>
              {TASK_APP_DATA.steps.map((step) => (
                <div key={step.order} className="mb-2 p-2 bg-slate-50 rounded">
                  {step.order}. {step.title} <span className="text-xs text-blue-500 font-mono">[{step.toolName}]</span>
                </div>
              ))}
            </div>
            <button className="mt-4 flex items-center gap-2 text-blue-600 border border-blue-600 px-4 py-2 rounded-lg"><Copy size={16}/> 複製規格</button>
          </div>
        )}
      </main>

      <footer className="fixed bottom-4 right-4">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
           <Mic size={24}/>
        </button>
      </footer>
    </div>
  );
}