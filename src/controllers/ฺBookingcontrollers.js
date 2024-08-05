const prisma = require('../config/prisma');

exports.createBooking = async (req, res, next) => {
  try {
    const { userId, tableId, reservationId, paymentStatusId } = req.body;

    console.log('Reservation ID:', reservationId); // ตรวจสอบค่า Reservation ID

    // ดึงข้อมูลการจองจากตาราง Reservations
    const reservation = await prisma.reservations.findUnique({
      where: { reservationid : parseInt(reservationId, 10) },
      select: { bookingDate: true, numberofGugest: true }
    });

    console.log('Request Body:', req.body); // ตรวจสอบค่า Request Body ทั้งหมด

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    const { bookingDate, numberOfGuests } = reservation;

    // สร้างการจองใหม่ในตาราง BookingHistory
    const booking = await prisma.bookingHistory.create({
      data: {
        user: { connect: { id: parseInt(userId,10) } },
        tables: { connect: { table_id: parseInt(tableId,10) } },
        reservation: { connect: { reservationid: parseInt(reservationId,10) } },
        reservationDateTime: new Date(),
        paymentstatusid: { connect: { paymentstatus_id: parseInt(paymentStatusId,10) } }
      }
    });

    await prisma.tableStatus.updateMany({
      where: { table_id: parseInt(tableId, 10) },
      data: { tableStatus: "RESERVED" }
    });
    await prisma.tables.updateMany({
      where: { table_id: parseInt(tableId, 10) },
      data: { status: "RESERVED" }
    });
    await prisma.paymentStatus.update({
      where: { paymentstatus_id: parseInt(paymentStatusId,10) },
      data: { statusmoney: "PAID" }
    });
    

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    next(err);
    console.error('Error creating booking:', err);
  }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookingData = await prisma.bookingHistory.findMany({
      include: {
        paymentstatusid: true,
        tables : true,
        reservation : {
          select: {
            reservationid: true, // ต้องเป็น Reservationid ไม่ใช่ Reservationid
            bookingDate: true,
            numberofGugest: true, // ต้องเป็น numberofGuests ไม่ใช่ numberofGugest
          }
        }
      }
    });

    res.status(200).json({ success: true, data: bookingData });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    const { vooktableId, paymentStatusId } = req.body;

    // อัปเดตการจองในตาราง BookingHistory
    const updatedBooking = await prisma.bookingHistory.update({
      where: { booking_id: bookingId },
      data: {
        tables: { connect: { table_id: parseInt(tableId,10) } },
        paymentstatusid: { connect: { paymentstatus_id: parseInt(paymentStatusId,10) } }
      }
    });

    // อัปเดตสถานะของโต๊ะ
    await prisma.tableStatus.updateMany({
      where: { table_id: parseInt(tableId, 10) },
      data: { tableStatus: "RESERVED" } // แก้ไขตามความเหมาะสม
    });
    await prisma.tables.updateMany({
      where: { table_id: parseInt(tableId, 10) },
      data: { status: "RESERVED" } // แก้ไขตามความเหมาะสม
    });

    // อัปเดตสถานะการชำระเงิน
    await prisma.paymentStatus.update({
      where: { paymentstatus_id: parseInt(paymentStatusId,10) },
      data: { statusmoney: "PAID" } // แก้ไขตามความเหมาะสม
    });

    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const bookingId = parseInt(req.params.id, 10);

    // ลบการจองในตาราง BookingHistory
    await prisma.bookingHistory.delete({
      where: { booking_id: bookingId }
    });

    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


