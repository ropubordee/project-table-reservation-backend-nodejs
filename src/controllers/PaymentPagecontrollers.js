const prisma = require("../config/prisma")


exports.paymentStatusbyId = async (req, res, next) => {
    try {
        const tableId = parseInt(req.params.id, 10); // ใช้ table_id จาก URL parameter
        const paymentStatus = await prisma.paymentStatus.findFirst({
            where: { table_id: tableId }, // ใช้ table_id เป็นเงื่อนไขในการค้นหา
        });

        if (!paymentStatus) {
            return res.status(400).json({ message: `Payment status not found for table_id: ${tableId}` });
        }

        res.json(paymentStatus); // ส่งข้อมูลสถานะการชำระเงินกลับไปยังผู้ใช้
    } catch (err) {
        next(err); // ส่ง error ไปยัง middleware ที่จัดการข้อผิดพลาด
    }
};