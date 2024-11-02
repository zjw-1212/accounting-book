Page({
  data: {
    totalIncome: 0,
    totalExpense: 0,
    categories: ['美食', '交通', '购物', '工资', '其他'],
    selectedCategory: '',
    startDate: '',
    endDate: '',
    dateDisplay: ''
  },

  onLoad() {
    this.calculateStatistics();
  },

  // 计算统计数据
  calculateStatistics() {
    const { records } = this.data;
    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach(record => {
      const amount = record.amount;
      const recordDate = new Date(record.date);

      // 确保记录日期在开始和结束日期之间
      const start = this.data.startDate ? new Date(this.data.startDate) : new Date(0);
      const end = this.data.endDate ? new Date(this.data.endDate) : new Date(new Date().setFullYear(new Date().getFullYear() + 1));

      if (recordDate >= start && recordDate <= end) {
        if (record.type === 'income') {
          totalIncome += amount;
        } else if (record.type === 'expense') {
          totalExpense += Math.abs(amount);
        }
      }
    });

    this.setData({ totalIncome, totalExpense });
  },

  // 更新选择的类别
  onCategoryChange(e) {
    this.setData({ selectedCategory: this.data.categories[e.detail.value] }, this.calculateStatistics);
  },

  // 更新开始日期
  onStartDateChange(e) {
    this.setData({ startDate: e.detail.value }, this.calculateStatistics);
  },

  // 更新结束日期
  onEndDateChange(e) {
    this.setData({ endDate: e.detail.value }, this.calculateStatistics);
  }
});