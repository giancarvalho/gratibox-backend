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
	"user_plan_id" integer NOT NULL,
	"recipient" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state_id" integer NOT NULL,
	"zipcode" varchar(255) NOT NULL,
	CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"img_url" TEXT NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_plans" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"plan_id" integer NOT NULL,
	"timestamp" TIMESTAMP NOT NULL DEFAULT 'now()',
	"day" integer NOT NULL,
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



CREATE TABLE "options_users_plans" (
	"id" serial NOT NULL,
	"option_id" integer NOT NULL,
	"user_plan_id" integer NOT NULL,
	CONSTRAINT "options_users_plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ratings" (
	"id" serial NOT NULL,
	"date" DATE NOT NULL,
	"user_plan_id" integer NOT NULL,
	"rating" integer NOT NULL,
	CONSTRAINT "ratings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "options" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "options_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "days" (
	"id" serial NOT NULL,
	"name" varchar(10) NOT NULL,
	"value" integer NOT NULL,
	"plan_id" integer NOT NULL,
	CONSTRAINT "days_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("user_plan_id") REFERENCES "users_plans"("id");
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk1" FOREIGN KEY ("state_id") REFERENCES "states"("id");


ALTER TABLE "users_plans" ADD CONSTRAINT "users_plans_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_plans" ADD CONSTRAINT "users_plans_fk1" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");


ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "options_users_plans" ADD CONSTRAINT "options_users_plans_fk0" FOREIGN KEY ("option_id") REFERENCES "options"("id");
ALTER TABLE "options_users_plans" ADD CONSTRAINT "options_users_plans_fk1" FOREIGN KEY ("user_plan_id") REFERENCES "users_plans"("id");

ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk0" FOREIGN KEY ("user_plan_id") REFERENCES "users_plans"("id");


ALTER TABLE "days" ADD CONSTRAINT "days_fk0" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");




INSERT INTO plans (name, img_url, description) VALUES ('mensal', 'https://i.imgur.com/NQ13yjA.jpg', 'Voc?? recebe um box por m??s. Ideal para quem est?? come??ando agora.'), ('semanal', 'https://i.imgur.com/HXqApOB.jpg', 'Voc?? recebe um box por semana. Ideal para quem quer exercer a gratid??o todos os dias.');

INSERT INTO states (name) 
VALUES
('AC'),
('AL'),
('AM'),
('AP'),
('BA'),
('CE'),
('DF'),
('ES'),
('GO'),
('MA'),
('MG'),
('MS'),
('MT'),
('PA'),
('PB'),
('PE'),
('PI'),
('PR'),
('RJ'),
('RN'),
('RO'),
('RR'),
('RS'),
('SC'),
('SE'),
('SP'),
('TO');

INSERT INTO options (name) VALUES ('Ch??s'), ('Incensos'), ('Produtos org??nicos');

INSERT INTO days (name, value, plan_id) VALUES ('Seg', 1, 2), ('Qua', 3, 2), ('Sex', 5, 2), (
'01', 1, 1), ('10', 10, 1), ('20', 20, 1);