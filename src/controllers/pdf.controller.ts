import express from 'express';
import pdfService from '../services/pdf.service';

class PdfController {
    /**
     * Gets the list of pdfs
     * @param {express.Response} res response
     */
    async listPdfs(req: express.Request, res: express.Response) {
        const pdfs = await pdfService.list();
        res.status(200).send(pdfs);
    }

    /**
     * Gets pdf details by id
     * @param {express.Request} req request
     * @param {express.Response} res response
     */
    async getPdfById(req: express.Request, res: express.Response) {
        const pdf = await pdfService.readById(req.params.pdfId);
        res.status(200).send(pdf);
    }

    /**
     * Creates pdf
     * @param {express.Request} req request
     * @param {express.Response} res response
     */
    async createPdf(req: express.Request, res: express.Response) {
        const pdfId = await pdfService.create(req.body.url);
        res.status(201).send({ id: pdfId });
    }
}

export default new PdfController();