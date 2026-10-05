"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useT } from "@/lib/i18n";
import { useResults } from "@/lib/results";
import type { AnalysisResult } from "@/lib/results";
import { MAX_RESULT_NAME_LENGTH } from "@/lib/validation";

type Props = {
  result: AnalysisResult | null; // null = the dialog is closed
  onClose: () => void;
};

function RenameForm({
  result,
  onClose,
}: {
  result: AnalysisResult;
  onClose: () => void;
}) {
  const { t } = useT();
  const { rename } = useResults();
  const [name, setName] = useState(result.name);
  const [submitted, setSubmitted] = useState(false);

  const trimmed = name.trim();
  const error = trimmed === "" ? t("rename.errorRequired") : undefined;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (error) return;
    rename(result.id, trimmed);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label={t("rename.label")}
        autoFocus
        maxLength={MAX_RESULT_NAME_LENGTH}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={submitted ? error : undefined}
      />
      <div className="mt-6 flex gap-3">
        <Button type="submit">{t("common.save")}</Button>
        <Button variant="secondary" onClick={onClose}>
          {t("common.cancel")}
        </Button>
      </div>
    </form>
  );
}

// Shared by the saved, history and (later) results pages.
// Usage: <RenameResultModal result={renaming} onClose={() => setRenaming(null)} />
export default function RenameResultModal({ result, onClose }: Props) {
  const { t } = useT();
  return (
    <Modal open={result !== null} onClose={onClose} title={t("rename.title")}>
      {result && <RenameForm result={result} onClose={onClose} />}
    </Modal>
  );
}