// تفعيل الأزرار (مثال: تغيير النشاط عند النقر)
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // يمكن توجيه المستخدم إلى صفحة اللعبة لاحقاً
        alert('سيتم الانتقال إلى اللعبة قريباً!');
    });
});

document.querySelectorAll('.game-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.game-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        // هنا يمكن تغيير اللعبة المعروضة
    });
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        // تغيير المحتوى حسب التبويب
    });
});
