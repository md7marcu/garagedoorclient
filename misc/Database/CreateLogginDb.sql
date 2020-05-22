-- Table: public."ActionLog"

-- DROP TABLE public."ActionLog";

CREATE TABLE public."ActionLog"
(
    "Id" integer NOT NULL),
    "Level" integer NOT NULL,
    "User" text COLLATE pg_catalog."default" NOT NULL,
    "Client" uuid NOT NULL,
    "Mac" character varying(25) COLLATE pg_catalog."default",
    "Message" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "From" character varying(255) COLLATE pg_catalog."default",
    "To" character varying(255) COLLATE pg_catalog."default",
    "Logged" timestamp without time zone NOT NULL,
    CONSTRAINT "PK_ActionLog" PRIMARY KEY ("Id")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."ActionLog"
    OWNER to loguser;
CREATE SEQUENCE "ActionLog_Id_seq" OWNED BY "ActionLog"."Id";
ALTER TABLE "ActionLog"
ALTER COLUMN "Id" SET DEFAULT nextval('"ActionLog_Id_seq"'::regclass);
UPDATE "ActionLog" SET "Id" = nextval('"ActionLog_Id_seq"');
	