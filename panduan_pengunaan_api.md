### Panduan Penggunaan API dengan Contoh Menggunakan Axios

#### Pendahuluan

Panduan ini akan membantu Anda dalam menggunakan API yang telah dibuat dengan menggunakan Axios. API ini terdiri dari beberapa endpoint yang mengelola data admin, guru, kelas, jadwal mapel, mapel, dan siswa.

pertama buka folder di cmd/terminal dan ketik kode dibawah:

```
npm i
npm i -g nodemon
```

untuk menjalankan api gunakan perintah dibawah:

```
npm run start
```

#### Struktur Endpoint

1. **Admin**

   - **POST /admin/**
     - Membuat admin baru.
     - Body: `{ "nama": "string", "email": "string", "password": "string" }`
   - **GET /admin/**
     - Mendapatkan semua admin.
   - **GET /admin/:id**
     - Mendapatkan admin berdasarkan ID.
   - **PUT /admin/:id**
     - Mengupdate admin berdasarkan ID.
     - Body: `{ "nama": "string", "email": "string", "password": "string" }`
   - **DELETE /admin/:id**
     - Menghapus admin berdasarkan ID.
   - **POST /admin/login**
     - Login admin.
     - Body: `{ "email": "string", "password": "string" }`

2. **Guru**

   - **POST /guru/**
     - Membuat guru baru.
     - Body: `{ "nama": "string", "email": "string", "password": "string" }`
   - **GET /guru/**
     - Mendapatkan semua guru.
   - **GET /guru/:id**
     - Mendapatkan guru berdasarkan ID.
   - **PUT /guru/:id**
     - Mengupdate guru berdasarkan ID.
     - Body: `{ "nama": "string", "email": "string", "password": "string" }`
   - **DELETE /guru/:id**
     - Menghapus guru berdasarkan ID.
   - **POST /guru/login**
     - Login guru.
     - Body: `{ "email": "string", "password": "string" }`

3. **Kelas**

   - **POST /kelas/create**
     - Membuat kelas baru.
     - Body: `{ "id_guru": "string", "nama_kelas": "string" }`
   - **GET /kelas/**
     - Mendapatkan semua kelas.
   - **GET /kelas/:id**
     - Mendapatkan kelas berdasarkan ID.
   - **GET /kelas/guru/:guruId**
     - Mendapatkan kelas berdasarkan ID guru.
   - **PUT /kelas/:id**
     - Mengupdate kelas berdasarkan ID.
     - Body: `{ "id_guru": "string", "nama_kelas": "string" }`
   - **DELETE /kelas/:id**
     - Menghapus kelas berdasarkan ID.

4. **Jadwal Mapel**

   - **POST /jadwalMapel/create**
     - Membuat jadwal mapel baru.
     - Body: `{ "id_guru": "string", "id_kelas": "string", "id_mapel": "string", "jam_mulai": "string", "jam_berahir": "string" }`
   - **GET /jadwalMapel/**
     - Mendapatkan semua jadwal mapel.
   - **GET /jadwalMapel/:id**
     - Mendapatkan jadwal mapel berdasarkan ID.
   - **GET /jadwalMapel/guru/:guruId**
     - Mendapatkan jadwal mapel berdasarkan ID guru.
   - **GET /jadwalMapel/kelas/:kelasId**
     - Mendapatkan jadwal mapel berdasarkan ID kelas.
   - **GET /jadwalMapel/mapel/:mapelId**
     - Mendapatkan jadwal mapel berdasarkan ID mapel.
   - **PUT /jadwalMapel/:id**
     - Mengupdate jadwal mapel berdasarkan ID.
     - Body: `{ "id_guru": "string", "id_kelas": "string", "id_mapel": "string", "jam_mulai": "string", "jam_berahir": "string" }`
   - **DELETE /jadwalMapel/:id**
     - Menghapus jadwal mapel berdasarkan ID.

5. **Mapel**

   - **POST /mapel/create**
     - Membuat mapel baru.
     - Body: `{ "nama_mapel": "string" }`
   - **GET /mapel/**
     - Mendapatkan semua mapel.
   - **GET /mapel/:id**
     - Mendapatkan mapel berdasarkan ID.
   - **PUT /mapel/:id**
     - Mengupdate mapel berdasarkan ID.
     - Body: `{ "nama_mapel": "string" }`
   - **DELETE /mapel/:id**
     - Menghapus mapel berdasarkan ID.

6. **Siswa**
   - **POST /siswa/create**
     - Membuat siswa baru.
     - Body: `{ "id_kelas": "string", "nisn": "string", "nama": "string", "jk": "boolean", "alamat": "string", "tg_masuk": "string", "tg_lahir": "string" }`
   - **GET /siswa/**
     - Mendapatkan semua siswa.
   - **GET /siswa/:id**
     - Mendapatkan siswa berdasarkan ID.
   - **GET /siswa/nisn/:nisn**
     - Mendapatkan siswa berdasarkan NISN.
   - **GET /siswa/token/:token**
     - Mendapatkan siswa berdasarkan token.
   - **GET /siswa/kelas/:kelasId**
     - Mendapatkan siswa berdasarkan ID kelas.
   - **PUT /siswa/:id**
     - Mengupdate siswa berdasarkan ID.
     - Body: `{ "id_kelas": "string", "nisn": "string", "nama": "string", "jk": "boolean", "alamat": "string", "tg_masuk": "string", "tg_lahir": "string" }`
   - **DELETE /siswa/:id**
     - Menghapus siswa berdasarkan ID.

### Contoh Penggunaan API dengan Axios

#### Admin

1. **Membuat Admin Baru**

   ```javascript
   const axios = require("axios");

   axios
     .post(
       "http://localhost:3000/admin/",
       {
         nama: "Admin",
         email: "admin@example.com",
         password: "password",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

2. **Mendapatkan Semua Admin**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/admin/", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

3. **Mendapatkan Admin Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/admin/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

4. **Mengupdate Admin Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .put(
       "http://localhost:3000/admin/{id}",
       {
         nama: "Admin Updated",
         email: "admin@example.com",
         password: "newpassword",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

5. **Menghapus Admin Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .delete("http://localhost:3000/admin/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

6. **Login Admin**

   ```javascript
   const axios = require("axios");

   axios
     .post("http://localhost:3000/admin/login", {
       email: "admin@example.com",
       password: "password",
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

#### Guru

1. **Membuat Guru Baru**

   ```javascript
   const axios = require("axios");

   axios
     .post(
       "http://localhost:3000/guru/",
       {
         nama: "Guru",
         email: "guru@example.com",
         password: "password",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

2. **Mendapatkan Semua Guru**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/guru/", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

3. **Mendapatkan Guru Berdasarkan ID**

   ```javascript
   const axios = require('axios');

   axios.get('http://localhost:3000/guru/{id}', {
     headers: { Authorization: 'Bearer <token>' }
   })
   .then(response =>
   ```

{
console.log(response.data);
})
.catch(error => {
console.log(error);
});

````

4. **Mengupdate Guru Berdasarkan ID**
```javascript
const axios = require('axios');

axios.put('http://localhost:3000/guru/{id}', {
  nama: 'Guru Updated',
  email: 'guru@example.com',
  password: 'newpassword'
}, {
  headers: { Authorization: 'Bearer <token>' }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});
````

5. **Menghapus Guru Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .delete("http://localhost:3000/guru/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

6. **Login Guru**

   ```javascript
   const axios = require("axios");

   axios
     .post("http://localhost:3000/guru/login", {
       email: "guru@example.com",
       password: "password",
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

#### Kelas

1. **Membuat Kelas Baru**

   ```javascript
   const axios = require("axios");

   axios
     .post(
       "http://localhost:3000/kelas/create",
       {
         id_guru: "guruId",
         nama_kelas: "Kelas 1",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

2. **Mendapatkan Semua Kelas**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/kelas/", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

3. **Mendapatkan Kelas Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/kelas/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

4. **Mendapatkan Kelas Berdasarkan ID Guru**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/kelas/guru/{guruId}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

5. **Mengupdate Kelas Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .put(
       "http://localhost:3000/kelas/{id}",
       {
         id_guru: "guruId",
         nama_kelas: "Kelas 1 Updated",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

6. **Menghapus Kelas Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .delete("http://localhost:3000/kelas/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

#### Jadwal Mapel

1. **Membuat Jadwal Mapel Baru**

   ```javascript
   const axios = require("axios");

   axios
     .post(
       "http://localhost:3000/jadwalMapel/create",
       {
         id_guru: "guruId",
         id_kelas: "kelasId",
         id_mapel: "mapelId",
         jam_mulai: "08:00",
         jam_berahir: "10:00",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

2. **Mendapatkan Semua Jadwal Mapel**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/jadwalMapel/", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

3. **Mendapatkan Jadwal Mapel Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/jadwalMapel/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

4. **Mendapatkan Jadwal Mapel Berdasarkan ID Guru**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/jadwalMapel/guru/{guruId}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

5. **Mendapatkan Jadwal Mapel Berdasarkan ID Kelas**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/jadwalMapel/kelas/{kelasId}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

6. **Mendapatkan Jadwal Mapel Berdasarkan ID Mapel**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/jadwalMapel/mapel/{mapelId}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

7. **Mengupdate Jadwal Mapel Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .put(
       "http://localhost:3000/jadwalMapel/{id}",
       {
         id_guru: "guruId",
         id_kelas: "kelasId",
         id_mapel: "mapelId",
         jam_mulai: "08:00",
         jam_berahir: "10:00",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

8. **Menghapus Jadwal Mapel Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .delete("http://localhost:3000/jadwalMapel/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

#### Mapel

1. **Membuat Mapel Baru**

   ```javascript
   const axios = require("axios");

   axios
     .post(
       "http://localhost:3000/mapel/create",
       {
         nama_mapel: "Matematika",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

2. **Mendapatkan Semua Mapel**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/mapel/", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

3. **Mendapatkan Mapel Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/mapel/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

4. **Mengupdate Mapel Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .put(
       "http://localhost:3000/mapel/{id}",
       {
         nama_mapel: "Fisika",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

5. \*\*Menghapus Mapel Berdasarkan ID

\*\*

```javascript
const axios = require("axios");

axios
  .delete("http://localhost:3000/mapel/{id}", {
    headers: { Authorization: "Bearer <token>" },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
```

#### Siswa

1. **Membuat Siswa Baru**

   ```javascript
   const axios = require("axios");

   axios
     .post(
       "http://localhost:3000/siswa/create",
       {
         id_kelas: "kelasId",
         nisn: "123456789",
         nama: "Siswa",
         jk: true,
         alamat: "Jl. Contoh No. 1",
         tg_masuk: "2022-01-01",
         tg_lahir: "2010-01-01",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

2. **Mendapatkan Semua Siswa**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/siswa/", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

3. **Mendapatkan Siswa Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/siswa/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

4. **Mendapatkan Siswa Berdasarkan NISN**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/siswa/nisn/{nisn}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

5. **Mendapatkan Siswa Berdasarkan Token**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/siswa/token/{token}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

6. **Mendapatkan Siswa Berdasarkan ID Kelas**

   ```javascript
   const axios = require("axios");

   axios
     .get("http://localhost:3000/siswa/kelas/{kelasId}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

7. **Mengupdate Siswa Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .put(
       "http://localhost:3000/siswa/{id}",
       {
         id_kelas: "kelasId",
         nisn: "123456789",
         nama: "Siswa Updated",
         jk: true,
         alamat: "Jl. Contoh No. 1",
         tg_masuk: "2022-01-01",
         tg_lahir: "2010-01-01",
       },
       {
         headers: { Authorization: "Bearer <token>" },
       }
     )
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

8. **Menghapus Siswa Berdasarkan ID**

   ```javascript
   const axios = require("axios");

   axios
     .delete("http://localhost:3000/siswa/{id}", {
       headers: { Authorization: "Bearer <token>" },
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
   ```

### Penutup

Panduan ini mencakup penggunaan dasar dari API yang telah dibuat dengan menggunakan Axios. Pastikan Anda menyesuaikan URL dan parameter sesuai dengan kebutuhan Anda saat menggunakan API ini.
