const LivelyBackground = () => {
  return (
    <div aria-hidden className="lively-bg pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="lively-bg__mesh" />
      <div className="lively-bg__orb lively-bg__orb--1" />
      <div className="lively-bg__orb lively-bg__orb--2" />
      <div className="lively-bg__orb lively-bg__orb--3" />
      <div className="lively-bg__orb lively-bg__orb--4" />
      <div className="lively-bg__beam lively-bg__beam--a" />
      <div className="lively-bg__beam lively-bg__beam--b" />
      <div className="lively-bg__shimmer" />
      <div className="lively-bg__grain" />
    </div>
  );
};

export default LivelyBackground;