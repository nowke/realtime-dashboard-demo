# Real-time Dashboard (Worker)

**Start Redis server**

```
redis-server
```

**Install dependencies**

```
cd worker
yarn install
```

**Start the worker**

```
yarn start
```

The following logs will be printed,

```
Starting worker
Scheduled Jobs for CPU, Traffic, distribution, messages
Fetched new results for MESSAGES
Fetched new results for CPU
Fetched new results for DISTRIBUTION
Fetched new results for CPU
Fetched new results for MESSAGES
Fetched new results for TRAFFIC
...
```