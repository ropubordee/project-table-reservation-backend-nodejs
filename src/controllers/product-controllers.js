const prisma = require('../config/prisma'); 
const { connect } = require('../rotes/Reservations');

exports.createReservation = async (req, res, next) => {
    try {
        const { tableId, numberOfGuests, bookingDate } = req.body;
        const userId = req.user.id; // ดึง userId จากการล็อกอินของผู้ใช้

        // ใช้ userId เพื่อดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        // ตรวจสอบว่าผู้ใช้มีอยู่ในระบบหรือไม่
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const table = await prisma.tables.findUnique({
            where: { table_id: tableId },
            select: { price: true, status: true },
        });

        if (!table || table.status !== 'FREE') {
            return res.status(400).json({ message: 'The selected table is not available for reservation.' });
        }

        const newReservation = await prisma.reservations.create({
            data: {
                user: { connect: { id: userId } }, 
                tables: { connect: { table_id: tableId } },
                numberofGugest: parseInt(numberOfGuests, 10),
                bookingDate:  new Date(bookingDate),
                reservationDateTime: new Date(),
            },
        });

        const paymentStatus = await prisma.paymentStatus.create({
            data: {
                reservation: { connect: { reservationid: newReservation.reservationid } },
                table: { connect: { table_id: tableId } },
                statusmoney: 'UNPAID',
                paymentDateTime: new Date(),
                price: table.price,
            },
        });

        if (paymentStatus.statusmoney === 'PAID') {
            await prisma.tables.update({
                where: { table_id: tableId },
                data: { status: 'RESERVED' },
            });
        }

        return res.status(200).json({ message: 'Reservation created successfully', result: newReservation });
    } catch (err) {
        next(err); // ส่ง error ไปยัง middleware ที่จัดการข้อผิดพลาด
    }
};


exports.reservationsgetId = async (req, res, next) => {
    try {
        const tableId = parseInt(req.params.table_id, 10);
        const reservation = await prisma.reservations.findFirst({
            where: { table_id: tableId },
        });
        if (!reservation) {
            return res.status(400).json({ message: "Reservation not found for table_id: " + tableId });
        }
        res.json(reservation);
    } catch (err) {
        next(err);
        res.status(500).json({ message: err.message });
    }
};
