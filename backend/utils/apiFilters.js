class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            //โอเปอเรเตอร์เหล่านี้อยู่ใน MongoDB
            $regex: this.queryStr.keyword, //ค้นหาแบบไม่ตรงกันทุกตัว
            $options: "i", //ไม่สนตัวพิมพ์เล็กหรือใหญ่
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
}

export default APIFilters;
