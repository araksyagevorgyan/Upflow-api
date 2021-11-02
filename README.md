# Upflow-api

## Prerequesties
Make sure to set up all mentioned in below list beforehand as it is going to be used by the program:

nodejs => Download the Node.js pre-built installer for your platform from https://nodejs.org/en/download/  
GraphicsMagick => Download GraphicsMagick for your platform from http://www.graphicsmagick.org/download.html  
PostgresSQL Database => Download pgsql for your platform from https://content-www.enterprisedb.com/downloads/postgres-postgresql-downloads  

### Prerequesties for pgsql database

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
CURL http://localhost:3000/pdfs/  

Returns the details for the specified pdf  
GET /pdfs/:id  
Response body: { "id": "string", "name": "string", "url": "string", thumbnails: [ { "thumbnailName": "string" } ] }  
CURL http://localhost:3000/pdfs/:id  

Here are the examples (Postman):
![image](https://user-images.githubusercontent.com/31159659/139930209-f234f16c-a0c2-4461-bec7-41bd72da2f50.png)
![image](https://user-images.githubusercontent.com/31159659/139923429-b29bfc51-c89c-4215-823c-1f874a7fc499.png)

![image](https://user-images.githubusercontent.com/31159659/139930419-880ca2ee-94b3-49a8-8375-7c3567674cb6.png)

![image](https://user-images.githubusercontent.com/31159659/139930496-6b928b53-f56e-472d-86cd-4c72ae06a406.png)

