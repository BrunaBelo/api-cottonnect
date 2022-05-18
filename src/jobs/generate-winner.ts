import { getCustomRepository } from "typeorm";
import { AuctionRepository } from "../repository/auction-repository";
import * as cron from 'node-cron'
import GenerateWinnerService from "../service/auction/generate-winner-service";

class GenerateWinner {
  constructor() {
  }

  public async run() {
    const job = cron.schedule("0 59 23 * * *", async function () {
      console.log(new Date().toLocaleString())

      const repository = getCustomRepository(AuctionRepository);
      const dateToday = new Date().toISOString().split('T')[0];

      const auctions = await repository.find({ where: { closingDate: dateToday, status: 'open' }, relations: ['user'] });
      console.log(`Gerando o ganhador para ${auctions.length} leilões`);

      auctions.forEach(auction => {
        console.log(`Gerando o ganhador para o leilão ${auction.id}`);
        new GenerateWinnerService(auction).run();
      });
    }, {
      scheduled: true,
      timezone: "America/Sao_Paulo"
    });
  }
}

export default new GenerateWinner();
