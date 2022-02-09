import { inject, injectable } from "tsyringe";

import ICarImageRepository from "@modules/cars/repositories/ICarImageRepository";
import IStorageProvider from "@shared/container/providers/StoreProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carsImageRepository: ICarImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImageRepository.create({ car_id, image_name: image });
      await this.storageProvider.save(image, "cars");
    });
  }
}

export default UploadCarImagesUseCase;
