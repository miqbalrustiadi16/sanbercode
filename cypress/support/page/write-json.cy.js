const fs = require('fs');
const path = require('path');

// Data hasil simulasi dari proses login, forgot password, dan dashboard
const resultData = {
  login: {
    status: 'success',
    message: 'User successfully logged in',
    userId: 'user123',
    token: 'abcd1234xyz'
  },
  forgotPassword: {
    status: 'success',
    message: 'Password reset link sent to email'
  },
  dashboard: {
    status: 'success',
    message: 'Dashboard data retrieved',
    data: {
      user: 'user123',
      files: ['report1.pdf', 'image1.png'],
      notifications: 3
    }
  }
};

// Tentukan lokasi file write.json
const filePath = path.join(__dirname, 'write.json');

// Tulis data ke file JSON
fs.writeFile(filePath, JSON.stringify(resultData, null, 2), (err) => {
  if (err) {
    console.error('Gagal menulis file:', err);
  } else {
    console.log('Data berhasil ditulis ke write.json');
  }
});
