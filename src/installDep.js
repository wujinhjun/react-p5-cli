import { join, resolve } from "path"
import ora from "ora";
import spawn from "cross-spawn";

const installDep = async (projectName) => {
    const appPath = join(process.cwd(), projectName);

    const installTime = ora();
    installTime.text = "installing dependencies\n";
    // console.log(appPath);
    installTime.start();
    const args = ["install", "--save", "--save-exact", "--loglevel", "error"];
    // return new Promise((resolve, reject) => {
    const child = spawn(`npm`, args, {
        cwd: appPath,
        stdio: ["pipe", process.stdout, process.stderr],
    });
    child.once("close", (code) => {
        if (code !== 0) {
            installTime.text = `npm ${args.join(" ")}`;
            installTime.fail();
            return;
        }

        installTime.text = "installed all dependencies";
        installTime.succeed();
    });

    child.once("error", () => {
        installTime.text = "install failed";
        installTime.fail();
    });
    // })
}

export default installDep;