import { expect, test } from "@playwright/test";

test.describe("Employee Operations", () => {
  test.describe.configure({ mode: "serial" });

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

    await page.getByTestId("firstName").fill("firstname");
    await page.getByTestId("lastName").fill("lastname");
    await page.getByTestId("email").fill("test@example.com");
    await page.getByTestId("phoneNumber").fill("88231234");
    await page.getByTestId("gender").getByText("female").click();
    await page.locator(".ant-picker-input input").first().fill("2000-01-01");
    await page.locator(".ant-picker-input input").first().press("Enter");
    await page.locator(".ant-picker-input input").last().fill("2010-01-01");
    await page.locator(".ant-picker-input input").last().press("Enter");

    await expect(
      page.getByRole("heading", { name: "Employees' List" })
    ).toBeVisible();
    await expect(page.getByText("firstname")).toBeVisible();
    await expect(page.getByText("lastname")).toBeVisible();
  });

  test("should edit employee", async ({ page }) => {
    await page.getByRole("link", { name: "Edit" }).last().click();
    await page.getByTestId("firstName").fill("another");
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Go to Homepage" }).click();
    await page.waitForURL("/");
    await expect(page.getByText("another")).toBeVisible();
  });

  test("should prevent navigation on dirty form state", async ({ page }) => {
    await page.getByRole("link", { name: "Edit" }).last().click();
    await page.getByTestId("firstName").fill("other");
    await page.getByRole("button", { name: /back to employee list/i }).click();
    await expect(
      page.getByText(
        "Form has been modified. You will lose your unsaved changes. Are you sure you want to close this form?"
      )
    ).toBeVisible();
    await page
      .getByTestId("navigation-modal")
      .getByRole("button", { name: "OK" })
      .click();
    await page.waitForURL("/");
    await expect(
      page.getByRole("heading", { name: "Employees' List" })
    ).toBeVisible();
  });

  test("should delete employee", async ({ page }) => {
    const firstName =
      (await page.locator("tr").last().locator("td").first().textContent()) ||
      "";
    await page.getByRole("button", { name: "Delete" }).last().click();
    await expect(
      page.getByText("Are you sure you want to delete this employee?")
    ).toBeVisible();
    await page
      .locator(".ant-popconfirm-buttons")
      .getByRole("button", { name: "yes" })
      .click();
    await expect(page.getByText("Employee deleted successfully")).toBeVisible();
    await expect(page.getByText(firstName)).not.toBeVisible();
  });
});
