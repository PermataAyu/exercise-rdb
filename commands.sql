create table blogs (id serial primary key, author text, url text, title text, likes integer default 0);
insert into blogs (author, url, title) values ('Anon', 'http://localhost/', 'First Blog with Postgres');
insert into blogs (author, url, title) values ('Anonymous', 'http://localhost/', 'Second Blog with Postgres');