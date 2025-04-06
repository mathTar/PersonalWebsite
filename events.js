document.addEventListener("DOMContentLoaded", function() {
    const page = document.title.split(' - ')[0];
    
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href.startsWith('javascript:')) {
                console.log(`Link clicked: ${this.textContent.trim()} -> ${this.href}`);
            }
        });
    });

    function logEvent(eventType, element) {
        const timestamp = new Date().toISOString();
        const eventObject = element.tagName.toLowerCase();
        console.log(`${timestamp}, ${eventType}, ${eventObject}`);
    }

    document.body.addEventListener("click", function(event) {
        logEvent("click", event.target);
    });

    const elements = document.querySelectorAll("section, header, footer");
    elements.forEach(element => {
        element.addEventListener("mouseenter", function() {
            logEvent("view", element);
        });
    });

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('modal-close')[0];
    
    document.querySelectorAll('.photo-space img').forEach(img => {
        img.addEventListener('click', function(e) {
            logEvent('click', e.target);
            modal.style.display = 'flex';
            modalImg.src = this.src;
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});
