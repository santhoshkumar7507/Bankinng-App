const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  return (
    <div className="header-box animate-fade-in-up">
      <h1 className="header-box-title flex flex-wrap items-center gap-2">
        {title}
        {type === "greeting" && (
          <span className="relative inline-flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse-glow">
              &nbsp;{user}
            </span>
            <span className="inline-block size-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
          </span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;