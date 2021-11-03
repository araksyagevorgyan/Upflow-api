import express from 'express';
import pdfService from '../services/pdf.service';

/**
 * Helper class for endpoints
 */
class PdfMiddleware {
    /**
     * Validates required pdf body fields are provided
     * @param {express.Request} req request
     * @param {express.Response} res response
     * @param {express.NextFunction} next function
     * @returns {Promise<void>} nothing
     */
    async validateRequiredPdfBodyFields(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        if (req.body && req.body.url) {
            next();
        } else {
            res.status(400).send({ error: `Missing required field url` });
        }
    }

    /**
     * Validates that pdf doesn't exist yet by preventing duplicates
     * @param {express.Request} req request
     * @param {express.Response} res response
     * @param {express.NextFunction} next function
     * @returns {Promise<void>} nothing
     */
    async validateSamePdfDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const pdf = await pdfService.readByUrl(req.body.url);
        if (!pdf) {
            next();
        } else {
            res.status(409).send({ error: `Pdf ${req.body.url} already exists` });
        }
    }

    /**
     * Extracts pdf id from the http request
     * @param {express.Request} req request
     * @param {express.Response} res response
     * @param {express.NextFunction} next function
     * @returns {Promise<void>} nothing
     */
    async extractPdfId(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        req.body.id = req.params.pdfId;
        next();
    }
}

export default new PdfMiddleware();