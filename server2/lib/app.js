"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const html_metadata_parser_1 = require("html-metadata-parser");
const server = http_1.default.createServer((req, res) => {
    var _a;
    if (req.method === "GET") {
        const urlStore = {
            title: "string",
            description: "string",
            imageUrls: [],
        };
        let myPath = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")[1];
        myPath = `https://www.${myPath}`;
        (async function myParser() {
            try {
                const Path = await html_metadata_parser_1.parser(`${myPath}`);
                res.end(JSON.stringify(Path, null, 3));
                if (Path.meta.title !== undefined &&
                    Path.meta.description !== undefined &&
                    Path.og.image !== undefined &&
                    Path.images !== undefined) {
                    urlStore["title"] = Path.meta.title;
                    urlStore["description"] = Path.meta.description;
                    urlStore["imageUrls"].push(Path.og.image);
                    for (let i = 0; i < Path.images.length; i++) {
                        urlStore["imageUrls"].push(Path.images[i]);
                    }
                }
                return urlStore;
            }
            catch (error) {
                console.log(error);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ messgae: "Route not found" }));
            }
        })();
    }
});
server.listen(3001);
