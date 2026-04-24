import { Question } from '../types';

export const LITERACY_QUESTIONS: Question[] = [
  {
    id: '1',
    passage: `Pemerintah Indonesia tengah gencar mendorong digitalisasi di sektor pendidikan melalui program Merdeka Belajar. Transformasi ini tidak hanya terbatas pada penggunaan gadget di dalam kelas, tetapi juga mencakup perubahan paradigma dalam penyampaian materi. Guru diharapkan menjadi fasilitator yang mampu memanfaatkan berbagai platform digital untuk menciptakan pengalaman belajar yang interaktif dan personal bagi siswa. Tantangan utama dalam program ini adalah pemerataan infrastruktur internet dan kesiapan sumber daya manusia di daerah-daerah terpencil.`,
    text: 'Berdasarkan teks di atas, apa tantangan paling krusial dalam program digitalisasi pendidikan di Indonesia?',
    options: [
      'Kualitas gadget yang digunakan siswa di kelas.',
      'Kurangnya jumlah guru yang kompeten di perkotaan.',
      'Ketimpangan infrastruktur digital dan kesiapan SDM di daerah terpencil.',
      'Biaya langganan platform digital yang terlalu mahal.',
      'Paradigma penyampaian materi yang sudah sempurna.'
    ],
    correctAnswer: 2,
    explanation: 'Teks secara eksplisit menyebutkan tantangan utama adalah pemerataan infrastruktur internet dan kesiapan SDM di daerah terpencil.',
    category: 'Informasi'
  },
  {
    id: '2',
    passage: `Kala itu, mentari mulai tenggelam di ufuk barat, meninggalkan semburat jingga yang memantul di permukaan danau. Andi duduk terdiam di dermaga tua, memandangi riak air yang tenang. Pikirannya melayang pada kata-kata ayahnya sebelum pergi merantau: "Jagalah pusaka ini dengan hatimu, karena ia adalah saksi bisu kejayaan keluarga kita." Pusaka yang dimaksud hanyalah sebuah keris tua berkarat, namun bagi Andi, itu adalah simbol harapan.`,
    text: 'Semburat jingga yang memantul di permukaan danau memberikan suasana...',
    options: [
      'Gelisah dan penuh kepastian',
      'Tenang dan kontemplatif',
      'Mencekam dan menakutkan',
      'Riang dan penuh sorak-sorai',
      'Biasa saja tanpa makna'
    ],
    correctAnswer: 1,
    explanation: 'Konteks visual semburat jingga dan Andi yang diam memandangi air tenang menciptakan suasana kontemplatif (berpikir mendalam) dan tenang.',
    category: 'Sastra'
  },
  {
    id: '3',
    text: 'Semua siswa yang rajin belajar pasti lulus ujian. Beberapa siswa kelas 12 tidak rajin belajar. Maka kesimpulan yang benar adalah...',
    options: [
      'Semua siswa kelas 12 pasti lulus ujian.',
      'Beberapa siswa kelas 12 mungkin tidak lulus ujian.',
      'Semua siswa kelas 12 tidak lulus ujian.',
      'Siswa yang tidak rajin belajar bisa tetap lulus ujian.',
      'Tidak ada siswa kelas 12 yang rajin belajar.'
    ],
    correctAnswer: 1,
    explanation: 'Jika rajin belajar menjamin kelulusan, dan ada yang tidak rajin, maka ada kemungkinan subset tersebut tidak lulus.',
    category: 'Logika'
  },
  {
    id: '4',
    passage: `Pemanasan global merupakan fenomena meningkatnya suhu rata-rata atmosfer, laut, dan daratan Bumi secara menyeluruh. Hal ini memicu mencairnya es di kutub yang berdampak pada kenaikan permukaan air laut. Jika tren ini terus berlanjut tanpa intervensi manusia, kota-kota pesisir diprediksi akan tenggelam dalam beberapa dekade mendatang. Kesadaran kolektif untuk mengurangi emisi karbon menjadi kunci penyelamatan planet.`,
    text: 'Manakah pernyataan yang tidak sesuai dengan isi teks tersebut?',
    options: [
      'Mencairnya es di kutub adalah salah satu dampak pemanasan global.',
      'Emisi karbon tidak memiliki hubungan dengan keselamatan planet.',
      'Kenaikan permukaan laut dapat menenggelamkan kota pesisir.',
      'Intervensi manusia diperlukan untuk mengubah tren pemanasan global.',
      'Pemanasan global adalah kenaikan suhu bumi secara masif.'
    ],
    correctAnswer: 1,
    explanation: 'Teks menyebutkan "Mengurangi emisi karbon menjadi kunci penyelamatan planet", sehingga pernyataan bahwa emisi karbon tidak punya hubungan adalah salah.',
    category: 'Informasi'
  },
  {
    id: '5',
    text: 'Pilihlah kalimat yang menggunakan tanda baca yang paling tepat sesuai EYD V.',
    options: [
      'Ibu membeli; jeruk, apel, dan mangga.',
      'Wah, indah sekali pemandangan di sini!',
      'Siapa yang membawa tas saya?.',
      'Pertandingan itu, berakhir dengan skor 2-0.',
      'Dia berkata: "Saya akan datang besok".'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat "Wah, indah sekali pemandangan di sini!" menggunakan tanda baca seru yang tepat untuk kalimat seruan.',
    category: 'Bahasa'
  }
];
