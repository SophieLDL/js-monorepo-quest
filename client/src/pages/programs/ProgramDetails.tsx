import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ProgramDeleteForm from "../../components/programs/ProgramDeleteForm";
import type { Category, Program } from "../../types/types";

function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState<Program>();
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => setProgram(data));
  }, [id]);

  useEffect(() => {
    if (program != null) {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${program.category_id}`,
      )
        .then((response) => response.json())
        .then((data: Category) => setCategory(data));
    }
  }, [program]);

  return (
    <>
      <Link to="/programs">Revenir aux programmes</Link>
      {program && (
        <div>
          <h1>{program.title}</h1>
          <p>{program.synopsis}</p>
          <img src={program.poster} alt={`${program.title}\'s poster`} />
          <p>Pays : {program.country}</p>
          <p>Année : {program.year}</p>
          {category && <p>Catégorie : {category.name}</p>}
          <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
          <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
        </div>
      )}
    </>
  );
}

export default ProgramDetails;
