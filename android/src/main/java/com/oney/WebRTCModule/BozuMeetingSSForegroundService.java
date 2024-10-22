package com.oney.WebRTCModule;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

public class BozuMeetingSSForegroundService extends Service {
    
    private static final String CHANNEL_ID = "BozuMeetingSSForegroundServiceChannel";
    private static final int NOTIFICATION_ID = 201;

    @Override
    public void onCreate() {
        super.onCreate();
        // Service is being created. Perform initialization if needed.

        System.out.println("BzMeetScreenShare" + " onCreate()");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Called when the service is started. You can handle the start request here.

        System.out.println("BzMeetScreenShare" + " onstartCommand()");
        startForegroundService();
        return START_STICKY; // Restart if killed by the system
    }

    // Required method for binding to the service
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null; // Foreground service typically doesn't need to bind with a client
    }

    // Start the service as a foreground service
    private void startForegroundService() {
        System.out.println("BzMeetScreenShare: startForegroundService()");
        // Create the notification for the foreground service
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel();
        }

        System.out.println("BzMeetScreenShare: startForegroundService()2222222222");
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Service Running")
                .setContentText("The foreground service is active")
                // .setSmallIcon(R.drawable.ic_service_icon) // Replace with your service icon
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .build();

        // Start the service in the foreground
        startForeground(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION);
    }

    // Stop the foreground service
    public void stopForegroundService() {
        stopForeground(true);  // Remove the foreground state and the notification
        stopSelf();             // Stop the service
    }

    // Create a notification channel (required for Android 8.0 and above)
    private void createNotificationChannel() {
        System.out.println("BzMeetScreenShare: createNotificationChannel()");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Channel for Bozu Call Foreground Service");

            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // Perform any cleanup needed when the service is destroyed
    }
}
