"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

type Status = "idle" | "loading" | "success" | "error";

export function EnrollForm() {
  const t = useTranslations("enroll.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (!name || !phone) {
      setStatus("error");
      setError(t("errorRequired"));
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setStatus("error");
      setError(t("errorPhone"));
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, locale }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(t("error"));
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[18rem] flex-col items-center justify-center rounded-2xl border border-brand/30 bg-brand/5 p-10 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
          <CheckCircle2 className="h-9 w-9 text-brand" />
        </span>
        <p className="mt-5 max-w-xs text-lg font-semibold text-foreground text-pretty">
          {t("success")}
        </p>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePh")}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
          {t("phone")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={t("phonePh")}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("loading")}
          </>
        ) : (
          <>
            {t("submit")}
            <Send className="h-4 w-4" />
          </>
        )}
      </button>

      {status === "error" && error ? (
        <p role="alert" className="text-center text-sm font-medium text-brand">
          {error}
        </p>
      ) : null}
    </form>
  );
}
