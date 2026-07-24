import { useEffect, useState } from "react";
import type { Program } from "../../types/types";

function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((response) => response.json())
      .then((data) => setPrograms(data));
  }, []);

  console.log(programs);

  return (
    <>
      <h1>Series</h1>
      {programs.map((program: Program) => (
        <div key={program.id}>
          <h2>{program.title}</h2>
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
