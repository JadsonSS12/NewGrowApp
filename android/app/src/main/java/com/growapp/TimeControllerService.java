package com.growapp;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.os.Build;
import android.widget.Toast;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.HeadlessJsTaskService;

public class TimeControllerService extends Service {
    private static final int SERVICE_NOTIFICATION_ID = 12345;
    private static final String CHANNEL_ID = "TC";
    private Handler handler = new Handler();
    private boolean isServiceStarted = false; // Adicionando a declaração aqui

    private Runnable runnableCode = new Runnable() {
        @Override
        public void run() {
            Context context = getApplicationContext();
            Intent myIntent = new Intent(context, EventTimeController.class);
            context.startService(myIntent);
            HeadlessJsTaskService.acquireWakeLockNow(context);
            handler.postDelayed(this, 60000);
        }
    };

    
    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "timeController", importance);
            channel.setDescription("Channel for time control notifications");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        handler.removeCallbacks(runnableCode);
        isServiceStarted = false; // Resetando a flag
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (!isServiceStarted) {
            createNotificationChannel();
            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle("GrowApp: Time controller")
                    .setContentText("Running...")
                    .setOngoing(true)
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                    .build();

            startForeground(SERVICE_NOTIFICATION_ID, notification);
            handler.postDelayed(runnableCode, 60000);
            isServiceStarted = true;
        }
        return START_STICKY;
    }
}
