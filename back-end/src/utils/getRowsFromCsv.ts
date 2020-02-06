import * as fs from 'fs';
import { parse } from 'fast-csv';

const getRowsFromCsv = <T>(fileName: string): Promise<T[]> =>
    new Promise((resolve, reject) => {
        const results: any[] = [];
        try {
            fs.createReadStream(fileName)
                .pipe(parse({ headers: true }))
                .on('data', (row: any) => results.push(row))
                .on('end', () => {
                    resolve(results);
                });
        } catch (error) {
            console.error('[GET_ROWS_FROM_CSV]', error);
            reject(error);
        }
    });

export default getRowsFromCsv;
