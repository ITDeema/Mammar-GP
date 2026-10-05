"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { useT } from "@/lib/i18n";
import { isValidEmail } from "@/lib/validation";

export default function LoginPage() {
  const { t } = useT();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailError = isValidEmail(email) ? undefined : t("error.emailInvalid");
  const passwordError = password === "" ? t("error.passwordRequired") : undefined;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (emailError || passwordError) return;

    // TODO: call the login API here. Until it exists, any valid-looking
    // input passes. Also change the destination to the plot-selection page.
    router.push("/select-plot");
  }

  return (
    <Card className="w-full max-w-md sm:p-8">
      <h1 className="font-heading text-2xl font-bold">{t("login.title")}</h1>
      <p className="mt-2 text-sm text-navy-900/70">{t("login.subtitle")}</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 flex flex-col gap-5"
      >
        <Input
          label={t("common.email")}
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={submitted ? emailError : undefined}
        />
        <Input
          label={t("common.password")}
          type="password"
          dir="ltr"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={submitted ? passwordError : undefined}
        />

        <Link
          href="/forgot-password"
          className="self-end text-sm text-navy-900/70 underline hover:text-navy-900"
        >
          {t("login.forgot")}
        </Link>

        <Button type="submit" fullWidth>
          {t("login.submit")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-900/70">
        {t("login.noAccount")}{" "}
        <Link href="/signup" className="font-semibold text-gold-700 underline">
          {t("login.toSignup")}
        </Link>
      </p>
    </Card>
  );
}