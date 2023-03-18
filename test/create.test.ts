import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import create from "../src/create";
import * as path from "path";
import rimraf from "rimraf";

describe("test create", () => {
  const pathTest = path.join(process.cwd(), "folderForTest", "test1");
  beforeAll(() => {
    rimraf(pathTest);
  });

  test("test create when the folder existed", async () => {
    await expect(create("test")).rejects.toThrow("folder existed");
  });

  test("test create when the remote is false", async () => {
    await expect(
      create("test2", "https://github.com/wujinhjun/react-p")
    ).rejects.toThrow("download failed");
  });

  test("test create truly", async () => {
    await expect(
      create(
        path.join("folderForTest", "test1"),
        "https://github.com/wujinhjun/react-p5-scaffold.git#main"
      )
    ).resolves.toBe(0);
  }, 80000);

  afterAll(() => {
    rimraf(pathTest);
  });
});
