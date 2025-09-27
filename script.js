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
        // Generate dates for the current football season (August to May)
        const currentYear = new Date().getFullYear();
        const seasonStart = new Date(currentYear, 7, 1); // August 1st
        const seasonEnd = new Date(currentYear + 1, 4, 31); // May 31st

        const randomTime = seasonStart.getTime() + Math.random() * (seasonEnd.getTime() - seasonStart.getTime());
        const randomDate = new Date(randomTime);

        return randomDate.toLocaleDateString('en-GB'); // UK date format
    },

    ticketprice: (ticketType) => {
        const basePrices = {
            'VVIP': 250,
            'VIP': 150,
            'Standard': 75,
            'Kids': 35
        };

        // Add demand/supply variation (±30% of base price)
        const basePrice = basePrices[ticketType];
        const variation = (Math.random() - 0.5) * 0.6; // -30% to +30%
        const finalPrice = Math.round(basePrice * (1 + variation));

        return `€${finalPrice}`;
    },

    totalseatssold: (ticketType) => {
        const maxCapacity = stadiumCapacity[ticketType];
        // Sell between 60% to 95% of capacity
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

    jerseysales: (ticketType) => {
        // Realistic Liverpool FC jersey prices: Home £80, Away £85, Third £90, Retro £70
        const jerseyPrices = [70, 75, 80, 85, 90];
        const avgPrice = jerseyPrices[Math.floor(Math.random() * jerseyPrices.length)];

        // Jersey sales vary by ticket type - premium customers buy more
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 800; break;  // Higher purchasing power
            case 'VIP': baseQuantity = 1200; break;  // Good purchasing power
            case 'Standard': baseQuantity = 600; break; // Moderate purchasing
            case 'Kids': baseQuantity = 200; break;  // Lower volume, parents buy
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.5)); // ±50% variation
        const totalSales = avgPrice * quantity;
        return `€${totalSales.toLocaleString()}`;
    },

    teamscarfsales: (ticketType) => {
        // Real Anfield scarf prices: £12-15 (€14-17)
        const scarf_price = 14 + Math.floor(Math.random() * 4); // €14-17

        // Scarf sales vary by ticket type and are popular souvenirs
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 400; break;
            case 'VIP': baseQuantity = 800; break;
            case 'Standard': baseQuantity = 1200; break; // Most popular with standard fans
            case 'Kids': baseQuantity = 300; break;
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.6)); // ±60% variation
        const totalSales = scarf_price * quantity;
        return `€${totalSales.toLocaleString()}`;
    },

    snackssales: (ticketType) => {
        // Real Anfield concession prices: Pie £3.40, Chips £3.50, Burger £6.00
        const snacks = [
            { item: 'Pie', price: 3.40 },
            { item: 'Chips', price: 3.50 },
            { item: 'Burger', price: 6.00 },
            { item: 'Hot Dog', price: 5.00 },
            { item: 'Sandwich', price: 5.50 },
            { item: 'Crisps', price: 2.50 }
        ];

        // Snack consumption varies by ticket type
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 1500; break; // Premium hospitality includes food
            case 'VIP': baseQuantity = 2500; break;
            case 'Standard': baseQuantity = 4000; break; // Highest volume
            case 'Kids': baseQuantity = 800; break;  // Smaller portions, less spending
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.4));
        let total = 0;
        for (let i = 0; i < quantity; i++) {
            const snack = snacks[Math.floor(Math.random() * snacks.length)];
            total += snack.price;
        }
        return `€${total.toLocaleString()}`;
    },

    softdrinksales: (ticketType) => {
        // Real stadium beverage prices: Tea £2.50, Soft drinks £3.50
        const drinks = [
            { item: 'Coca-Cola', price: 3.50 },
            { item: 'Water', price: 2.50 },
            { item: 'Coffee', price: 3.00 },
            { item: 'Tea', price: 2.50 },
            { item: 'Orange Juice', price: 3.20 }
        ];

        // Beverage consumption is high across all ticket types
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 2000; break;
            case 'VIP': baseQuantity = 3500; break;
            case 'Standard': baseQuantity = 5000; break; // Highest volume
            case 'Kids': baseQuantity = 1000; break;
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.3));
        let total = 0;
        for (let i = 0; i < quantity; i++) {
            const drink = drinks[Math.floor(Math.random() * drinks.length)];
            total += drink.price;
        }
        return `€${total.toLocaleString()}`;
    },

    alcoholsales: (ticketType) => {
        if (ticketType === 'Kids') {
            return '€0';
        }

        // Real Anfield alcohol prices: Pint £3.30 (€3.80)
        const drinks = [
            { item: 'Pint of Beer', price: 3.80 }, // Real Anfield price
            { item: 'Half Pint', price: 2.00 },
            { item: 'Wine', price: 6.00 },
            { item: 'Spirits', price: 4.50 }
        ];

        // Alcohol sales vary significantly by ticket type
        let baseQuantity;
        switch (ticketType) {
            case 'VVIP': baseQuantity = 1200; break; // Premium hospitality
            case 'VIP': baseQuantity = 2000; break;
            case 'Standard': baseQuantity = 2800; break; // Highest volume
        }

        const quantity = Math.floor(baseQuantity + (Math.random() * baseQuantity * 0.5));
        let total = 0;
        for (let i = 0; i < quantity; i++) {
            const drink = drinks[Math.floor(Math.random() * drinks.length)];
            total += drink.price;
        }
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
    if (name.includes('jersey')) return 'jerseysales';
    if (name.includes('scarf')) return 'teamscarfsales';
    if (name.includes('snacks')) return 'snackssales';
    if (name.includes('soft') && name.includes('drink')) return 'softdrinksales';
    if (name.includes('alcohol')) return 'alcoholsales';

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

    // Generate unique dates for match days
    const dates = [];
    for (let i = 0; i < matchDays; i++) {
        dates.push(dataGenerators.saledate());
    }

    // Sort dates in ascending order
    dates.sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        return dateA - dateB;
    });

    // For each date, create exactly 4 rows (one for each ticket type)
    dates.forEach(date => {
        ticketTypes.forEach(ticketType => {
            const row = {};

            const ticketPrice = dataGenerators.ticketprice(ticketType);
            const seatsSold = dataGenerators.totalseatssold(ticketType);

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
                } else if (columnType === 'jerseysales') {
                    row[column] = dataGenerators.jerseysales(ticketType);
                } else if (columnType === 'teamscarfsales') {
                    row[column] = dataGenerators.teamscarfsales(ticketType);
                } else if (columnType === 'snackssales') {
                    row[column] = dataGenerators.snackssales(ticketType);
                } else if (columnType === 'softdrinksales') {
                    row[column] = dataGenerators.softdrinksales(ticketType);
                } else if (columnType === 'alcoholsales') {
                    row[column] = dataGenerators.alcoholsales(ticketType);
                }
            });

            generatedData.push(row);
        });
    });

    // Show preview
    displayPreview(columns);

    // Enable download button
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