import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — NoteHub",
  description:
    "Sorry, the page was not found. It may have been deleted or never existed.",
  openGraph: {
    title: "Page not found — NoteHub",
    description:
      "Sorry, the page was not found. It may have been deleted or never existed.",
    url: "http:localhost:3000",
    images: [
      {
        url: "https:ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview image",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
