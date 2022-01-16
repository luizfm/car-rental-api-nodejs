import CarImage from "@modules/cars/infra/typeorm/entities/CarImage";

interface ICarImageRepository {
  create(data: ICreateCarImageDTO): Promise<CarImage>;
}

export default ICarImageRepository;
