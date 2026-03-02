// script.js - دوال مساعدة للبروفايل

// دالة لإنشاء رقم ID عشوائي مكون من 10 أرقام والتحقق من عدم تكراره
async function generateUniqueUserId() {
    let unique = false;
    let userId;
    while (!unique) {
        userId = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10 أرقام
        const snapshot = await database.ref('userIds').child(userId).once('value');
        if (!snapshot.exists()) {
            unique = true;
            // حجز الـ ID (يمكن استخدامه لربط المستخدم)
            await database.ref('userIds').child(userId).set(true);
        }
    }
    return userId;
}

// دالة لإنشاء ملف المستخدم في Realtime Database (بعد أول تسجيل)
async function createUserProfile(user) {
    const userId = await generateUniqueUserId();
    const userData = {
        userId: userId,
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        points: 1000 // نقاط افتراضية
    };
    // حفظ تحت users/{uid}
    await database.ref('users/' + user.uid).set(userData);
    return userId;
}

// دالة للتحقق من وجود بروفايل (للاستخدام مع OAuth إذا لم يكن جديداً)
async function ensureUserProfile(user) {
    const snapshot = await database.ref('users/' + user.uid).once('value');
    if (!snapshot.exists()) {
        // إذا كان المستخدم قديم (ربما سجل قبل إضافة هذه الميزة) ننشئ له بروفايل
        await createUserProfile(user);
    }
    return snapshot.val()?.userId;
}
