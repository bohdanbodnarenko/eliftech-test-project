import { Request } from 'express';
import { Files, IncomingForm } from 'formidable';

export const getFilesFromReq = (req: Request): Promise<Files> =>
    new Promise<Files>((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, _, files) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        });
    });
