import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProgramForm from "../../components/programs/ProgramForm";
import type { Category, Program } from "../../types/types";

function ProgramEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [program, setProgram] = useState<Program>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => setProgram(data));
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data: Category[]) => setCategories(data));
  }, []);

  return (
    program && (
      <ProgramForm
        defaultValue={program}
        categories={categories}
        onSubmit={(programData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/programs/${program.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(programData),
          }).then((response) => {
            if (response.status === 204) {
              navigate(`/programs/${program.id}`);
            }
          });
        }}
      >
        Modifier
      </ProgramForm>
    )
  );
}

export default ProgramEdit;
