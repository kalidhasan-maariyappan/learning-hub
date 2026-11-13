create table if not exists workflow (id varchar(255) primary key, phase varchar(64) not null, attempts integer not null, next_attempt bigint not null, fail_payment boolean not null, fail_confirm boolean not null, correlation varchar(255) not null);
create table if not exists outbox (id varchar(255) primary key, order_id varchar(255) not null, kind varchar(64) not null, sent boolean not null, correlation varchar(255) not null);
create table if not exists inbox (id varchar(255) primary key);
create table if not exists effect (id varchar(255) primary key, state varchar(64) not null, version bigint not null, expires_at bigint not null);
