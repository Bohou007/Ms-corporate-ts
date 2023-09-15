import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path'; // Importez le module path

@Injectable()
export class LogService {
  private logFilePath = path.join(__dirname, '..', '..', 'app.json');

  readLogs(): any[] {
    const logs: any[] = [];
    //const logData = fs.readFileSync(this.logFilePath, 'utf-8').split('\n');
    const logData = JSON.parse(fs.readFileSync(this.logFilePath, 'utf-8'));

    for (const line of logData) {
      try {
        const logEntry = JSON.parse(line);
        logs.push(logEntry);
      } catch (error) {
        console.error('Error parsing log entry:', error);
      }
    }

    return logs;
  }
}
