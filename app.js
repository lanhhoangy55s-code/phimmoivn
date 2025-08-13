// ===== Dữ liệu phim mẫu =====
const movies = [
  {
    title: "Tựa Như Tình Đầu",
    year: 2019,
    genre: "Tình cảm",
    director: "Nguyễn Văn A",
    actors: "Diễn viên 1, Diễn viên 2",
    poster: "images/movie1.jpg",
    desc: "Một câu chuyện tình lãng mạn và cảm động."
  },
  {
    title: "Phế Phẩm",
    year: 2020,
    genre: "Hài",
    director: "Trần Văn B",
    actors: "Diễn viên 3, Diễn viên 4",
    poster: "images/movie2.jpg",
    desc: "Bộ phim hài hước xoay quanh những tình huống dở khóc dở cười."
  },
  {
    title: "Running Man",
    year: 2018,
    genre: "Giải trí",
    director: "Lee Hwan",
    actors: "Yoo Jae-suk, Kim Jong-kook, Haha",
    poster: "images/movie3.jpg",
    desc: "Chương trình thực tế nổi tiếng Hàn Quốc."
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Hành động",
    director: "Anthony Russo, Joe Russo",
    actors: "Robert Downey Jr., Chris Evans",
    poster: "images/movie4.jpg",
    desc: "Trận chiến cuối cùng chống lại Thanos để cứu vũ trụ."
  }
];

// ===== Các phần tử DOM =====
const moviesGrid = document.getElementById('moviesGrid');
const genreList = document.getElementById('genreList');
const searchInput = document.getElementById('searchInput');
const movieModal = document.getElementById('movieModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const themeToggle = document.getElementById('themeToggle');

// ===== Render danh sách phim =====
function renderMovies(data) {
  moviesGrid.innerHTML = data.map(movie => `
    <div class="movie-card" onclick="openModal('${movie.title}')">
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
    </div>
  `).join('');
}

// ===== Lấy danh sách thể loại và render checkbox =====
function renderGenres() {
  const genres = [...new Set(movies.map(m => m.genre))];
  genreList.innerHTML = genres.map(g => `
    <label>
      <input type="checkbox" value="${g}"> ${g}
    </label>
  `).join('');
}

// ===== Modal =====
function openModal(title) {
  const movie = movies.find(m => m.title === title);
  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="${movie.poster}" alt="${movie.title}" style="width:100%;border-radius:8px;">
    <p><strong>Năm:</strong> ${movie.year}</p>
    <p><strong>Thể loại:</strong> ${movie.genre}</p>
    <p><strong>Đạo diễn:</strong> ${movie.director}</p>
    <p><strong>Diễn viên:</strong> ${movie.actors}</p>
    <p>${movie.desc}</p>
  `;
  movieModal.classList.remove('hidden');
}

document.getElementById('closeModal').onclick = () => {
  movieModal.classList.add('hidden');
};

movieModal.addEventListener('click', e => {
  if (e.target === movieModal) movieModal.classList.add('hidden');
});

// ===== Bộ lọc và tìm kiếm =====
let selectedGenres = [];
let searchTerm = "";

// Debounce function
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function applyFilters() {
  let filtered = movies.filter(m => {
    const matchGenre = selectedGenres.length === 0 || selectedGenres.includes(m.genre);
    const matchSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGenre && matchSearch;
  });
  renderMovies(filtered);
}

// Checkbox change
genreList.addEventListener('change', () => {
  selectedGenres = [...genreList.querySelectorAll('input:checked')].map(cb => cb.value);
  applyFilters();
});

// Search input
searchInput.addEventListener('input', debounce(e => {
  searchTerm = e.target.value;
  applyFilters();
}, 400));

// ===== Theme toggle với localStorage =====
function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
  } else {
    document.body.classList.remove('light-mode');
    themeToggle.textContent = '☀️';
  }
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  loadTheme();
});

// ===== Khởi tạo =====
renderMovies(movies);
renderGenres();
loadTheme();
