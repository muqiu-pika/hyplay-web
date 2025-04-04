// IP信息管理
const IPManager = {
    // 数据缓存
    cachedIpInfo: null,

    // 获取IP信息
    async fetchIPInfo() {
        if (this.cachedIpInfo) {
            this.updateIPInfo(this.cachedIpInfo);
            return this.cachedIpInfo;
        }

        try {
            const url = new URL('https://api.mir6.com/api/ip');
            url.searchParams.append('type', 'json');
            
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.data) {
                this.cachedIpInfo = {
                    ip: result.data.ip,
                    protocol: result.data.protocol || (result.data.ip.includes(':') ? 'IPv6' : 'IPv4'),
                    location: `${result.data.country} ${result.data.province} ${result.data.city} ${result.data.districts || ''}`
                };
                this.updateIPInfo(this.cachedIpInfo);
                return this.cachedIpInfo;
            } else {
                throw new Error('数据格式错误');
            }
        } catch (error) {
            console.error('获取IP信息失败:', error);
            return null;
        }
    },

    // 更新IP信息显示
    updateIPInfo(ipInfo) {
        const protocolMessage = document.querySelector('.protocol-message');
        const ipDetails = document.querySelector('.ip-details');
        
        if (!protocolMessage || !ipDetails) return;
        
        const isIPv6 = ipInfo.protocol === 'IPv6' || ipInfo.ip.includes(':');
        
        // 设置协议消息
        protocolMessage.innerHTML = isIPv6 
            ? '您已拥有IPv6，立即加入低延迟游玩Hyplay！'
            : '您可以加入，但推荐您<a href="https://b23.tv/2rbQ6Cb" target="_blank">参考视频</a>开启IPv6后游玩';
        
        // 设置IP详情
        ipDetails.innerHTML = `
            <div>IP地址 ${ipInfo.ip}</div>
            <div>您的位置 ${ipInfo.location.replace(/\s+/g, ' ')}</div>
        `;

        // 自适应字体大小
        this.adjustFontSize(protocolMessage, ipDetails);
    },

    // 调整字体大小
    adjustFontSize(protocolMessage, ipDetails) {
        let fontSize = 20;
        const minFontSize = 12;
        
        while (
            fontSize > minFontSize && 
            (protocolMessage.scrollWidth > window.innerWidth * 0.9 || 
             ipDetails.scrollWidth > window.innerWidth * 0.9)
        ) {
            fontSize--;
            protocolMessage.style.fontSize = `${fontSize}px`;
            ipDetails.style.fontSize = `${fontSize}px`;
        }
    },

    // 更新服务器信息
    updateServerInfo(ipInfo) {
        const javaIp = document.querySelector('.java-info .ip-text');
        const javaPort = document.querySelector('.java-info .port-text');
        const bedrockIp = document.querySelector('.bedrock-info .ip-text');
        const bedrockPort = document.querySelector('.bedrock-info .port-text');
        
        const isIPv6 = ipInfo.protocol === 'IPv6';
        
        javaIp.textContent = `IP: ${isIPv6 ? 'v6.mcapp.eu.org' : 'v4.mcapp.eu.org'}`;
        javaPort.textContent = `端口: ${isIPv6 ? '25565' : '25560'}`;
        bedrockIp.textContent = `IP: ${isIPv6 ? 'v6.mcapp.eu.org' : 'v4.mcapp.eu.org'}`;
        bedrockPort.textContent = `端口: ${isIPv6 ? '19132' : '19130'}`;
    }
};

function setServerAddresses(protocol) {
    const javaIpElement = document.querySelector('.java-info .ip-text');
    const javaPortElement = document.querySelector('.java-info .port-text');
    const bedrockIpElement = document.querySelector('.bedrock-info .ip-text');
    const bedrockPortElement = document.querySelector('.bedrock-info .port-text');

    if (protocol === 'IPv6') {
        javaIpElement.textContent = 'IP: v6.mcapp.eu.org';
        javaPortElement.textContent = '';
        bedrockIpElement.textContent = 'IP: v6.mcapp.eu.org';
        bedrockPortElement.textContent = '';
    } else if (protocol === 'IPv4') {
        javaIpElement.textContent = 'IP: v4.mcapp.eu.org';
        javaPortElement.textContent = ':25560';
        bedrockIpElement.textContent = 'IP: v4.mcapp.eu.org';
        bedrockPortElement.textContent = '';
    }
}

function getProtocol() {
    if (IPManager.cachedIpInfo) {
        return IPManager.cachedIpInfo.protocol;
    }
    // 默认返回IPv4
    return 'IPv4';
}

// 页面加载时初始化IP信息
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('开始获取IP信息...');
        IPManager.fetchIPInfo().then(ipInfo => {
            if (ipInfo) {
                IPManager.updateIPInfo(ipInfo);
                IPManager.updateServerInfo(ipInfo);
            }
        });
    }, 1000);

    const protocol = getProtocol();
    setServerAddresses(protocol);
}); 