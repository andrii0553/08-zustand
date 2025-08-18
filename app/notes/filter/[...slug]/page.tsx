import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { title } from "process";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const resolvedParams = await params; // Розгортаємо проміс
  const slug = resolvedParams.slug || []; // Отримуємо slug з розгорнутого об’єкта
  const tag =
    slug[0] === "all" || !slug[0] ? undefined : decodeURIComponent(slug[0]);
  const readableTag = tag || "Усі";

  return {
    title: `Notes — Filter: ${readableTag}`,
    description: `View notes filtered by tag: ${readableTag}.`,
    openGraph: {
      title: `Notes — Filter: ${readableTag}`,
      description: `View notes filtered by tag: ${readableTag}.`,
      url: `https://your-domain.com/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub Notes — Filter: ${readableTag}`,
        },
      ],
    },
  };
};

const NotesByTags = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const page = 1;
  const perPage = 12;
  const search = "";
  const tag = slug[0] === "all" ? undefined : slug[0];
  const data = await fetchNotes(page, perPage, search, tag);

  return <NotesClient initialData={data} tag={tag || "All"} />;
};
export default NotesByTags;
