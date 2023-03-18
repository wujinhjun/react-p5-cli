import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { existFolder, downloadRepo, loadCommand } from "../src/utils";
import * as path from "path";
import rimraf from "rimraf";

describe("test utils", () => {
  beforeAll(() => {
    const testPath = path.join(process.cwd(), "folderForTest", "p5");
    rimraf(testPath);
  });

  test("test existFolder when the folder existed", async () => {
    await expect(existFolder("test")).rejects.toThrowError("folder existed");
  });

  test("test existFolder when the folder unexisted", async () => {
    await expect(existFolder("test1")).resolves.toBe(0);
  });

  test("test download function false git repo", async () => {
    const repo = "https://github.com/wujinhjun/react-p5-scaff.git#main";
    await expect(downloadRepo(repo, "p5")).rejects.toThrowError(
      "download failed"
    );
  });

  test("test download function true git repo", async () => {
    const testPath = path.join(process.cwd(), "folderForTest", "p5");
    const repo = "https://github.com/wujinhjun/react-p5-scaffold.git#main";
    await expect(downloadRepo(repo, testPath)).resolves.toBe(0);
  });

  test("test the spawn succeed", async () => {
    const testPath = path.join(process.cwd(), "folderForTest", "spawn1");
    await expect(
      loadCommand(testPath, "npm", "npm installing dependencies", ["install"])
    ).resolves.toBe(0);
  }, 50000);

  test("test the spawn failed", async () => {
    const testPath = path.join(process.cwd(), "folderForTest", "spawn2");
    await expect(
      loadCommand(testPath, "npm", "npm installing dependencies", ["install"])
    ).rejects.toThrowError("no package.json");
  }, 15000);

  test("test the spawn failed because error package", async () => {
    const testPath = path.join(process.cwd(), "folderForTest", "spawn3");
    await expect(
      loadCommand(testPath, "npm", "npm installing dependencies", ["install"])
    ).rejects.toThrowError("executed failed");
  }, 50000);

  afterAll(() => {
    const testPath = path.join(process.cwd(), "folderForTest", "p5");
    rimraf(testPath);
  });
});
