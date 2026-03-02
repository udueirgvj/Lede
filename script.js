// دوال مساعدة للتوجيه والتحقق من المصادقة
function requireAuth() {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return user;
}

// تسجيل الخروج
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
}

// حفظ بيانات المستخدم بعد التسجيل
function saveUserData(user) {
    const userRef = database.ref('users/' + user.uid);
    userRef.once('value').then(snapshot => {
        if (!snapshot.exists()) {
            // مستخدم جديد – ننشئ له سجلاً
            userRef.set({
                name: user.displayName || 'مستخدم',
                email: user.email || '',
                phone: user.phoneNumber || '',
                points: 1000,
                avatar: user.photoURL || '',
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
        }
    });
}
