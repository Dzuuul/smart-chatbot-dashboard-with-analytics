-- CreateEnum
CREATE TYPE "chatbot_flow_node_type" AS ENUM ('START', 'MESSAGE', 'QUESTION', 'ACTION', 'END');

-- CreateEnum
CREATE TYPE "chatbot_flow_node_edge_condition_type" AS ENUM ('TEXT_MATCH', 'BUTTON', 'FALLBACK');

-- CreateEnum
CREATE TYPE "message_sender_type" AS ENUM ('USER', 'BOT', 'ADMIN');

-- CreateEnum
CREATE TYPE "message_type" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'FILE', 'LOCATION', 'CONTACT', 'BUTTON', 'LIST', 'FLOW');

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "sender_type" "message_sender_type" NOT NULL,
    "message_type" "message_type" NOT NULL,
    "message_text" TEXT,
    "meta_message_id" TEXT,
    "response_time_ms" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatbot_flows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chatbot_flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatbot_flow_nodes" (
    "id" TEXT NOT NULL,
    "chatbot_flow_id" TEXT NOT NULL,
    "node_type" "chatbot_flow_node_type" NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chatbot_flow_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatbot_flow_node_edges" (
    "id" TEXT NOT NULL,
    "chatbot_flow_id" TEXT NOT NULL,
    "source_node_id" TEXT NOT NULL,
    "target_node_id" TEXT NOT NULL,
    "condition_type" "chatbot_flow_node_edge_condition_type" NOT NULL,
    "condition_value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chatbot_flow_node_edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_metrics" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total_messages" INTEGER NOT NULL,
    "total_users" INTEGER NOT NULL,
    "avg_response_time_ms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "message_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phone_number_key" ON "contacts"("phone_number");

-- CreateIndex
CREATE INDEX "conversation_contact_idx" ON "conversations"("contact_id");

-- CreateIndex
CREATE INDEX "conversation_status_idx" ON "conversations"("status");

-- CreateIndex
CREATE INDEX "message_conversation_idx" ON "messages"("conversation_id");

-- CreateIndex
CREATE INDEX "message_sender_type_idx" ON "messages"("sender_type");

-- CreateIndex
CREATE INDEX "message_created_at_idx" ON "messages"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "chatbot_flows_name_key" ON "chatbot_flows"("name");

-- CreateIndex
CREATE INDEX "message_metrics_date_idx" ON "message_metrics"("date");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatbot_flow_nodes" ADD CONSTRAINT "chatbot_flow_nodes_chatbot_flow_id_fkey" FOREIGN KEY ("chatbot_flow_id") REFERENCES "chatbot_flows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatbot_flow_node_edges" ADD CONSTRAINT "chatbot_flow_node_edges_chatbot_flow_id_fkey" FOREIGN KEY ("chatbot_flow_id") REFERENCES "chatbot_flows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatbot_flow_node_edges" ADD CONSTRAINT "chatbot_flow_node_edges_source_node_id_fkey" FOREIGN KEY ("source_node_id") REFERENCES "chatbot_flow_nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatbot_flow_node_edges" ADD CONSTRAINT "chatbot_flow_node_edges_target_node_id_fkey" FOREIGN KEY ("target_node_id") REFERENCES "chatbot_flow_nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
