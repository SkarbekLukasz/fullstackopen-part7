const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog list app E2E tests", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:5173/api/testing/reset");
    await request.post("http://localhost:5173/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });
    await request.post("http://localhost:5173/api/users", {
      data: {
        name: "Paweł Jaszczak",
        username: "Pabloo",
        password: "sekret",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const loginButton = await page.getByText("login");
    await expect(loginButton).toBeVisible();
  });

  describe("Login", () => {
    test("Succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");

      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mlukai", "salainen");

      await expect(page.getByText("Wrong credentials")).toBeVisible();
    });
  });
  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });
    test("a new blog can be created", async ({ page }) => {
      await page.getByText("new blog").click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("New title");
      await textboxes[1].fill("New author");
      await textboxes[2].fill("New URL");
      await page.getByText("create").click();

      await expect(page.getByText("New title New author")).toBeVisible();
    });

    test("like the blog post", async ({ page }) => {
      await createBlog(page, "New title", "New author", "New URL");
      await page.getByText("view").click();
      await page.getByText("like").click();

      await expect(page.getByText("likes 1 like")).toBeVisible();
    });

    test("deleting blog post works", async ({ page }) => {
      await createBlog(page, "New title", "New author", "New URL");
      await page.getByText("view").click();
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByText("remove").click();

      await expect(page.getByText("New title New Author")).toBeHidden();
    });

    test("noncreator can not delete a blog post", async ({ page }) => {
      await createBlog(page, "New title", "New author", "New URL");
      await page.getByText("logout").click();
      await loginWith(page, "Pabloo", "sekret");

      await expect(page.getByText("New title New author")).toBeVisible();
      await page.getByText("view").click();
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByText("remove").click();
      await expect(page.getByText("Failed to delete blog")).toBeVisible();
    });

    test("blogs are arranger in the order of likes", async ({
      page,
      request,
    }) => {
      const blogs = [
        { title: "Blog #1", author: "Author #1", url: "URL #1", likes: 5 },
        { title: "Blog #2", author: "Author #2", url: "URL #2", likes: 7 },
        { title: "Blog #3", author: "Author #3", url: "URL #3", likes: 6 },
      ];

      for (const blog of blogs) {
        await createBlog(page, blog.title, blog.author, blog.url);
        await page.getByText("view").click();
        const blogElement = await page
          .locator(`text=${blog.title} ${blog.author}`)
          .locator("..");
        const likeButton = blogElement.locator("text=like");

        for (let i = 1; i <= blog.likes; i++) {
          await likeButton.click();
        }
      }
      const renderedBlogs = await page.locator(".blogDetails").all();
      const likes = await Promise.all(
        renderedBlogs.map(async (blog) => {
          const likesText = await blog.locator("text=likes").textContent();
          return parseInt(likesText.replace("likes ", ""));
        })
      );
      for (let i = 0; i < likes.length - 1; i++) {
        expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1]);
      }
    });
  });
});
