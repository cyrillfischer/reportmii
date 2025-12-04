import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed: number = 40, start: boolean = false) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!start) return;
    let index = 0;

    const interval = setInterval(() => {
      setOutput((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, start]);

  return output;
}
