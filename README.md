# Backend: โปรเจคระบบจองโต๊ะ

## 🚀 ฟังก์ชั่นหลักของระบบ
- 🔑 **ระบบสมัครสมาชิกและล็อกอิน**: สามารถสมัครสมาชิกและล็อกอินได้ โดยมีการตรวจสอบและ validate ข้อมูล
- 🎟️ **ระบบการจองโต๊ะ**: 
    - กรอกข้อมูลวันที่และเวลาที่ต้องการจอง
    - ดูรายละเอียดของโต๊ะและราคาจอง
    - ค้นหาชื่อโต๊ะได้
- 🛠️ **การแบ่ง Role**: ระบบจะมีการแบ่งผู้ใช้เป็น **user** และ **admin**
- 💸 **จ่ายเงิน**: ผู้ใช้สามารถจ่ายเงินโดยการอัพโหลด **รูปสลิป** และตรวจสอบสลิปโอนเงินผ่าน [slipok](https://slipok.com/) 

## 🧰 Framework และเครื่องมือที่ใช้

- **Node.js (Express)**: ใช้สำหรับการพัฒนา backend โดยแยกโฟลเดอร์ออกเป็น 3 ส่วน:
  - `server/app.js`
  - `router`
  - `controller`
  
- **JWT Authentication**: ใช้ JWT ในการสร้างและจัดการ Token หลังจากผู้ใช้ล็อกอินเพื่อความปลอดภัย
  - ค่าของ Token จะมีการกำหนดวันหมดอายุ
  - ตัวอย่างการใช้งาน:

    ```javascript
    const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });
    ```

- **Prisma ORM**: ใช้ Prisma ในการเชื่อมต่อฐานข้อมูล MySQL และจัดการกับ CRUD operation
  - ตัวอย่างการสร้างฐานข้อมูล:

    ```javascript
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });
    ```

- **การอัพโหลดไฟล์รูป**: รองรับการอัพโหลดได้แค่เพียง **1 รูป** เพื่อเก็บในโฟลเดอร์ `uploads` แต่ไม่เก็บในฐานข้อมูล

- 💸 **จ่ายเงินและตรวจสอบสลิปโอนเงิน**: 
  คุณสามารถตรวจสอบสลิปโอนเงินได้ผ่าน [slipok](https://slipok.com/) และเก็บ token ไว้ในไฟล์ `.env`

## 💡 คำแนะนำเพิ่มเติม
- 🔐 อย่าลืมตั้งค่าไฟล์ `.env` สำหรับการเก็บ **Token** และ **ข้อมูลลับ** ต่าง ๆ
- ⚙️ ตรวจสอบให้แน่ใจว่า **Prisma Client** ได้ทำการ migrate ฐานข้อมูลเรียบร้อยแล้ว
