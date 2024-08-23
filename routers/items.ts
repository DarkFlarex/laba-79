import express from 'express';
import {imagesUpload} from '../multer';
import mysqlDB from '../mysqlDB';
import {ResultSetHeader} from 'mysql2';
import {Item, ItemMutation} from "../types";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
    const result = await mysqlDB.getConnection().query(
        'SELECT * FROM items'
    );

    const items = result[0] as Item[];
    return res.send(items);
});

itemsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await mysqlDB.getConnection().query(
        `SELECT * FROM items WHERE id = ?`,
        [id]
    );
    const Item = result[0] as Item[];

    if(Item.length === 0){
        return res.status(404).send({error: 'Item not found'});
    }

    return res.send(Item[0]);
});

itemsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.category_id || !req.body.place_id || !req.body.name) {
        return res.status(400).send({error: 'category_id, place_id and name are required!'});
    }

    const item: ItemMutation = {
        category_id: parseInt(req.body.category_id),
        place_id: parseInt(req.body.place_id),
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    };

    const insertResult = await mysqlDB.getConnection().query(
        'INSERT INTO items (category_id, place_id, name, description, image) VALUES (?, ?, ?, ?, ?)',
        [item.category_id, item.place_id, item.name, item.description, item.image],
    );
    const resultHeader = insertResult[0] as ResultSetHeader;
    console.log(resultHeader.insertId);

    const getNewResult = await mysqlDB.getConnection().query(
        'SELECT * FROM items WHERE id = ?',
        [resultHeader.insertId],
    );

    const items = getNewResult[0] as Item[];

    return res.send(items[0]);
});

itemsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const [deleteResult] = await mysqlDB.getConnection().query(
        'DELETE FROM items WHERE id = ?',
        [id]
    );
    const resultHeader = deleteResult as ResultSetHeader;
    if (resultHeader.affectedRows === 0) {
        return res.status(404).send({ error: 'Item not found or deleted' });
    }

    return res.send({ message: 'Item deleted' });

});

export default itemsRouter;
