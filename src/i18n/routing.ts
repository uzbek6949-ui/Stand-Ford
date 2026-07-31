import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Uzbek is the primary language; Russian is offered alongside it.
  locales: ["uz", "ru"],
  defaultLocale: "uz",
});
