import generateWinnerService from "./generate-winner";

class Job {
  constructor() {}

  public runAllJobs() {
    generateWinnerService.run();
  }
}

export default new Job();
