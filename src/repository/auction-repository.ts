import { getRepository, Repository } from "typeorm";
import { Auction } from "../model/auction";

class AuctionRepository {
    private repository: Repository<Auction>;

    constructor() {
        this.repository = getRepository(Auction);
    }

    async create(auction: Auction): Promise<Auction> {
        const newAuction = this.repository.create(auction);
        await this.repository.save(newAuction);
        return newAuction;
    }

    async update(id: string, auction: Auction): Promise<Auction> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<Auction> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Auction> {
        throw new Error("Method not implemented.");
    }

    async findByName(name: string): Promise<Auction> {
        throw new Error("Method not implemented.");
    }

    async findByUser(userId: string): Promise<Auction> {
        throw new Error("Method not implemented.");
    }

    async findByStatus(status: string): Promise<Auction> {
        throw new Error("Method not implemented.");
    }

    async findByClosingDate(date: Date): Promise<Auction> {
        throw new Error("Method not implemented.");
    }
}

export { AuctionRepository };
