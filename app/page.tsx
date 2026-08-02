"use client";

import { useCallback, useEffect, useState } from "react";

const notes = [
  "Every day, older adults remember pieces of their lives—a train station, a first job, a childhood friend. These memories often disappear, not because they weren’t important, but because no one was there to ask the next question.",
  "We don’t want another chatbot. We want an AI that notices a memory, catches it, and gently asks one more question.",
  "Here, one ordinary sentence opens a door. The AI listens patiently, asks something specific, and preserves the speaker’s own voice—not just a transcript.",
  "That conversation becomes a living archive. The AI remembers people, relationships, places, dates, and the stories between them.",
  "The goal isn’t to replace the family. It’s to bring the family back into the conversation. The AI offers the next question, then gets out of the way.",
  "We catch the memory before it disappears and build a history the family can keep. One day, your grandchildren won’t just read your story. They’ll hear it.",
];

function Waveform({ light = false }: { light?: boolean }) {
  return <div className={`waveform ${light ? "light" : ""}`} aria-label="Voice recording waveform">
    {Array.from({ length: 36 }).map((_, i) => <i key={i} style={{ "--h": `${18 + ((i * 17) % 56)}%`, "--d": `${i * -0.045}s` } as React.CSSProperties} />)}
  </div>;
}

function Slide({ n }: { n: number }) {
  if (n === 0) return <section className="slide slide-loss">
    <span className="kicker">The stories we almost lost</span>
    <h1>Every day, millions of<br /><em>stories disappear.</em></h1>
    <div className="hairline" />
    <p>Not because they weren’t important.</p>
    <p className="strong">Because nobody asked the next question.</p>
    <span className="folio">01</span>
  </section>;

  if (n === 1) return <section className="slide slide-philosophy">
    <div className="photo-memory"><img src="./elder-by-bed.png" alt="An older woman standing beside her bed, seen in profile by a rain-streaked window" /></div>
    <div className="philosophy-copy">
      <span className="kicker">Linger</span>
      <h2>Linger doesn’t just create<br />conversations.</h2>
      <p>It catches conversations<br /><em>that almost happened.</em></p>
      <div className="tiny-rule" />
      <small>Notice the memory. Ask one more question.</small>
    </div>
    <span className="folio">02</span>
  </section>;

  if (n === 2) return <section className="slide slide-demo">
    <header><span className="live-dot" /> One conversation</header>
    <div className="conversation">
      <div className="speaker-label">GRANDMA</div>
      <blockquote>“The rain today reminds me of<br />the day I left home.”</blockquote>
      <div className="ai-question"><span>LINGER</span><p>Who was with you?</p></div>
      <div className="reply"><span>GRANDMA</span><p>My younger brother Ming.</p></div>
      <div className="ai-question second"><span>LINGER</span><p>How old were you then?</p></div>
    </div>
    <div className="memory-saved"><span>✓</span><div><b>Memory saved</b><small>Voice preserved · Family archive updated</small></div></div>
    <Waveform />
    <span className="folio">03</span>
  </section>;

  if (n === 3) return <section className="slide slide-archive">
    <div className="archive-title"><span className="kicker">A living family archive</span><h2>One voice.<br />A history that grows.</h2><p>Every conversation remembers the people, places, and stories between them.</p></div>
    <div className="archive-canvas">
      <div className="archive-status"><span>VOICE</span><i /> <span>MEMORY</span><i /> <span>FAMILY HISTORY</span></div>
      <div className="year">1968<span>LEFT HOME BY TRAIN</span></div>
      <div className="tree-line l1" /><div className="tree-line l2" />
      <div className="person grandma"><b>Mei</b><small>Grandmother</small></div>
      <div className="person ming"><b>Ming</b><small>Younger brother</small></div>
      <article className="story-card"><span>STORY 04</span><h3>The day I left home</h3><p>Seventeen years old. One suitcase. A red scarf made by her mother.</p><Waveform light /></article>
      <div className="voice-chip">◉ Original voice preserved</div>
    </div>
    <span className="folio">04</span>
  </section>;

  if (n === 4) return <section className="slide slide-gathering">
    <span className="kicker">Back to the family</span>
    <div className="gather-grid">
      <div className="young-person" aria-hidden="true"><div className="head" /><div className="body" /></div>
      <div className="uncertain"><span>GRANDDAUGHTER</span><h2>“I never know what to ask my grandma.”</h2></div>
      <article className="prompt-card"><small>FAMILY GATHERING MODE</small><span className="quote-mark">“</span><h3>Ask her why she never went back to that train station.</h3><div>From “The day I left home” <b>→</b></div></article>
    </div>
    <div className="gather-conclusion"><span>AI doesn’t replace family conversations.</span><strong>It helps them begin.</strong></div>
    <span className="folio">05</span>
  </section>;

  return <section className="slide slide-legacy">
    <div className="legacy-top"><span className="kicker">For the generations after us</span><p>Catch the memory before it disappears.</p><p>Build a history the family can keep.</p></div>
    <div className="legacy-center"><Waveform light /><h2>One day, your grandchildren<br />won’t just read your story.</h2><strong>They’ll hear it.</strong></div>
    <div className="brand"><span className="brand-mark">L</span><div><b>Linger</b><small>Some voices should linger.</small></div></div>
    <span className="folio">06</span>
  </section>;
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [notesOpen, setNotesOpen] = useState(false);
  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(5, next));
    if (clamped !== page) { setDirection(clamped > page ? "next" : "prev"); setPage(clamped); }
  }, [page]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) { e.preventDefault(); go(page + 1); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(page - 1); }
      if (e.key.toLowerCase() === "n") setNotesOpen(v => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, page]);

  return <main className="book-stage">
    <div className="topbar"><div className="mini-brand"><span>L</span> Linger</div><button onClick={() => setNotesOpen(v => !v)} aria-pressed={notesOpen}>Presenter notes <kbd>N</kbd></button></div>
    <button className="edge edge-left" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous page">‹</button>
    <div className="book-shell" onClick={(e) => { const x = e.clientX / window.innerWidth; go(page + (x > .5 ? 1 : -1)); }}>
      <div key={page} className={`page ${direction}`}><Slide n={page} /></div>
      <div className="page-stack one" /><div className="page-stack two" />
    </div>
    <button className="edge edge-right" onClick={() => go(page + 1)} disabled={page === 5} aria-label="Next page">›</button>
    <footer><div className="progress">{Array.from({ length: 6 }).map((_, i) => <button key={i} onClick={() => go(i)} className={i === page ? "active" : ""} aria-label={`Go to slide ${i + 1}`} />)}</div><span>{page + 1} / 6</span><small>Click the page or use arrow keys to turn</small></footer>
    <aside className={`notes-panel ${notesOpen ? "open" : ""}`}><button onClick={() => setNotesOpen(false)} aria-label="Close notes">×</button><span>SPEAKER NOTES · {page + 1} / 6</span><p>{notes[page]}</p><small>Suggested timing: {page === 2 ? "45 seconds" : page === 4 ? "40 seconds" : "20 seconds"}</small></aside>
  </main>;
}
