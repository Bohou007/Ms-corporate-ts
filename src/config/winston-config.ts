import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(), // Enregistrement dans la console
    //new transports.File({ filename: 'app.log' }), // Enregistrement dans un fichier 'app.log'
    new transports.File({ filename: 'app.json', format: format.json() }),
  ],
});

export default logger;
