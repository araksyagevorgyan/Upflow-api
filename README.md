# Upflow-api

## Prerequisites
Make sure to set up all mentioned in below list before running the application as it is going to be used by the program:

nodejs => Download the Node.js pre-built installer for your platform from https://nodejs.org/en/download/  
GraphicsMagick => Download GraphicsMagick for your platform from http://www.graphicsmagick.org/download.html  
Ghostscript => Go to https://www.ghostscript.com and download an interpreter for the PostScript® language and PDF files.  
PostgresSQL Database => Download pgsql for your platform from https://content-www.enterprisedb.com/downloads/postgres-postgresql-downloads  

### Prerequisites for pgsql database

To create the database, user and tables you will need to run ./src/common/postgre-sql.scripts.sql script in pgadmin4.
Make sure to give to the user a superuser privileges. Just right click on the apiuser-> Properties... -> go to Privileges tab and set Superuser? to YES.
![image](https://user-images.githubusercontent.com/31159659/140033716-eee63a9c-78e2-409f-ad74-4283275120df.png)

## Install & Build
Run the following commands:  
```bash
$ npm i
$ npm run tsc
```

## Running
```bash
$ node app.js
```
Run the command from ./dist folder  

## Features and Endpoints

Downloads the pdf and generates all related thumbnails in ./src/downloadedPdfs folder and add data into pdf, thumbnail and pdf_thumbnail pgsql tables  
POST /pdfs  
Request body: { "url": "string" }  
Response body: { "id": "string" } //genereated pdf's id  
CURL -d '{"url":"YOUR_URL"}' -H "Content-Type: application/json" -X POST http://localhost:3000/pdfs  

Returns the list of all pdfs from database  
GET /pdfs  
Response body: [{ "id": "string", "name": "string", "url": "string" }]  
CURL http://localhost:3000/pdfs  

Returns the details for the specified pdf  
GET /pdfs/:id  
Response body: { "id": "string", "name": "string", "url": "string", thumbnails: [ { "thumbnailname": "string", "thumbnailurl": "string" } ] }  
CURL http://localhost:3000/pdfs/:id  

Here are the examples (Postman):
![image](https://user-images.githubusercontent.com/31159659/139930209-f234f16c-a0c2-4461-bec7-41bd72da2f50.png)
![image](https://user-images.githubusercontent.com/31159659/139923429-b29bfc51-c89c-4215-823c-1f874a7fc499.png)

![image](https://user-images.githubusercontent.com/31159659/139930419-880ca2ee-94b3-49a8-8375-7c3567674cb6.png)

![image](https://user-images.githubusercontent.com/31159659/139930496-6b928b53-f56e-472d-86cd-4c72ae06a406.png)

