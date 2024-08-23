import express from 'express';
import mysqlDB from '../mysqlDB';
import {Category, CategoryMutation} from '../types';
import {ResultSetHeader} from "mysql2";
const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res,next) => {
    try {
        const result = await mysqlDB.getConnection().query(''+
            'SELECT * FROM categories'
        );
        const categories = result[0] as Category[];
        return res.send(categories)
    } catch (e){
        next(e);
    }
});

categoriesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await mysqlDB.getConnection().query(
        `SELECT * FROM categories WHERE id = ?`,
        [id]
    );
    const category = result[0] as Category[];

    if(category.length === 0){
        return res.status(404).send({error: 'Category not found'});
    }

    return res.send(category[0]);
});


categoriesRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({error: 'Name required!'});
    }

    const category: CategoryMutation = {
        name: req.body.name,
        description: req.body.description,
    };

    const insertResult = await mysqlDB.getConnection().query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [category.name, category.description],
    );
    const resultHeader = insertResult[0] as ResultSetHeader;
    console.log(resultHeader.insertId);

    const getNewResult = await mysqlDB.getConnection().query(
        'SELECT * FROM categories WHERE id = ?',
        [resultHeader.insertId],
    );

    const categories = getNewResult[0] as Category[];

    return res.send(categories[0]);
});

categoriesRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const [deleteResult] = await mysqlDB.getConnection().query(
        'DELETE FROM categories WHERE id = ?',
        [id]
    );
    const resultHeader = deleteResult as ResultSetHeader;
    if (resultHeader.affectedRows === 0) {
        return res.status(404).send({ error: 'Category not found or deleted' });
    }

    return res.send({ message: 'Category deleted' });

});

export default categoriesRouter;