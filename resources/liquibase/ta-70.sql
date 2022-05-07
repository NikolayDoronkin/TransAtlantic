ALTER TABLE "app_user"
ALTER
COLUMN password TYPE varchar(60);

ALTER TABLE "app_user"
    ADD
        COLUMN access_token varchar(300);

ALTER TABLE "app_user"
    ADD
        COLUMN refresh_token varchar(300);
