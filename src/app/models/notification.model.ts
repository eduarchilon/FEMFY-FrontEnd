import { constants } from '../constans/constants';

export interface NotificationAction {
  action?: string;
  title?: string;
}

export interface NotificationPayload {
  notification: {
    icon?: string;
    badge?: string;
    title: string;
    body: string;
    vibrate?: number[] | boolean;
    image?: string;
    actions?: NotificationAction[];
  };
}

export function notificationPayloadContent(
  title: string,
  body: string
): NotificationPayload {
  return {
    notification: {
      icon: 'https://gcdnb.pbrd.co/images/gdz0JxIhdawu.png',
      badge: 'https://gcdnb.pbrd.co/images/gdz0JxIhdawu.png',
      title: title,
      body: body,
      vibrate: [100, 50, 100],
      image: 'https://gcdnb.pbrd.co/images/lToeU43x7Z4n.png',
      actions: [
        { action: 'https://femfy-stage.vercel.app', title: 'Ir a Femfy' },
      ],
    },
  };
}

export function notificationKey(): string | null | any {
  const storedValue = localStorage.getItem(constants.NOTIFICATION_KEY);
  if (storedValue) {
    return JSON.parse(storedValue);
  } else {
    return null;
  }
}
