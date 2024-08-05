const prisma = require('../config/prisma');


exports.searchByType = async(req,res,next) => {
    try {
        const { type } = req.query;
    
        // ค้นหาโต๊ะโดยประเภท
        const tablesByType = await prisma.tables.findMany({
          where: {
            type: {
              contains: type // ค้นหาโต๊ะที่มีประเภทใกล้เคียง
            }
          },
        });
    
        res.json(tablesByType);
      } catch (err) {
        next(err)
        console.error('Error searching tables by type:', err);
      }
}

exports.searchByBooking = async (req, res, next) => {
    try {
        const { type } = req.query;

        // ให้ดึงข้อมูลการจองทั้งหมดจากฐานข้อมูลหรือแหล่งข้อมูลที่มีอยู่
        const allBookings = await prisma.bookingHistory.findMany({
            include: {
                tables: true,
                reservation: true,
                paymentstatusid: true
            }
        });

        let filteredBookings = allBookings;

        // ถ้ามีค่า type ให้กรองผลลัพธ์
        if (type) {
            filteredBookings = allBookings.filter(booking => booking.tables.type === type);
        }

        // ตรวจสอบว่ามีข้อมูลที่ถูกกรองหรือไม่
        if (filteredBookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for the specified type.' });
        }

        res.json(filteredBookings);
    } catch (err) {
        next(err);
        console.error('Error searching bookings by table type:', err);
    }
}


