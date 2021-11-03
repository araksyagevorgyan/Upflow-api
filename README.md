# Upflow-api
This is a micro-service, which when given an url to a pdf document: (1) stores the document in local storage and (2) generates a thumbnail for the document.

## Prerequisites
Before using the service make sure to set up all the following prerequisites:

nodejs => Download the Node.js pre-built installer for your platform from https://nodejs.org/en/download/  
GraphicsMagick => Download GraphicsMagick for your platform from http://www.graphicsmagick.org/download.html  
Ghostscript => Download Ghostscript for your platform from https://www.ghostscript.com/releases/gsdnld.html.  
PostgresSQL Database => Download pgsql for your platform from https://content-www.enterprisedb.com/downloads/postgres-postgresql-downloads  

### Prerequisites for pgsql database

To create the database, user, and tables you will need to run ./src/common/postgre-sql.scripts.sql script in pgadmin4.
Make sure to give to the user a superuser privileges. Use right click on the apiuser-> Properties... -> go to Privileges tab and set Superuser? to YES.

<img src="https://user-images.githubusercontent.com/31159659/140033716-eee63a9c-78e2-409f-ad74-4283275120df.png">

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

Downloads the pdf and generates all thumbnails in ./src/downloadedPdfs folder  
POST /pdfs  
Request body: { "url": "string" }  
Response body: { "id": "string" } //genereated pdf's id  
CURL -d '{"url":"YOUR_URL"}' -H "Content-Type: application/json" -X POST http://localhost:3000/pdfs  

Returns the list of all pdfs from database  
GET /pdfs  
Response body: [ { "id": "string", "name": "string", "url": "string", thumbnails: [ { "thumbnailname": "string", "thumbnailurl": "string" } ] } ]  
CURL http://localhost:3000/pdfs  

Returns the details for the specified pdf  
GET /pdfs/:id  
Response body: { "id": "string", "name": "string", "url": "string", thumbnails: [ { "thumbnailname": "string", "thumbnailurl": "string" } ] }  
CURL http://localhost:3000/pdfs/:id  

Here are the examples (Postman):

<img src="https://user-images.githubusercontent.com/31159659/139930209-f234f16c-a0c2-4461-bec7-41bd72da2f50.png" width="1100" height="341">

<img src="https://user-images.githubusercontent.com/31159659/139923429-b29bfc51-c89c-4215-823c-1f874a7fc499.png" width="1100" height="341">

<img src="https://user-images.githubusercontent.com/31159659/140043381-08bc60f6-e9ae-45d5-b127-2e7f9bc7ac7b.png" width="1100" height="341">

<img src="https://user-images.githubusercontent.com/31159659/139930496-6b928b53-f56e-472d-86cd-4c72ae06a406.png" width="1100" height="341">

