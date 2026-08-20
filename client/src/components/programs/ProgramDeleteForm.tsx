import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface ProgramFormProps {
  id: number;
  children: ReactNode;
}

function ProgramDeleteForm({ children, id }: ProgramFormProps) {
  const navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`, {
            method: "delete",
          }).then((response) => {
            if (response.status === 204) {
              navigate("/programs");
            }
          });
        }}
      >
        <button type="submit">{children}</button>
      </form>
    </>
  );
}

export default ProgramDeleteForm;
