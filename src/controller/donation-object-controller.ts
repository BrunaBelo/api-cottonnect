import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import CreateService from "../service/donation-object/create-service";

class DonationObjectController {
  async create(request: Request, response: Response): Promise<Response> {
    let newDonationObject = null;

    try {
      newDonationObject = await new CreateService(request.body, request["user"]["user_id"]).run();
    } catch (error) {
      throw new AppError(`Erro ao criar doação ${error}`, 400);
    }

    return response.status(201).json(newDonationObject);
  }
}

export { DonationObjectController };
