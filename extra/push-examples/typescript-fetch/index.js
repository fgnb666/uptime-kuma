"use strict";
// Supports: Deno, Bun, Node.js >= 18 (ts-node)
const pushURL = "https://example.com/api/push/key?status=up&msg=OK&ping=";
const interval = 60;
const push = async () => {
    await fetch(pushURL);
    console.log("Pushed!");
};
push();
setInterval(push, interval * 1000);
