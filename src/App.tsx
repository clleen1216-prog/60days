import React, { useState, useEffect } from 'react';
import { BookOpen, Target, Play, Volume2, Mic, Calendar, CheckCircle2, ChevronRight, Copy, Award, Sparkles } from 'lucide-react';
import { TASK_APP_DATA } from './data/taskDeliverables';

interface DialogueLine {
  speaker: string;
  en: string;
  zh: string;
}

interface Scenario {
  week: number;
  scenario_name: string;
  listening_script: { dialogue: DialogueLine[] };
}

const MOCK_SCENARIOS: Scenario[] = [
  { week: 2, scenario_name: "Small Talk (天氣與近況)", listening_script: { dialogue: [{ speaker: "A", en: "Crazy weather we're having, isn't it?", zh: "這天氣真反常，不是嗎？" }, { speaker: "B", en: "Tell me about it! I heard it's supposed to clear up by the weekend.", zh: "可不是嗎！我聽說週末應該會放晴。" }] } },
  { week: 3, scenario_name: "申請美國簽證 (面試問答)", listening_script: { dialogue: [{ speaker: "Officer", en: "What is the purpose of your trip to the US?", zh: "你去美國的目的是什麼？" }, { speaker: "Applicant", en: "I'm going for tourism and to visit a friend.", zh: "我去觀光並拜訪朋友。" }] } }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'learn' | 'roadmap'>('learn');
  const [currentRate, setCurrentRate] = useState(1);
  const [progress, setProgress] = useState<Record<number, boolean>>({});

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = currentRate;
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl flex items-center gap-2"><Sparkles className="text-blue-600" /> 英文聽說 60 天速成</h1>
        <nav className="flex gap-2">
          <button onClick={() => setActiveTab('learn')} className={`px-4 py-2 rounded-lg ${activeTab === 'learn' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>學習模組</button>
          <button onClick={() => setActiveTab('roadmap')} className={`px-4 py-2 rounded-lg ${activeTab === 'roadmap' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>專案規劃</button>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        {activeTab === 'learn' ? (
          <div className="space-y-6">
            {MOCK_SCENARIOS.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-bold text-lg">{s.scenario_name}</h2>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Week {s.week}</span>
                </div>
                <div className="space-y-3">
                  {s.listening_script.dialogue.map((line, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                      <div className="flex justify-between items-center cursor-pointer" onClick={() => speak(line.en)}>
                        <p className="text-sm text-slate-600">{line.speaker}: {line.en}</p>
                        <Volume2 className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{line.zh}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Target /> {TASK_APP_DATA.title}</h2>
            <p className="text-slate-600 mb-6">{TASK_APP_DATA.goal}</p>
            <div className="space-y-4">
              {TASK_APP_DATA.steps.map((step) => (
                <div key={step.order} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl">
                  <CheckCircle2 className="text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-slate-500">工具: {step.toolName} | {step.capabilityTag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="p-8 text-center text-slate-400 text-sm">
        © 2024 英文聽說 60 天速成開發計畫
      </footer>
    </div>
  );
}