import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Program } from "../../types/types";

function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data) => setPrograms(data));
  }, []);

  return (
    <>
      <h1>Series</h1>
      {programs.map((program: Program) => (
        <div key={program.id}>
          <Link to={`/programs/${program.id}`}>
            <h2>{program.title}</h2>
          </Link>
          <p>{program.synopsis}</p>
          <img src={program.poster} alt={`${program.title}\'s poster`} />
          <p>Pays : {program.country}</p>
          <p>Année : {program.year}</p>
        </div>
      ))}
    </>
  );
}

export default Programs;
