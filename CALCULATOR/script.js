const calculatorTable = document.getElementById('calculator');
calculatorTable.addEventListener('click', (event) => {
    const clickedCell = event.target.closest('.numberbcolor');
    if (!clickedCell) return;
    const numberValue = clickedCell.textContent;
});

document.addEventListener('DOMContentLoaded', () => {
    const calculatorTable = document.getElementById('calculator')
    const result = document.getElementById('result');

    calculatorTable.addEventListener('click', (event) => {
        const clickedCell = event.target.closest('.numberbcolor');
        if (!clickedCell) return;

        const numberValue = clickedCell.textContent.trim();

        if (result.textContent == 0) {
            result.textContent = numberValue;
        } else {
            result.textContent += numberValue;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const calculatorTable = document.getElementById('calculator');
    // İsmini 'result' yerine 'display' yaptık ki hesaplama sonucu olan 'result' ile karışmasın
    const display = document.getElementById('result'); 

    if (!calculatorTable || !display) {
        console.error("404");
        return;
    }

    let currentExpression = "";

    calculatorTable.addEventListener('click', (event) => {
        const cell = event.target.closest('td');
        // Eğer hücre yoksa veya en üstteki ekran hücremizse tıklamayı görmezden gel
        if (!cell || cell.id === 'result') return;

        const value = cell.textContent.trim();

        if (value === 'C') {
            currentExpression = "";
            display.textContent = "0";
        }
        else if (value === '=') {
            if (currentExpression === "") return;

            try {
                if (currentExpression.includes('/0')) {
                    display.textContent = 'Error';
                    currentExpression = "";
                    return;
                }

                // Hesaplamayı yapıp doğrudan 'result' isimli sayısal değişkene aktarıyoruz
                const result = eval(currentExpression);
                
                // Ekrana yazdırıyoruz
                display.textContent = result;
                
                // Hafızayı güncelliyoruz
                currentExpression = result.toString();
            } catch (error) {
                display.textContent = "Error";
                currentExpression = "";
            }
        }
        else {
            if (value === '=') return;
            
            if (display.textContent === '0' && !isNaN(value)) {
                currentExpression = value;
            } else {
                currentExpression += value;
            }
            display.textContent = currentExpression;
        }
    });
});