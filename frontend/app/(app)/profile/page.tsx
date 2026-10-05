"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SegmentedControl from "@/components/SegmentedControl";
import { useT } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { mockUser } from "@/lib/user";

type Dialog = "logout" | "delete" | null;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs text-navy-900/70">{label}</dt>
      <dd className="text-sm font-semibold">{value}</dd>
    </div>
  );
}

export default function ProfilePage() {
  const { t, lang, setLang } = useT();
  const router = useRouter();
  const [dialog, setDialog] = useState<Dialog>(null);
  const [deletePassword, setDeletePassword] = useState("");

  function closeDialog() {
    setDialog(null);
    setDeletePassword("");
  }

  function logout() {
    // TODO: clear the session via the API.
    closeDialog();
    router.push("/login");
  }

  function deleteAccount() {
    // TODO: call the delete-account API with the password.
    closeDialog();
    router.push("/login");
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 px-6 py-8">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-pill border border-navy-900/15 bg-navy-50 text-2xl font-bold"
        >
          {mockUser.name.charAt(0)}
        </div>
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-heading text-xl font-bold">{mockUser.name}</h1>
          <Badge>{t(`role.${mockUser.role}`)}</Badge>
        </div>
      </div>

      <Card>
        <h2 className="mb-4 text-sm font-bold">{t("profile.accountInfo")}</h2>
        <dl className="flex flex-col gap-4">
          <InfoRow label={t("common.fullName")} value={mockUser.name} />
          <InfoRow label={t("common.email")} value={mockUser.email} />
          <InfoRow
            label={t("common.accountType")}
            value={t(`role.${mockUser.role}`)}
          />
        </dl>
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-bold">{t("profile.settings")}</h2>
        <div className="max-w-xs">
          <SegmentedControl<Lang>
            label={t("profile.language")}
            value={lang}
            onChange={setLang}
            options={[
              { value: "ar", label: "العربية" },
              { value: "en", label: "English" },
            ]}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-bold">{t("profile.manage")}</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setDialog("logout")}>
            {t("profile.logout")}
          </Button>
          <Button variant="danger" onClick={() => setDialog("delete")}>
            {t("profile.delete")}
          </Button>
        </div>
      </Card>

      <Modal
        open={dialog === "logout"}
        onClose={closeDialog}
        title={t("profile.logout")}
      >
        <p className="text-sm text-navy-900/70">{t("profile.logoutBody")}</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={logout}>{t("profile.logout")}</Button>
          <Button variant="secondary" onClick={closeDialog}>
            {t("common.cancel")}
          </Button>
        </div>
      </Modal>

      <Modal
        open={dialog === "delete"}
        onClose={closeDialog}
        title={t("profile.delete")}
      >
        <p className="text-sm text-navy-900/70">{t("profile.deleteWarning")}</p>
        <div className="mt-4">
          <Input
            label={t("common.password")}
            type="password"
            dir="ltr"
            autoComplete="current-password"
            autoFocus
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
          <p className="mt-2 text-xs text-navy-900/70">
            {t("profile.deleteConfirm")}
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <Button
            variant="danger"
            disabled={deletePassword === ""}
            onClick={deleteAccount}
          >
            {t("profile.delete")}
          </Button>
          <Button variant="secondary" onClick={closeDialog}>
            {t("common.cancel")}
          </Button>
        </div>
      </Modal>
    </main>
  );
}