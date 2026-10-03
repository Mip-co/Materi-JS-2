
// CLASS PARENT: KENDARAAN (Abstraction & Encapsulation)

class Kendaraan {
    #stok; // Private Field untuk enkapsulasi stok

    constructor(id, merk, tipe, hargaSewa, stok) {
        if (this.constructor === Kendaraan) {
            throw new Error("Class Kendaraan bersifat abstrak dan tidak dapat diinstansiasi secara langsung!");
        }
        this.id = id;
        this.merk = merk;
        this.tipe = tipe;
        this.hargaSewa = hargaSewa;
        this.#stok = stok;
    }

    // Getter untuk mengakses stok privat
    getStok() {
        return this.#stok;
    }

    // Method untuk mengurangi stok saat disewa
    kurangiStok() {
        if (this.#stok > 0) {
            this.#stok--;
            return true;
        }
        return false;
    }

    // Method untuk menambah stok saat dikembalikan
    kembalikanStok() {
        this.#stok++;
    }

    // Helper format rupiah
    formatRupiah(angka) {
        return "Rp " + angka.toLocaleString("id-ID");
    }

    // Method polymorphic (akan di-override oleh subclass)
    getInfoDetail() {
        return `[${this.id}] ${this.merk} ${this.tipe} - Harga Sewa: ${this.formatRupiah(this.hargaSewa)}/hari | Stok: ${this.#stok}`;
    }
}

// SUBCLASS: MOBIL & MOTOR (Inheritance & Polymorphism)

class Mobil extends Kendaraan {
    constructor(id, merk, tipe, hargaSewa, stok, jumlahPintu) {
        super(id, merk, tipe, hargaSewa, stok);
        this.jumlahPintu = jumlahPintu;
    }

    // Method Overriding
    getInfoDetail() {
        return `${super.getInfoDetail()} | Jenis: Mobil (${this.jumlahPintu} Pintu)`;
    }
}

class Motor extends Kendaraan {
    constructor(id, merk, tipe, hargaSewa, stok, jenisHelms) {
        super(id, merk, tipe, hargaSewa, stok);
        this.jenisHelms = jenisHelms;
    }

    // Method Overriding
    getInfoDetail() {
        return `${super.getInfoDetail()} | Jenis: Motor (Helm: ${this.jenisHelms})`;
    }
}

//CLASS PELANGGAN (Sesuai Tugas Utama)

class Pelanggan {
    constructor(nama, nomorTelepon, kendaraanDisewa = null, durasiHari = 0) {
        this.nama = nama;
        this.nomorTelepon = nomorTelepon;
        this.kendaraanDisewa = kendaraanDisewa; // Menampung objek Kendaraan
        this.durasiHari = durasiHari;
        this.tanggalSewa = null;
    }

    // Metode untuk mencatat transaksi penyewaan kendaraan
    sewaKendaraan(kendaraan, durasiHari) {
        if (kendaraan.getStok() > 0) {
            if (kendaraan.kurangiStok()) {
                this.kendaraanDisewa = kendaraan;
                this.durasiHari = durasiHari;
                this.tanggalSewa = new Date().toLocaleDateString("id-ID");
                
                const totalBiaya = kendaraan.hargaSewa * durasiHari;
                console.log(`\n[TRANSAKSI BERHASIL]`);
                console.log(`Pelanggan : ${this.nama} (${this.nomorTelepon})`);
                console.log(`Kendaraan : ${kendaraan.merk} ${kendaraan.tipe}`);
                console.log(`Durasi    : ${durasiHari} Hari`);
                console.log(`Total     : ${kendaraan.formatRupiah(totalBiaya)}`);
                return true;
            }
        } else {
            console.log(`\n[TRANSAKSI GAGAL] Stok kendaraan "${kendaraan.merk} ${kendaraan.tipe}" sedang habis!`);
            return false;
        }
    }
}

// CLASS MANAJEMEN PENYEWAAN (Sistem Pengelola)

class SistemPenyewaan {
    constructor() {
        this.daftarPelanggan = [];
    }

    // Tambah pelanggan yang telah bertransaksi ke sistem
    catatPenyewaan(pelanggan) {
        if (pelanggan.kendaraanDisewa !== null) {
            this.daftarPelanggan.push(pelanggan);
        }
    }

    // Menampilkan daftar pelanggan yang sedang menyewa kendaraan
    tampilkanDaftarPelanggan() {
        console.log("\n=======================================================================");
        console.log("            DAFTAR PELANGGAN YANG SEDANG MENYEWA KENDARAAN             ");
        console.log("=======================================================================");

        if (this.daftarPelanggan.length === 0) {
            console.log("Belum ada pelanggan yang sedang menyewa kendaraan saat ini.");
            console.log("=======================================================================");
            return;
        }

        this.daftarPelanggan.forEach((pelanggan, index) => {
            const k = pelanggan.kendaraanDisewa;
            const totalBayar = k.hargaSewa * pelanggan.durasiHari;

            console.log(`${index + 1}. Nama Pelanggan : ${pelanggan.nama}`);
            console.log(`   No. Telepon    : ${pelanggan.nomorTelepon}`);
            console.log(`   Kendaraan      : ${k.merk} ${k.tipe}`);
            console.log(`   Durasi Sewa    : ${pelanggan.durasiHari} Hari`);
            console.log(`   Total Biaya    : ${k.formatRupiah(totalBayar)}`);
            console.log(`   Tgl Transaksi  : ${pelanggan.tanggalSewa}`);
            console.log("-----------------------------------------------------------------------");
        });
    }
}

// UJI COBA DAN SIMULASI SISTEM

// 1. Inisialisasi Produk Kendaraan
const mobil1 = new Mobil("M01", "Toyota", "Avanza", 350000, 3, 4);
const mobil2 = new Mobil("M02", "Honda", "CR-V", 600000, 1, 4);
const motor1 = new Motor("T01", "Yamaha", "NMAX", 120000, 5, "2 Helm SNI");

// 2. Inisialisasi Sistem Penyewaan
const sistem = new SistemPenyewaan();

// 3. Pelanggan 1 Melakukan Penyewaan
const pelanggan1 = new Pelanggan("Ahmad Miftahuddin", "081234567890");
pelanggan1.sewaKendaraan(mobil1, 3); // Sewa Avanza 3 hari
sistem.catatPenyewaan(pelanggan1);

// 4. Pelanggan 2 Melakukan Penyewaan
const pelanggan2 = new Pelanggan("Budi Santoso", "089876543210");
pelanggan2.sewaKendaraan(motor1, 2); // Sewa NMAX 2 hari
sistem.catatPenyewaan(pelanggan2);

// 5. Menampilkan Daftar Pelanggan Yang Sedang Menyewa
sistem.tampilkanDaftarPelanggan();