import type { ReactNode } from "react";
import type { Category } from "../../types/types";

interface ProgramData {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
}

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  categories: Category[];
  onSubmit: (program: ProgramData) => void;
}

function ProgramForm({
  children,
  defaultValue,
  categories,
  onSubmit,
}: ProgramFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const synopsis = formData.get("synopsis") as string;
        const poster = formData.get("poster") as string;
        const country = formData.get("country") as string;
        const year = Number(formData.get("year")) as number;
        const category_id = Number(formData.get("category_id")) as number;
        onSubmit({ title, synopsis, poster, country, year, category_id });
      }}
    >
      Title :
      <input type="text" name="title" defaultValue={defaultValue.title} />{" "}
      <br />
      Synopsis :
      <input type="text" name="synopsis" defaultValue={defaultValue.synopsis} />
      <br />
      Poster :
      <input type="text" name="poster" defaultValue={defaultValue.poster} />
      <br />
      Country :
      <input type="text" name="country" defaultValue={defaultValue.country} />
      <br />
      Year : <input type="text" name="year" defaultValue={defaultValue.year} />
      <br />
      Category :{" "}
      <select name="category_id" defaultValue={defaultValue.category_id}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <br />
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
