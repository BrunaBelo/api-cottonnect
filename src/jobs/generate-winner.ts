import { getCustomRepository } from "typeorm";
import { AuctionRepository } from "../repository/auction-repository";
import schedule from "node-schedule";
import GenerateWinnerService from "../service/auction/generate-winner-service";

class GenerateWinner {
  constructor() {
  }

  public async run() {
    schedule.scheduleJob('59 59 23 * * *', async function () {
      const repository = getCustomRepository(AuctionRepository);
      const dateToday = new Date().toISOString().split('T')[0];

      const auctions = await repository.find({ where: { closingDate: dateToday, status: 'open' }, relations: ['user'] });
      console.log(`Gerando o ganhador para ${auctions.length} leilões`);

      auctions.forEach(auction => {
        console.log(`Gerando o ganhador para o leilão ${auction.id}`);
        new GenerateWinnerService(auction).run();
      });
    });
  }
}

export default new GenerateWinner();
