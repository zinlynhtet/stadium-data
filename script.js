let generatedData = [];

// Stadium capacity allocation
const stadiumCapacity = {
    'VVIP': 20000,
    'VIP': 40000,
    'Standard': 38000,
    'Kids': 2000
};

// Stadium management specific data generators
const dataGenerators = {
    saledate: () => {
        const currentYear = new Date().getFullYear();
        const seasonStart = new Date(currentYear, 7, 1);
        const seasonEnd = new Date(currentYear + 1, 4, 31);

        const randomTime = seasonStart.getTime() + Math.random() * (seasonEnd.getTime() - seasonStart.getTime());
        const randomDate = new Date(randomTime);

        return randomDate.toLocaleDateString('en-GB');
    },

    ticketprice: (ticketType) => {
        const basePrices = {
            'VVIP': 250,
            'VIP': 150,
            'Standard': 75,
            'Kids': 35
        };

        const basePrice = basePrices[ticketType];
        const variation = (Math.random() - 0.5) * 0.6;
        const finalPrice = Math.round(basePrice * (1 + variation));

        return `€${finalPrice}`;
    },

    totalseatssold: (ticketType) => {
        const maxCapacity = stadiumCapacity[ticketType];
        const soldPercentage = 0.6 + (Math.random() * 0.35);
        const seatsSold = Math.floor(maxCapacity * soldPercentage);

        return seatsSold.toLocaleString();
    },

    remainingseats: (ticketType, seatsSold) => {
        const maxCapacity = stadiumCapacity[ticketType];
        const remaining = maxCapacity - parseInt(seatsSold.replace(/,/g, ''));

        return remaining.toLocaleString();
    },

    totalticketssales: (ticketType, ticketPrice, seatsSold) => {
        const price = parseInt(ticketPrice.replace('€', ''));
        const seats = parseInt(seatsSold.replace(/,/g, ''));
        const totalSales = price * seats;

        return `€${totalSales.toLocaleString()}`;
    },

    // Jersey sales with unit pricing
    jerseyunitprice: () => {
        const jerseyPrices = [70, 75, 80, 85, 90];
        const price = jerseyPrices[Math.floor(Math.random() * jerseyPrices.length)];
        return `€${price}`;
    },

    jerseyssold: (ticketType) => {
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 800; break;
            case 'VIP': baseQuantity = 1200; break;
            case 'Standard': baseQuantity = 600; break;
            case 'Kids': baseQuantity = 200; break;
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.5));
        return quantity.toLocaleString();
    },

    jerseysales: (unitPrice, quantitySold) => {
        const price = parseInt(unitPrice.replace('€', ''));
        const quantity = parseInt(quantitySold.replace(/,/g, ''));
        const total = price * quantity;
        return `€${total.toLocaleString()}`;
    },

    // Scarf sales with unit pricing
    scarfunitprice: () => {
        const price = 14 + Math.floor(Math.random() * 4); // €14-17
        return `€${price}`;
    },

    scarfssold: (ticketType) => {
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 400; break;
            case 'VIP': baseQuantity = 800; break;
            case 'Standard': baseQuantity = 1200; break;
            case 'Kids': baseQuantity = 300; break;
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.6));
        return quantity.toLocaleString();
    },

    teamscarfsales: (unitPrice, quantitySold) => {
        const price = parseInt(unitPrice.replace('€', ''));
        const quantity = parseInt(quantitySold.replace(/,/g, ''));
        const total = price * quantity;
        return `€${total.toLocaleString()}`;
    },

    // Snacks sales with unit pricing
    snackunitprice: () => {
        const prices = [2.50, 3.40, 3.50, 5.00, 5.50, 6.00];
        const price = prices[Math.floor(Math.random() * prices.length)];
        return `€${price.toFixed(2)}`;
    },

    snackssold: (ticketType) => {
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 1500; break;
            case 'VIP': baseQuantity = 2500; break;
            case 'Standard': baseQuantity = 4000; break;
            case 'Kids': baseQuantity = 800; break;
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.4));
        return quantity.toLocaleString();
    },

    snackssales: (unitPrice, quantitySold) => {
        const price = parseFloat(unitPrice.replace('€', ''));
        const quantity = parseInt(quantitySold.replace(/,/g, ''));
        const total = price * quantity;
        return `€${total.toLocaleString()}`;
    },

    // Soft drink sales with unit pricing
    softdrinkunitprice: () => {
        const prices = [2.50, 3.00, 3.20, 3.50];
        const price = prices[Math.floor(Math.random() * prices.length)];
        return `€${price.toFixed(2)}`;
    },

    softdrinkssold: (ticketType) => {
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 2000; break;
            case 'VIP': baseQuantity = 3500; break;
            case 'Standard': baseQuantity = 5000; break;
            case 'Kids': baseQuantity = 1000; break;
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.3));
        return quantity.toLocaleString();
    },

    softdrinksales: (unitPrice, quantitySold) => {
        const price = parseFloat(unitPrice.replace('€', ''));
        const quantity = parseInt(quantitySold.replace(/,/g, ''));
        const total = price * quantity;
        return `€${total.toLocaleString()}`;
    },

    // Alcohol sales with unit pricing
    alcoholunitprice: (ticketType) => {
        if (ticketType === 'Kids') {
            return '€0.00';
        }
        const prices = [2.00, 3.80, 4.50, 6.00];
        const price = prices[Math.floor(Math.random() * prices.length)];
        return `€${price.toFixed(2)}`;
    },

    alcoholsold: (ticketType) => {
        if (ticketType === 'Kids') {
            return '0';
        }

        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 1200; break;
            case 'VIP': baseQuantity = 2000; break;
            case 'Standard': baseQuantity = 2800; break;
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.5));
        return quantity.toLocaleString();
    },

    alcoholsales: (unitPrice, quantitySold) => {
        const price = parseFloat(unitPrice.replace('€', ''));
        const quantity = parseInt(quantitySold.replace(/,/g, ''));
        const total = price * quantity;
        return `€${total.toLocaleString()}`;
    }
};

function detectColumnType(columnName) {
    const name = columnName.toLowerCase().trim().replace(/\s+/g, '');

    // Stadium management specific columns
    if (name.includes('sale') && name.includes('date')) return 'saledate';
    if (name.includes('ticket') && name.includes('type')) return 'tickettype';
    if (name.includes('ticket') && name.includes('price')) return 'ticketprice';
    if (name.includes('total') && name.includes('seats')) return 'totalseatssold';
    if (name.includes('remaining') && name.includes('seats')) return 'remainingseats';
    if (name.includes('total') && name.includes('ticket')) return 'totalticketssales';

    if (name.includes('jersey') && name.includes('unit')) return 'jerseyunitprice';
    if (name.includes('jerseys') && name.includes('sold')) return 'jerseyssold';
    if (name.includes('jersey') && name.includes('sales')) return 'jerseysales';

    if (name.includes('scarf') && name.includes('unit')) return 'scarfunitprice';
    if (name.includes('scarfs') && name.includes('sold')) return 'scarfssold';
    if (name.includes('scarf') && name.includes('sales')) return 'teamscarfsales';

    if (name.includes('snack') && name.includes('unit')) return 'snackunitprice';
    if (name.includes('snacks') && name.includes('sold')) return 'snackssold';
    if (name.includes('snacks') && name.includes('sales')) return 'snackssales';

    if (name.includes('softdrink') && name.includes('unit')) return 'softdrinkunitprice';
    if (name.includes('softdrinks') && name.includes('sold')) return 'softdrinkssold';
    if (name.includes('softdrink') && name.includes('sales')) return 'softdrinksales';

    if (name.includes('alcohol') && name.includes('unit')) return 'alcoholunitprice';
    if (name.includes('alcohol') && name.includes('sold')) return 'alcoholsold';
    if (name.includes('alcohol') && name.includes('sales')) return 'alcoholsales';

    return 'default';
}

function generateData() {
    const columnsInput = document.getElementById('columns').value.trim();
    const matchDays = parseInt(document.getElementById('rowCount').value);

    if (!columnsInput) {
        alert('Please enter column names');
        return;
    }

    const columns = columnsInput.split(',').map(col => col.trim()).filter(col => col);

    if (columns.length === 0) {
        alert('Please enter valid column names');
        return;
    }

    generatedData = [];
    const ticketTypes = ['VVIP', 'VIP', 'Standard', 'Kids'];

    const dates = [];
    for (let i = 0; i < matchDays; i++) {
        dates.push(dataGenerators.saledate());
    }

    dates.sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        return dateA - dateB;
    });

    dates.forEach(date => {
        ticketTypes.forEach(ticketType => {
            const row = {};

            // Generate ticket data
            const ticketPrice = dataGenerators.ticketprice(ticketType);
            const seatsSold = dataGenerators.totalseatssold(ticketType);

            // Generate unit prices and quantities for merchandise and concessions
            const jerseyUnitPrice = dataGenerators.jerseyunitprice();
            const jerseysSold = dataGenerators.jerseyssold(ticketType);

            const scarfUnitPrice = dataGenerators.scarfunitprice();
            const scarfsSold = dataGenerators.scarfssold(ticketType);

            const snackUnitPrice = dataGenerators.snackunitprice();
            const snacksSold = dataGenerators.snackssold(ticketType);

            const softDrinkUnitPrice = dataGenerators.softdrinkunitprice();
            const softDrinksSold = dataGenerators.softdrinkssold(ticketType);

            const alcoholUnitPrice = dataGenerators.alcoholunitprice(ticketType);
            const alcoholSold = dataGenerators.alcoholsold(ticketType);

            columns.forEach(column => {
                const columnType = detectColumnType(column);

                if (columnType === 'saledate') {
                    row[column] = date;
                } else if (columnType === 'tickettype') {
                    row[column] = ticketType;
                } else if (columnType === 'ticketprice') {
                    row[column] = ticketPrice;
                } else if (columnType === 'totalseatssold') {
                    row[column] = seatsSold;
                } else if (columnType === 'remainingseats') {
                    row[column] = dataGenerators.remainingseats(ticketType, seatsSold);
                } else if (columnType === 'totalticketssales') {
                    row[column] = dataGenerators.totalticketssales(ticketType, ticketPrice, seatsSold);
                }
                // Jersey columns
                else if (columnType === 'jerseyunitprice') {
                    row[column] = jerseyUnitPrice;
                } else if (columnType === 'jerseyssold') {
                    row[column] = jerseysSold;
                } else if (columnType === 'jerseysales') {
                    row[column] = dataGenerators.jerseysales(jerseyUnitPrice, jerseysSold);
                }
                // Scarf columns
                else if (columnType === 'scarfunitprice') {
                    row[column] = scarfUnitPrice;
                } else if (columnType === 'scarfssold') {
                    row[column] = scarfsSold;
                } else if (columnType === 'teamscarfsales') {
                    row[column] = dataGenerators.teamscarfsales(scarfUnitPrice, scarfsSold);
                }
                // Snack columns
                else if (columnType === 'snackunitprice') {
                    row[column] = snackUnitPrice;
                } else if (columnType === 'snackssold') {
                    row[column] = snacksSold;
                } else if (columnType === 'snackssales') {
                    row[column] = dataGenerators.snackssales(snackUnitPrice, snacksSold);
                }
                // Soft drink columns
                else if (columnType === 'softdrinkunitprice') {
                    row[column] = softDrinkUnitPrice;
                } else if (columnType === 'softdrinkssold') {
                    row[column] = softDrinksSold;
                } else if (columnType === 'softdrinksales') {
                    row[column] = dataGenerators.softdrinksales(softDrinkUnitPrice, softDrinksSold);
                }
                // Alcohol columns
                else if (columnType === 'alcoholunitprice') {
                    row[column] = alcoholUnitPrice;
                } else if (columnType === 'alcoholsold') {
                    row[column] = alcoholSold;
                } else if (columnType === 'alcoholsales') {
                    row[column] = dataGenerators.alcoholsales(alcoholUnitPrice, alcoholSold);
                }
            });

            generatedData.push(row);
        });
    });

    displayPreview(columns);
    document.getElementById('downloadBtn').disabled = false;
}

function displayPreview(columns) {
    const previewSection = document.getElementById('previewSection');
    const tableContainer = document.getElementById('tableContainer');

    // Show first 10 rows
    const previewData = generatedData.slice(0, 10);

    let tableHTML = '<table class="preview-table"><thead><tr>';
    columns.forEach(column => {
        tableHTML += `<th>${column}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';

    previewData.forEach(row => {
        tableHTML += '<tr>';
        columns.forEach(column => {
            tableHTML += `<td>${row[column]}</td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';

    tableContainer.innerHTML = tableHTML;
    previewSection.style.display = 'block';
}

function downloadExcel() {
    if (generatedData.length === 0) {
        alert('Please generate data first');
        return;
    }

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(generatedData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Generated Data');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `generated_data_${timestamp}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
}