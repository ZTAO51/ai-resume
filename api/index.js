const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/ping', (req, res) => {
  res.send('pong');
});

// 简历优化接口 - 返回测试消息
app.post('/api/optimize', async (req, res) => {
  const { jobTitle, resume } = req.body;

  if (!jobTitle || !resume) {
    return res.status(400).json({ error: '请填写求职岗位和原始简历' });
  }

  // 暂时只返回测试消息，不调用 DeepSeek API
  res.json({
    result: '后端通了！这是测试返回'
  });
});

// Vercel 需要导出 app
module.exports = app;
