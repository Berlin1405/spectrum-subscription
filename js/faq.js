document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Add animation delay for each item
    faqItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items with smooth animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});