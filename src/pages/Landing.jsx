import React, { useEffect } from "react";

const Landing = () => {

   useEffect(() => {
      document.title = "LinkChain";
    }, []);

  return <div>Landing</div>;
};

export default Landing;