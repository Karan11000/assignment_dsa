function _createSeats(input) {
  const maxColumns = Math.max(...input.map(arr => arr[1]));
    let seats = [];
    for (let colI = 0; colI < maxColumns; colI++) {
      let block = [];

      input.forEach(arr => {
        const row = arr[0];
        let col = arr[1];

        for (let i = 0; i < row; i++) {
          if (col - colI > 0) {
            block.push('seat');
          } else {
            block.push('empty');
          }
        }
        block.push('space');
      });
      block = block.slice(0, -1);
      seats.push(block);
    }
    return seats;

  }

  function _asignAisleSeats(seat, obj) {
    let seats = [...seat];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (obj.remainingPassengers < 1) {
          return;
        }
        if (seatI > 0 && seatI < row.length) {
          if (seat === 'seat' && (row[seatI - 1] === 'space' || row[seatI + 1] === 'space')) {
            seats[rowI][seatI] = obj.nextSeatNumber;
            obj.nextSeatNumber++;
            obj.remainingPassengers--;
          }
        }
      });
    });
    return seats;
  }

  function _assignWindowSeats(seat, obj) {
    let seats = [...seat];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (obj.remainingPassengers < 1) {
          return;
        }
        if (seat === 'seat' && (seatI === 0 || seatI === row.length - 1)) {
          seats[rowI][seatI] = obj.nextSeatNumber;
          obj.nextSeatNumber++;
          obj.remainingPassengers--;
        }
      });
    });
    return seats
  }

  function _asignMiddleSeats(seat, obj) {
    let seats = [...seat];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (obj.remainingPassengers < 1) {
          return;
        }
        if (
          seat === 'seat' &&
          !(
            seatI === 0 ||
            seatI === row.length - 1 ||
            row[seatI - 1] === 'space' ||
            row[seatI + 1] === 'space'
          )
        ) {
          seats[rowI][seatI] = obj.nextSeatNumber;
          obj.nextSeatNumber++;
          obj.remainingPassengers--;
        }
      });
    });
    return seats
  }

  function airplaneSeating(input, passengers){
    let seats = _createSeats(input);
    let remainingPassengers = passengers;
    let nextSeatNumber = 1;
    let obj = {
      nextSeatNumber:nextSeatNumber,
      remainingPassengers:remainingPassengers
    };
    let assigned_seats = _asignAisleSeats(seats, obj);
    let assigned_seats_window = _assignWindowSeats(assigned_seats, obj);
    let all_assigned_seats = _asignMiddleSeats(assigned_seats_window, obj);
    console.log('all_assigned_seats :>> ', all_assigned_seats);
  }


  airplaneSeating(	[	[3,4],	[4,5],	
    [2,3],	[3,4]	]	
    , 30)

    // Here empty means that the particular block of seats do not has seat