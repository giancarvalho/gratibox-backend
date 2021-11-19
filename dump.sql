CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "addresses" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state_id" integer NOT NULL,
	CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_plans" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"plan_id" integer NOT NULL,
	"timestamp" TIMESTAMP(255) NOT NULL,
	CONSTRAINT "users_plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "states" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "states_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"token" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "states copy" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"user_plan_id" integer NOT NULL,
	CONSTRAINT "states copy_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ratings" (
	"id" serial NOT NULL,
	"date" DATE NOT NULL,
	"user_plan_id" integer NOT NULL,
	CONSTRAINT "ratings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk1" FOREIGN KEY ("state_id") REFERENCES "states"("id");


ALTER TABLE "users_plans" ADD CONSTRAINT "users_plans_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_plans" ADD CONSTRAINT "users_plans_fk1" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");


ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "states copy" ADD CONSTRAINT "states copy_fk0" FOREIGN KEY ("user_plan_id") REFERENCES "users_plans"("id");

ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk0" FOREIGN KEY ("user_plan_id") REFERENCES "users_plans"("id");








