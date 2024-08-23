import express from 'express';
import mysqlDB from '../mysqlDB';
import {Place, PlaceMutation} from '../types';
import {ResultSetHeader} from "mysql2";
const placesRouter = express.Router();

placesRouter.get('/', async (req, res,next) => {
    try {
        const result = await mysqlDB.getConnection().query(''+
            'SELECT * FROM places'
        );
        const places = result[0] as Place[];
        return res.send(places)
    } catch (e){
        next(e);
    }
});

placesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await mysqlDB.getConnection().query(
        `SELECT * FROM places WHERE id = ?`,
        [id]
    );
    const place = result[0] as Place[];

    if(place.length === 0){
        return res.status(404).send({error: 'Place not found'});
    }

    return res.send(place[0]);
});

placesRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({error: 'Name required!'});
    }

    const place: PlaceMutation = {
        name: req.body.name,
        description: req.body.description,
    };

    const insertResult = await mysqlDB.getConnection().query(
        'INSERT INTO places (name, description) VALUES (?, ?)',
        [place.name, place.description],
    );
    const resultHeader = insertResult[0] as ResultSetHeader;
    console.log(resultHeader.insertId);

    const getNewResult = await mysqlDB.getConnection().query(
        'SELECT * FROM places WHERE id = ?',
        [resultHeader.insertId],
    );

    const places = getNewResult[0] as Place[];

    return res.send(places[0]);
});

placesRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const [deleteResult] = await mysqlDB.getConnection().query(
        'DELETE FROM places WHERE id = ?',
        [id]
    );
    const resultHeader = deleteResult as ResultSetHeader;
    if (resultHeader.affectedRows === 0) {
        return res.status(404).send({ error: 'Place not found or deleted' });
    }

    return res.send({ message: 'Place deleted' });

});

export default placesRouter;