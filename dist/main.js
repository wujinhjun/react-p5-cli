"use strict";var e=require("commander"),t=require("node:path"),r=require("chalk"),o=require("node:fs"),a=require("ora"),n=require("cross-spawn"),i=require("download-git-repo");function c(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var s=c(t),l=c(o);const d=async(e,t,o,i)=>{const c=a();return c.text=r.blueBright(`${o}, please wait a moment`),c.start(),new Promise(((a,d)=>{if(l.existsSync(s.join(e,"package.json"))){n(t,i??[],{cwd:e,stdio:"inherit"}).once("close",(e=>{0!==e&&(c.text=r.red(`${o} failed`),c.fail(),d(new Error("executed failed"))),c.text=r.green(`${o} succeed`),c.succeed(),a(0)}))}else c.text=r.red(`${o} failed`),c.fail(),d(new Error("no package.json"))}))},g=async(e="p5-react",o="https://github.com/wujinhjun/react-p5-scaffold.git#main")=>{const n=t.join(process.cwd(),e);try{return await(async e=>{const t=s.join(process.cwd(),e);return new Promise(((o,n)=>{const i=a();i.text=r.blueBright(`We will create a folder called ${e} in ${t}, please wait a moment`),i.start(),l.existsSync(t)?(i.text=r.bgRed(`the folder ${e} existed in the ${t}`),i.fail(),n(new Error("folder existed"))):(i.succeed(),o(0))}))})(e),await(async(e,t)=>new Promise(((o,n)=>{const c=a();c.text=r.blueBright("We will download the template from github"),c.start(),i(`direct:${e}`,t,{clone:!0},(e=>{e?(console.log(e),c.text="Download template failed",c.fail(),n(new Error("download failed"))):(c.text="Download template successful",c.succeed(),o(0))}))})))(o,e),await d(n,"git","git will initializing the repository",["init"]),await d(n,"pnpm","pnpm installing dependencies",["install"]),((e,t)=>(console.log(),console.log(`Success! Created ${e} at ${t}`),console.log("I suggest that you begin by typing:"),console.log(),console.log(r.blueBright(`\tcd ${e}`)),console.log(r.blueBright("\tnpm install")),console.log(r.blueBright("\tnpm run start")),console.log(),console.log("Happy creative coding!"),0))(e,n)}catch(e){const t=e;let o="";throw t.message&&(o=t.message,console.log(t)),console.log(`${r.bgRedBright("create failed")}: ${r.redBright("See above for more details.")}`),new Error(o)}},u=new e.Command,p={create:{description:"create a new project",usages:["r-p5 create project-name"],alias:"c"}};Object.keys(p).forEach((e=>{u.command(e).description(p[e].description).alias(p[e].alias).action((()=>{if("create"===e)g(process.argv[3])}))})),u.parse(process.argv);
