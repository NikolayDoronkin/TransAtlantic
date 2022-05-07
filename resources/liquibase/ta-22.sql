CREATE TABLE IF NOT EXISTS warehouse_dispatcher
(
    id              bigint      NOT NULL DEFAULT NEXTVAL(('"warehouse_dispatcher_id_seq"'::text)::regclass),
    warehouse_id    bigint      NOT NULL,
    dispatcher_id   bigint      NOT NULL,
    CONSTRAINT "PK_warehouse_dispatcher" PRIMARY KEY (id),
    CONSTRAINT "FK_warehouse_dispatcher_dispatcher"
        FOREIGN KEY (dispatcher_id) REFERENCES app_user (id) ON DELETE No Action ON UPDATE No Action,
    CONSTRAINT "FK_warehouse_dispatcher_warehouse"
        FOREIGN KEY (warehouse_id) REFERENCES warehouse (id) ON DELETE No Action ON UPDATE No Action
);
CREATE SEQUENCE IF NOT EXISTS warehouse_dispatcher_id_seq INCREMENT 1 START 1;