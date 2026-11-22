// Taskio - Apple Liquid Glass AI Productivity Assistant

const AIAssistant = ({
  state,
  onApplyAIProposal,
  onStartTimerForTask
}) => {
  const [messages, setMessages] = React.useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${state.user.name || 'Friend'}. I am your Taskio AI Intelligence Coach.\n\nI have synthesized your active projects, today's schedule, and pending priorities.\n\nHow can I help optimize your focus today? Tap any recommendation below or type your question.`,
      source: 'system',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: 'Plan today 🌅', prompt: 'I have pending tasks and active projects. Help me plan today with an optimal time-blocked routine.' },
    { label: 'What to work on next? 🎯', prompt: 'What is the single highest leverage task I should work on right now?' },
    { label: 'Break down a project 📁', prompt: 'Please break down my SaaS Platform Redesign project into actionable milestone subtasks.' },
    { label: 'Rescue overdue tasks ⚠️', prompt: 'Review my overdue tasks and suggest a realistic recovery schedule without burnout.' },
    { label: 'Weekly executive report 📊', prompt: 'Generate an executive weekly productivity review of my logged hours and velocity.' },
    { label: 'Motivate me 💪', prompt: 'I am feeling a bit tired and struggling with focus. Give me a productivity mindset reframe.' }
  ];

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    window.audioService.playButtonTap();

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await window.aiService.processMessage(query, state);
      window.audioService.playTaskCreate();

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: result.text,
        proposal: result.proposal,
        source: result.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'ai',
          text: 'I ran into an issue processing that request. Please try again or check your settings.',
          source: 'error',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col rounded-3xl liquid-glass-elevated overflow-hidden shadow-2xl relative">
      {/* Siri / Apple Intelligence Glow Accent on Top Edge */}
      <div className="absolute top-0 left-0 right-0 h-1 siri-glow opacity-80"></div>

      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl siri-glow text-white flex items-center justify-center shadow-md shrink-0">
            <Icon name="sparkles" size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-base text-[var(--text-primary)]">
                Taskio Intelligence
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/30">
                Active & Local Ready
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              {state.user.geminiApiKey ? 'Connected to Gemini 2.0 Flash Free Tier' : 'Powered by Context-Aware Local Heuristic Engine'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            window.audioService.playButtonTap();
            setMessages([messages[0]]);
          }}
          className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
          title="Clear Conversation"
        >
          <Icon name="rotateccw" size={16} />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 text-sm space-y-2.5 shadow-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                    : 'liquid-glass text-[var(--text-primary)] rounded-tl-none border-white/15'
                }`}
              >
                <div className="whitespace-pre-wrap text-xs sm:text-sm">
                  {msg.text}
                </div>

                {/* Interactive Action Proposal Glass Card */}
                {msg.proposal && (
                  <div className="mt-3 p-4 rounded-2xl liquid-glass-elevated space-y-2.5 text-xs border border-white/20">
                    <div className="flex items-center justify-between font-bold text-[var(--text-primary)]">
                      <span className="flex items-center gap-1.5 text-purple-500 dark:text-purple-400">
                        <Icon name="sparkles" size={14} /> Action Proposal
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">Confirmation Required</span>
                    </div>

                    {msg.proposal.action === 'create_tasks' && (
                      <div className="space-y-2">
                        <p className="text-[var(--text-secondary)] font-medium">{msg.proposal.title || 'Suggested Tasks:'}</p>
                        <div className="space-y-1">
                          {msg.proposal.tasks.map((t, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-xl liquid-glass-subtle text-[11px]">
                              <span className="font-semibold text-[var(--text-primary)] truncate max-w-[220px]">{t.title}</span>
                              <span className="font-mono text-[var(--text-muted)]">{t.startTime || t.priority}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            window.audioService.playGoalComplete();
                            onApplyAIProposal(msg.proposal);
                          }}
                          className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                        >
                          Apply to My Planner ({msg.proposal.tasks.length} tasks)
                        </button>
                      </div>
                    )}

                    {msg.proposal.action === 'start_timer' && (
                      <div className="space-y-2">
                        <p className="text-[var(--text-secondary)]">Ready to tackle &ldquo;{msg.proposal.taskTitle}&rdquo;?</p>
                        <button
                          onClick={() => {
                            window.audioService.playTimerStart();
                            onStartTimerForTask(msg.proposal.taskId);
                          }}
                          className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 active:scale-95"
                        >
                          <Icon name="play" size={13} />
                          <span>Start 25-Minute Focus Session</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className={`text-[10px] font-mono flex items-center justify-between pt-1 ${isUser ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.source && (
                    <span className="italic uppercase text-[9px]">{msg.source === 'gemini' ? 'Gemini 2.0 API' : 'Local Intelligence'}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="p-3.5 rounded-2xl liquid-glass flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Glass Chips */}
      <div className="px-4 py-2 border-t border-white/10 bg-white/5 overflow-x-auto flex items-center space-x-2">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp.prompt)}
            className="px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-500/40 whitespace-nowrap transition-all shadow-xs font-semibold active:scale-95"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input Glass Bar */}
      <div className="p-4 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask your AI coach: e.g. 'Plan my day' or 'What should I do next?'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl liquid-glass-subtle text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-40 shadow-md active:scale-95"
          >
            <Icon name="arrow-right" size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

window.AIAssistant = AIAssistant;
