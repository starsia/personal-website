import { test, expect } from "@playwright/test";

test("home page loads and shows the hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software & Data Engineer",
  );
});

test("nav links to every section", async ({ page }) => {
  await page.goto("/");
  for (const [label, path] of [
    ["About", "/about"],
    ["Experience", "/experience"],
    ["Blog", "/blog"],
    ["Learning Log", "/learning-log"],
    ["Contact", "/contact"],
  ] as const) {
    await page.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  }
});

test("a case study page renders content", async ({ page }) => {
  await page.goto("/experience/ncs");
  await expect(
    page.getByRole("heading", { name: /NCS/i, level: 1 }),
  ).toBeVisible();
  await expect(page.getByText("Problem")).toBeVisible();
});
