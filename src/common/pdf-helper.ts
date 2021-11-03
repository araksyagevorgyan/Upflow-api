import fs from 'fs';
import https from 'https';
import { exec } from 'child_process';

/** 
 * Downloads the pdf file from the url
 * @param  {string} url url of the pdf that needs to be downloaded
 * @param  {string} fileName file name of the pdf file that will be stored
 * @returns  {Promise<void>} nothing
 */
export async function downloadPDF(url: any, fileName: string): Promise<void> {
	return new Promise((resolve, _reject) => {
	https.get(url, (response) => {
		// Open file in local filesystem
		const file = fs.createWriteStream(`./src/downloadedPdfs/${fileName}`);

		// Write data into local file
		response.pipe(file);
	
		// Close the file
		file.on('finish', () => {
			file.close();
			console.log(`File downloaded!`);
			resolve();
		});
	});
});
}

/** 
 * Generates thumbnails for the given pdf file
 * @param  {string} fileName file name of the pdf file
 * @param  {string} thumbnailFileName file name of the thumbnail png file which is going to be generated from pdf
 * @returns  {Promise<string>} the data or getter
 */
export function makeThumbnail(fileName: string, thumbnailFileName: string): Promise<string> {
	let commandStr = `cd ./src/downloadedPdfs/ && magick convert -density 300 ${fileName} -resize 25% ${thumbnailFileName}`;
	return new Promise((resolve, _reject) => {
		exec(commandStr, (error, data, getter) => {
			if (error) {
				console.log("error", error.message);
			}
			resolve(data ? data : getter);
		});
	});
}

/** 
 * Gets pdf file's total pages count
 * @param  {string} fileName file name of the pdf file
 * @returns  {Promise<number>} pdf file's pages count
 */
export function getPdfPageCount(fileName: string): Promise<number> {
	let commandStr = `magick convert ${fileName} -set option:totpages %[n] -delete 1--1 -format %[totpages] info:`;
	return new Promise((resolve, _reject) => {
		exec(`cd ./src/downloadedPdfs/ && ${commandStr}`, (error, data) => {
			if (error) {
				console.log("error", error.message);
			}
			let res = data ? parseInt(data) : 0;
			resolve(res);
			return res;
		});
	});
}
