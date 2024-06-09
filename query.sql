CREATE TYPE STATUS_PEMESANAN AS ENUM (
    'MENUNGGU KONFIRMASI',
    'PESANAN DIPROSES',
    'TUKANG SEDANG MENUJU ALAMAT',
    'TUKANG TELAH MENGANGKUT SAMPAH',
    'SAMPAH SEDANG DIHITUNG',
    'SAMPAH BERHASIL DIKONVERSI MENJADI KOIN',
    'PESANAN SELESAI'
);

-- List user pengguna aplikasi

CREATE TYPE STATUS_PRODUK AS ENUM (
    'PESANAN DIBELI',
    'PESANAN DIANTAR',
    'PESANAN SELESAI'
);

DROP TABLE order_produk;
DROP TABLE order_sampah;
DROP TABLE produk;
DROP TABLE "user";
DROP TABLE admin;

CREATE TABLE "user" (
    id              UUID UNIQUE NOT NULL DEFAULT(GEN_RANDOM_UUID()),
    email           VARCHAR(100) UNIQUE NOT NULL,
    password        VARCHAR(200) NOT NULL,

    nama            VARCHAR(100) NOT NULL,
    alamat          VARCHAR(500) NOT NULL,
    jumlah_koin     INTEGER NOT NULL DEFAULT(0),

    PRIMARY KEY (id)
);

-- List admin pengatur aplikasi
CREATE TABLE admin (
    id          UUID UNIQUE NOT NULL DEFAULT(GEN_RANDOM_UUID()),
    email           VARCHAR(100) UNIQUE NOT NULL,
    password        VARCHAR(200) NOT NULL,

    PRIMARY KEY (id)
);

-- List produk yang ada di aplikasi
CREATE TABLE produk (
    id              UUID UNIQUE NOT NULL DEFAULT(GEN_RANDOM_UUID()),
    nama            VARCHAR(100) NOT NULL,
    gambar          VARCHAR(500) NOT NULL,
    harga_koin      INTEGER NOT NULL DEFAULT(0),
    stok            INTEGER NOT NULL DEFAULT(0),

    PRIMARY KEY (id)
);

CREATE TABLE order_produk (
    id              UUID UNIQUE NOT NULL DEFAULT(GEN_RANDOM_UUID()),
    id_produk       UUID NOT NULL,
    id_pemesan      UUID NOT NULL,
    jumlah          INTEGER NOT NULL,
    status          STATUS_PRODUK NOT NULL DEFAULT('PESANAN DIBELI'),

    PRIMARY KEY (id)
);

-- List order pengambilan sampah
CREATE TABLE order_sampah (
    id              UUID UNIQUE NOT NULL DEFAULT(GEN_RANDOM_UUID()), 
    id_pemesan      UUID NOT NULL, 
    tanggal         TIMESTAMP NOT NULL, 
    berat           FLOAT NOT NULL DEFAULT(0.0), 
    status          STATUS_PEMESANAN NOT NULL DEFAULT('MENUNGGU KONFIRMASI'),

    PRIMARY KEY (id)
);

ALTER TABLE order_sampah ADD FOREIGN KEY (id_pemesan) REFERENCES "user" (id);
ALTER TABLE order_produk ADD FOREIGN KEY (id_pemesan) REFERENCES "user" (id);
ALTER TABLE order_produk ADD FOREIGN KEY (id_produk) REFERENCES "produk" (id);

CREATE VIEW ProdukDetail AS
SELECT order_produk.id AS "ID ORDER", 
        produk.nama AS "Nama Produk", produk.gambar AS "Foto Produk", produk.harga_koin AS "Harga Produk", produk.stok AS "Stok Produk", 
        "user".nama AS "Nama Pemesan", "user".alamat AS "Alamat Pemesan", "user".jumlah_koin AS "Jumlah Koin Pemesan"
FROM order_produk
INNER JOIN produk
ON order_produk.id_produk = produk.id 
INNER JOIN "user"
ON order_produk.id_pemesan = "user".id;

SELECT * FROM ProdukDetail;
