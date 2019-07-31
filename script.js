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
  static setFilm() {
    const listFilms = Store.ambilFilm();
    listFilms.forEach((i) => UI.addFilm(i));
  }
  static addFilm(i) {
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
  static bersihInput() {
    document.querySelector('#jf').value = '';
    document.querySelector('#tf').value = '';
    document.querySelector('#rf').value = '';
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
  
}

// Penyimpanan

class Store {
  static ambilFilm() {
    let movie;
    if(localStorage.getItem('movie') === null) {
      movie = [];
    } else {
      movie = JSON.parse(localStorage.getItem('movie'));
    }
    return movie;
  }

  static tambahFilm(film) {
    const movie = Store.ambilFilm();
    movie.push(film);
    localStorage.setItem('movie', JSON.stringify(movie));
  }
  static hapusFilm(judul) {
    const movie = Store.ambilFilm();
    movie.forEach((film, index) => {
      if(film.judul === judul) {
        movie.splice(index, 1);
      }
    });
    localStorage.setItem('movie', JSON.stringify(movie));
  }
}

// Tampilkan Film
document.addEventListener('DOMContentLoaded', UI.setFilm);

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
  UI.addFilm(film);

  // Masukkan film ke penyimpanasn
  Store.tambahFilm(film);

  // Tampil Sukses
  UI.tampilAlert('Film berhasil ditambahkan', 'success');

  // Bersihkan input
  UI.bersihInput();
  }
});

// Hapus Film
document.querySelector('#tbody').addEventListener('click', (e) => {
  // Hapus film dari UI
  UI.hapusFilm(e.target);

  // Hapus Film dari Penyimpanan
  Store.hapusFilm(e.target.parentElement.previousElementSibling.textContent);

  // Tampil berhasil dihapus
  UI.tampilAlert('Film berhasil dihapus', 'warning');
});