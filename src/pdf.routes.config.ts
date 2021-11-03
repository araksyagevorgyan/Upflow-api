import { CommonRoutesConfig } from './common/common.routes.config';
import PdfController from './controllers/pdf.controller';
import PdfMiddleware from './middleware/pdf.middleware';
import express from 'express';

/**
 * PdfRoutes class for endpoints routes
 */
export class PdfRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PdfRoutes');
    }

    /**
     * Provides routes for enbdpoints
     * @returns {express.Application} application
     */
    configureRoutes(): express.Application {
        this.app.route(`/pdfs`)
            .get(PdfController.listPdfs)
            .post(
                PdfMiddleware.validateRequiredPdfBodyFields,
                PdfMiddleware.validateSamePdfDoesntExist,
                PdfController.createPdf);

        this.app.param(`pdfId`, PdfMiddleware.extractPdfId);
        this.app.route(`/pdfs/:pdfId`)
            .get(PdfController.getPdfById);

        return this.app;
    }
}