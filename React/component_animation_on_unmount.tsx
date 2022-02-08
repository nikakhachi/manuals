import "./App.css";
import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [showHome, setShowHome] = useState(true);
  const [homeRender, setHomeRender] = useState(showHome);

  useEffect(() => {
    if (showHome) setHomeRender(true);
  }, [showHome]);

  const onAnimationEnd: () => void = () => {
    if (!showHome) setHomeRender(false);
  };

  return (
    <>
      {homeRender ? (
        <>
          <div onAnimationEnd={onAnimationEnd}>
            <div>
              <h2 style={!showHome ? { animation: `slideLeft 0.85s ease-out` } : {}}>
                H2 TAG
              </h2>
              <button style={!showHome ? { animation: `slideBottom 0.85s ease-out` } : {}} onClick={() => setShowHome((state) => !state)}>
                Animate, than unmount and load other component
              </button>
            </div>
          </div>
        </>
      ) : (
        <button onClick={() => setShowHome((state) => !state)}>Home Page</button>
      )}
    </>
  );
}

export default App;
