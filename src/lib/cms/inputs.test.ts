import { describe, expect, it } from "vitest";
import { validateSetting, contactInput, subscriberInput } from "./inputs";
import { ALL_SECTIONS } from "./schema";
import { sectionModule } from "./access";

describe("CMS input validation", () => {
  it("maps every supplied editor to an existing permission module", () => {
    for (const section of ALL_SECTIONS) expect(sectionModule(section.key)).toBeTruthy();
    expect(() => sectionModule("not-a-section")).toThrow();
  });
  it.each([
    "javascript:alert(1)",
    "data:text/html,test",
    "//evil.example",
    "/\\evil.example",
    "java\nscript:alert(1)",
  ])("rejects unsafe links: %s", (link) => {
    expect(() => validateSetting("hero", { primaryLink: link })).toThrow();
  });
  it("allows the site's anchor, web and email links", () => {
    for (const primaryLink of [
      "#services",
      "/contact",
      "https://example.com",
      "mailto:hello@example.com",
    ])
      expect(validateSetting("hero", { primaryLink })).toEqual({ primaryLink });
  });
  it("rejects invalid public form input before persistence", () => {
    expect(contactInput.safeParse({ name: "", email: "wrong", message: "" }).success).toBe(false);
    expect(subscriberInput.parse({ email: " USER@EXAMPLE.COM " }).email).toBe("user@example.com");
  });
});
