function showCustomAlert(message) {
    // 创建提示框元素
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50px'; // 顶栏正下方
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.backgroundColor = '#333';
    alertBox.style.color = '#fff';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.zIndex = '1000';
    alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    
    document.body.appendChild(alertBox);

    // 3秒后自动移除提示框
    setTimeout(() => {
        document.body.removeChild(alertBox);
    }, 3000);
}

document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', function() {
        const versionContainer = this.closest('.version-container');
        const protocol = getProtocol(); // 假设这个函数返回'IPv4'或'IPv6'
        let fullAddress = '';

        if (protocol === 'IPv6') {
            fullAddress = 'v6.mcapp.eu.org';
        } else if (protocol === 'IPv4') {
            if (versionContainer.querySelector('.java-info')) {
                fullAddress = 'v4.mcapp.eu.org:25560';
            } else if (versionContainer.querySelector('.bedrock-info')) {
                fullAddress = 'v4.mcapp.eu.org';
            }
        }

        navigator.clipboard.writeText(fullAddress).then(() => {
            showCustomAlert('地址已复制到剪贴板');
        }).catch(err => {
            console.error('复制失败: ', err);
        });
    });
});
