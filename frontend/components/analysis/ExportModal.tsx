"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SegmentedControl from "@/components/SegmentedControl";
import StatusMessage from "@/components/analysis/StatusMessage";
import { useT } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { buildReportHtml, downloadHtml } from "@/lib/report";
import type { ReportInput } from "@/lib/report";
import { useResultsCopy } from "@/lib/results-copy";

type Phase = "idle" | "working" | "ready" | "failed";

type ExportModalProps = {
  open: boolean;
  onClose: () => void;
  report: Omit<ReportInput, "lang"> | null; // null = the analysis is not complete, so export is blocked
  fileName: string;
  failOnce: boolean; // for testing: the first attempt fails
};

function ExportBody({
  onClose,
  report,
  fileName,
  failOnce,
}: Omit<ExportModalProps, "open"> & { report: Omit<ReportInput, "lang"> }) {
  const c = useResultsCopy().exportModal;
  const { lang: screenLang } = useT();
  const [lang, setLang] = useState<Lang>(screenLang);
  const [phase, setPhase] = useState<Phase>("idle");
  const [html, setHtml] = useState("");
  const shouldFail = useRef(failOnce);

  async function generate() {
    setPhase("working");
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      if (shouldFail.current) {
        shouldFail.current = false;
        throw new Error("Report generation failed");
      }
      setHtml(buildReportHtml({ ...report, lang }));
      setPhase("ready");
    } catch {
      setPhase("failed");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-navy-900/70">{c.intro}</p>

      <SegmentedControl<Lang>
        label={c.language}
        value={lang}
        onChange={(next) => {
          setLang(next);
          setPhase("idle"); // a new language needs a new report
        }}
        options={[
          { value: "ar", label: "العربية" },
          { value: "en", label: "English" },
        ]}
      />

      {phase === "working" && <StatusMessage tone="info">{c.working}</StatusMessage>}
      {phase === "failed" && <StatusMessage tone="error">{c.failed}</StatusMessage>}
      {phase === "ready" && (
        <>
          <StatusMessage tone="success">{c.ready}</StatusMessage>
          <p className="text-xs leading-6 text-navy-900/70">{c.note}</p>
        </>
      )}

      <div className="mt-2 flex flex-wrap gap-3">
        {phase === "ready" ? (
          <Button onClick={() => downloadHtml(fileName, html)}>{c.download}</Button>
        ) : (
          <Button disabled={phase === "working"} onClick={generate}>
            {phase === "failed" ? c.retry : c.generate}
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          {c.close}
        </Button>
      </div>
    </div>
  );
}

export default function ExportModal({ open, onClose, report, fileName, failOnce }: ExportModalProps) {
  const c = useResultsCopy().exportModal;
  return (
    <Modal open={open && report !== null} onClose={onClose} title={c.title}>
      {report && (
        <ExportBody onClose={onClose} report={report} fileName={fileName} failOnce={failOnce} />
      )}
    </Modal>
  );
}