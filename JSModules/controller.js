import users from "./data.js";

const index = () => {
    console.log("=== DAFTAR USER ===");
    users.map((user, i) => {
        console.log(`${i + 1}. ${user.nama} | ${user.umur} thn | ${user.alamat} | ${user.email}`);
    });
};

const store = (newUser) => {
    users.push(newUser);
    console.log(`\n--> Data ${newUser.nama} berhasil ditambahkan!`);
};

const destroy = (indexData) => {
    if (indexData >= 0 && indexData < users.length) {
        const deleted = users.splice(indexData, 1);
        console.log(`\n--> Data ${deleted[0].nama} berhasil dihapus!`);
    }
};

export { index, store, destroy };