import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome player</h1>
      <h2>Lets play</h2>
      <Link to='/game' className='btn btn-primary'>
        START
      </Link>
    </div>
  );
};

export default Home;
