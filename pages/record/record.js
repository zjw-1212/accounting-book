Page({
  data: {
    date: '',
    amount: '',
    selectedCategory: '',
    remark: '',
    categories: ['美食', '交通', '购物', '工资', '其他'], // 添加类别选项
    recordType: 'income' // 默认是收入
  },

  onInputDate(e) {
    this.setData({ date: e.detail.value });
  },

  onInputAmount(e) {
    this.setData({ amount: e.detail.value });
  },

  onCategoryChange(e) {
    this.setData({ selectedCategory: this.data.categories[e.detail.value] }); // 更新选中的类别
  },

  onInputRemark(e) {
    this.setData({ remark: e.detail.value });
  },

  onTypeChange(e) {
    this.setData({ recordType: e.detail.value });
  },

  saveRecord() {
    const { date, amount, selectedCategory, remark, recordType } = this.data;
    const records = wx.getStorageSync('records') || [];

    // 确保金额为数字
    const amountValue = parseFloat(amount);

    if (recordType === 'expense') {
      const accountBalance = wx.getStorageSync('accountBalance') || 0;
      if (accountBalance < amountValue) {
        wx.showToast({ title: '余额不足', icon: 'none' });
        return;
      }
      this.updateAccountBalance(-amountValue); // 扣除支出
    } else if (recordType === 'income') {
      this.updateAccountBalance(amountValue); // 增加收入
    }

    records.push({ date, amount: amountValue, category: selectedCategory, remark, type: recordType });
    wx.setStorageSync('records', records);
    wx.navigateBack(); // 返回上一页
  },

  updateAccountBalance(amount) {
    const currentBalance = wx.getStorageSync('accountBalance') || 0;
    const newBalance = currentBalance + amount;
    wx.setStorageSync('accountBalance', newBalance);
  }
});
