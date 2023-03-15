import { describe, expect, test } from "@jest/globals";
import { existFolder, downloadRepo, loadCommand } from "../src/utils";
import * as path from "path";
// const existFolder = require("../src/utils");

describe("test utils", () => {
  test("test existFolder when the folder existed", async () => {
    await expect(existFolder("test")).rejects.toBe(1);
  });

  test("test existFolder when the folder unexisted", async () => {
    await expect(existFolder("test1")).resolves.toBe(0);
  });

  test("test download function false git repo", async () => {
    const repo = "https://github.com/wujinhjun/react-p5-scaff.git#main";
    await expect(downloadRepo(repo, "p5")).rejects.toBe(1);
  });

  test("test download function true git repo", async () => {
    const testPath = path.join(process.cwd(), "folderForTest", "p5");
    const repo = "https://github.com/wujinhjun/react-p5-scaffold.git#main";
    await expect(downloadRepo(repo, testPath)).resolves.toBe(0);
  });

  test("test the spawn succeed", async () => {
    const testPath = path.join(process.cwd(), "folderForTest", "spawn1");
    await expect(
      loadCommand(testPath, "git", "initializing the git repository", ["init"])
    ).resolves.toBe(0);
  }, 25000);

  test("test the spawn failed", async () => {
    const testPath = path.join(process.cwd(), "folderForTest", "spawn2");
    await expect(
      loadCommand(testPath, "npm", "npm installing dependencies", ["install"])
    ).rejects.toBe(2);
  }, 15000);
});
