function showCustomAlert(message, isSuccess) {
    const alertBox = document.createElement('div');
    const icon = document.createElement('i');
    icon.className = isSuccess ? 'fa-regular fa-circle-check' : 'fa-regular fa-circle-xmark';
    icon.style.color = isSuccess ? 'green' : 'red';
    alertBox.appendChild(icon);

    const text = document.createTextNode(' ' + message);
    alertBox.appendChild(text);

    alertBox.style.position = 'fixed';
    alertBox.style.top = '50px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.zIndex = '1000';
    alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';

    if (document.body.classList.contains('dark-theme')) {
        alertBox.style.backgroundColor = '#000';
        alertBox.style.color = '#fff';
        alertBox.style.border = '1px solid #fff';
    } else {
        alertBox.style.backgroundColor = '#fff';
        alertBox.style.color = '#000';
        alertBox.style.border = '1px solid #5e72e4';
    }

    document.body.appendChild(alertBox);

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
            showCustomAlert('复制成功，快去加入吧！', true);
        }).catch(err => {
            showCustomAlert('复制失败，请检查权限！', false);
        });
    });
});
