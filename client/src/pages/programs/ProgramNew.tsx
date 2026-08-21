import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProgramForm from "../../components/programs/ProgramForm";
import type { Category } from "../../types/types";

function ProgramNew() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data: Category[]) => setCategories(data));
  }, []);

  const navigate = useNavigate();

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: 0,
    category_id: 1,
  };

  return (
    <>
      <ProgramForm
        defaultValue={newProgram}
        onSubmit={(programData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(programData),
          })
            .then((response) => response.json())
            .then((data) => {
              navigate(`/programs/${data.insertId}`);
            });
        }}
        categories={categories}
      >
        Ajouter
      </ProgramForm>
    </>
  );
}

export default ProgramNew;
