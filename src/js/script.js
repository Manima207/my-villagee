// JavaScript for filtering former players by role

document.addEventListener('DOMContentLoaded', function() {
    // Year filter for festivals
    const yearButtons = document.querySelectorAll('.year-filter-btn');
    if (yearButtons.length > 0) {
        yearButtons.forEach(button => {
            button.addEventListener('click', function() {
                const year = this.getAttribute('data-year');
                
                // Remove active class from all buttons
                yearButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show/hide festival sections based on year
                const festivalSections = document.querySelectorAll('.festival-section');
                festivalSections.forEach(section => {
                    if (year === 'all' || section.getAttribute('data-year') === year) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Filter for former players
    const playerFilterButtons = document.querySelectorAll('.player-filter-btn');
    if (playerFilterButtons.length > 0) {
        playerFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const role = this.getAttribute('data-role');
                
                // Remove active class from all buttons
                playerFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show/hide player cards based on role
                const playerCards = document.querySelectorAll('.former-player-card');
                playerCards.forEach(card => {
                    if (role === 'all' || card.getAttribute('data-role').toLowerCase() === role.toLowerCase()) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 