import { Auction } from "../model/auction";
import { AuctionRepository } from "../repository/auctionRepository";

class AuctionUseCase {
    private repository: AuctionRepository;

    constructor() {
        this.repository = new AuctionRepository();
    }

    async create(auction: Auction): Promise<Auction> {
        const newAuction = await this.repository.create(auction);
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

    async findByClosingData(date: Date): Promise<Auction> {
        throw new Error("Method not implemented.");
    }
}
export { AuctionUseCase };
