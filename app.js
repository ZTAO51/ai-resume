// DOM 元素
const jobTitleInput = document.getElementById('job-title');
const resumeInput = document.getElementById('resume');
const optimizeBtn = document.getElementById('optimize-btn');
const resultSection = document.getElementById('result-section');
const resultEl = document.getElementById('result');

// 显示结果
function showResult(text, isError = false) {
  resultSection.classList.add('visible');
  resultEl.textContent = text;
  resultEl.className = isError ? 'error' : '';
}

// 加载状态
function setLoading(isLoading) {
  optimizeBtn.disabled = isLoading;
  optimizeBtn.textContent = isLoading ? '优化中...' : '开始优化';
}

// 点击优化按钮
async function optimizeResume() {
  const jobTitle = jobTitleInput.value.trim();
  const resume = resumeInput.value.trim();

  if (!jobTitle) {
    showResult('请填写求职岗位', true);
    jobTitleInput.focus();
    return;
  }

  if (!resume) {
    showResult('请填写原始简历', true);
    resumeInput.focus();
    return;
  }

  setLoading(true);
  showResult('正在请求后端...');

  try {
    const response = await fetch('/api/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobTitle, resume })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '请求失败');
    }

    showResult(data.result);
  } catch (err) {
    showResult('请求出错：' + err.message, true);
  } finally {
    setLoading(false);
  }
}

// 绑定事件
optimizeBtn.addEventListener('click', optimizeResume);
