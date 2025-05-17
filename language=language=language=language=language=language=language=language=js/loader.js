// 页面加载状态
let pageLoaded = {
    first: false,
    second: false,
    third: false
};

// 初始化加载动画
function initLoading() {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loading-container';
    loadingContainer.innerHTML = '<div class="bouncer"><i class="fas fa-cube"></i></div>';
    document.body.appendChild(loadingContainer);
}

// 移除加载动画
function removeLoading() {
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        loadingContainer.remove();
    }
}

// 加载第一页
async function loadFirstPage() {
    if (!pageLoaded.first) {
        // 这里可以添加第一页的特定加载逻辑
        pageLoaded.first = true;
    }
}

// 加载第二页
async function loadSecondPage() {
    if (!pageLoaded.second) {
        // 这里可以添加第二页的特定加载逻辑
        pageLoaded.second = true;
    }
}

// 加载第三页
async function loadThirdPage() {
    if (!pageLoaded.third) {
        // 这里可以添加第三页的特定加载逻辑
        pageLoaded.third = true;
    }
}

// 初始化页面
async function initPage() {
    initLoading();
    await loadFirstPage();
    removeLoading();
}

// 监听页面切换
document.addEventListener('DOMContentLoaded', () => {
    initPage();

    // 监听 fullPage.js 的页面切换事件
    document.addEventListener('fullPage:afterLoad', (event) => {
        const currentPage = event.detail.destination.index + 1;
        
        switch(currentPage) {
            case 2:
                loadSecondPage();
                break;
            case 3:
                loadThirdPage();
                break;
        }
    });
});

// 监听翻页按钮点击
document.addEventListener('click', (event) => {
    if (event.target.matches('.fp-prev, .fp-next')) {
        const currentPage = document.querySelector('.fp-section.active').dataset.index;
        const nextPage = event.target.matches('.fp-next') ? 
            parseInt(currentPage) + 1 : 
            parseInt(currentPage) - 1;

        switch(nextPage) {
            case 1:
                loadFirstPage();
                break;
            case 2:
                loadSecondPage();
                break;
            case 3:
                loadThirdPage();
                break;
        }
    }
}); 