// Class FILM : representasi semua element yang ada di film
class Film {
  constructor(judul, tahun, review) {
    this.judul = judul;
    this.tahun = tahun;
    this.review = review;
  }
}

// UI : menghandel user interface / tampilan antarmuka
class UI {
  static tampilFilm() {
    const simpanFilm = [];
    const films = simpanFilm;

    films.forEach((i) => UI.tambahFilm(i));
  }
  static tambahFilm(i) {
    const list = document.querySelector('#tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${i.judul}</td>
    <td>${i.tahun}</td>
    <td>${i.review}</td>
    <td><a href="#" class="btn btn-danger btn-sm hapus">x</a></td>
    `;
    list.appendChild(row);
  }
  static hapusFilm(el) {
    if(el.classList.contains('hapus')) {
      el.parentElement.parentElement.remove();
    }
  }
  static tampilAlert(pesan, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(pesan));
    const container = document.querySelector('.container');
    const form = document.querySelector('#form');
    container.insertBefore(div, form);
    // hilangkan dalam 2 detik
    setTimeout(() => document.querySelector('.alert').remove(),3000);
  }
  static bersihInput() {
    document.querySelector('#jf').value = '';
    document.querySelector('#tf').value = '';
    document.querySelector('#rf').value = '';
  }
}

// Penyimpanan

// Tampilkan Film
document.addEventListener('DOMContentLoaded', UI.tampilFilm);

// Tambahkan Film
document.querySelector('#film-form').addEventListener('submit', (e) => {
  
  // mencegah perilau default dari tombol submit:
  e.preventDefault();

  // ambil data dari value
  const judul = document.querySelector('#jf').value;
  const tahun = document.querySelector('#tf').value;
  const review = document.querySelector('#rf').value;

  // Validasi data input
  if(judul === '' || tahun === '' || review === '') {
    UI.tampilAlert('Lengkapi form yang ada!', 'danger');
  } else {

  // instatiate flm
  const film = new Film(judul, tahun, review);
  console.log(film);

  // Masukkan film ke UI
  UI.tambahFilm(film);

  // Tampil Sukses
  UI.tampilAlert('Film berhasil ditambahkan', 'success');

  // Bersihkan input
  UI.bersihInput();
  }
});

// Hapus Film
document.querySelector('#tbody').addEventListener('click', (e) => {
  UI.hapusFilm(e.target);

  // Tampil berhasil dihapus
  UI.tampilAlert('Film berhasil dihapus', 'warning');
});