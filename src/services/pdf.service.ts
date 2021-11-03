import PdfDao from '../daos/pdf.dao';
import { CRUD } from '../common/interfaces/crud';
import { PdfCreate } from '../models/pdf-create';
import { downloadPDF, makeThumbnail, getPdfPageCount } from '../common/pdf-helper';
import { Pdf } from '../models/pdf';

/**
 * Pdf Service class which implements CRUD operations
 */
class PdfService implements CRUD {
  /**
   * Stores pdf and its thumbnails and add their details into database
   * @param {string} url url from which pdf is going to be downloaded
   * @returns {Promise<string | null>} created pdf id
   */
  async create(url: string): Promise<string | null> {
    const fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
    const pdf: PdfCreate = { url, name: fileName };
    let dirName: string = __dirname.replace('\\dist', '').replace('services', '') + 'downloadedPdfs\\';
    const thumbName = `${fileName.replace('.pdf', '')}-thumbnail`;
    const thumbNameExt = '.png';
    let createdPdfId = null;
    await downloadPDF(url, fileName);
    await makeThumbnail(fileName, `${thumbName}${thumbNameExt}`);
    
    createdPdfId = await PdfDao.createPdf(pdf);
    let pdfPagesCount = await getPdfPageCount(fileName);
    for (let i = 0; i < pdfPagesCount; i++) {
      let thumbnailName = `${thumbName}${thumbNameExt}`;
      if (pdfPagesCount > 1) {
        thumbnailName = `${thumbName}-${i}${thumbNameExt}`;
      }
      let thumbnailFileName = `${dirName}${thumbnailName}`;

      const createdThumbNailId = await PdfDao.createPdfThumbnail({ url: thumbnailFileName, name: thumbnailName });
      if (createdPdfId && createdThumbNailId) {
        await PdfDao.addPdfAndThumbnail(createdPdfId, createdThumbNailId);
      }
    }

    return createdPdfId;
  }

  /**
   * 
   * @see PdfDao.getPdfs()
   */
  async list(): Promise<Pdf[] | null> {
    return PdfDao.getPdfs();
  };

  /**
   * 
   * @see PdfDao.getPdfById()
   */
  async readById(pdfId: string) {
    return PdfDao.getPdfById(pdfId);
  };

  /**
   * 
   * @see PdfDao.getPdfByUrl()
   */
  async readByUrl(name: string) {
    return PdfDao.getPdfByUrl(name);
  };
}

export default new PdfService();
