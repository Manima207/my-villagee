// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image gallery modal functionality
    const festivalImages = document.querySelectorAll('.festival-archive-img img');
    festivalImages.forEach(image => {
        image.addEventListener('click', function() {
            // Create modal elements
            const modal = document.createElement('div');
            modal.className = 'festival-image-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'festival-modal-content';
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'festival-modal-close';
            closeBtn.innerHTML = '&times;';
            
            const modalImage = document.createElement('img');
            modalImage.src = this.src;
            
            const caption = document.createElement('div');
            caption.className = 'festival-modal-caption';
            caption.textContent = this.alt;
            
            // Add elements to the DOM
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalImage);
            modalContent.appendChild(caption);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Close modal when clicking the close button
            closeBtn.addEventListener('click', function() {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
            
            // Close modal when clicking outside the image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        });
    });
    
    // Festival year filter
    const filterButtons = document.querySelectorAll('.festival-filter-btn');
    const festivalSections = document.querySelectorAll('.festival-year-section');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.dataset.year;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide festival sections based on selection
            if (year === 'all') {
                festivalSections.forEach(section => {
                    section.style.display = 'block';
                    setTimeout(() => {
                        section.style.opacity = '1';
                    }, 50);
                });
            } else {
                festivalSections.forEach(section => {
                    if (section.dataset.year === year) {
                        section.style.display = 'block';
                        setTimeout(() => {
                            section.style.opacity = '1';
                        }, 50);
                    } else {
                        section.style.opacity = '0';
                        setTimeout(() => {
                            section.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    });
}); 