//DEKLARASI ARRAY PRODUK TOKO
let produkToko = [
    { id: 1, nama: "Laptop", harga: 7000000, stok: 5 },
    { id: 2, nama: "Mouse", harga: 200000, stok: 10 },
    { id: 3, nama: "Keyboard", harga: 350000, stok: 7 }
];

// Helper untuk format tampilan mata uang Rupiah
const formatRupiah = (angka) => {
    return "Rp " + angka.toLocaleString("id-ID");
};

//FUNGSI TAMPILKAN PRODUK
function tampilkanProduk() {
    console.log("==========================================");
    console.log("           DAFTAR PRODUK TOKO             ");
    console.log("==========================================");
    
    if (produkToko.length === 0) {
        console.log("Belum ada produk yang tersedia.");
        return;
    }

    produkToko.forEach((produk) => {
        console.log(`ID    : ${produk.id}`);
        console.log(`Nama  : ${produk.nama}`);
        console.log(`Harga : ${formatRupiah(produk.harga)}`);
        console.log(`Stok  : ${produk.stok}`);
        console.log("------------------------------------------");
    });
}

//FUNGSI TAMBAH PRODUK
function tambahProduk(nama, harga, stok) {
    // Generate ID otomatis (jika array kosong ID = 1, jika tidak ID = ID terakhir + 1)
    const newId = produkToko.length > 0 ? produkToko[produkToko.length - 1].id + 1 : 1;
    
    const produkBaru = {
        id: newId,
        nama: nama,
        harga: harga,
        stok: stok
    };

    produkToko.push(produkBaru);
    console.log(`\n[SUCCESS] Produk "${nama}" berhasil ditambahkan!`);
}

//FUNGSI HAPUS PRODUK

function hapusProduk(id) {
    // Cari indeks produk berdasarkan ID
    const index = produkToko.findIndex((produk) => produk.id === id);

    if (index !== -1) {
        const produkDihapus = produkToko.splice(index, 1);
        console.log(`\n[SUCCESS] Produk "${produkDihapus[0].nama}" (ID: ${id}) berhasil dihapus.`);
    } else {
        console.log(`\n[ERROR] Produk dengan ID ${id} tidak ditemukan.`);
    }
}

// UJI COBA JALAN KODE

// 1. Menampilkan daftar produk awal
tampilkanProduk();

// 2. Menambahkan produk baru
tambahProduk("Monitor 24 Inch", 1800000, 4);
tambahProduk("Headset Gaming", 450000, 8);

// 3. Menampilkan daftar produk setelah ditambahkan
tampilkanProduk();

// 4. Menghapus produk dengan ID = 2 (Mouse)
hapusProduk(2);

// 5. Menampilkan daftar produk akhir
tampilkanProduk();