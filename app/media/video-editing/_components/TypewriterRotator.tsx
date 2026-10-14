"use client";

import { useEffect, useState } from "react";

const WORDS = ["explainer videos.", "ad creatives.", "brand films.", "social reels.", "podcast edits.", "launch stories."];

export default function TypewriterRotator() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[index];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1400 : empty ? 300 : deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % WORDS.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <p className="cvx-typer" aria-live="off">
      <span className="cvx-typer-lead">We make</span>{" "}
      <span className="cvx-typer-word">{text}</span>
      <span className="cvx-typer-caret" aria-hidden="true" />
    </p>
  );
}
