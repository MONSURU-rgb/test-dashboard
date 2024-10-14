import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  // Navigate to the target URL
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("retrieve page title", async ({ page }) => {
    // Retrieve and log the page title
    const title = await page.title();
    console.log("Page title:", title);
    // await expect(page).toHaveTitle("localhost:3000");
    // Ensure that the heading with the name "Sales overview" is visible
    expect(page.getByRole("button", { name: " Default view" }).click());

    await expect(
      page.getByRole("heading", {
        name: "Sales overview",
      })
    ).toBeVisible();

    await expect(page.getByPlaceholder("Search...")).toBeEmpty();

    // Increase timeout to 10 seconds
  });
});
