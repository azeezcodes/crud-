import http, { IncomingMessage, Server, ServerResponse } from "http";
import { parser } from "html-metadata-parser";
/*
implement your server code here
*/

interface Wdata {
   title: string;
   description: string;
   imageUrls: string[];
}
const server: Server = http.createServer(
   (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
        
         const urlStore: Wdata = {
            title: "string",
            description: "string",
            imageUrls: [],
         };
        
         let myPath = req.url?.split("/")[1];
         myPath = `https://www.${myPath}`;
         
         (async function myParser() {
            try {
               const Path = await parser(`${myPath}`);
               res.end(JSON.stringify(Path, null, 3));
               if (
                  Path.meta.title !== undefined &&
                  Path.meta.description !== undefined &&
                  Path.og.image !== undefined &&
                  Path.images !== undefined
               ) {
                  urlStore["title"] = Path.meta.title;
                  urlStore["description"] = Path.meta.description;
                 urlStore["imageUrls"].push(Path.og.image);
                 
                 for (let i = 0; i < Path.images.length; i++) { 
                    urlStore["imageUrls"].push(Path.images[i]);
                 }
               }
               return urlStore;
            } catch (error) {
               console.log(error);
               res.writeHead(400, { "Content-Type": "application/json" });
               res.end(JSON.stringify({ messgae: "Route not found" }));
            }
         })();
      }
   }
);

server.listen(3001);
