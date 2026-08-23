import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const posts = [
  { date: '08/23/2026', title: 'Revenue + Stablecoins: My Thesis for the 2026–2030 Crypto Bull Run', href: 'revenue-stablecoins-crypto-bull-run.html' },
  { date: '01/03/2026', title: 'How to Lose $50 Million with Iron Condors', href: 'how-to-lose-50-million.html' },
];

function SocialLinks() {
  return <div className="social">
    <a href="https://github.com/nurnibir123" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.89-.01-1.74-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.59 2.36 1.13 2.94.86.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05.8-.23 1.66-.34 2.52-.34.86 0 1.72.12 2.52.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.23C22 6.58 17.52 2 12 2z" /></svg></a>
    <a href="https://linkedin.com/in/nur-nibir" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.44 2H3.56C2.7 2 2 2.7 2 3.56v16.88C2 21.3 2.7 22 3.56 22h16.88c.86 0 1.56-.7 1.56-1.56V3.56C22 2.7 21.3 2 20.44 2zM8.28 18.46H5.71V9.9h2.57v8.56zM7 8.72a1.49 1.49 0 1 1 0-2.98 1.49 1.49 0 0 1 0 2.98zm11.48 9.74h-2.57v-4.16c0-.99-.02-2.26-1.38-2.26-1.38 0-1.59 1.08-1.59 2.19v4.23h-2.57V9.9h2.47v1.17h.04c.34-.64 1.18-1.31 2.43-1.31 2.6 0 3.08 1.73 3.08 3.97v4.73z" /></svg></a>
  </div>;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return <div className="page">
    <header className="topbar"><Link className="brand" to="/"><span className="logo">NN</span><span className="name">Nur Nibir</span></Link><nav className="nav"><Link to="/">home</Link><a href="#about">about</a></nav><div className="header-actions"><SocialLinks /><button className="theme-toggle" type="button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle dark theme">{darkMode ? '☼' : '☾'}</button></div></header>
    <section id="home" className="hero"><h1>Runtime Notes.</h1><p className="lede">Notes on software systems, markets, and the ideas between them. I write about engineering, finance, and the mechanics behind both.</p></section>
    <main className="content"><section className="year-block"><h2>2026</h2><ol>{posts.map((post) => <li key={post.href}><span>({post.date})</span> <a href={`./${post.href}`}>{post.title}</a></li>)}</ol></section></main>
    <section id="about" className="about"><div className="about-card"><p className="date">January 20, 2026</p><h2>About Me</h2><p>Hey, I’m Nur. I grew up in Queens and studied computer science at Stony Brook University. I work with product teams on the systems behind customer-facing software. This site is where I collect experiments, market observations, and unfinished ideas.</p><p>I’ve built distributed systems at AWS, Amazon Alexa, Coinbase, and American Express. My work has covered platform migrations, performance, resiliency, and multi-region launches.</p></div></section>
  </div>;
}
