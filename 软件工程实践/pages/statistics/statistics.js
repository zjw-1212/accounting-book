Page({
  data: {
    totalIncome: 0,
    totalExpense: 0,
    categories: ['美食', '交通', '购物', '工资', '其他'],
    selectedCategory: '',
    selectedDate: '',
    dateDisplay: '',
    dailyRecords: [] // 新增字段
  },

  onLoad() {
    this.calculateStatistics();
  },

  calculateStatistics() {
    const records = wx.getStorageSync('records') || [];
    let totalIncome = 0;
    let totalExpense = 0;
    let dailyRecords = []; // 用于存储选定日期的记录

    records.forEach(record => {
      const amount = record.amount;

      // 根据选定的日期和类别进行筛选
      const matchesDate = !this.data.selectedDate || record.date === this.data.selectedDate;
      const matchesCategory = !this.data.selectedCategory || record.category === this.data.selectedCategory;

      if (matchesDate && matchesCategory) {
        if (record.type === 'income') {
          totalIncome += amount;
        } else if (record.type === 'expense') {
          totalExpense += Math.abs(amount);
        }

        // 如果匹配日期，则将记录加入 dailyRecords
        if (record.date === this.data.selectedDate) {
          dailyRecords.push(record);
        }
      }
    });

    this.setData({ totalIncome, totalExpense, dailyRecords }); // 更新 dailyRecords
  },

  onCategoryChange(e) {
    this.setData({ selectedCategory: this.data.categories[e.detail.value] }, this.calculateStatistics);
  },

  onDateChange(e) {
    this.setData({ selectedDate: e.detail.value });
  },

  confirmDate() {
    if (this.data.selectedDate) {
      const formattedDate = this.data.selectedDate; // 已经是 YYYY-MM-DD 格式
      this.setData({ dateDisplay: formattedDate }, this.calculateStatistics);
    } else {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      });
    }
  }
});
