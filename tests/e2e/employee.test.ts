import { test, expect } from "@playwright/test";

test.describe("Employee CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display employee list", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Employees" })
    ).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
  });

  test("should navigate to create employee form", async ({ page }) => {
    await page.getByRole("link", { name: "Add Employee" }).click();
    await expect(
      page.getByRole("heading", { name: "Please enter new employee details:" })
    ).toBeVisible();
  });

  test("should create new employee", async ({ page }) => {
    await page.getByRole("link", { name: "Add Employee" }).click();

    await page.getByLabel("First Name").fill("Test132");
    await page.getByLabel("Last Name").fill("User123");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Phone").fill("88231234");
    await page.getByLabel("Gender").selectOption("male");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(
      page.getByRole("heading", { name: "Employees" })
    ).toBeVisible();
    await expect(page.getByText("Test User")).toBeVisible();
  });
});
