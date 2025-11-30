import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Terminal() {
  // Enhanced 3D Tilt (subtle and smooth)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reduce tilt range for subtle effect
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - (rect.left + rect.width / 2);
    const posY = e.clientY - (rect.top + rect.height / 2);
    x.set(posX);
    y.set(posY);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  // Terminal Logic
  const [lines, setLines] = useState([
    { type: "system", text: "Welcome to keshav's terminal!" },
    { type: "system", text: "Type 'help' for commands." },
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

    if (trimmed === "help")
      return [
        { type: "output", text: "help    - show commands" },
        { type: "output", text: "about   - about me" },
        { type: "output", text: "skills  - my tech stack" },
        { type: "output", text: "contact - get in touch" },
        { type: "output", text: "clear   - clear terminal" },
      ];

    if (trimmed === "about")
      return [
        { type: "output", text: "Keshav Gilhotra" },
        { type: "output", text: "Full-Stack Developer" },
        { type: "output", text: "Open source contributor" },
      ];

    if (trimmed === "skills")
      return [
        { type: "output", text: "React, Node.js, Expo" },
        { type: "output", text: "Java, Python, Javascript" },
        { type: "output", text: "Docker, AWS, Git, Git/actions" },
      ];

    if (trimmed === "contact")
      return [
        { type: "output", text: "GitHub: @ikeshav26" },
        { type: "output", text: "Email: keshavgilhotra4@gmail.com" },
      ];

    if (trimmed === "clear") {
      setLines([]);
      return [];
    }

    if (trimmed === "") return [];

    return [{ type: "error", text: `Command not found: ${cmd}` }];
  };

  const handleSubmit = () => {
    const output = handleCommand(input);
    if (input.trim().toLowerCase() !== "clear") {
      setLines([...lines, { type: "input", text: input }, ...output]);
    }
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="bg-gradient-to-br from-[#181818]/90 to-[#141414]/80 backdrop-blur-xl border border-[#222] rounded-2xl overflow-hidden shadow-[0_0_60px_-15px_rgba(74,222,128,0.10),0_20px_40px_-20px_rgba(0,0,0,0.08)] w-110 transition-all duration-300"
    >
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#222222] to-[#1a1a1a] px-5 py-3 flex items-center gap-3 border-b border-[#00f050]/15">
        <div className="flex gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.6)]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.6)]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[#00f050]/80 text-sm font-mono tracking-wide">
            keshav@portfolio
          </span>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Output */}
      <div
        ref={scrollRef}
        className="p-5 h-70 overflow-y-auto font-mono text-sm leading-loose bg-gradient-to-b from-[#0d0d0d] to-[#080808] terminal-scrollbar"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`
              ${
                line.type === "input"
                  ? "text-[#00f050] font-medium"
                  : ""
              }
              ${
                line.type === "output"
                    ? "text-white/85 pl-4"
                  : ""
              }
              ${
                line.type === "system"
                  ? "text-[#00f050]/60 italic text-xs"
                  : ""
              }
              ${line.type === "error" ? "text-red-400 pl-4" : ""}
              py-0.5
            `}
          >
            {line.type === "input" ? `❯ ${line.text}` : line.text}
          </div>
        ))}

        {/* Input Field */}
        <div className="flex items-center mt-3 pt-2 border-t border-white/5">
          <span className="text-[#00f050] text-lg">❯</span>
          <input
            className="bg-transparent flex-1 ml-3 outline-none text-white caret-[#00f050] placeholder:text-white/30"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command..."
          />
        </div>
      </div>
    </motion.div>
  );
}