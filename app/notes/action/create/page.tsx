import { Metadata } from "next";
import CreateNote from "./CreateNote";

export const metadata: Metadata = {
  title: "Create Note",
  description: "A page to create a new note ",
  openGraph: {
    title: "Create Note",
    description: "A page to create a new note ",
    url: "http://localhost:3001/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — online notes manager",
      },
    ],
    type: "article",
  },
};

const CreateNotePage = async () => {
  return (
    <div>
      <CreateNote />
    </div>
  );
};

export default CreateNotePage;
