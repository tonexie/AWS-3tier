const db = require('../configs/db');
const logger = require('../utils/logger');

function AuthorsController() { }

const getQuery = 'SELECT * FROM author';

AuthorsController.prototype.get = async (req, res) => {
   try {
      logger.info('AuthorsController [GET] - Fetching authors');

      db.query(getQuery, (err, authors) => {
         if (err) {
            logger.error('AuthorsController [GET] - Error executing query:', err);
            throw new Error("Error executing query.");
         }

         res.status(200).json({
            authors: authors,
         });
      });
   } catch (error) {
      logger.error('AuthorsController [GET] - Unexpected error:', error);
      res.status(500).json({
         message: "Something unexpected has happened. Please try again later.",
      });
   }
};

AuthorsController.prototype.create = async (req, res) => {
   try {
      const { name, birthday, bio } = req.body;
      logger.info('AuthorsController [CREATE] - Creating a new author');

      db.query('INSERT INTO author (name, birthday, bio, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [
         name, new Date(birthday), bio], (err) => {
            if (err) {
               logger.error('AuthorsController [CREATE] - Error executing insert query:', err);
               throw new Error("Error executing query.");
            }

            db.query(getQuery, (err, authors) => {
               if (err) {
                  logger.error('AuthorsController [CREATE] - Error fetching authors after insert:', err);
                  throw new Error("Error executing query.");
               }

               return res.status(200).json({
                  message: `Author created successfully!`,
                  authors: authors,
               });
            });
         });
   } catch (error) {
      logger.error('AuthorsController [CREATE] - Unexpected error:', error);
      res.status(500).json({
         message: "Something unexpected has happened. Please try again later.",
      });
   }
};

AuthorsController.prototype.update = async (req, res) => {
   try {
      const authorId = req.params.id;
      const { name, birthday, bio } = req.body;
      logger.info(`AuthorsController [UPDATE] - Updating author with ID: ${authorId}`);

      db.query('UPDATE author SET name = ?, birthday = ?, bio = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [
         name, new Date(birthday), bio, authorId], (err) => {
            if (err) {
               logger.error(`AuthorsController [UPDATE] - Error updating author with ID: ${authorId}`, err);
               throw new Error("Error executing query.");
            }

            db.query(getQuery, (err, authors) => {
               if (err) {
                  logger.error('AuthorsController [UPDATE] - Error fetching authors after update:', err);
                  throw new Error("Error executing query.");
               }

               return res.status(200).json({
                  message: `Author updated successfully!`,
                  authors: authors,
               });
            });
         });
   } catch (error) {
      logger.error('AuthorsController [UPDATE] - Unexpected error:', error);
      res.status(500).json({
         message: "Something unexpected has happened. Please try again later.",
      });
   }
};

AuthorsController.prototype.delete = async (req, res) => {
   try {
      const authorId = req.params.id;
      logger.info(`AuthorsController [DELETE] - Deleting author with ID: ${authorId}`);

      db.query('DELETE FROM author WHERE id = ?', [authorId], (err) => {
         if (err) {
            logger.error(`AuthorsController [DELETE] - Error deleting author with ID: ${authorId}`, err);
            throw new Error("Error executing query.");
         }

         db.query(getQuery, (err, authors) => {
            if (err) {
               logger.error('AuthorsController [DELETE] - Error fetching authors after delete:', err);
               throw new Error("Error executing query.");
            }

            return res.status(200).json({
               message: `Author deleted successfully!`,
               authors: authors,
            });
         });
      });
   } catch (error) {
      logger.error('AuthorsController [DELETE] - Unexpected error:', error);
      res.status(500).json({
         message: "Something unexpected has happened. Please try again later.",
      });
   }
};

module.exports = new AuthorsController();
