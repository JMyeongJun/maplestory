import { Test, TestingModule } from '@nestjs/testing';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';

describe('EventController', () => {
  let rewardController: RewardController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
      providers: [RewardService],
    }).compile();

    rewardController = app.get<RewardController>(RewardController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rewardController.getHello()).toBe('Hello World!');
    });
  });
});
