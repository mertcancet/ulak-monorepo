CREATE TYPE "knowledge_source_status" AS ENUM('pending', 'processing', 'ready', 'failed');--> statement-breakpoint
CREATE TYPE "knowledge_source_type" AS ENUM('file', 'text', 'website');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"account_id" uuid NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"owner_user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "knowledge_base_chunks" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"business_id" uuid NOT NULL,
	"knowledge_base_id" uuid NOT NULL,
	"source_id" uuid NOT NULL,
	"chunk_index" integer NOT NULL,
	"content" text NOT NULL,
	"token_count" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "knowledge_base_sources" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"business_id" uuid NOT NULL,
	"knowledge_base_id" uuid NOT NULL,
	"source_type" "knowledge_source_type" NOT NULL,
	"processing_status" "knowledge_source_status" DEFAULT 'pending'::"knowledge_source_status" NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"website_url" text,
	"website_crawl_depth" integer,
	"file_name" text,
	"file_mime_type" text,
	"file_size_bytes" bigint,
	"storage_path" text,
	"checksum" text,
	"metadata" jsonb DEFAULT '{}' NOT NULL,
	"error_message" text,
	"last_synced_at" timestamp,
	"created_by_user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "knowledge_bases" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"business_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by_user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "accounts_user_id_index" ON "accounts" ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_index" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "verifications_identifier_index" ON "verifications" ("identifier");--> statement-breakpoint
CREATE INDEX "businesses_owner_user_id_index" ON "businesses" ("owner_user_id");--> statement-breakpoint
CREATE INDEX "knowledge_base_chunks_business_id_index" ON "knowledge_base_chunks" ("business_id");--> statement-breakpoint
CREATE INDEX "knowledge_base_chunks_knowledge_base_id_index" ON "knowledge_base_chunks" ("knowledge_base_id");--> statement-breakpoint
CREATE INDEX "knowledge_base_chunks_source_id_index" ON "knowledge_base_chunks" ("source_id");--> statement-breakpoint
CREATE UNIQUE INDEX "knowledge_base_chunks_source_id_chunk_index_index" ON "knowledge_base_chunks" ("source_id","chunk_index");--> statement-breakpoint
CREATE INDEX "knowledge_base_sources_business_id_index" ON "knowledge_base_sources" ("business_id");--> statement-breakpoint
CREATE INDEX "knowledge_base_sources_knowledge_base_id_index" ON "knowledge_base_sources" ("knowledge_base_id");--> statement-breakpoint
CREATE INDEX "knowledge_base_sources_source_type_index" ON "knowledge_base_sources" ("source_type");--> statement-breakpoint
CREATE INDEX "knowledge_base_sources_processing_status_index" ON "knowledge_base_sources" ("processing_status");--> statement-breakpoint
CREATE INDEX "knowledge_base_sources_created_by_user_id_index" ON "knowledge_base_sources" ("created_by_user_id");--> statement-breakpoint
CREATE INDEX "knowledge_bases_business_id_index" ON "knowledge_bases" ("business_id");--> statement-breakpoint
CREATE INDEX "knowledge_bases_created_by_user_id_index" ON "knowledge_bases" ("created_by_user_id");--> statement-breakpoint
CREATE INDEX "knowledge_bases_is_active_index" ON "knowledge_bases" ("is_active");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_owner_user_id_users_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "knowledge_base_chunks" ADD CONSTRAINT "knowledge_base_chunks_business_id_businesses_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "knowledge_base_chunks" ADD CONSTRAINT "knowledge_base_chunks_knowledge_base_id_knowledge_bases_id_fkey" FOREIGN KEY ("knowledge_base_id") REFERENCES "knowledge_bases"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "knowledge_base_chunks" ADD CONSTRAINT "knowledge_base_chunks_source_id_knowledge_base_sources_id_fkey" FOREIGN KEY ("source_id") REFERENCES "knowledge_base_sources"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "knowledge_base_sources" ADD CONSTRAINT "knowledge_base_sources_business_id_businesses_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "knowledge_base_sources" ADD CONSTRAINT "knowledge_base_sources_khNSc7a49clG_fkey" FOREIGN KEY ("knowledge_base_id") REFERENCES "knowledge_bases"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "knowledge_base_sources" ADD CONSTRAINT "knowledge_base_sources_created_by_user_id_users_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "knowledge_bases" ADD CONSTRAINT "knowledge_bases_business_id_businesses_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "knowledge_bases" ADD CONSTRAINT "knowledge_bases_created_by_user_id_users_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL;