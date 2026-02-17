import { Test, TestingModule } from '@nestjs/testing';
import { MetaIntegrationController } from './meta-integration.controller';

describe('MetaIntegrationController', () => {
  let controller: MetaIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaIntegrationController],
    }).compile();

    controller = module.get<MetaIntegrationController>(MetaIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
