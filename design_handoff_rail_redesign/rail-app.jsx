// RAIL Dashboard — interactive app (sortable table, EN/UA, sync, tweaks)
const { useState, useRef } = React;

function fmtAgo(m, T) {
  if (m.live) return null;
  if (m.ago < 24) return m.ago + T.hrs + " " + T.ago;
  return Math.round(m.ago / 24) + T.days + " " + T.ago;
}

function MatchCard({ m, T }) {
  const homeWin = m.hs > m.as;
  return (
    <div className={"rl-m" + (m.live ? " live" : "")}>
      <div className="mh">
        {m.live
          ? <span className="lv"><i /> {T.live} · {T.rd} {m.round}</span>
          : <span>{T.final} · {fmtAgo(m, T)}</span>}
        <span>{m.map}</span>
      </div>
      <div className="mb">
        <span className="tm">{m.home}</span>
        <span className="sc">
          <span className={homeWin ? "w" : "l"}>{m.hs}</span>
          <span className="d">:</span>
          <span className={!homeWin ? "w" : "l"}>{m.as}</span>
        </span>
        <span className="tm away">{m.away}</span>
      </div>
      <div className="mf">FACEIT · HUB 3B81</div>
    </div>
  );
}

function RailApp() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#38bdf8",
    "density": "comfortable",
    "glow": true,
    "strip": true
  }/*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [lang, setLang] = useState("en");
  const [sort, setSort] = useState({ key: "kd", dir: "desc" });
  const [active, setActive] = useState("leaderboard");
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState("12:04");

  const T = window.RAIL_I18N[lang];
  const players = window.RAIL_PLAYERS;
  const stats = window.RAIL_STATS;
  const matches = window.RAIL_MATCHES;

  const cols = [
    { key: "rating", label: T.cols.rating, fmt: (v) => v.toFixed(2) },
    { key: "kd", label: T.cols.kd, fmt: (v) => v.toFixed(2), accent: true },
    { key: "adr", label: T.cols.adr, fmt: (v) => v.toFixed(1) },
    { key: "hs", label: T.cols.hs, fmt: (v) => v + "%" },
    { key: "win", label: T.cols.win, fmt: (v) => v + "%" },
    { key: "m", label: T.cols.m, fmt: (v) => v },
  ];

  const sorted = [...players].sort((a, b) => {
    const k = sort.key;
    let d;
    if (k === "rank") d = a.rank - b.rank;
    else if (k === "player") d = a.nick.toLowerCase().localeCompare(b.nick.toLowerCase());
    else d = a[k] - b[k];
    return sort.dir === "asc" ? d : -d;
  });

  function clickSort(key, defDir) {
    setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: defDir });
  }
  function caret(key) {
    if (sort.key !== key) return <span className="caret">▾</span>;
    return <span className="caret">{sort.dir === "asc" ? "▴" : "▾"}</span>;
  }
  function doSync() {
    if (syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      const d = new Date();
      setSynced(String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"));
    }, 850);
  }

  const nav = ["leaderboard", "matches", "players", "stats"];

  return (
    <div className="railapp" data-density={t.density} data-glow={t.glow ? "on" : "off"} style={{ "--acc": t.accent }}>
      <aside className="rl-side">
        <div className="rl-brand">
          <div className="rl-wm">PSRAGE<span>hub</span></div>
          <div className="rl-hubid">{T.hub} · 3B81</div>
        </div>
        <nav className="rl-nav">
          {nav.map((n) => (
            <button key={n} className={active === n ? "on" : ""} onClick={() => setActive(n)}>
              <span className="ic" />{T.nav[n]}
            </button>
          ))}
        </nav>
        <div className="rl-side-foot">
          <div className="rl-lang">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "uk" ? "on" : ""} onClick={() => setLang("uk")}>UA</button>
          </div>
          <button className={"rl-sync" + (syncing ? " spin" : "")} onClick={doSync}>
            <span className="rot">↻</span> {syncing ? T.sync + "…" : T.sync}
            <span className="when">{T.synced} {synced}</span>
          </button>
        </div>
      </aside>

      <main className="rl-main">
        <div className="rl-main-in">
          <header className="rl-head">
            <div>
              <h1>{T.appTitle}</h1>
              <p>{T.appSub} <b>{T.cols[sort.key] || sort.key}</b></p>
            </div>
            <span className="rl-live"><i /> {T.live} · {T.liveMatch}</span>
          </header>

          <section className="rl-stats">
            {stats.map((s) => (
              <div className="rl-card" key={s.key}>
                <div className="row">
                  <div className="tag">{T.stat[s.key].tag}</div>
                  <div className="ico">{s.icon}</div>
                </div>
                <div className="nk">{s.nick}</div>
                <div className="v">{s.value}</div>
                <div className="s">{T.stat[s.key].sub}</div>
              </div>
            ))}
          </section>

          <section className="rl-panel">
            <div className="rl-panel-h">
              <span className="t">{T.ranking}</span>
              <span className="meta">{players.length} {T.operatives} · <b>{T.liveTag}</b></span>
            </div>
            <div className="rl-tablewrap">
              <div className="rl-table">
                <div className="rl-th">
                  <div><button className={sort.key === "rank" ? "act" : ""} onClick={() => clickSort("rank", "asc")}>{T.cols.rank}{caret("rank")}</button></div>
                  <div><button className={sort.key === "player" ? "act" : ""} onClick={() => clickSort("player", "asc")}>{T.cols.player}{caret("player")}</button></div>
                  {cols.map((c) => (
                    <div className="num" key={c.key}>
                      <button className={sort.key === c.key ? "act" : ""} onClick={() => clickSort(c.key, "desc")}>{caret(c.key)}{c.label}</button>
                    </div>
                  ))}
                </div>
                {sorted.map((p) => (
                  <div className={"rl-tr" + (p.rank === 1 ? " t1" : "")} key={p.nick}>
                    <span className="rk">{String(p.rank).padStart(2, "0")}</span>
                    <span className="pl"><span className="av" /><span className="nm">{p.nick}</span></span>
                    {cols.map((c) => (
                      <span className={"num" + (c.accent ? " kd" : "")} key={c.key}>{c.fmt(p[c.key])}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {t.strip && (
            <section className="rl-strip">
              {matches.map((m, i) => <MatchCard m={m} T={T} key={i} />)}
            </section>
          )}
        </div>
      </main>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.accent}
          options={["#38bdf8", "#f43f5e", "#34d399", "#e8b54a", "#a855f7"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density} options={["comfortable", "compact"]}
          onChange={(v) => setTweak("density", v)} />
        <TweakToggle label="Glow on #1" value={t.glow} onChange={(v) => setTweak("glow", v)} />
        <TweakToggle label="Match strip" value={t.strip} onChange={(v) => setTweak("strip", v)} />
      </TweaksPanel>
    </div>
  );
}
window.RailApp = RailApp;
