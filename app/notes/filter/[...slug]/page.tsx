import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const tag = slug[0] === "all" ? undefined : slug[0];
  return {
    title: `Note tag: ${tag}`,
    description: `Browse notes filtered by the "${tag}" tag.`,
    openGraph: {
      title: `Note tag: ${tag}`,
      description: `Browse notes filtered by the "${tag}" tag.`,
      url: `http://localhost:3001/notes/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: "article",
    },
  };
}

const NotesByTags = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const page = 1;
  const perPage = 12;
  const search = "";
  const tag = slug[0] === "all" ? undefined : slug[0];

  // Створюємо клієнт і гідратуємо
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, perPage, search, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag || "All"} />
    </HydrationBoundary>
  );
};

export default NotesByTags;
