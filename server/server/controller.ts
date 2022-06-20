import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";
import { Company } from "./interface";

// for getting data from the company
const getCompany = (req: IncomingMessage, res: ServerResponse) => {
   return fs.readFile(
      path.join(__dirname, "./database.json"),
      "utf8",
      (err, data) => {
         if (err) {
            res.end(JSON.stringify({ success: false, message: err }, null, 3));
         }
         if (data) {
            res.end(
               JSON.stringify(
                  { success: true, message: JSON.parse(data) },
                  null,
                  3
               )
            );
         }
      }
   );
};


//for posting data into database
const postCompany = (req: IncomingMessage, res: ServerResponse) => {
   let chunkedData: string = "";
   req.on("data", (chunk) => (chunkedData += chunk.toString()));
   req.on("end", () => {
      let incomingCompany = JSON.parse(chunkedData);
      fs.readFile(
         path.join(__dirname, "./database.json"),
         "utf8",
         (err, data) => {
            if (err) {
               res.end(
                  JSON.stringify({ success: false, message: err }, null, 3)
               );
            } else {
               let dataArr: string[] = JSON.parse(data);
               dataArr.push(incomingCompany);
               fs.writeFile(
                  path.join(__dirname, "database.json"),
                  JSON.stringify(dataArr, null, 3),
                  (err) => {
                     if (err) {
                        res.end(
                           JSON.stringify({ success: false, message: err })
                        );
                     } else {
                        res.end(
                           JSON.stringify({
                              success: true,
                              message: incomingCompany,
                           })
                        );
                     }
                  }
               );
            }
         }
      );
   });
};




// for updating  data into database
const updateCompany = (req: IncomingMessage, res: ServerResponse) => {
   let chunkedData: string = "";
   req.on("data", (chunk) => (chunkedData += chunk.toString()));
   req.on("end", () => {
      let incomingCompany = JSON.parse(chunkedData);
      fs.readFile(
         path.join(__dirname, "./database.json"),
         "utf8",
         (err, data) => {
            if (err) {
               res.end(
                  JSON.stringify({ success: false, message: err }, null, 3)
               );
            } else {
               let dataArr: [Company] = JSON.parse(data);
               let index = dataArr.findIndex(
                  (i) => i.id === incomingCompany.id
               );
               dataArr[index] = incomingCompany;
               fs.writeFile(
                  path.join(__dirname, "database.json"),
                  JSON.stringify(dataArr, null, 3),
                  (err) => {
                     if (err) {
                        res.end(
                           JSON.stringify({ success: false, message: err })
                        );
                     } else {
                        res.end(
                           JSON.stringify({
                              success: true,
                              message: incomingCompany,
                           })
                        );
                     }
                  }
               );
            }
         }
      );
   });
};





//for deleting data from database
const deleteCompany = (req: IncomingMessage, res: ServerResponse) => {
   let chunkedData: string = "";
   req.on("data", (chunk) => (chunkedData += chunk.toString()));
   req.on("end", () => {
      let incomingCompany = JSON.parse(chunkedData);
      fs.readFile(
         path.join(__dirname, "./database.json"),
         "utf8",
         (err, data) => {
            if (err) {
               res.end(
                  JSON.stringify({ success: false, message: err }, null, 3)
               );
            } else {
               let dataArr: [Company] = JSON.parse(data);
               let index = dataArr.findIndex(
                  (i) => i.organization === incomingCompany.organizaiton
               );
               dataArr.splice(index, 1);
               fs.writeFile(
                  path.join(__dirname, "database.json"),
                  JSON.stringify(dataArr, null, 3),
                  (err) => {
                     if (err) {
                        res.end(
                           JSON.stringify({ success: false, message: err })
                        );
                     } else {
                        res.end(
                           JSON.stringify({
                              success: true,
                              message: incomingCompany,
                           })
                        );
                     }
                  }
               );
            }
         }
      );
   });
};

export { getCompany, updateCompany, postCompany, deleteCompany };
