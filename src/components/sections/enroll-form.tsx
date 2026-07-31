"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

type Status = "idle" | "loading" | "success" | "error";

// Formats up to 9 national digits as "+998 (XX) XXX-XX-XX" while typing.
function formatUzPhone(digits: string): string {
  let out = "+998";
  if (digits.length > 0) out += ` (${digits.slice(0, 2)}`;
  if (digits.length >= 2) out += ")";
  if (digits.length > 2) out += ` ${digits.slice(2, 5)}`;
  if (digits.length > 5) out += `-${digits.slice(5, 7)}`;
  if (digits.length > 7) out += `-${digits.slice(7, 9)}`;
  return out;
}

export function EnrollForm() {
  const t = useTranslations("enroll.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // National part of the phone number: exactly the 9 digits after +998.
  const [phoneDigits, setPhoneDigits] = useState("");

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let d = raw.replace(/\D/g, "");
    // Drop the country code, but only when it's really the country code:
    // either our own rendered "+998 …" prefix, or a pasted 12-digit number.
    // A bare 9-digit paste starting with 99 8… must keep all its digits.
    if (raw.trimStart().startsWith("+998")) d = d.slice(3);
    else if (d.length > 9 && d.startsWith("998")) d = d.slice(3);
    d = d.slice(0, 9);
    // Backspace on a separator ("-", ")", space) removes no digit — the value
    // would re-format to the same string and the key would feel dead. Detect
    // that case and drop the last digit instead.
    if (d === phoneDigits && raw.length < formatUzPhone(phoneDigits).length) {
      d = d.slice(0, -1);
    }
    setPhoneDigits(d);
    if (status === "error") setStatus("idle");
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();

    if (!name || phoneDigits.length === 0) {
      setStatus("error");
      setError(t("errorRequired"));
      return;
    }
    if (phoneDigits.length < 9) {
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
        body: JSON.stringify({ name, phone: formatUzPhone(phoneDigits), locale }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
      setPhoneDigits("");
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
          placeholder="+998 (__) ___-__-__"
          value={phoneDigits ? formatUzPhone(phoneDigits) : ""}
          onChange={onPhoneChange}
          maxLength={19}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-cta w-full disabled:cursor-not-allowed disabled:opacity-70"
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
