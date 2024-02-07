const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();

// json-server 설정
const jsonServerMiddleware = jsonServer.create();
const jsonServerRouter = jsonServer.router(path.join(__dirname, 'R1-Json-server', 'db.json'));
const jsonServerMiddlewares = jsonServer.defaults();

app.use('/api', jsonServerMiddlewares, jsonServerRouter);

// 정적 파일 제공 (Vue 앱의 빌드 파일을 포함)
app.use(express.static(path.join(__dirname, 'R4-VUETI', 'docs')));

// 기본 경로를 index.html로 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'R4-VUETI', 'docs', 'index.html'));
});

// Fly.io에서는 exports 대신 직접 listen을 사용하여 포트를 지정해야 함
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

