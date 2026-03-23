const wheel = document.querySelector('.wheel');
const wheelCenter = document.querySelector('.wheel-center');
const wheelSections = document.querySelectorAll('.wheel-section');
const contentSections = document.querySelectorAll('.content-section');
let currentWheelIndex = 0;
let isRotating = false;

function rotateWheel(targetIndex) {
    if (isRotating) return;
    
    isRotating = true;
    wheel.classList.add('rotating');
    
    const angle = (targetIndex - currentWheelIndex) * 90;
    const currentRotation = getComputedStyle(wheel).getPropertyValue('--rotation') || 0;
    const newRotation = parseInt(currentRotation) + angle;
    
    wheel.style.setProperty('--rotation', newRotation);
    wheel.style.transform = `rotate(${newRotation}deg)`;
    
    setTimeout(() => {
        updateWheelContent(targetIndex);
        currentWheelIndex = targetIndex;
        wheel.classList.remove('rotating');
        isRotating = false;
    }, 500);
}

function updateWheelContent(index) {
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    contentSections.forEach(section => {
        if (parseInt(section.dataset.index) === index) {
            section.classList.add('active');
        }
    });
}

wheelCenter.addEventListener('click', () => {
    const nextIndex = (currentWheelIndex + 1) % 4;
    rotateWheel(nextIndex);
});

wheelSections.forEach((section, index) => {
    section.addEventListener('click', () => {
        rotateWheel(index);
    });
});

let wheel3dStates = [];

function updateWheel3D(wrapperIndex, currentIndex) {
    const wrappers = document.querySelectorAll('.wheel-3d-wrapper');
    const wrapper = wrappers[wrapperIndex];
    const items = wrapper.querySelectorAll('.wheel-3d-item');
    
    items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');
        
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === (currentIndex - 1 + items.length) % items.length) {
            item.classList.add('prev');
        } else if (index === (currentIndex + 1) % items.length) {
            item.classList.add('next');
        }
    });
}

function initWheel3D() {
    const wrappers = document.querySelectorAll('.wheel-3d-wrapper');
    wrappers.forEach((wrapper, index) => {
        const items = wrapper.querySelectorAll('.wheel-3d-item');
        wheel3dStates[index] = 0;
        updateWheel3D(index, 0);
    });
    
    document.querySelectorAll('.wheel-3d-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const wheelIndex = parseInt(this.dataset.wheel);
            const wrappers = document.querySelectorAll('.wheel-3d-wrapper');
            const items = wrappers[wheelIndex].querySelectorAll('.wheel-3d-item');
            const totalItems = items.length;
            
            if (this.classList.contains('wheel-3d-next')) {
                wheel3dStates[wheelIndex] = (wheel3dStates[wheelIndex] + 1) % totalItems;
            } else {
                wheel3dStates[wheelIndex] = (wheel3dStates[wheelIndex] - 1 + totalItems) % totalItems;
            }
            
            updateWheel3D(wheelIndex, wheel3dStates[wheelIndex]);
        });
    });
}

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    updateWheelContent(currentWheelIndex);
    initEditFunctionality();
});

function initEditFunctionality() {
    const editBtn = document.getElementById('edit-btn');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const saveBtn = document.getElementById('save-btn');
    const addHobbyBtn = document.getElementById('add-hobby');
    const addPhilosophyBtn = document.getElementById('add-philosophy');
    
    // 打开编辑模态框
    editBtn.addEventListener('click', function() {
        fillEditForm();
        editModal.classList.add('active');
    });
    
    // 关闭编辑模态框
    function closeEditModal() {
        editModal.classList.remove('active');
    }
    
    closeModal.addEventListener('click', closeEditModal);
    cancelBtn.addEventListener('click', closeEditModal);
    
    // 点击模态框外部关闭
    editModal.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
    
    // 填充编辑表单
    function fillEditForm() {
        const nameInput = document.getElementById('edit-name');
        const avatarInput = document.getElementById('edit-avatar');
        const statusInput = document.getElementById('edit-status');
        const schoolInput = document.getElementById('edit-school');
        const collegeInput = document.getElementById('edit-college');
        const majorInput = document.getElementById('edit-major');
        const degreeInput = document.getElementById('edit-degree');
        const emailInput = document.getElementById('edit-email');
        const phoneInput = document.getElementById('edit-phone');
        const wechatInput = document.getElementById('edit-wechat');
        
        nameInput.value = configData.basicInfo.name;
        avatarInput.value = configData.basicInfo.avatar;
        statusInput.value = configData.basicInfo.status;
        schoolInput.value = configData.basicInfo.school;
        collegeInput.value = configData.basicInfo.college;
        majorInput.value = configData.basicInfo.major;
        degreeInput.value = configData.basicInfo.degree;
        emailInput.value = configData.basicInfo.contact.email;
        phoneInput.value = configData.basicInfo.contact.phone;
        wechatInput.value = configData.basicInfo.contact.wechat;
        
        // 填充兴趣爱好
        const hobbiesContainer = document.getElementById('hobbies-container-edit');
        hobbiesContainer.innerHTML = '';
        configData.personalInfo.hobbies.forEach((hobby, index) => {
            const hobbyItem = document.createElement('div');
            hobbyItem.className = 'hobby-edit-item';
            hobbyItem.innerHTML = `
                <input type="text" class="form-control" placeholder="图标类名 (如 fa-code)" value="${hobby.icon}" data-index="${index}" data-field="icon">
                <input type="text" class="form-control" placeholder="爱好名称" value="${hobby.title}" data-index="${index}" data-field="title">
                <input type="text" class="form-control" placeholder="描述" value="${hobby.description}" data-index="${index}" data-field="description">
                <button type="button" class="remove-btn" data-type="hobby" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            hobbiesContainer.appendChild(hobbyItem);
        });
        
        // 填充个人理念
        const philosophyContainer = document.getElementById('philosophy-container-edit');
        philosophyContainer.innerHTML = '';
        configData.personalInfo.philosophy.forEach((phrase, index) => {
            const philosophyItem = document.createElement('div');
            philosophyItem.className = 'philosophy-edit-item';
            philosophyItem.innerHTML = `
                <input type="text" class="form-control" placeholder="个人理念" value="${phrase}" data-index="${index}">
                <button type="button" class="remove-btn" data-type="philosophy" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            philosophyContainer.appendChild(philosophyItem);
        });
        
        // 添加删除按钮事件
        addRemoveEventListeners();
    }
    
    // 添加删除按钮事件监听器
    function addRemoveEventListeners() {
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.dataset.type;
                const index = parseInt(this.dataset.index);
                
                if (type === 'hobby') {
                    configData.personalInfo.hobbies.splice(index, 1);
                } else if (type === 'philosophy') {
                    configData.personalInfo.philosophy.splice(index, 1);
                }
                
                fillEditForm();
            });
        });
    }
    
    // 添加爱好
    addHobbyBtn.addEventListener('click', function() {
        configData.personalInfo.hobbies.push({
            icon: 'fa-star',
            title: '新爱好',
            description: '请输入描述'
        });
        fillEditForm();
    });
    
    // 添加个人理念
    addPhilosophyBtn.addEventListener('click', function() {
        configData.personalInfo.philosophy.push('请输入个人理念');
        fillEditForm();
    });
    
    // 保存修改
    saveBtn.addEventListener('click', function() {
        // 保存基础信息
        configData.basicInfo.name = document.getElementById('edit-name').value;
        configData.basicInfo.avatar = document.getElementById('edit-avatar').value;
        configData.basicInfo.status = document.getElementById('edit-status').value;
        configData.basicInfo.school = document.getElementById('edit-school').value;
        configData.basicInfo.college = document.getElementById('edit-college').value;
        configData.basicInfo.major = document.getElementById('edit-major').value;
        configData.basicInfo.degree = document.getElementById('edit-degree').value;
        configData.basicInfo.contact.email = document.getElementById('edit-email').value;
        configData.basicInfo.contact.phone = document.getElementById('edit-phone').value;
        configData.basicInfo.contact.wechat = document.getElementById('edit-wechat').value;
        
        // 保存兴趣爱好
        configData.personalInfo.hobbies = [];
        document.querySelectorAll('.hobby-edit-item').forEach(item => {
            const icon = item.querySelector('input[data-field="icon"]').value;
            const title = item.querySelector('input[data-field="title"]').value;
            const description = item.querySelector('input[data-field="description"]').value;
            
            if (title) {
                configData.personalInfo.hobbies.push({
                    icon: icon || 'fa-star',
                    title: title,
                    description: description
                });
            }
        });
        
        // 保存个人理念
        configData.personalInfo.philosophy = [];
        document.querySelectorAll('.philosophy-edit-item input').forEach(input => {
            const value = input.value.trim();
            if (value) {
                configData.personalInfo.philosophy.push(value);
            }
        });
        
        // 更新页面显示
        updatePageDisplay();
        
        // 关闭模态框
        closeEditModal();
        
        // 显示保存成功提示
        showNotification('保存成功！');
    });
    
    // 更新页面显示
    function updatePageDisplay() {
        // 更新基础信息
        document.getElementById('name').textContent = configData.basicInfo.name;
        document.getElementById('avatar').src = configData.basicInfo.avatar;
        document.getElementById('status').textContent = configData.basicInfo.status;
        document.getElementById('school').textContent = configData.basicInfo.school;
        document.getElementById('college').textContent = configData.basicInfo.college;
        document.getElementById('major').textContent = configData.basicInfo.major;
        document.getElementById('degree').textContent = configData.basicInfo.degree;
        document.getElementById('email').textContent = configData.basicInfo.contact.email;
        document.getElementById('phone').textContent = configData.basicInfo.contact.phone;
        document.getElementById('wechat').textContent = configData.basicInfo.contact.wechat;
        
        // 更新兴趣爱好
        const hobbiesContainer = document.getElementById('hobbies-container');
        hobbiesContainer.innerHTML = '';
        configData.personalInfo.hobbies.forEach(hobby => {
            hobbiesContainer.innerHTML += `
                <div class="hobby-card">
                    <div class="hobby-icon">
                        <i class="fas ${hobby.icon}"></i>
                    </div>
                    <h4 class="hobby-title">${hobby.title}</h4>
                    <p class="hobby-description">${hobby.description}</p>
                </div>
            `;
        });
        
        // 更新个人理念
        const philosophyContainer = document.getElementById('philosophy-container');
        philosophyContainer.innerHTML = '';
        configData.personalInfo.philosophy.forEach(phrase => {
            philosophyContainer.innerHTML += `
                <div class="philosophy-item">
                    <div class="philosophy-icon">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <p class="philosophy-text">${phrase}</p>
                </div>
            `;
        });
    }
    
    // 显示通知
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 添加通知样式
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
        notification.style.zIndex = '1001';
        notification.style.animation = 'slideIn 0.3s ease';
        
        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 3秒后移除通知
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
                document.head.removeChild(style);
            }, 300);
        }, 3000);
    }
}