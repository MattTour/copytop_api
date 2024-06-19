import Push from "../models/pushModel.js";

export async function getAllSubscribe() {
    return await Push.findAll();
}

export async function getOneSubscribe(pushId) {
    return await Push.findByPk(pushId);
}

export async function getSubscribeFromUserId(userId) {
    return await Push.findAll({ where: { user_id: userId } })
}

export async function getVapidKey() {
    return {
        'key': process.env.VAPID_PUBLIC_KEY
    } 
}

export async function sendNotification(title = 'New notification', message = 'Go check the new message on the application') {
    const allSubscribe = await getAllSubscribe();
    allSubscribe.forEach(subscribe => {

        const pushSubscription = {
            endpoint: subscribe.endpoint,
            keys: {
                auth: subscribe.public_key,
                p256dh: subscribe.auth_token
            }
        };

        const VAPID = {
            publicKey: process.env.VAPID_PUBLIC_KEY,
            privateKey: process.env.VAPID_PRIVATE_KEY
        }

        const parsedUrl = new URL(pushSubscription.endpoint);
        const audience = `${parsedUrl.protocol}//${parsedUrl.hostname}`;

        // technically, the audience doesn't change between calls, so this can be cached in a non-minimal example
        const vapidHeaders = webpush.getVapidHeaders(
            audience,
            'mailto: example@web-push-node.org',
            VAPID.publicKey,
            VAPID.privateKey,
            'aes128gcm'
        );

        webpush.sendNotification(pushSubscription,
            JSON.stringify({
                title: title,
                message: message
            }), {
            headers: vapidHeaders
        });
    });
}

export async function subscribe(endpoint, p256dh, auth) {
    const newPush = Push.build({
        endpoint: endpoint,
        auth_token: p256dh,
        public_key: auth
    });
    newPush.save();
    return newPush
}

export async function deleteSubscribe(pushObject) {
    await pushObject.destroy();
}
