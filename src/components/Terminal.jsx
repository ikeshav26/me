import { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [lines, setLines] = useState([
    { type: 'system', text: "Welcome to keshav's terminal!" },
    { type: 'system', text: "Type 'help' for commands." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "help") return [
      { type: 'output', text: "help    - show commands" },
      { type: 'output', text: "about   - about me" },
      { type: 'output', text: "skills  - my tech stack" },
      { type: 'output', text: "contact - get in touch" },
      { type: 'output', text: "clear   - clear terminal" }
    ];
    if (trimmed === "about") return [
      { type: 'output', text: "Keshav Gilhotra" },
      { type: 'output', text: "Full-Stack Developer" },
      { type: 'output', text: "Building scalable web apps" }
    ];
    if (trimmed === "skills") return [
      { type: 'output', text: "React, Node.js, TypeScript" },
      { type: 'output', text: "Java, Python, PostgreSQL" },
      { type: 'output', text: "Docker, AWS, Git" }
    ];
    if (trimmed === "contact") return [
      { type: 'output', text: "GitHub: @ikeshav26" },
      { type: 'output', text: "Email: keshav@example.com" }
    ];
    if (trimmed === "clear") {
      setLines([]);
      return [];
    }
    if (trimmed === "") return [];
    return [{ type: 'error', text: `Command not found: ${cmd}` }];
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const output = handleCommand(input);
    if (input.trim().toLowerCase() !== "clear") {
      setLines([...lines, { type: 'input', text: input }, ...output]);
    }
    setInput("");
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a]/95 to-[#0f0f0f]/90 backdrop-blur-md border border-[#4ade80]/20 rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(74,222,128,0.15)] w-80">
    
      <div className="bg-gradient-to-r from-[#1f1f1f] to-[#181818] px-4 py-2.5 flex items-center gap-2 border-b border-[#4ade80]/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.5)]"></div>
        </div>
        <span className="text-[#4ade80]/70 text-xs ml-2 font-mono">keshav@portfolio ~ </span>
      </div>
      

      <div ref={scrollRef} className="p-4 h-52 overflow-y-auto font-mono text-sm leading-relaxed bg-[#0a0a0a]/50">
        {lines.map((line, i) => (
          <div key={i} className={`
            ${line.type === 'input' ? 'text-[#4ade80]' : ''}
            ${line.type === 'output' ? 'text-white/80' : ''}
            ${line.type === 'system' ? 'text-[#4ade80]/50 italic' : ''}
            ${line.type === 'error' ? 'text-red-400' : ''}
          `}>
            {line.type === 'input' ? `$ ${line.text}` : line.text}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex items-center mt-2">
          <span className="text-[#4ade80]">$</span>
          <input
            className="bg-transparent flex-1 ml-2 outline-none text-white caret-[#4ade80]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command..."
          />
        </form>
      </div>
    </div>
  );
}
