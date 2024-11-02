Page({
  data: {
    limit: 0,
    balance: 0
  },

  onLoad() {
    this.loadAccountData();
  },

  loadAccountData() {
    const limit = wx.getStorageSync('monthlyLimit') || 0;
    const balance = wx.getStorageSync('accountBalance') || 0;
    this.setData({ limit, balance });
  },

  onInputLimit(e) {
    this.setData({ limit: e.detail.value });
  },

  saveLimit() {
    const limit = parseFloat(this.data.limit);
    wx.setStorageSync('monthlyLimit', limit);
    wx.setStorageSync('accountBalance', limit); // 初始化余额为限额
    this.setData({ balance: limit });
    wx.showToast({ title: '限额已保存', icon: 'success' });
  },

  updateBalance(amount) {
    const currentBalance = wx.getStorageSync('accountBalance') || 0;
    const newBalance = currentBalance + amount;
    wx.setStorageSync('accountBalance', newBalance);
    this.setData({ balance: newBalance });
  }
});
