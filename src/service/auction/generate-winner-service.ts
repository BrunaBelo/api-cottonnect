import { getCustomRepository } from "typeorm"
import { Auction } from "../../model/auction"
import { Bidding } from "../../model/bidding";
import { User } from "../../model/user";
import { AuctionRepository } from "../../repository/auction-repository"
import { BiddingRepository } from "../../repository/bidding-repository";
import { UserRepository } from "../../repository/user-repository";
import Mailer from "../mailer/send-mailer";

class GenerateWinnerService {
  private repository: AuctionRepository;
  private biddingRepository: BiddingRepository;
  private userRepository: UserRepository;
  private owner: User;
  private winner: User;

  constructor(private auction: Auction) {
    this.repository = getCustomRepository(AuctionRepository);
    this.biddingRepository = getCustomRepository(BiddingRepository);
    this.userRepository = getCustomRepository(UserRepository);
    this.auction = auction;
    this.owner = auction.user;
    this.winner = null;
  }

  async run(): Promise<Auction>{
    const biddingsOrder = await this.biddingRepository.find({
      where: { auctionId: this.auction.id, status: "valid", reject: false },
      order: { bidAmount: 'DESC', createdAt: 'ASC' }
    })

    await this.generateWinner(biddingsOrder);

    this.auction = await this.repository.findOne(this.auction.id, { relations: ['donationObject', 'user']});
    this.sendNoticeEmailToWinner();
    this.sendNoticeEmailToOwner();

    return this.auction;
  }

  async generateWinner(biddings: Bidding[]) {
    const { repository, biddingRepository, userRepository } = this;

    for await (const bid of biddings) {
      const bidUser = await userRepository.findOne({ where: { id: bid.userId }});

      if(bidUser.cottonFlakes >= bid.bidAmount){
        this.winner = bidUser;
        await biddingRepository.update(bid.id, { winner: true });
        await repository.update(this.auction.id, { status: "waiting" });
        break;
      }

      await biddingRepository.update(bid.id, { status: "insufficientCottons" });
    };

    if(this.winner == null){
      await repository.update(this.auction.id, { status: "rejected" });
    }
  }

  sendNoticeEmailToWinner(){
    const { winner, auction, owner } = this;

    if(winner == null) { return };

    new Mailer(winner.email, `Parabéns ${winner.name}`, "Você ganhou uma doação", "winner-auction", {
      userName: winner.name,
      auctionName: auction.donationObject.title,
      userOwnerName: owner.name,
      userOwnerEmail: owner.email,
      userOwnerPhoneNumber: owner.phoneNumber,
      userOwnerInfos: owner.additionalInformation,
    }).sendEmail();
  }

  sendNoticeEmailToOwner(){
    const { winner, auction, owner } = this;

    if(winner == null) { return };

    new Mailer(owner.email, `Olá ${owner.name}`, "Você tem um leilão com ganhador", "owner-auction", {
      userName: owner.name,
      auctionName: auction.donationObject.title,
      winnerName: winner.name,
      winnerEmail: winner.email,
      winnerPhoneNumber: winner.phoneNumber,
      winnerInfos: winner.additionalInformation,
    }).sendEmail();
  }
}

export default GenerateWinnerService;
