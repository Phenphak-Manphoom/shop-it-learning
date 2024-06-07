class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); //จะเรียกใช้คอนสตรัคเตอร์ของคลาสแม่ (คลาส Error) และส่งผ่านข้อความของข้อผิดพลาด (message) ไปยังคลาส Error
    this.statusCode = statusCode;

    //create stack property
    Error.captureStackTrace(this, this.constructor); //จะสร้างคุณสมบัติ stack ที่เก็บข้อมูลเกี่ยวกับ stack trace ของข้อผิดพลาดไว้ในอินสแตนซ์ของข้อผิดพลาดที่สร้างขึ้นมา เพื่อให้ง่ายต่อการดีบัก (debugging) และระบุแหล่งที่มาของข้อผิดพลาด
  }
}

export default ErrorHandler;
