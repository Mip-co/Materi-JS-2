import { index, store, destroy } from "./controller.js";

const main = () => {
    // 1. Tampilkan data awal
    index();

    // 2. Tambah minimal 2 data baru
    store({ nama: 'Eko', umur: 30, alamat: 'Jl. Teratai No. 11', email: 'eko@gmail.com' });
    store({ nama: 'Rina', umur: 22, alamat: 'Jl. Seroja No. 12', email: 'rina@gmail.com' });

    // 3. Tampilkan data setelah penambahan
    index();

    // 4. Hapus 1 data (misal index ke-0)
    destroy(0);

    // 5. Tampilkan hasil akhir
    index();
};

main();