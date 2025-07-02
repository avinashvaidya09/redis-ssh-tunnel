## Introduction
1. Build the application from your root of the project
```
mbt build
```

2. Deploy the application
```
cf deploy mta_archive/redis-ssh-tunnel_0.0.1.mtar
```

3. First time the application will take time to deploy as it will take some time to create the redis service instance

4. Once the deployment is successful, you will see - `redis-hyperscaler-service` service with binding.

5. Enable ssh
```
cf enable-ssh redis-ssh-tunnel-app
```

6. Restart the app
```
cf restart redis-ssh-tunnel-app
```

7. Create a service key with the help of following command
```
cf create-service-key redis-hyperscaler-service redis-service-key
```

6. Once the service key is created, you can fetch the details using following command
```
cf service-key redis-hyperscaler-service redis-service-key
```

7. Save it at a secured place for further use.

8. Establish an ssh tunnel with the help of following command
```
cf ssh redis-ssh-tunnel-app -L 127.0.0.1:6380:<redis_host_from_service_key>:<redis_port_from_service_key>
```

9. Keep the terminal open. Open another terminal and run following command to test the connectivity
```
redis-cli -h 127.0.0.1 -p 6380 --tls -a <redis_password_from_service_key>
```
10. You should see a prompt
```
127.0.0.1:6380>
```

11. Test by typing - `PING`. Redis should return `PONG`