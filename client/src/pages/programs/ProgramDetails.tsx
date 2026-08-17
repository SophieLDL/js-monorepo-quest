import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Program } from "../../types/types";

function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState<Program>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => setProgram(data));
  }, [id]);

  return (
    program && (
      <>
        <h1>{program.title}</h1>
        <p>{program.synopsis}</p>
        <img src={program.poster} alt={`${program.title}\'s poster`} />
        <p>Pays : {program.country}</p>
        <p>Année : {program.year}</p>
      </>
    )
  );
}

export default ProgramDetails;
