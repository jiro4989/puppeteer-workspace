create database test_db;
use test_db;
create table users (name varchar(64), password varchar(64));
insert into users values ("tanaka", "password");
insert into users values ("suzuki", "p@ssword");
insert into users values ("ikeda", "passw0rd");
insert into users values ("yamada", "00000000");

create table urls (id int auto_increment primary key, url varchar(1024) not null);

