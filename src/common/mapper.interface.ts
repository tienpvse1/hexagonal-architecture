export abstract class Mapper<Model, Entity> {
	abstract toEntity(model: Model): Entity;
	abstract toModel(entity: Entity): Model;
}
