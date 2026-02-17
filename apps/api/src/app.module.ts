import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { MessagesController } from './modules/messages/messages.controller';
import { MessagesModule } from './modules/messages/messages.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { KnowledgeBaseController } from './modules/knowledge-base/knowledge-base.controller';
import { KnowledgeBaseModule } from './modules/knowledge-base/knowledge-base.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { AnalyticsController } from './modules/analytics/analytics.controller';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SettingsModule } from './modules/settings/settings.module';
import { MetaIntegrationController } from './modules/meta-integration/meta-integration.controller';
import { MetaIntegrationModule } from './modules/meta-integration/meta-integration.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from './config/auth/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/auth/guards/jwt-auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    UsersModule,
    AuthModule,
    ConversationsModule,
    MessagesModule,
    ContactsModule,
    KnowledgeBaseModule,
    ChatbotModule,
    AnalyticsModule,
    SettingsModule,
    MetaIntegrationModule,
  ],
  controllers: [
    AppController,
    MessagesController,
    KnowledgeBaseController,
    AnalyticsController,
    MetaIntegrationController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
