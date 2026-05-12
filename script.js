async function loadTiming(){

    const response = await fetch('/api/timing');

    const data = await response.json();

    const rows = document.getElementById('rows');

    rows.innerHTML = '';

    data
    .slice(0,10)
    .forEach(car => {

        const row = document.createElement('div');

        row.className = 'row';

        row.innerHTML = `
            <div>${car.POS || '-'}</div>
            <div>${car.TEAM || '-'}</div>
            <div>${car.NAME || '-'}</div>
            <div>${car.LAPS || '-'}</div>
            <div>${car.FASTESTLAP || '-'}</div>
            <div>${car.GAP || '-'}</div>
        `;

        rows.appendChild(row);

    });

}

setInterval(loadTiming,1000);

loadTiming();