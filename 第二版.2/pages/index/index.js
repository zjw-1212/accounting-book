Page({
  data: {
    records: []
  },

  onLoad() {
    this.loadRecords();
  },

  loadRecords() {
    const records = wx.getStorageSync('records') || [];
    this.setData({ records: records.slice(-5) }); // 只显示最近5条记录
  },

  goToRecord() {
    wx.navigateTo({
      url: '../record/record'
    });
  },

  goToStatistics() {
    wx.navigateTo({
      url: '../statistics/statistics'
    });
  },

  goToAccount() {
    wx.navigateTo({
      url: '../account/account'
    });
  }
});
