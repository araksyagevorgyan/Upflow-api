import { Pdf } from "../models/pdf";
import { PdfCreate } from "../models/pdf-create";
import { PdfThumbnail } from "../models/pdf-thumbnail";
import { POOL_CONFIG } from "../common/postgre-sql.pool";
import { Thumbnail } from "../models/thumbnail";
import { PdfThumbnailMix } from "../models/pdf-thumbnail-mix";

class PdfDao {
    Pool = require('pg').Pool;
    pool: any;
    constructor() {
        this.pool = new this.Pool(POOL_CONFIG);
    }

    /**
     * Inserts new pdf in Pdf table
     * @param {PdfCreate} pdf pdf that should be added into database
     * @returns {Promise<string | null>} Id of created pdf
     */
    async createPdf(pdf: PdfCreate): Promise<string | null> {
        let createdpdfId = null;
        await this.pool.query(`INSERT INTO pdf (url, name) VALUES ('${pdf.url}', '${pdf.name}') RETURNING id;`)
            .then((result: any) => {
                createdpdfId = result.rows[0].id;
            })
            .catch((e: { stack: any; }) => {
                this.pool.release();
                console.log(e.stack);
            });
        return createdpdfId;
    }

    /**
     * Inserts thumbnails associated with the pdf
     * @param {PdfCreate} thumbnail thumbnail that should be added into database
     * @returns {Promise<string | null>} Id of created thumbnail
     */
    async createPdfThumbnail(thumbnail: PdfCreate): Promise<string | null> {
        let createdPdfThumbnailId = null;
        await this.pool.query(`INSERT INTO thumbnail (url, name) VALUES ('${thumbnail.url}', '${thumbnail.name}') RETURNING id;`)
            .then((result: any) => {
                createdPdfThumbnailId = result.rows[0].id;
            })
            .catch((e: { stack: any; }) => {
                this.pool.release();
                console.log(e.stack);
            });
        return createdPdfThumbnailId;
    }

    /**
     * Inserts pdf and its thumbnail id
     * @param {string} pdfId pdf id
     * @param {string} thumbnailId thumbnail id
     * @returns {Promise<PdfThumbnail | null>} PdfThumbnail object which contains pdf id and thumbnail id
     */
    async addPdfAndThumbnail(pdfId: string, thumbnailId: string): Promise<PdfThumbnail | null> {
        await this.pool.query(`INSERT INTO pdf_thumbnail (pdf_id, thumbnail_id) VALUES ('${pdfId}', '${thumbnailId}') RETURNING pdf_id, thumbnail_id;`)
            .then((_results: any) => {
            })
            .catch((e: { stack: any; }) => {
                this.pool.release();
                console.log(e.stack);
            });
        const pdfThumbnail = { pdfId: pdfId, thumbnailId: thumbnailId };
        return pdfThumbnail;
    }

    /**
     * Gets pdfs
     * @returns {Promise<Pdf[]>} the list of pdfs
     */
    async getPdfs(): Promise<Pdf[]> {
        let pdfs: PdfThumbnailMix[] = [];
        await this.pool.query(`
        SELECT p.id as "pdfId", p.name as "pdfName", p.url as "pdfUrl", t.id as"thumbnailId", t.name as "thumbnailName", t.url as"thumbnailUrl"
        FROM pdf p INNER JOIN pdf_thumbnail pt ON p.id = pt.pdf_id
        INNER JOIN thumbnail t on t.id = pt.thumbnail_id;`)
            .then((results: any) => {
                pdfs = results.rows as PdfThumbnailMix[];
            })
            .catch((e: { stack: any; }) => {
                this.pool.release();
                console.log(e.stack);
            });
        let map = new Map();
        const groupedPdfs: any = pdfs.reduce(function (res: any, pdf: any) {
            res[pdf.pdfId] = res[pdf.pdfId] || [];
            res[pdf.pdfId].push(pdf);
            if (!map.has(pdf.pdfId)) {
                map.set(pdf.pdfId, 1);
            }
            return res;
        }, Object.create(null));
        let result: Pdf[] = [];
        map.forEach((value: number, key: string) => {
            let res: Pdf = { id: groupedPdfs[key][0].pdfId, name: groupedPdfs[key][0].pdfName, url: groupedPdfs[key][0].pdfUrl };
            res.thumbnails = groupedPdfs[key].map((pdfThumbnail: PdfThumbnailMix) => {
                return {
                    id: pdfThumbnail.thumbnailId,
                    name: pdfThumbnail.thumbnailName,
                    url: pdfThumbnail.thumbnailUrl
                }
            });
            result.push(res);
        });
        return result;
    }

    /**
     * Gets pdf details by id
     * @returns {Promise<Pdf | null>} pdf details
     */
    async getPdfById(pdfId: string): Promise<Pdf | null> {
        let pdf: any = null;
        await this.pool.query(`SELECT * FROM pdf WHERE id = '${pdfId}';`)
            .then((results: any) => {
                pdf = results.rows[0];
            })
            .catch((e: { stack: any; }) => {
                this.pool.release();
                console.log(e.stack);
            });
        await this.pool.query(`
                             SELECT t.id, t.name, t.url
                             FROM pdf p INNER JOIN pdf_thumbnail pt ON p.id = pt.pdf_id
                             INNER JOIN thumbnail t on t.id = pt.thumbnail_id
                             WHERE p.id='${pdfId}';`).
            then((results: any) => {
                pdf.thumbnails = results.rows as Thumbnail[];
            });
        return pdf;
    }

    /**
     * Gets pdf details by url
     * @returns {Promise<Pdf | null>} pdf details
     */
    async getPdfByUrl(url: string): Promise<Pdf | null> {
        let pdf = null;
        await this.pool.query(`SELECT * FROM pdf WHERE url = '${url}';`)
            .then((results: any) => {
                pdf = results.rows[0];
            })
            .catch((e: { stack: any; }) => {
                this.pool.release();
                console.log(e.stack);
            });
        return pdf;
    }
}

export default new PdfDao();