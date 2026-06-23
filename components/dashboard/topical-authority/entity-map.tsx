const entities = [
  { label: "Search Engines", relevance: 92, x: 50, y: 12 },
  { label: "Machine Learning", relevance: 88, x: 76.9, y: 23.1 },
  { label: "Keyword Research", relevance: 95, x: 88, y: 50 },
  { label: "Content Optimization", relevance: 90, x: 76.9, y: 76.9 },
  { label: "User Intent", relevance: 84, x: 50, y: 88 },
  { label: "SERP Features", relevance: 71, x: 23.1, y: 76.9 },
  { label: "NLP", relevance: 79, x: 12, y: 50 },
  { label: "Content Marketing", relevance: 86, x: 23.1, y: 23.1 },
]

export function EntityMap() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Entity Mapping</p>
      <p className="text-xs text-muted-foreground">
        Entities semantically connected to your core topic, “AI SEO Tools”
      </p>

      <div className="relative mx-auto mt-6 aspect-square w-full max-w-md">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id="entity-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(129 140 248)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(232 121 249)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {entities.map((entity) => (
            <line
              key={entity.label}
              x1="50"
              y1="50"
              x2={entity.x}
              y2={entity.y}
              stroke="url(#entity-line)"
              strokeWidth="0.6"
            />
          ))}
        </svg>

        <div className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-5 text-center shadow-xl shadow-indigo-500/30 sm:p-6">
          <span className="text-xs font-semibold text-white">AI SEO</span>
          <span className="text-xs font-semibold text-white">Tools</span>
        </div>

        {entities.map((entity) => (
          <div
            key={entity.label}
            style={{ left: `${entity.x}%`, top: `${entity.y}%` }}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          >
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-foreground backdrop-blur-xl">
              {entity.label}
            </span>
            <span className="rounded-full bg-background/80 px-1.5 py-0.5 text-[10px] text-emerald-400 ring-1 ring-emerald-400/30">
              {entity.relevance}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
