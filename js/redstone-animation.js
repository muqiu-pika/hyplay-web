// 红石灯和拉杆动画管理
document.addEventListener('DOMContentLoaded', () => {
    const lever = document.querySelector('.lever');
    const redstoneDust = document.querySelector('.redstone-dust');
    const redstoneLamp = document.querySelector('.redstone-lamp');
    let leverOn = false;

    // 初始化拉杆和红石灯状态
    if (redstoneLamp.classList.contains('active')) {
        lever.classList.add('active');
    } else {
        lever.classList.remove('active');
    }

    // 拉杆点击事件
    lever.addEventListener('click', () => {
        leverOn = !leverOn;
        
        // 更新拉杆状态
        lever.classList.toggle('active');
        
        // 更新红石粉状态
        redstoneDust.classList.toggle('active');
        
        // 更新红石灯状态
        redstoneLamp.classList.toggle('active');
    });
});

// 切换拉杆状态
function toggleLever() {
    const lever = document.querySelector('.lever');
    const redstoneLamp = document.querySelector('.redstone-lamp');
    const vibration = document.querySelector('.vibration-container');
    const sensorVibration = document.querySelector('.sensor-vibration-container');
    
    // 切换拉杆状态
    lever.classList.add('active');
    
    // 显示振动动画并旋转180度
    vibration.style.transform = 'rotate(180deg)';
    sensorVibration.style.transform = 'translateX(-50%) rotate(180deg)';
    vibration.style.display = 'block';
    sensorVibration.style.display = 'block';
    
    // 200ms后显示传感器动画
    setTimeout(() => {
        sensorVibration.style.display = 'block';
    }, 200);

    // 200ms后切换红石灯状态
    setTimeout(() => {
        redstoneLamp.classList.add('active');
    }, 200);

    // 500ms后隐藏振动动画
    setTimeout(() => {
        vibration.style.opacity = '0';
        sensorVibration.style.opacity = '0';
        setTimeout(() => {
            vibration.style.display = 'none';
            sensorVibration.style.display = 'none';
            vibration.style.opacity = '1';
            sensorVibration.style.opacity = '1';
        }, 300);
    }, 500);
} 