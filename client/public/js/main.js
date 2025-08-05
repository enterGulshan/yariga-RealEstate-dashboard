// YARIGA Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 YARIGA Dashboard loaded successfully!');
    
    // Mobile sidebar toggle functionality
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Create mobile toggle button
    if (window.innerWidth <= 992) {
        createMobileToggle();
    }
    
    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    function createMobileToggle() {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-light sidebar-toggle';
        toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
        toggleBtn.onclick = toggleSidebar;
        document.body.appendChild(toggleBtn);
    }
    
    function toggleSidebar() {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    }
    
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        }
    });
    
    // Auto-hide success/error messages after 5 seconds
    const messages = document.querySelectorAll('.msg');
    messages.forEach(msg => {
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 300);
        }, 5000);
    });
    
    // Add loading state to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading me-2"></span>Loading...';
                
                // Re-enable button after 3 seconds as fallback
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 3000);
            }
        });
    });
    
    // Property cards hover effects
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchValue = this.value;
                if (searchValue.length > 2 || searchValue.length === 0) {
                    // Trigger search
                    const currentUrl = new URL(window.location);
                    currentUrl.searchParams.set('search', searchValue);
                    currentUrl.searchParams.set('page', '1');
                    window.location.href = currentUrl.toString();
                }
            }, 500);
        });
    }
    
    // Smooth scroll for page transitions
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add fade out effect
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 200);
        });
    });
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});
