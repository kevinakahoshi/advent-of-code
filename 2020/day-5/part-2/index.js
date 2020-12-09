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

const findMySeat = (seatIDs) => {
  for (let index = 0; index < seatIDs.length; index++) {
    if ((seatIDs[index] + 1) !== seatIDs[index + 1]) {
      return seatIDs[index] + 1;
    }
  }
  return -1;
}

fs.readFile('../data.txt', (err, data) => {
  if (err) throw err;
  const input = data.toString().trim().split('\n');
  const transformedReservations = input.map(separateRowsAndColumns);
  const seatingPositionIDs = transformedReservations.map((reservation) => {
    for (const key in reservation) {
      reservation[key] = mapSeatPosition(reservation[key], key);
    }
    const { row, column } = reservation;
    return generateSeatID(row, column);
  });

  const sortedIDs = seatingPositionIDs.map((id) => id).sort((seat1, seat2) => seat1 - seat2);

  console.log(findMySeat(sortedIDs))

  fs.writeFile('sorted-ids.json', JSON.stringify(sortedIDs, null, 2), (err) => {
    if (err) throw err;
    console.log('All IDs are now sorted.')
  })
});
