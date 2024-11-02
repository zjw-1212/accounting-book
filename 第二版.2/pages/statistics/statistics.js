Page({
  data: {
    totalIncome: 0,
    totalExpense: 0,
    categories: ['美食', '交通', '购物', '工资', '其他'],
    selectedCategory: '',
    selectedDate: '',
    dateDisplay: ''
  },

  onLoad() {
    this.calculateStatistics();
  },

  // 计算统计数据
  calculateStatistics() {
    const records = wx.getStorageSync('records') || [];
    let totalIncome = 0;
    let totalExpense = 0;

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
      }
    });

    this.setData({ totalIncome, totalExpense });
  },

  // 更新选择的类别
  onCategoryChange(e) {
    this.setData({ selectedCategory: this.data.categories[e.detail.value] }, this.calculateStatistics);
  },

  // 更新选择的日期
  onDateChange(e) {
    this.setData({ selectedDate: e.detail.value });
  },

  // 确认日期选择
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
