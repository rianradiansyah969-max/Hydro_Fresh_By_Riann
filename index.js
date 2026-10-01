const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mendaftarkan folder public sebagai static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route khusus untuk mengunduh proposal docx secara langsung
app.get('/proposal', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'img', 'pdf', 'Proposal_Usaha.docx');
  res.download(filePath, 'Proposal_Usaha_HydroFresh.docx', (err) => {
    if (err) {
      console.error('Error saat download file:', err);
      res.status(404).send('File proposal tidak ditemukan di folder public/img/pdf/Proposal_Usaha.docx');
    }
  });
});

app.get('/', (req, res) => {
  const proposalData = {
    businessName: "HYDROFRESH",
    author: "Rian Radiansyah",
    classInfo: "XII RPL 3",
    contactWA: "6281234567890",
    modalAwal: 3500000,
    labaBersihBulan: 2500000,
    rincianModal: [
      { item: "Pipa PVC 3\" (4 batang)", subtotal: 800000 },
      { item: "Rak/Instalasi Hydroponik NFT 3 Tingkat", subtotal: 800000 },
      { item: "Perlengkapan Lain (selang, lem, sambungan)", subtotal: 400000 },
      { item: "Tandon Air Plastik 100 L", subtotal: 300000 },
      { item: "Gelas Ukur + pH Meter", subtotal: 300000 },
      { item: "Nutrisi AB Mix (5 paket)", subtotal: 250000 },
      { item: "Pompa Air Submersible", subtotal: 250000 },
      { item: "Netpot / Net Cup (300 pcs)", subtotal: 150000 },
      { item: "Benih Selada, Pakcoy, Kangkung", subtotal: 150000 },
      { item: "Rockwool (10 slab)", subtotal: 100000 }
    ],
    rincianOperasional: [
      { item: "Nutrisi AB Mix (Isi Ulang)", cost: 600000 },
      { item: "Benih Sayuran (Isi Ulang)", cost: 500000 },
      { item: "Listrik (Pompa & Penerangan)", cost: 300000 },
      { item: "Air", cost: 150000 },
      { item: "Kemasan / Tali Pengikat", cost: 200000 },
      { item: "Transportasi Pengantaran", cost: 400000 },
      { item: "Tenaga Bantu Panen & Packing", cost: 1000000 },
      { item: "Biaya Tak Terduga", cost: 350000 }
    ]
  };

  res.render('landing', { proposalData });
});

app.listen(PORT, () => {
  console.log(`Server HydroFresh berjalan di http://localhost:${PORT}`);
});