<?php
    $array_url = array(
                    'http://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg',
                    'http://www.baidu.com/search/error.html',
                    'http://news.sina.com.cn/c/nd/2017-11-23/doc-ifypacti7205512.shtml'
                );

    $http_header = array('Cache-Control:no-cache','Pragma:no-cache','Connection:Close');
    $user_agent  = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)';
    
    $cUrl_option = array(   CURLOPT_RETURNTRANSFER  => true,          // 将 curl_exec()获取的信息以文件流的形式返回，而不是直接输出
                            CURLOPT_HEADER          => false,         // 是否输出头部信息
                            CURLOPT_USERAGENT       => $user_agent,   // 在HTTP请求中包含一个"User-Agent: "头的字符串
                            CURLOPT_HTTPHEADER      => $http_header,  // 设置HTTP头部字段的数组
                            CURLOPT_TIMEOUT         => 60,            // 设置超时限制防止死循环
                      );
    // 初始化
    $mh   = curl_multi_init();
    $conn = array();
    foreach($array_url as $key=>$url){
      $conn[$key]   = curl_init($url);
      curl_setopt_array($conn[$key], $cUrl_option);
      curl_multi_add_handle($mh, $conn[$key]);
    }

    $running = null;
    do{
      curl_multi_exec($mh, $running);
    }while($running > 0);

    $data = array();
    foreach($array_url as $key=>$item){
      $data[$key]  = curl_multi_getcontent($conn[$key]);
    }
print_r($data);
    foreach($array_url as $key=>$item){
      curl_multi_remove_handle($mh, $conn[$key]);
      curl_close($conn[$key]);
    }
    curl_multi_close($mh);