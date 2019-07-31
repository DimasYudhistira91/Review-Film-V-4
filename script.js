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

  // instatiate flm
  const film = new Film(judul, tahun, review);
  console.log(film);

  // Masukkan film ke UI
  UI.tambahFilm(film);

});
// Hapus Film