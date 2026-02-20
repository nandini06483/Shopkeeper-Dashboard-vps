// Initialize Chart
let salesChart;

// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('themeIcon').className = 'fas fa-sun';
    }
    initializeChart();
});

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

// Page Navigation
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageName + 'Page').classList.add('active');
    
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
}

// Authentication Flow
function sendOTP() {
    const mobile = document.getElementById('mobileNumber').value;
    if (mobile.length === 10) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('otpSection').style.display = 'block';
        showToast('OTP sent to ' + mobile, 'success');
    } else {
        showToast('Please enter a valid mobile number', 'error');
    }
}

function moveToNext(input, index) {
    if (input.value.length === 1) {
        const inputs = document.querySelectorAll('.otp-input');
        if (index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    }
}

function verifyOTP() {
    const otpInputs = document.querySelectorAll('.otp-input');
    let otp = '';
    otpInputs.forEach(input => otp += input.value);
    
    if (otp.length === 6) {
        document.getElementById('otpSection').style.display = 'none';
        document.getElementById('shopDetailsSection').style.display = 'block';
        showToast('OTP verified successfully!', 'success');
    } else {
        showToast('Please enter complete OTP', 'error');
    }
}

function completeSignup() {
    const shopName = document.getElementById('shopName').value;
    if (shopName) {
        document.getElementById('shopNameDisplay').textContent = shopName;
        document.getElementById('settingsShopName').textContent = shopName;
        document.getElementById('authPage').style.display = 'none';
        document.getElementById('dashboardContainer').classList.add('active');
        showToast('Welcome to Vyapar Setu!', 'success');
    } else {
        showToast('Please fill all details', 'error');
    }
}

function logout() {
    document.getElementById('dashboardContainer').classList.remove('active');
    document.getElementById('authPage').style.display = 'flex';
    showToast('Logged out successfully', 'success');
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toast.className = 'toast ' + type;
    toastMessage.textContent = message;
    
    // Update icon based on type
    const icon = toast.querySelector('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
    } else if (type === 'warning') {
        icon.className = 'fas fa-exclamation-triangle';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Product Management
function addProduct(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    showToast(`${productName} added successfully!`, 'success');
    event.target.reset();
}

function editProduct(id) {
    showToast('Edit product functionality', 'warning');
}

function deleteProduct(id) {
    showToast('Product deleted successfully', 'success');
}

function showAddProductModal() {
    showPage('products');
    document.getElementById('productName').focus();
}

// Order Management
function updateOrderStatus(orderId, status) {
    const statusMap = {
        'confirmed': 'Order confirmed',
        'delivered': 'Order marked as delivered',
        'cancelled': 'Order cancelled'
    };
    showToast(statusMap[status] || 'Status updated', 'success');
}

function searchOrders(query) {
    // Implement search functionality
    console.log('Searching orders:', query);
}

function searchProducts(query) {
    // Implement search functionality
    console.log('Searching products:', query);
}

// Chart Initialization
function initializeChart() {
    const ctx = document.getElementById('salesChart');
    if (ctx) {
        salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Sales (₹)',
                    data: [8500, 9200, 7800, 10500, 12450, 11200, 9800],
                    borderColor: '#FFA726',
                    backgroundColor: 'rgba(255, 167, 38, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value;
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateChart(period) {
    // Update chart based on period
    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update chart data based on period
    let labels, data;
    if (period === 'daily') {
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [8500, 9200, 7800, 10500, 12450, 11200, 9800];
    } else if (period === 'weekly') {
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = [45000, 52000, 48000, 58000];
    } else {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        data = [180000, 195000, 210000, 205000, 225000, 240000];
    }
    
    salesChart.data.labels = labels;
    salesChart.data.datasets[0].data = data;
    salesChart.update();
}

// Settings Functions
function editShopInfo() {
    const newName = prompt('Enter new shop name:', document.getElementById('settingsShopName').textContent);
    if (newName) {
        document.getElementById('settingsShopName').textContent = newName;
        document.getElementById('shopNameDisplay').textContent = newName;
        showToast('Shop name updated', 'success');
    }
}

function editMobile() {
    const newMobile = prompt('Enter new mobile number:', document.getElementById('settingsMobile').textContent);
    if (newMobile) {
        document.getElementById('settingsMobile').textContent = newMobile;
        showToast('Mobile number updated', 'success');
    }
}

function editLocation() {
    const newLocation = prompt('Enter new location:', document.getElementById('settingsLocation').textContent);
    if (newLocation) {
        document.getElementById('settingsLocation').textContent = newLocation;
        showToast('Location updated', 'success');
    }
}

function exportData() {
    showToast('Exporting data... This may take a moment', 'success');
    setTimeout(() => {
        showToast('Data exported successfully!', 'success');
    }, 2000);
}

function deleteAccount() {
    showToast('Account deletion requested', 'warning');
}

function showNotifications() {
    showToast('You have 3 new orders', 'success');
}

// Mobile Menu Toggle
if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('active');
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
});
