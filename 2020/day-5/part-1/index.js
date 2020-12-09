const fs = require('fs');
const MAX_ROWS = 128; // Zero index (128 Rows)
const MAX_COLUMNS = 8; // Zero index (8 Columns)

const separateRowsAndColumns = (reservation) => {
  return {
    row: reservation.slice(0, reservation.length - 3),
    column: reservation.slice(reservation.length - 3)
  }
}

const mapSeatPosition = (reservationRowOrColumnString, key) => {
  const maxPosition = key === 'row' ? MAX_ROWS : MAX_COLUMNS;
  const rowOrColumn = key === 'row' ? 'F' : 'L';
  const seat = {
    min: 0,
    max: maxPosition
  }
  for (let index = 0; index < reservationRowOrColumnString.length; index++) {
    if (reservationRowOrColumnString[index] === rowOrColumn) {
      seat.max = Math.floor((seat.max + seat.min) / 2);
    } else {
      seat.min = Math.floor((seat.max + seat.min) / 2);
    }
  }
  return seat.min;
}

const generateSeatID = (seatRow, seatColumn) => {
  return seatRow * 8 + seatColumn;
}

fs.readFile('../data.txt', (err, data) => {
  if (err) throw err;
  const input = data.toString().split('\n');
  const transformedReservations = input.map(separateRowsAndColumns);
  const seatingPositionIDs = transformedReservations.map((reservation) => {
    for (const key in reservation) {
      reservation[key] = mapSeatPosition(reservation[key], key);
    }
    const { row, column } = reservation;
    return generateSeatID(row, column);
  })

  fs.writeFile('transformed-data.json', JSON.stringify(transformedReservations, null, 2), (err) => {
    if (err) throw err;
    console.log(`Data has been written to transformed-data.json. ${transformedReservations.length} entries were created.`);
  });

  fs.writeFile('seating-position-id.json', JSON.stringify(seatingPositionIDs, null, 2), (err) => {
    if (err) throw err;
    console.log('All IDs have been generated');
  });

  console.log(Math.max(...seatingPositionIDs))
});
