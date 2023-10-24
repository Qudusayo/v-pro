function Success() {
  return (
    <div className="icon success animate">
      <span className="line tip animateSuccessTip"></span>
      <span className="line long animateSuccessLong"></span>
      <div className="placeholder"></div>
    </div>
  );
}

function Error() {
  return (
    <div className="icon error animateErrorIcon">
      <span className="x-mark animateXMark">
        <span className="line left"></span>
        <span className="line right"></span>
      </span>
    </div>
  );
}

function Warning() {
  return (
    <div className="icon warning pulseWarning">
      <span className="body pulseWarningIns"></span>
      <span className="dot pulseWarningIns"></span>
    </div>
  );
}

export { Success, Error, Warning };
