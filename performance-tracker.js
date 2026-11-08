const assets = [
  { symbol: 'HYPE32196-USD', name: 'Hyperliquid', ticker: 'HYPE', baseline: '2026-08-23' },
  { symbol: 'SOL-USD', name: 'Solana', ticker: 'SOL', baseline: '2026-08-23' },
  { symbol: 'PUMP36507-USD', name: 'pump.fun', ticker: 'PUMP', baseline: '2026-08-23' },
  { symbol: 'AAVE-USD', name: 'Aave', ticker: 'AAVE', baseline: '2026-08-23' },
  { symbol: 'ENA-USD', name: 'Ethena', ticker: 'ENA', baseline: '2026-08-23' },
  { symbol: 'CRCL', name: 'Circle', ticker: 'CRCL', baseline: '2026-08-21' },
  { symbol: 'COIN', name: 'Coinbase', ticker: 'COIN', baseline: '2026-08-21' },
  { symbol: 'HOOD', name: 'Robinhood', ticker: 'HOOD', baseline: '2026-08-21' },
];

const rows = document.getElementById('performance-rows');
const status = document.getElementById('performance-status');
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 });

async function loadAsset(asset) {
  const start = Math.floor(Date.parse(asset.baseline + 'T00:00:00Z') / 1000);
  const end = Math.floor(Date.now() / 1000) + 86400;
  const target = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(asset.symbol)}?period1=${start}&period2=${end}&interval=1d`;
  const response = await fetch(`https://proxy.cors.dev/${target}`, { signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error('Quote unavailable');
  const data = await response.json();
  const chart = data.chart?.result?.[0];
  if (!chart || chart.meta?.currency !== 'USD') throw new Error('Quote unavailable');
  const index = chart.timestamp?.findIndex((time) => new Date(time * 1000).toISOString().slice(0, 10) === asset.baseline);
  const baseline = index >= 0 ? chart.indicators?.quote?.[0]?.close?.[index] : null;
  const latest = chart.meta?.regularMarketPrice;
  if (!(baseline > 0) || !(latest > 0) || !chart.meta?.regularMarketTime) throw new Error('Price unavailable');
  return { baseline, latest, change: (latest / baseline - 1) * 100, time: chart.meta.regularMarketTime };
}

async function loadPerformance() {
  const results = await Promise.allSettled(assets.map(loadAsset));
  rows.replaceChildren();
  let count = 0;
  results.forEach((result, index) => {
    const row = document.createElement('tr');
    const label = document.createElement('th');
    label.scope = 'row';
    label.textContent = `${assets[index].name} (${assets[index].ticker})`;
    row.append(label);
    if (result.status === 'fulfilled') {
      count += 1;
      const { baseline, latest, change, time } = result.value;
      const values = [money.format(baseline), money.format(latest), `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`];
      values.forEach((value, i) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        if (i === 1) {
          const timestamp = document.createElement('small');
          timestamp.className = 'performance-time';
          timestamp.textContent = new Date(time * 1000).toLocaleString();
          cell.append(timestamp);
        }
        if (i === 2) cell.className = change >= 0 ? 'performance-up' : 'performance-down';
        row.append(cell);
      });
    } else {
      const cell = document.createElement('td');
      cell.colSpan = 3;
      cell.textContent = 'Price unavailable';
      row.append(cell);
    }
    rows.append(row);
  });
  status.textContent = count ? `Showing ${count} of ${assets.length} available quotes. Checked ${new Date().toLocaleString()}.` : 'Prices are unavailable right now. Please try refreshing later.';
}

loadPerformance();
