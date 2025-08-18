"use client";

import css from "./NoteForm.module.css";
import { useId } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteData } from "../../types/note";
import { createNote } from "@/lib/api";

import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const fieldId = useId();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/All");
    },
  });

  const handleCancel = () => router.push("/notes/filter/All");

  const handleSubmit = (formData: FormData) => {
    const values: NewNoteData = {
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || "",
      tag: formData.get("tag") as "Todo",
    };
    mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
          rows={8}
          className={css.textarea}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          value={draft?.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
