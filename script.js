document.addEventListener('DOMContentLoaded', function() {
    
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const currentDate = new Date(2025, 9, 5); 
    
    const monthMap = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    function parseCourseDate(dateString) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = monthMap[parts[1]];
            const year = parseInt('20' + parts[2], 10);
            if (!isNaN(day) && month !== undefined && !isNaN(year)) {
                return new Date(year, month, day);
            }
        }
        return null;
    }

    const tablesToProcess = ['#schedule', '#lab', '#activity'];
    tablesToProcess.forEach(tableId => {
        const table = document.querySelector(tableId);
        if (table) {
            const rows = table.querySelectorAll('tbody tr');
            const dateCellIndex = (tableId === '#activity') ? 3 : 1;

            rows.forEach(row => {
                if (row.cells.length > dateCellIndex) {
                    const cell = row.cells[dateCellIndex];
                    const dateText = cell.textContent.split('@')[0].trim();
                    const rowDate = parseCourseDate(dateText);
                    
                    if (rowDate && rowDate < currentDate) {
                        row.classList.add('completed');
                    }
                }
            });
        }
    });
});