create schema inventory collate utf8mb4_general_ci;
use inventory;
create table categories
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table places
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table items
(
    id          int auto_increment
        primary key,
    category_id int                                not null,
    place_id    int                                not null,
    name        varchar(255)                       not null,
    description text                               null,
    image       varchar(255)                       null,
    created_at  datetime default CURRENT_TIMESTAMP null,
    constraint items_categories_id_fk
        foreign key (category_id) references categories (id),
    constraint items_places_id_fk
        foreign key (place_id) references places (id)
);
insert into inventory.categories (id, name, description)
values  (1, 'Мебель', 'Мебель описание'),
        (2, 'компьютерное оборудование', 'компьютерное оборудование описание'),
        (4, 'удаление оборудование', 'удаление оборудование описание'),
        (5, 'Бытовая техника', 'Бытовая техника описание');

insert into inventory.places (id, name, description)
values  (1, 'Кабинет директора', 'Кабинет директора место'),
        (2, 'Офис 204', 'Офис 204 описание'),
        (3, 'Учительская', 'Учительская описание'),
        (8, 'Учительская удаление', 'Учительская описание удаление');

insert into inventory.items (id, category_id, place_id, name, description, image, created_at)
values  (1, 1, 1, 'Кресло компьютерное KK-345', 'Кресло компьютерное KK-345 описание', '1кресло.jpg', '2024-08-22 18:56:50'),
        (2, 2, 2, 'Ноутбук HP Probook 450', 'Ноутбук HP Probook 450 описание', null, '2024-08-23 11:55:43'),
        (3, 2, 2, 'Ноутбук HP Probook 450', 'Ноутбук HP Probook 450 описание', 'images/dd562b4c-5369-4864-a257-09b89559456a.webp', '2024-08-23 12:11:05'),
        (4, 5, 3, 'холодильник', 'холодильникописание', 'images/3c7db70f-068f-4f71-b675-921031016359.webp', '2024-08-23 12:23:15');