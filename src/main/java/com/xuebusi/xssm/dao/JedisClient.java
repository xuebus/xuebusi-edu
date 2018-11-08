package com.xuebusi.xssm.dao;

/**
 * 定义一个redis的操作接口,底层使用jedis.
 * 它有两种实现:一种是单机版的jedis客户端,一种是集群版的jedis客户端.
 *
 * Created by 学布斯 on 2017/12/18.
 */
public interface JedisClient {

	String get(String key);
	String set(String key, String value);
	String hget(String hkey, String key);
	long hset(String hkey, String key, String value);
	long incr(String key);
	long expire(String key, int second);
	long ttl(String key);
	long del(String key);
	long hdel(String hkey, String key);
	
}
