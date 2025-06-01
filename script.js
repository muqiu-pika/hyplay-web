function calculateScaleFactor(element) {
  const parent = element.parentElement;
  const parentRect = parent.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  
  // 计算水平和垂直方向的缩放比例
  const scaleX = (parentRect.width * 0.9) / elementRect.width; // 留出10%的边距
  const scaleY = (parentRect.height * 0.9) / elementRect.height; // 留出10%的边距
  
  // 使用较小的缩放比例，确保内容完全显示
  return Math.min(scaleX, scaleY, 1); // 不超过原始大小
}

function updatePageScale() {
  const pages = document.querySelectorAll('.page[data-page="2"], .page[data-page="3"], .page[data-page="4"]');
  
  pages.forEach(page => {
    const content = page.querySelector('.page-content');
    if (content) {
      const scale = calculateScaleFactor(content);
      content.style.setProperty('--scale-factor', scale);
    }
  });
}

// 监听窗口大小变化
window.addEventListener('resize', debounce(updatePageScale, 250));

// 页面加载完成后初始化缩放
document.addEventListener('DOMContentLoaded', () => {
  updatePageScale();
});

// 修改翻页函数
function goToPage(pageNumber) {
  const currentPage = document.querySelector('.page.active');
  const targetPage = document.querySelector(`.page[data-page="${pageNumber}"]`);
  
  if (currentPage && targetPage) {
    currentPage.classList.remove('active');
    targetPage.classList.add('active');
    
    // 确保目标页面内容完整显示
    updatePageScale();
  }
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 