const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  return (
    <div className="header-box animate-fade-in-up">
      <h1 className="header-box-title flex flex-wrap items-center gap-2">
        {title}
        {type === "greeting" && (
          <span className="inline-flex items-center gap-2">
            <span
              className="font-black"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #38bdf8 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 3s ease infinite',
              }}
            >
              &nbsp;{user}
            </span>
            <span
              className="inline-block size-2.5 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 10px rgba(52,211,153,0.9)', animation: 'pulse 2s ease-in-out infinite' }}
            />
          </span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;