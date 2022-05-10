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
            const entity = await this.repository.findOne(
                {
                    where: {id: entityId}
                }
            );

            if (!entity) {
                return res.status(404).json({ message: 'A megadott elem nem létezik.' });
            }

            res.json(entity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    update = async (req, res) => {
        const entity = this.repository.create(req.body as {});

        try {
            const existingEntity = await this.repository.findOne(
                {
                    where: {id: entity.id}
                }
            );
            if (!existingEntity) {
                return res.status(404).json({ message: 'A megadott elem nem létezik.' });
            }

            const modifiedEntity = await this.repository.save(entity);
            res.json(modifiedEntity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    delete = async (req, res) => {
        const entityId = req.params.id;

        try {
            const entity = await this.repository.findOne(
                {
                    where: {id: entityId}
                }
            );
            if (!entity) {
                return res.status(404).json({ message: 'A megadott elem nem létezik.' });
            }

            await this.repository.delete(entity);
            res.status(200).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}