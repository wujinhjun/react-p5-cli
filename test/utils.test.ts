import { describe, expect, test } from "@jest/globals";
import { existFolder, downloadRepo } from "../src/utils";
// const existFolder = require("../src/utils");

describe("test utils", () => {
  test("test existFolder when the folder existed", async () => {
    await expect(existFolder("test")).rejects.toBe(1);
  });

  test("test existFolder when the folder unexisted", async () => {
    await expect(existFolder("test1")).resolves.toBe(0);
  });

  test("test download function false git repo", async () => {
    const repo: string = "https://github.com/wujinhjun/react-p5-scaff.git#main";
    await expect(downloadRepo(repo, "p5")).rejects.toBe(1);
  });

  test("test download function true git repo", async () => {
    const repo: string =
      "https://github.com/wujinhjun/react-p5-scaffold.git#main";
    await expect(downloadRepo(repo, "p5")).resolves.toBe(0);
  });
});
