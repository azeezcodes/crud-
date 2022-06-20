import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs, { ReadStream } from "fs";
import path from "path";
import {
   getCompany,
   postCompany,
   updateCompany,
   deleteCompany,
} from "./controller";
/*
implement your server code here
*/
import { Company } from "./interface";
const server: Server = http.createServer(
   (req: IncomingMessage, res: ServerResponse) => {
      if (req.method === "GET" && req.url === "/") {
         return getCompany(req, res);
        
      }
      if (req.method === "POST" && req.url === "/") {
         return postCompany(req, res);
      }
      if (req.method === "PUT" && req.url === "/") {
         return updateCompany(req, res);
        
      }
      if (req.method === "DELETE") {
         return deleteCompany(req, res);
       
      }
   }
);

server.listen(3005);
