import { Repository } from "typeorm";


export class Controller {
    repository: Repository<any>;

    create = async (req, res) => {
        const body = req.body;
        const entity = this.repository.create(body);

        try {
            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    getOne = async (req, res) => {
        const entityId = req.params.id;

        try {
            const entity = await this.repository.findOne(entityId);

            if (!entity) {
                return res.status(404).json({ message: 'Entity not found.' });
            }

            res.json(entity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    update = async (req, res) => {
        const entity = this.repository.create(req.body as {});

        try {
            const existingEntity = await this.repository.findOne(entity.id);
            if (!existingEntity) {
                return res.status(404).json({ message: 'Not existing entity.' });
            }

            const modifiedEntity = await this.repository.save(entity);
            res.json(modifiedEntity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    delete = async (req, res) => {
        const productId = req.params.id;

        try {
            const entity = await this.repository.findOne(productId);
            if (!entity) {
                return res.status(404).json({ message: 'Not existing entity.' });
            }

            await this.repository.delete(entity);
            res.status(200).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}