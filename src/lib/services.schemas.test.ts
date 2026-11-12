import { describe, expect, it } from "vitest";
import { serviceInputSchema } from "./services.schemas";

describe("serviceInputSchema", () => {
  it("accepts a valid public service", () => {
    expect(
      serviceInputSchema.parse({
        title: "Conversion strategy",
        text: "A practical growth plan for qualifying and converting more leads.",
        icon: "ChartNoAxesCombined",
      }),
    ).toMatchObject({ title: "Conversion strategy", icon: "ChartNoAxesCombined" });
  });

  it("rejects invalid title, text, and icon values", () => {
    expect(
      serviceInputSchema.safeParse({ title: "A", text: "Too short", icon: "UnknownIcon" }).success,
    ).toBe(false);
  });
});
