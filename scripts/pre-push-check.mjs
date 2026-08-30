#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const results = { pass: [], warn: [], block: [] };

function add(kind, message) {
  results[kind].push(message);
  const prefix = kind === "pass" ? "通过" : kind === "warn" ? "警告" : "阻断";
  console.log(`[${prefix}] ${message}`);
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
    timeout: options.timeout ?? 180_000,
    env: options.env ?? process.env,
  });
}

function git(args) {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function trackedFiles() {
  return git(["ls-files"]).split(/\r?\n/).filter(Boolean);
}

console.log("观墨官网推送前安全校验");

const branch = git(["branch", "--show-current"]);
if (branch === "master" || branch === "main") add("warn", `当前位于 ${branch} 主分支`);
else add("pass", `当前分支：${branch}`);

const status = git(["status", "--porcelain"]);
if (status) add("block", "工作区存在未提交变更");
else add("pass", "工作区干净");

const remoteHead = run("git", ["ls-remote", "origin", "HEAD"], { timeout: 30_000 });
if (remoteHead.status === 0) add("pass", "origin 远程仓库可访问");
else add("block", "origin 远程仓库不可访问");

const files = trackedFiles();
const forbidden = files.filter((file) =>
  /(^|\/)(\.env(?:\..*)?|node_modules|\.next|out|output|\.playwright-cli)(\/|$)/.test(file) ||
  /(^|\/)(.+\.(?:pem|key|p12|pfx|sqlite|db|log))$/i.test(file),
);
if (forbidden.length) add("block", `发现不应提交的文件：${forbidden.join(", ")}`);
else add("pass", "未发现敏感文件或构建目录被跟踪");

const sensitivePatterns = [
  /(?:sk-[A-Za-z0-9]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z_-]{35})/,
  /-----BEGIN (?:RSA )?PRIVATE KEY-----/,
  /(?:password|passwd|secret|api[_-]?key)\s*[:=]\s*["'][^"']{8,}["']/i,
];
const contentFindings = [];
for (const file of files) {
  const path = join(ROOT, file);
  if (!existsSync(path) || statSync(path).size > 5 * 1024 * 1024 || /\.(?:png|jpe?g|gif|ico|woff2?|lock)$/i.test(file)) continue;
  const content = readFileSync(path, "utf8");
  if (sensitivePatterns.some((pattern) => pattern.test(content))) contentFindings.push(file);
}
if (contentFindings.length) add("block", `发现疑似敏感内容：${contentFindings.join(", ")}`);
else add("pass", "未发现疑似密钥或私钥内容");

const diffCheck = run("git", ["diff", "--check"]);
if (diffCheck.status === 0) add("pass", "git diff --check 通过");
else add("block", "git diff --check 失败");

const lint = run("npm", ["run", "lint"]);
if (lint.status === 0) add("pass", "ESLint 通过");
else add("block", `ESLint 失败：${(lint.stdout || lint.stderr || "").trim().split(/\r?\n/)[0]}`);

const typecheck = run("npx", ["tsc", "--noEmit"]);
if (typecheck.status === 0) add("pass", "TypeScript 类型检查通过");
else add("block", `TypeScript 类型检查失败：${(typecheck.stdout || typecheck.stderr || "").trim().split(/\r?\n/)[0]}`);

const build = run("npm", ["run", "build"], {
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/Guanmo-site" },
});
if (build.status === 0) add("pass", "Next.js 静态构建通过");
else add("block", `Next.js 静态构建失败：${(build.stdout || build.stderr || "").trim().split(/\r?\n/)[0]}`);

const outputPath = join(ROOT, "out", "index.html");
if (existsSync(outputPath)) {
  const html = readFileSync(outputPath, "utf8");
  if (!html.includes("/Guanmo-site/") || html.includes("/Guanmo-page/") || /(?:src|href)=\"\/assets/.test(html)) {
    add("block", "静态产物中的 Pages 路径或资源路径不正确");
  } else {
    add("pass", "静态产物使用 /Guanmo-site/ 路径且无根路径资源引用");
  }
} else {
  add("block", "未生成 out/index.html");
}

console.log(`\n通过 ${results.pass.length} · 警告 ${results.warn.length} · 阻断 ${results.block.length}`);
if (results.block.length) {
  console.log("存在阻断项，禁止推送。修复后请重新运行本脚本。");
  process.exit(1);
}
console.log("校验通过，可在查看结果后确认推送。");
console.log("当前未执行任何推送、打 tag 或 Release 操作，等待用户下一步明确指示。");
