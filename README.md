### Introduction

This is a sample application if you want to connect BTP Redis instance from localhost.

You can use Redis for
- Caching - For optimizing and reducing API calls
- Redis Streams - For Event Driven Architecture 

#### Pre-requisites
1. You have a BTP subaccount provisionsed.
2. Redis entitlement available in your subaccount.
3. You have cloned this repo on your local machine.
4. You have logged in to your subaccount CF environment. Check - `cf target`

### Local set up 

1. Run `npm install` from the app directory.

2. Build the application from your root of the project
```
mbt build
```

3. Deploy the application
```
cf deploy mta_archive/redis-ssh-tunnel_0.0.1.mtar
```

4. First time the application will take time to deploy as it will take some time to create the redis service instance

5. Once the deployment is successful, you will see - `redis-hyperscaler-service` service with binding.

6. Enable ssh
```
cf enable-ssh redis-ssh-tunnel-app
```

7. Restart the app
```
cf restart redis-ssh-tunnel-app
```

8. Create a service key with the help of following command
```
cf create-service-key redis-hyperscaler-service redis-service-key
```

9. Once the service key is created, you can fetch the details using following command
```
cf service-key redis-hyperscaler-service redis-service-key
```

10. Save it at a secured place for further use.

11. Establish an ssh tunnel with the help of following command
```
cf ssh redis-ssh-tunnel-app -L 127.0.0.1:6380:<redis_host_from_service_key>:<redis_port_from_service_key>
```

12. Keep the terminal open. Open another terminal and run following command to test the connectivity
```
redis-cli -h 127.0.0.1 -p 6380 --tls -a <redis_password_from_service_key>
```
13. You should see a prompt
```
127.0.0.1:6380>
```

14. Test by typing - `PING`. Redis should return `PONG`

15. Test by adding event to Redis streams
```
XADD order_events * event "ORDER_CREATED" orderId "ORD12345" customerId "CUST7890" amount "299.99" currency "USD"
```

16. Check if the event is available in Redis streams
```
XRANGE order_events - +
```

17. Now you can use localhost - 127.0.0.1 and port 6380 in your CAP application on localhost and connect to redis instance on BTP.