<template><h1 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h1>
<h2 id="docker-的架构图" tabindex="-1"><a class="header-anchor" href="#docker-的架构图" aria-hidden="true">#</a> Docker 的架构图</h2>
<p><img src="@source/Back/imgs/Docker/01.png" alt="01"></p>
<h2 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> Docker 安装</h2>
<h3 id="安装步骤" tabindex="-1"><a class="header-anchor" href="#安装步骤" aria-hidden="true">#</a> 安装步骤</h3>
<p><a href="https://docs.docker.com/engine/install/centos/" target="_blank" rel="noopener noreferrer">官网安装参考手册<ExternalLinkIcon/></a></p>
<blockquote>
<p>**环境说明：**我们使用的是 <code>CentOS 7 (64-bit)</code>目前，<code>CentOS</code> 仅发行版本中的内核支持 Docker。Docker 运行在 <code>CentOS 7</code> 上，要求系统为 64 位、系统内核版本为 <code>3.10</code> 以上。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看自己的内核</span>
<span class="token function">uname</span> <span class="token parameter variable">-r</span>
<span class="token comment"># 查看版本信息</span>
<span class="token function">cat</span> /etc/os-release

<span class="token comment"># yum安装gcc相关环境（需要确保 虚拟机可以上外网 ）</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc-c++

<span class="token comment"># 卸载旧版本</span>
yum remove <span class="token function">docker</span> <span class="token punctuation">\</span>
                docker-client <span class="token punctuation">\</span>
                docker-client-latest <span class="token punctuation">\</span>
                docker-common <span class="token punctuation">\</span>
                docker-latest <span class="token punctuation">\</span>
                docker-latest-logrotate <span class="token punctuation">\</span>
                docker-logrotate <span class="token punctuation">\</span>
                docker-engine

<span class="token comment"># 安装需要的软件包</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils

<span class="token comment"># 设置镜像仓库使用国内的</span>
yum-config-manager --add-repo http://mirrors.aliyun.com/docker- ce/linux/centos/docker-ce.repo

<span class="token comment"># 更新yum软件包索引</span>
yum makecache fast

<span class="token comment"># 安装 Docker CE</span>
yum <span class="token function">install</span> docker-ce docker-ce-cli containerd.io

<span class="token comment"># 启动 Docker</span>
systemctl start <span class="token function">docker</span>

<span class="token comment"># 测试命令</span>
<span class="token function">docker</span> version
<span class="token function">docker</span> run hello-world
<span class="token function">docker</span> images

<span class="token comment"># 卸载 docker</span>
systemctl stop <span class="token function">docker</span>
yum <span class="token parameter variable">-y</span> remove docker-ce docker-ce-cli containerd.io
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/docker
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h3 id="阿里云镜像加速" tabindex="-1"><a class="header-anchor" href="#阿里云镜像加速" aria-hidden="true">#</a> 阿里云镜像加速</h3>
<ol>
<li>注册一个属于自己的阿里云账户(可复用淘宝账号)</li>
<li>进入管理控制台设置密码，开通</li>
<li>查看镜像加速器</li>
</ol>
<p><img src="@source/Back/imgs/Docker/02.jpg" alt="02"></p>
<ol start="4">
<li>配置镜像加速</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">'EOF'
{
    "registry-mirrors": ["https://j21nbvsk.mirror.aliyuncs.com"]
}
EOF</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 启动hello-world</span>
<span class="token function">docker</span> run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>run 干了什么？</strong></p>
<p><img src="@source/Back/imgs/Docker/03.jpg" alt="03"></p>
<h2 id="docker-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-常用命令" aria-hidden="true">#</a> Docker 常用命令</h2>
<h3 id="帮助命令" tabindex="-1"><a class="header-anchor" href="#帮助命令" aria-hidden="true">#</a> 帮助命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 帮助命令</span>
<span class="token function">docker</span> version <span class="token comment">## 显示 Docker 版本信息</span>
<span class="token function">docker</span> info  <span class="token comment">## 显示 Docker 系统信息，包括镜像和容器数</span>
<span class="token function">docker</span> <span class="token parameter variable">--help</span> <span class="token comment">## 帮助</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="镜像命令" tabindex="-1"><a class="header-anchor" href="#镜像命令" aria-hidden="true">#</a> 镜像命令</h3>
<p><strong>docker images</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 列出本地主机上的镜像</span>
<span class="token function">docker</span> images
<span class="token comment">## 可选项</span>
-a： 列出本地所有镜像
-q： 只显示镜像id
--digests： 显示镜像的摘要信息
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>docker search</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 搜索镜像</span>
<span class="token function">docker</span> search mysql
<span class="token comment">## 可选项</span>
<span class="token parameter variable">--filter</span><span class="token operator">=</span>stars<span class="token operator">=</span><span class="token number">50</span> ： 列出收藏数不小于指定值的镜像。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>docker pull</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 下载镜像</span>
<span class="token function">docker</span> pull mysql
<span class="token comment">## 指定版本下载</span>
<span class="token function">docker</span> pull mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>docker rmi</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> 镜像id <span class="token comment">## 删除单个</span>
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> 镜像名:tag 镜像名:tag <span class="token comment">## 删除多个</span>
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-qa</span><span class="token variable">)</span></span> <span class="token comment">## 删除全部</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="容器命令" tabindex="-1"><a class="header-anchor" href="#容器命令" aria-hidden="true">#</a> 容器命令</h3>
<p><strong>说明：有镜像才能创建容器，这里使用 centos 的镜像来测试，就是虚拟一个 centos ！</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull centos
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>新建容器并启动</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> IMAGE <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span><span class="token punctuation">[</span>ARG<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment">## 常用参数说明</span>
<span class="token parameter variable">--name</span><span class="token operator">=</span><span class="token string">"Name"</span> <span class="token comment">## 给容器指定一个名字</span>
<span class="token parameter variable">-d</span> <span class="token comment">## 后台方式运行容器，并返回容器的id！</span>
<span class="token parameter variable">-i</span> <span class="token comment">## 以交互模式运行容器，通过和 -t 一起使用</span>
<span class="token parameter variable">-t</span> <span class="token comment">## 给容器重新分配一个终端，通常和 -i 一起使用</span>
<span class="token parameter variable">-P</span> <span class="token comment">## 随机端口映射（大写）</span>
<span class="token parameter variable">-p</span> <span class="token comment">## 指定端口映射（小结），一般可以有四种写法</span>
    ip:hostPort:containerPort
    ip::containerPort
    hostPort:containerPort <span class="token punctuation">(</span>常用<span class="token punctuation">)</span>
    containerPort

<span class="token comment">## 测试</span>
<span class="token function">docker</span> images
<span class="token comment">## 使用centos进行用交互模式启动容器，在容器内执行/bin/bash命令！</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> centos /bin/bash
<span class="token builtin class-name">exit</span> <span class="token comment">## 使用 exit 退出容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>列出所有运行的容器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 命令</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span>
<span class="token comment">## 常用参数说明</span>
<span class="token parameter variable">-a</span> <span class="token comment">## 列出当前所有正在运行的容器 + 历史运行过的容器</span>
<span class="token parameter variable">-l</span> <span class="token comment">## 显示最近创建的容器</span>
<span class="token parameter variable">-n</span><span class="token operator">=</span>? <span class="token comment">## 显示最近n个创建的容器</span>
<span class="token parameter variable">-q</span> <span class="token comment">## 静默模式，只显示容器编号。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>退出容器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">exit</span> <span class="token comment">## 容器停止退出</span>
ctrl+P+Q <span class="token comment">## 容器不停止退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>启动停止容器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> start <span class="token punctuation">(</span>容器id or 容器名<span class="token punctuation">)</span> <span class="token comment">## 启动容器</span>
<span class="token function">docker</span> restart <span class="token punctuation">(</span>容器id or 容器名<span class="token punctuation">)</span> <span class="token comment">## 重启容器</span>
<span class="token function">docker</span> stop <span class="token punctuation">(</span>容器id or 容器名<span class="token punctuation">)</span> <span class="token comment">## 停止容器</span>
<span class="token function">docker</span> <span class="token function">kill</span> <span class="token punctuation">(</span>容器id or 容器名<span class="token punctuation">)</span> <span class="token comment">## 强制停止容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>删除容器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> 容器id <span class="token comment">## 删除指定容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span> <span class="token comment">## 删除所有容器</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> -q<span class="token operator">|</span><span class="token function">xargs</span> <span class="token function">docker</span> <span class="token function">rm</span> <span class="token comment">## 删除所有容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="常用其他命令" tabindex="-1"><a class="header-anchor" href="#常用其他命令" aria-hidden="true">#</a> 常用其他命令</h3>
<p><strong>后台启动容器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 命令</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> 容器名

<span class="token comment">## 例子</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> centos <span class="token comment">## 启动centos，使用后台方式启动</span>

<span class="token comment">## 问题： 使用docker ps 查看，发现容器已经退出了！</span>
<span class="token comment">## 解释：Docker容器后台运行，就必须有一个前台进程，容器运行的命令如果不是那些一直挂起的命 令，就会自动退出。</span>
<span class="token comment">## 比如，你运行了nginx服务，但是docker前台没有运行应用，这种情况下，容器启动后，会立即自 杀，因为他觉得没有程序了，所以最好的情况是，将你的应用使用前台进程的方式运行启动。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>查看日志</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 命令</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">--tail</span> 容器id

<span class="token comment">## 例子：我们启动 centos，并编写一段脚本来测试玩玩！最后查看日志</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> centos /bin/sh <span class="token parameter variable">-c</span> <span class="token string">"while true;do echo kuangshen;sleep 1;done"</span>
<span class="token function">docker</span> <span class="token function">ps</span>
CONTAINER ID      IMAGE
c8530dbbe3b4      centos

<span class="token comment">## -t 显示时间戳</span>
<span class="token comment">## -f 打印最新的日志</span>
<span class="token comment">## --tail 数字 显示多少条！</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-tf</span> <span class="token parameter variable">--tail</span> <span class="token number">10</span> <span class="token punctuation">[</span>CONTAINERID<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>查看容器中运行的进程信息，支持 ps 命令参数。</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 命令</span>
<span class="token function">docker</span> <span class="token function">top</span> 容器id
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>查看容器/镜像的元数据</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 命令</span>
<span class="token function">docker</span> inspect 容器id
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>进入正在运行的容器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 命令1</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> 容器id bashShell

<span class="token comment">## 测试1</span>
<span class="token function">docker</span> <span class="token function">ps</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> c8530dbbe3b4 /bin/bash
<span class="token function">ps</span> <span class="token parameter variable">-ef</span>

<span class="token comment">## 命令2</span>
<span class="token function">docker</span> attach 容器id

<span class="token comment">## 测试2</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> c8530dbbe3b4 /bin/bash
<span class="token function">ps</span> <span class="token parameter variable">-ef</span>

<span class="token comment">## 区别</span>
<span class="token comment">## exec 是在容器中打开新的终端，并且可以启动新的进程</span>
<span class="token comment">## attach 直接进入容器启动命令的终端，不会启动新的进程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><strong>从容器内拷贝文件到主机上</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 命令</span>
<span class="token function">docker</span> <span class="token function">cp</span> 容器id:容器内路径 目的主机路径

<span class="token comment">## 测试</span>
<span class="token comment">## 容器内执行，创建一个文件测试</span>
<span class="token builtin class-name">cd</span> /home
<span class="token function">touch</span> f1
<span class="token function">ls</span>
<span class="token builtin class-name">exit</span>

<span class="token comment">## linux复制查看，是否复制成功</span>
<span class="token function">docker</span> <span class="token function">cp</span> c8530dbbe3b4:/home/f1 /home
<span class="token builtin class-name">cd</span> /home
<span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h3>
<p><img src="@source/Back/imgs/Docker/1.png" alt="1"></p>
<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>attach</td>
<td>连接指定运行镜像</td>
</tr>
<tr>
<td>build</td>
<td>通过 Dockerfile 定制镜像</td>
</tr>
<tr>
<td>commit</td>
<td>提交当前容器为新的镜像</td>
</tr>
<tr>
<td>cp</td>
<td>从容器中拷贝指定文件或者目录到宿主机中</td>
</tr>
<tr>
<td>create</td>
<td>创建一个新的容器，同 run，但不启动容器</td>
</tr>
<tr>
<td>diff</td>
<td>查看 docker 容器变化</td>
</tr>
<tr>
<td>events</td>
<td>从 docker 服务获取容器实时事件</td>
</tr>
<tr>
<td>exec</td>
<td>在已存在的容器上运行命令</td>
</tr>
<tr>
<td>export</td>
<td>导出容器的内容流作为一个 tar 归档文件[对应 import]</td>
</tr>
<tr>
<td>history</td>
<td>展示一个镜像形成历史</td>
</tr>
<tr>
<td>images</td>
<td>列出系统当前镜像</td>
</tr>
<tr>
<td>import</td>
<td>从 tar 包中的内容创建一个新的文件系统映像[对应 export]</td>
</tr>
<tr>
<td>info</td>
<td>显示系统相关信息</td>
</tr>
<tr>
<td>inspect</td>
<td>查看容器详细信息</td>
</tr>
<tr>
<td>kill</td>
<td>kill 指定 docker 容器</td>
</tr>
<tr>
<td>load</td>
<td>从一个 tar 包中加载一个镜像[对应 save]</td>
</tr>
<tr>
<td>login</td>
<td>注册或者登陆一个 docker 源服务器</td>
</tr>
<tr>
<td>logout</td>
<td>从当前 Docker registry 退出</td>
</tr>
<tr>
<td>logs</td>
<td>输出当前容器日志信息</td>
</tr>
<tr>
<td>port</td>
<td>查看映射端口对应的容器内部源端口</td>
</tr>
<tr>
<td>pause</td>
<td>暂停容器</td>
</tr>
<tr>
<td>ps</td>
<td>列出容器列表</td>
</tr>
<tr>
<td>pull</td>
<td>从 docker 镜像源服务器拉取指定镜像或者库镜像</td>
</tr>
<tr>
<td>push</td>
<td>推送指定镜像或者库镜像至 docker 源服务器</td>
</tr>
<tr>
<td>restart</td>
<td>重启运行的容器</td>
</tr>
<tr>
<td>rm</td>
<td>移除一个或者多个容器</td>
</tr>
<tr>
<td>rmi</td>
<td>移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或-f 强制删除]</td>
</tr>
<tr>
<td>run</td>
<td>创建一个新的容器并运行一个命令</td>
</tr>
<tr>
<td>save</td>
<td>保存一个镜像为一个 tar 包[对应 load]</td>
</tr>
<tr>
<td>search</td>
<td>在 docker hub 中搜索镜像</td>
</tr>
<tr>
<td>start</td>
<td>启动容器</td>
</tr>
<tr>
<td>stop</td>
<td>停止容器</td>
</tr>
<tr>
<td>tag</td>
<td>给源中镜像打标签</td>
</tr>
<tr>
<td>top</td>
<td>查看容器中运行的进程信息</td>
</tr>
<tr>
<td>unpause</td>
<td>取消暂停容器</td>
</tr>
<tr>
<td>version</td>
<td>查看 docker 版本号</td>
</tr>
<tr>
<td>wait</td>
<td>截取容器停止时的退出状态值</td>
</tr>
</tbody>
</table>
<h2 id="安装示例" tabindex="-1"><a class="header-anchor" href="#安装示例" aria-hidden="true">#</a> 安装示例</h2>
<h3 id="安装-nginx" tabindex="-1"><a class="header-anchor" href="#安装-nginx" aria-hidden="true">#</a> 安装 Nginx</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 1、搜索镜像</span>
<span class="token function">docker</span> search nginx
<span class="token comment"># 2、拉取镜像</span>
<span class="token function">docker</span> pull nginx
<span class="token comment"># 3、启动容器</span>
<span class="token function">docker</span> images
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> mynginx <span class="token parameter variable">-p</span> <span class="token number">3500</span>:80 nginx
<span class="token function">docker</span> <span class="token function">ps</span>
<span class="token comment"># 4、测试访问</span>
<span class="token function">curl</span> localhost:3500
<span class="token comment"># 5、进入容器</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mynginx /bin/bash
<span class="token function">whereis</span> nginx <span class="token comment">## 寻找nginx</span>
<span class="token comment"># nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx</span>
<span class="token builtin class-name">cd</span> /usr/share/nginx <span class="token comment">## nginx 的路径</span>
<span class="token function">ls</span>
<span class="token comment"># html</span>
<span class="token builtin class-name">cd</span> html <span class="token comment">## 首页的位置</span>
<span class="token function">ls</span>
<span class="token comment"># 50x.html index.html</span>
<span class="token function">cat</span> index.html
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="安装-tomcat" tabindex="-1"><a class="header-anchor" href="#安装-tomcat" aria-hidden="true">#</a> 安装 tomcat</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 官方文档解释</span>
<span class="token comment">## -it ：交互模式</span>
<span class="token comment">## --rm：容器启动成功并退出以后容器就自动移除，一般在测试情况下使用！</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> tomcat:9.0

<span class="token comment">## 1、下载tomcat镜像</span>
<span class="token function">docker</span> pull tomcat

<span class="token comment">## 2、启动</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">--name</span> tomcat9 tomcat

<span class="token comment">## 3、进入tomcat</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> tomcat9 /bin/bash
<span class="token comment">## 可以使用容器卷将容器内文件和 Linux 进行映射挂载</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="安装-mysql" tabindex="-1"><a class="header-anchor" href="#安装-mysql" aria-hidden="true">#</a> 安装 mysql</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 1、搜索镜像</span>
<span class="token function">docker</span> search mysql

<span class="token comment">## 2、拉取镜像</span>
<span class="token function">docker</span> pull mysql:5.7

<span class="token comment">## 3、启动容器 -e 环境变量！</span>
<span class="token comment">## 注意： mysql的数据应该不丢失！先体验下 -v 挂载卷！ 参考官方文档</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">3310</span>:3306 <span class="token parameter variable">-v</span> /home/mysql/conf:/etc/mysql/conf.d <span class="token parameter variable">-v</span> /home/mysql/data:/var/lib/mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token parameter variable">--name</span> mysql01 mysql:5.7

<span class="token comment">## 4、使用本地的sqlyog连接测试一下 3310</span>

<span class="token comment">## 5、查看本地的 /home/mysql 目录</span>
<span class="token builtin class-name">pwd</span>
<span class="token comment">#/home/mysql/data</span>
<span class="token function">ls</span>
<span class="token comment">## 可以看到我们刚刚建立的mysql数据库在本地存储着</span>

<span class="token comment">## 6、删除mysql容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> mysql01 <span class="token comment">## 删除容器，然后发现远程连接失败！</span>
<span class="token function">ls</span>
<span class="token comment">## 可以看到我们刚刚建立的mysql数据库在本地存储着</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="部署-es-kibana" tabindex="-1"><a class="header-anchor" href="#部署-es-kibana" aria-hidden="true">#</a> 部署 es + kibana</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 我们启动es这种容器需要考虑几个问题</span>
<span class="token comment"># 1、端口暴露问题 9200、9300</span>
<span class="token comment"># 2、数据卷的挂载问题 data、plugins、conf</span>
<span class="token comment"># 3、吃内存 - "ES_JAVA_OPTS=-Xms512m -Xmx512m"</span>

<span class="token comment">## 扩展命令</span>
<span class="token function">docker</span> stats 容器id <span class="token comment">## 查看容器的cpu内存和网络状态</span>

<span class="token comment">## 1、启动es测试</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> elasticsearch <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token parameter variable">-p</span> <span class="token number">9300</span>:9300 <span class="token parameter variable">-e</span> <span class="token string">"discovery.type=single-node"</span> elasticsearch:7.6.2

<span class="token comment">## 2、启动之后很卡，使用 docker stats 容器id 查看下cpu状态 ，发现占用的很大</span>
CONTAINER ID NAME          CPU % MEM USAGE / LIMIT   MEM %
249ae46da625 elasticsearch <span class="token number">0.00</span>% <span class="token number">1</span>.036GiB / <span class="token number">1</span>.716GiB <span class="token number">60.37</span>%

<span class="token comment">## 3、测试访问</span>
<span class="token function">curl</span> localhost:9200

<span class="token comment">## 4、增加上内存限制启动</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> elasticsearch <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token parameter variable">-p</span> <span class="token number">9300</span>:9300 <span class="token parameter variable">-e</span> <span class="token string">"discovery.type=single-node"</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">ES_JAVA_OPTS</span><span class="token operator">=</span><span class="token string">"-Xms64m -Xmx512m"</span> elasticsearch:7.6.2

<span class="token comment">## 5、启动之后，使用 docker stats 查看下cpu状态</span>
CONTAINER ID NAME          CPU % MEM USAGE / LIMIT MEM %
d2860684e7e4 elasticsearch <span class="token number">0.24</span>% <span class="token number">358</span>.3MiB / <span class="token number">1</span>.716GiB <span class="token number">20.40</span>%

<span class="token comment">## 6、测试访问，效果一样，ok！</span>
<span class="token function">curl</span> localhost:9200
<span class="token comment">## 思考：如果我们要使用 kibana , 如果配置连接上我们的es呢？网络该如何配置呢？见网络部分</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p><img src="@source/Back/imgs/Docker/2.png" alt="2"></p>
<h3 id="部署-redis-集群" tabindex="-1"><a class="header-anchor" href="#部署-redis-集群" aria-hidden="true">#</a> 部署 Redis 集群</h3>
<p><img src="@source/Back/imgs/Docker/25.png" alt="25"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 创建网卡</span>
<span class="token function">docker</span> network create redis <span class="token parameter variable">--subnet</span> <span class="token number">172.38</span>.0.0/16

<span class="token comment">## 通过脚本创建六个redis配置</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">port</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">seq</span> <span class="token number">1</span> <span class="token number">6</span><span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
<span class="token keyword">do</span> <span class="token punctuation">\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mydata/redis/node-<span class="token variable">${port}</span>/conf
<span class="token function">touch</span> /mydata/redis/node-<span class="token variable">${port}</span>/conf/redis.conf
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span>/mydata/redis/node-<span class="token variable">${port}</span>/conf/redis.conf</span>
port 6379
bind 0 .0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172 .38.0.1<span class="token variable">${port}</span>
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF</span>
<span class="token keyword">done</span>

<span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">637</span> <span class="token variable">${port}</span>:6379 <span class="token parameter variable">-p</span> <span class="token number">1637</span> <span class="token variable">${port}</span>:16379 <span class="token parameter variable">--name</span> redis-<span class="token variable">${port}</span> <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mydata/redis/node-<span class="token variable">${port}</span>/data:/data <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mydata/redis/node-<span class="token variable">${port}</span>/conf/redis.conf:/etc/redis/redis.conf <span class="token punctuation">\</span>
<span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span> redis <span class="token parameter variable">--ip</span> <span class="token number">172</span> .38.0.1<span class="token variable">${port}</span> redis:5.0.9-alpine3.11 redis-server/etc/redis/redis.conf<span class="token punctuation">;</span> <span class="token punctuation">\</span>

<span class="token comment">## 启动 6 个容器</span>
<span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">6371</span> :6379 <span class="token parameter variable">-p</span> <span class="token number">16371</span> :16379 <span class="token parameter variable">--name</span> redis-1 <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mydata/redis/node-1/data:/data <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mydata/redis/node-1/conf/redis.conf:/etc/redis/redis.conf <span class="token punctuation">\</span>
<span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span> redis <span class="token parameter variable">--ip</span> <span class="token number">172</span> .38.0.11 redis:5.0.9-alpine3.11 redis-server/etc/redis/redis.conf

<span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">6376</span> :6379 <span class="token parameter variable">-p</span> <span class="token number">16376</span> :16379 <span class="token parameter variable">--name</span> redis-6 <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mydata/redis/node-6/data:/data <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mydata/redis/node-6/conf/redis.conf:/etc/redis/redis.conf <span class="token punctuation">\</span>
<span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span> redis <span class="token parameter variable">--ip</span> <span class="token number">172</span> .38.0.16 redis:5.0.9-alpine3.11 redis-server/etc/redis/redis.conf

<span class="token comment">## 进入一个redis，注意这里是 sh命令</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis-1 /bin/sh

<span class="token comment">## 创建集群</span>
redis-cli <span class="token parameter variable">--cluster</span> create <span class="token number">172.38</span>.0.11:6379 <span class="token number">172.38</span>.0.12:6379 <span class="token number">172.38</span>.0.13:6379 <span class="token number">172.38</span>.0.14:6379 <span class="token number">172.38</span>.0.15:6379 <span class="token number">172.38</span>.0.16:6379 --cluster-replicas <span class="token number">1</span>

<span class="token comment">## 连接集群</span>
redis-cli <span class="token parameter variable">-c</span>

<span class="token comment">## 查看集群信息</span>
cluster info

<span class="token comment">## 查看节点</span>
cluster nodes

<span class="token comment">## set a b</span>
<span class="token comment">## 停止存值的容器</span>
<span class="token comment">## 然后再次get a，发现依旧可以获取值</span>
<span class="token comment">## 查看节点，发现高可用完全没问题</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><h2 id="docker-镜像" tabindex="-1"><a class="header-anchor" href="#docker-镜像" aria-hidden="true">#</a> Docker 镜像</h2>
<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h3>
<blockquote>
<p>镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含
运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。</p>
</blockquote>
<h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3>
<blockquote>
<p>Docker 镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部！<br>
这一层就是我们通常说的容器层，容器之下的都叫镜像层！</p>
</blockquote>
<h3 id="镜像-commit" tabindex="-1"><a class="header-anchor" href="#镜像-commit" aria-hidden="true">#</a> 镜像 Commit</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> commit 提交容器副本使之成为一个新的镜像！
<span class="token comment">## 语法</span>
<span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">"提交的描述信息"</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">"作者"</span> 容器id 要创建的目标镜像名:<span class="token punctuation">[</span>标签名<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> DockerFile</h2>
<blockquote>
<p>微服务打包成镜像流程：开发应用=&gt;DockerFile=&gt;打包为镜像=&gt;上传到仓库（私有仓库，公有仓库）=&gt; 下载镜像 =&gt; 启动<br></p>
</blockquote>
<p><img src="@source/Back/imgs/Docker/21.png" alt="21"></p>
<h3 id="dockerfile-概念" tabindex="-1"><a class="header-anchor" href="#dockerfile-概念" aria-hidden="true">#</a> DockerFile 概念</h3>
<p>dockerfile 是用来构建 Docker 镜像的构建文件，是由一系列命令和参数构成的脚本。<br>
构建步骤：<br></p>
<ul>
<li>1、编写 DockerFile 文件</li>
<li>2、docker build 构建镜像</li>
<li>3、docker run</li>
</ul>
<p><a href="https://hub.docker.com/_/centos" target="_blank" rel="noopener noreferrer">查看 centos DockerFile 文件<ExternalLinkIcon/></a></p>
<h3 id="dockerfile-构建过程" tabindex="-1"><a class="header-anchor" href="#dockerfile-构建过程" aria-hidden="true">#</a> DockerFile 构建过程</h3>
<h4 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h4>
<ol>
<li>每条保留字指令都必须为大写字母且后面要跟随至少一个参数</li>
<li>指令按照从上到下，顺序执行</li>
<li><code>##</code> 表示注释</li>
<li>每条指令都会创建一个新的镜像层，并对镜像进行提交</li>
</ol>
<h4 id="流程" tabindex="-1"><a class="header-anchor" href="#流程" aria-hidden="true">#</a> 流程</h4>
<ol>
<li>docker 从基础镜像运行一个容器</li>
<li>执行一条指令并对容器做出修改</li>
<li>执行类似 docker commit 的操作提交一个新的镜像层</li>
<li>Docker 再基于刚提交的镜像运行一个新容器</li>
<li>执行 dockerfile 中的下一条指令直到所有指令都执行完成！</li>
</ol>
<h3 id="dockerfile-指令" tabindex="-1"><a class="header-anchor" href="#dockerfile-指令" aria-hidden="true">#</a> DockerFile 指令</h3>
<table>
<thead>
<tr>
<th>指令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>FROM</td>
<td>基础镜像，当前新镜像是基于哪个镜像的</td>
</tr>
<tr>
<td>MAINTAINER</td>
<td>镜像维护者的姓名混合邮箱地址</td>
</tr>
<tr>
<td>RUN</td>
<td>容器构建时需要运行的命令</td>
</tr>
<tr>
<td>EXPOSE</td>
<td>当前容器对外保留出的端口</td>
</tr>
<tr>
<td>WORKDIR</td>
<td>指定在创建容器后，终端默认登录的进来工作目录，一个落脚点</td>
</tr>
<tr>
<td>ENV</td>
<td>用来在构建镜像过程中设置环境变量</td>
</tr>
<tr>
<td>ADD</td>
<td>将宿主机目录下的文件拷贝进镜像且 ADD 命令会自动处理 URL 和解压 tar 压缩包</td>
</tr>
<tr>
<td>COPY</td>
<td>类似 ADD，拷贝文件和目录到镜像中！</td>
</tr>
<tr>
<td>VOLUME</td>
<td>容器数据卷，用于数据保存和持久化工作</td>
</tr>
<tr>
<td>CMD</td>
<td>指定一个容器启动时要运行的命令，dockerFile 中可以有多个 CMD 指令，但只有最后一个生效！</td>
</tr>
<tr>
<td>ENTRYPOINT</td>
<td>指定一个容器启动时要运行的命令！和 CMD 一样</td>
</tr>
<tr>
<td>ONBUILD</td>
<td>当构建一个被继承的 DockerFile 时运行命令，父镜像在被子镜像继承后，父镜像的 ONBUILD 被触发</td>
</tr>
</tbody>
</table>
<h3 id="实战测试" tabindex="-1"><a class="header-anchor" href="#实战测试" aria-hidden="true">#</a> 实战测试</h3>
<p><code>Docker Hub</code> 中 99% 的镜像都是通过在 base 镜像（Scratch）中安装和配置需要的软件构建出来的</p>
<h4 id="自定义镜像" tabindex="-1"><a class="header-anchor" href="#自定义镜像" aria-hidden="true">#</a> 自定义镜像</h4>
<p><strong>自定义一个 centos，编写 DockerFile，使我们自己的镜像具备如下：登陆后的默认路径、vim 编辑器、查看网络配置 ifconfig 支持</strong></p>
<p><strong>1、编写 DockerFile</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> dockerfile-test
<span class="token function">vim</span> mydockerfile-centos <span class="token comment">## 编辑文件</span>
<span class="token function">cat</span> mydockerfile-centos
<span class="token comment">## FROM centos</span>
<span class="token comment">## MAINTAINER kuangshen&lt;24736743@qq.com></span>

<span class="token comment">## ENV MYPATH /usr/local</span>
<span class="token comment">## WORKDIR $MYPATH</span>

<span class="token comment">## RUN yum -y install vim</span>
<span class="token comment">## RUN yum -y install net-tools</span>

<span class="token comment">## EXPOSE 80</span>

<span class="token comment">## CMD echo $MYPATH</span>
<span class="token comment">## CMD echo "----------end--------"</span>
<span class="token comment">## CMD /bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>2、构建</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-f</span> dockerfile地址 - t 新镜像名字:TAG.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>会看到 docker build 命令最后有一个. 表示当前目录</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-f</span> mydockerfile-centos <span class="token parameter variable">-t</span> mycentos:0.1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>3、运行</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> 新镜像名字:TAG
<span class="token comment">## 测试 vim ifconfig 命令</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>4、列出镜像地的变更历史</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">history</span> 镜像名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="cmd-命令" tabindex="-1"><a class="header-anchor" href="#cmd-命令" aria-hidden="true">#</a> CMD 命令</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 1、构建dockerfile</span>
<span class="token function">vim</span> dockerfile-cmd-test
<span class="token function">cat</span> dockerfile-cmd-test
<span class="token comment">## FROM centos</span>
<span class="token comment">## CMD [ "ls", "-a" ]</span>

<span class="token comment">## 2、build 镜像</span>
<span class="token function">docker</span> build <span class="token parameter variable">-f</span> dockerfile-cmd-test <span class="token parameter variable">-t</span> cmdtest.

<span class="token comment">## 3、执行 可以看到文件目录</span>
<span class="token function">docker</span> run 554bc6952657

<span class="token comment">## 4、如果我们希望用 -l 列表展示信息，我们就需要加上 -l参数</span>
<span class="token function">docker</span> run cmdtest <span class="token parameter variable">-l</span>

<span class="token comment">## 报错，executable file not found。</span>
<span class="token comment">## 跟在镜像名后面的是 command，运行时会替换 CMD 的默认值。</span>
<span class="token comment">## 必须重新完整的输入这个命令。</span>
<span class="token function">docker</span> run cmdtest <span class="token function">ls</span> <span class="token parameter variable">-al</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="entrypoint-命令" tabindex="-1"><a class="header-anchor" href="#entrypoint-命令" aria-hidden="true">#</a> ENTRYPOINT 命令</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 1、2、3 同 CMD</span>
<span class="token comment">## 4、测试-l参数，发现可以直接使用，这里就是一种追加。</span>
<span class="token function">docker</span> run entrypointtest <span class="token parameter variable">-l</span>
<span class="token comment">## 可以看到文件列表</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<p>CMD 和 ENTRYPOINT 的区别</p>
<p>两个命令都是指定一个容器启动时要运行的命令<br>
CMD：Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数替换！<br>
ENTRYPOINT：docker run 之后的参数会被当做参数传递给 ENTRYPOINT，之后形成新的命令组合！<br></p>
</blockquote>
<h4 id="自定义镜像-tomcat" tabindex="-1"><a class="header-anchor" href="#自定义镜像-tomcat" aria-hidden="true">#</a> 自定义镜像 tomcat</h4>
<ol>
<li><code>mkdir -p kuangshen/build/tomcat</code></li>
<li>在上述目录下 <code>touch read.txt</code></li>
<li>将 <code>JDK</code> 和 <code>tomcat</code> 安装的压缩包拷贝进上一步目录</li>
<li>在 <code>/kuangshen/build/tomcat</code> 目录下新建一个 <code>Dockerfile</code> 文件</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## vim Dockerfile</span>

FROM centos
MAINTAINER kuangshen<span class="token operator">&lt;</span><span class="token number">24736743</span>@qq.com<span class="token operator">></span>
<span class="token comment">#把宿主机当前上下文的read.txt拷贝到容器/usr/local/路径下</span>
COPY read.txt /usr/local/cincontainer.txt
<span class="token comment">#把java与tomcat添加到容器中</span>
ADD jdk-8u11-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.22.tar.gz /usr/local/
<span class="token comment">#安装vim编辑器</span>
RUN yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">vim</span>
<span class="token comment">#设置工作访问时候的WORKDIR路径，登录落脚点</span>
ENV MYPATH /usr/local
WORKDIR <span class="token variable">$MYPATH</span>
<span class="token comment">#配置java与tomcat环境变量</span>
ENV JAVA_HOME /usr/local/jdk1.8.0_11
ENV CLASSPATH <span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.22
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.22
ENV <span class="token environment constant">PATH</span> <span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$CATALINA_HOME</span>/lib:<span class="token variable">$CATALINA_HOME</span>/bin
<span class="token comment">#容器运行时监听的端口</span>
EXPOSE <span class="token number">8080</span>
<span class="token comment">#启动时运行tomcat</span>
<span class="token comment">## ENTRYPOINT ["/usr/local/apache-tomcat-9.0.22/bin/startup.sh" ]</span>
<span class="token comment">## CMD ["/usr/local/apache-tomcat-9.0.22/bin/catalina.sh","run"]</span>
CMD /usr/local/apache-tomcat-9.0.22/bin/startup.sh <span class="token operator">&amp;&amp;</span> <span class="token function">tail</span> <span class="token parameter variable">-F</span>
/usr/local/apache-tomcat-9.0.22/bin/logs/catalina.out
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p><strong>当前文件状态</strong></p>
<p><img src="@source/Back/imgs/Docker/14.png" alt="14"></p>
<p><strong>1. 构建镜像</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> diytomcat.

<span class="token comment">## 查看确定构建完毕！</span>
<span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>2. 运行启动 run</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">9090</span> :8080 <span class="token parameter variable">--name</span> mydiytomcat <span class="token parameter variable">-v</span> /home/kuangshen/build/tomcat/test:/usr/local/apache-tomcat-9.0.22/webapps/test <span class="token parameter variable">-v</span> /home/kuangshen/build/tomcat/tomcat9logs/:/usr/local/apache-tomcat-9.0.22/logs <span class="token parameter variable">--privileged</span><span class="token operator">=</span>true diytomcat
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="@source/Back/imgs/Docker/13.png" alt="13"></p>
<blockquote>
<p>备注：Docker 挂载主机目录 Docker 访问出现 cannot open directory .: Permission denied<br>
解决办法：在挂载目录后多加一个--privileged=true 参数即可</p>
</blockquote>
<p><strong>3. 验证测试访问！</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> localhost:9090
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>4. 查看日志</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> tomcat9logs/
<span class="token function">cat</span> catalina.out
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="发布镜像" tabindex="-1"><a class="header-anchor" href="#发布镜像" aria-hidden="true">#</a> 发布镜像</h3>
<h4 id="dockerhub" tabindex="-1"><a class="header-anchor" href="#dockerhub" aria-hidden="true">#</a> DockerHub</h4>
<p><strong><a href="https://hub.docker.com/signup" target="_blank" rel="noopener noreferrer">注册 dockerhub<ExternalLinkIcon/></a> ，需要有一个账号</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 1、查看登录命令</span>
<span class="token function">docker</span> login <span class="token parameter variable">--help</span>
<span class="token comment">## 2、登录</span>
<span class="token function">docker</span> login <span class="token parameter variable">-u</span> kuangshen
<span class="token comment">## 3、将镜像发布出去</span>
<span class="token function">docker</span> push kuangshen/diytomcat:1.0

<span class="token comment">## 拒绝：请求的资源访问被拒绝</span>
denied: requested access to the resource is denied

<span class="token comment">## 问题：本地镜像名无帐号信息，解决加 tag即可</span>
<span class="token function">docker</span> tag 251ca4419332 kuangshen/diytomcat:1.0

<span class="token comment">## 再次 push， ok</span>
<span class="token function">docker</span> push kuangshen/diytomcat:1.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="阿里云镜像服务" tabindex="-1"><a class="header-anchor" href="#阿里云镜像服务" aria-hidden="true">#</a> 阿里云镜像服务</h4>
<ol>
<li>登录阿里云</li>
<li>找到容器镜像服务</li>
<li>创建命名空间</li>
<li>创建镜像仓库</li>
<li>点击进入这个镜像仓库，可以看到所有的信息</li>
<li>测试推送发布</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 1、登录阿里云</span>
<span class="token function">docker</span> login <span class="token parameter variable">--username</span><span class="token operator">=</span><span class="token number">18225148644</span> registry.cn-beijing.aliyuncs.com
<span class="token comment">## 2、设置 tag</span>
<span class="token function">docker</span> tag 251ca4419332 registry.cn-beijing.aliyuncs.com/bilibili-kuangshen/kuangshen-test:v1.0
<span class="token comment">## 3、推送命令</span>
<span class="token function">docker</span> push registry.cn-beijing.aliyuncs.com/bilibili-kuangshen/kuangshen-test:v1.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="7">
<li>在阿里云镜像仓库查看效果！</li>
</ol>
<h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> Docker Compose</h2>
<p><a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose 官方文档<ExternalLinkIcon/></a></p>
<p>Compose 是用于定义和运行多容器 Docker 应用程序的工具。</p>
<p>Compose 使用的三个步骤：</p>
<ol>
<li>使用 Dockerfile 定义应用程序的环境。</li>
<li>使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。</li>
<li>最后，执行 docker-compose up 命令来启动并运行整个应用程序。</li>
</ol>
<h3 id="compose-安装" tabindex="-1"><a class="header-anchor" href="#compose-安装" aria-hidden="true">#</a> Compose 安装</h3>
<p>Linux 上我们可以从 Github 上下载它的二进制包来使用，<a href="https://github.com/docker/compose/releases" target="_blank" rel="noopener noreferrer">最新发行的版本地址<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 1、下载 Docker Compose</span>
<span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token string">"https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>"</span> <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose
<span class="token comment"># 要安装其他版本的 Compose，请替换 v2.2.2。</span>
<span class="token comment"># 高速安装 Docker Compose</span>
<span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-L</span> https://get.daocloud.io/docker/compose/releases/download/v2.4.1/docker-compose-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">`</span></span>-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">`</span></span> <span class="token operator">></span> /usr/local/bin/docker-compose

<span class="token comment"># 2、可执行权限应用于二进制文件</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/local/bin/docker-compose

<span class="token comment"># 3、创建软链</span>
<span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/bin/docker-compose /usr/bin/docker-compose

<span class="token comment"># 4、测试是否安装成功</span>
<span class="token function">docker-compose</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="docker-compose-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-compose-常用命令" aria-hidden="true">#</a> Docker Compose 常用命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>docker-compose build</code></td>
<td>使用默认的 <code>docker-compose.yml</code> 文件构建镜像</td>
</tr>
<tr>
<td><code>docker-compose build --no-cache</code></td>
<td>不使用缓存的方式构建镜像</td>
</tr>
<tr>
<td><code>docker-compose build -f docker-compose1.yml</code></td>
<td>使用指定的 <code>docker-compose1.yml</code> 文件模板构建镜像</td>
</tr>
<tr>
<td><code>docker-compose images</code></td>
<td>列出由 Compose 文件构建的镜像</td>
</tr>
<tr>
<td><code>docker-compose up -d</code></td>
<td>启动所有编排容器服务</td>
</tr>
<tr>
<td><code>docker-compose ps</code></td>
<td>查看正在运行中的容器</td>
</tr>
<tr>
<td><code>docker-compose ps -a</code></td>
<td>查看所有编排容器，包括已停止的容器</td>
</tr>
<tr>
<td><code>docker-compose exec nginx bash</code></td>
<td>进入指定容器执行命令</td>
</tr>
<tr>
<td><code>docker-compose exec web python manage.py migrate --noinput</code></td>
<td>在指定容器内执行 Django 数据库迁移命令</td>
</tr>
<tr>
<td><code>docker-compose logs -f web</code></td>
<td>查看 web 容器的实时日志</td>
</tr>
<tr>
<td><code>docker-compose down</code></td>
<td>停止所有由 <code>up</code> 命令启动的容器</td>
</tr>
<tr>
<td><code>docker-compose down -v</code></td>
<td>停止所有由 <code>up</code> 命令启动的容器，并移除数据卷</td>
</tr>
<tr>
<td><code>docker-compose restart web</code></td>
<td>重新启动停止的 web 服务容器</td>
</tr>
<tr>
<td><code>docker-compose pause web</code></td>
<td>暂停 web 容器</td>
</tr>
<tr>
<td><code>docker-compose unpause web</code></td>
<td>恢复 web 容器</td>
</tr>
<tr>
<td><code>docker-compose rm web</code></td>
<td>删除 web 容器（在删除前必须先停止容器）</td>
</tr>
<tr>
<td><code>docker-compose top</code></td>
<td>查看各个服务容器内正在运行的进程</td>
</tr>
</tbody>
</table>
<h3 id="docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#docker-compose-yml" aria-hidden="true">#</a> docker-compose.yml</h3>
<p>使用 Docker Compose 配置的多个容器服务的示例。其中包括了 MySQL 和 Redis 服务。每个服务都有相应的配置，包括容器名称、镜像、构建信息、环境变量、挂载目录、端口映射等。通过 Docker Compose 可以方便地管理和启动这些容器服务。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"2.1"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">lottery-mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> lottery<span class="token punctuation">-</span>mysql
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./mysql   <span class="token comment"># MySQL服务的构建上下文路径</span>
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile   <span class="token comment"># MySQL服务的Dockerfile路径</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"3306:3306"</span>   <span class="token comment"># 映射MySQL服务的默认端口号</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./mysql/conf<span class="token punctuation">:</span>/etc/mysql/conf.d   <span class="token comment"># 挂载MySQL服务的配置文件目录</span>
      <span class="token punctuation">-</span> ./mysql/logs<span class="token punctuation">:</span>/logs   <span class="token comment"># 挂载MySQL服务的日志目录</span>
      <span class="token punctuation">-</span> ./mysql/data<span class="token punctuation">:</span>/var/lib/mysql   <span class="token comment"># 挂载MySQL服务的数据目录</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
      <span class="token string">'mysqld'</span><span class="token punctuation">,</span>
      <span class="token string">'--innodb-buffer-pool-size=80M'</span><span class="token punctuation">,</span>
      <span class="token string">'--character-set-server=utf8mb4'</span><span class="token punctuation">,</span>
      <span class="token string">'--collation-server=utf8mb4_bin'</span><span class="token punctuation">,</span>
      <span class="token string">'--default-time-zone=+8:00'</span><span class="token punctuation">,</span>
      <span class="token string">'--lower-case-table-names=1'</span>
    <span class="token punctuation">]</span>   <span class="token comment"># 定义MySQL服务的启动命令及参数</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token string">'自己的数据库密码 '</span>   <span class="token comment"># 设置MySQL服务的root用户密码，请替换为你自己的密码</span>

  <span class="token key atrule">lottery-redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> lottery<span class="token punctuation">-</span>redis
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./redis   <span class="token comment"># Redis服务的构建上下文路径</span>
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile   <span class="token comment"># Redis服务的Dockerfile路径</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"6379:6379"</span>   <span class="token comment"># 映射Redis服务的默认端口号</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./redis/conf/redis.conf<span class="token punctuation">:</span>/home/lottery/redis/redis.conf   <span class="token comment"># 挂载Redis服务的配置文件</span>
      <span class="token punctuation">-</span> ./redis/data<span class="token punctuation">:</span>/data   <span class="token comment"># 挂载Redis服务的数据目录</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server /home/lottery/redis/redis.conf   <span class="token comment"># 定义Redis服务的启动命令及参数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h2 id="容器数据卷" tabindex="-1"><a class="header-anchor" href="#容器数据卷" aria-hidden="true">#</a> 容器数据卷</h2>
<h3 id="概述-1" tabindex="-1"><a class="header-anchor" href="#概述-1" aria-hidden="true">#</a> 概述</h3>
<blockquote>
<p>为了防止在删除容器的时候造成数据丢失，Docker 提供了数据卷（Volume）这个功能，数据卷是目录或文件，存在于一个或多个容器中，由 Docker 挂载到容器里。
卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此 Docker 不会在容器删除时删除其挂载的数据卷。</p>
</blockquote>
<h3 id="特点-1" tabindex="-1"><a class="header-anchor" href="#特点-1" aria-hidden="true">#</a> 特点</h3>
<ol>
<li>数据卷可在容器之间共享或重用数据</li>
<li>卷中的更改可以直接生效</li>
<li>数据卷中的更改不会包含在镜像的更新中</li>
<li>数据卷的生命周期一直持续到没有容器使用它为止</li>
</ol>
<h3 id="使用数据卷" tabindex="-1"><a class="header-anchor" href="#使用数据卷" aria-hidden="true">#</a> 使用数据卷</h3>
<h4 id="_1-容器中使用命令来添加" tabindex="-1"><a class="header-anchor" href="#_1-容器中使用命令来添加" aria-hidden="true">#</a> 1. 容器中使用命令来添加</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 命令</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-v</span> 宿主机绝对路径目录:容器内目录 镜像名
<span class="token comment">## 测试</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-v</span> /home/ceshi:/home centos /bin/bash

<span class="token comment">## 匿名挂载 -v 容器内路径</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> nginx01 <span class="token parameter variable">-v</span> /etc/nginx nginx

<span class="token comment">## 匿名挂载的缺点，就是不好维护，通常使用命令 docker volume维护</span>
<span class="token function">docker</span> volume <span class="token function">ls</span>

<span class="token comment">## 具名挂载 -v 卷名:/容器内路径</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> nginx02 <span class="token parameter variable">-v</span> nginxconfig:/etc/nginx nginx

<span class="token comment">## 查看挂载的路径</span>
<span class="token function">docker</span> volume inspect nginxconfig
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token string">"CreatedAt"</span><span class="token builtin class-name">:</span> <span class="token string">"2020-05-13T17:23:00+08:00"</span>,
    <span class="token string">"Driver"</span><span class="token builtin class-name">:</span> <span class="token string">"local"</span>,
    <span class="token string">"Labels"</span><span class="token builtin class-name">:</span> null,
    <span class="token string">"Mountpoint"</span><span class="token builtin class-name">:</span> <span class="token string">"/var/lib/docker/volumes/nginxconfig/_data"</span>,
    <span class="token string">"Name"</span><span class="token builtin class-name">:</span> <span class="token string">"nginxconfig"</span>,
    <span class="token string">"Options"</span><span class="token builtin class-name">:</span> null,
    <span class="token string">"Scope"</span><span class="token builtin class-name">:</span> <span class="token string">"local"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token comment">## 所有的docker容器内的卷，没有指定目录的情况下都是在/var/1ib/docker/volumes/xxxx/_data</span>

<span class="token comment">## 怎么判断挂载的是卷名而不是本机目录名？ 不是/开始就是卷名，是/开始就是目录名</span>
<span class="token comment">## 指定容器对我们挂载出来的内容的读写权限</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> nginx02 <span class="token parameter variable">-v</span> nginxconfig:/etc/nginx:ro nginx
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> nginx02 <span class="token parameter variable">-v</span> nginxconfig:/etc/nginx:rw nginx
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="_2-docker-file-添加数据卷" tabindex="-1"><a class="header-anchor" href="#_2-docker-file-添加数据卷" aria-hidden="true">#</a> 2. Docker File 添加数据卷</h4>
<blockquote>
<p>DockerFile 是用来构建 Docker 镜像的构建文件，是由一些列命令和参数构成的脚本。</p>
</blockquote>
<p><strong>测试：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 1、我们在宿主机 /home 目录下新建一个 docker-test-volume文件夹</span>
<span class="token function">mkdir</span> docker-test-volume
<span class="token comment">## 2、编写DockerFile文件</span>
<span class="token builtin class-name">cd</span> docker-test-volume
<span class="token function">vim</span> dockerfile1
<span class="token function">cat</span> dockerfile1

<span class="token comment">## volume test</span>
FROM centos
VOLUME <span class="token punctuation">[</span><span class="token string">"/dataVolumeContainer1"</span>,<span class="token string">"/dataVolumeContainer2"</span><span class="token punctuation">]</span>
CMD <span class="token builtin class-name">echo</span> <span class="token string">"-------end------"</span>
CMD /bin/bash

<span class="token comment">## 3、build后生成镜像，获得一个新镜像 kuangshen/centos</span>

<span class="token function">docker</span> build <span class="token parameter variable">-f</span> /home/docker-test-volume/dockerfile1 <span class="token parameter variable">-t</span> kuangshen/centos. <span class="token comment">#注意最后有个.</span>

<span class="token comment">## 4、启动容器</span>
<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker run -it 0e97e1891a3d /bin/bash #启动容器</span>
<span class="token punctuation">[</span>root@f5824970eefc /<span class="token punctuation">]</span><span class="token comment">## ls -l</span>
total <span class="token number">56</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">7</span> May <span class="token number">11</span>  <span class="token number">2019</span> bin -<span class="token operator">></span> usr/bin
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> May <span class="token number">11</span> <span class="token number">11</span> :55 dataVolumeContainer1 <span class="token comment">## 数据卷目录</span>
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> May <span class="token number">11</span> <span class="token number">11</span> :55 dataVolumeContainer2 <span class="token comment">## 数据卷目录</span>
drwxr-xr-x <span class="token number">5</span> root root <span class="token number">360</span> May <span class="token number">11</span> <span class="token number">11</span> :55 dev
drwxr-xr-x <span class="token number">1</span> root root <span class="token number">4096</span> May <span class="token number">11</span> <span class="token number">11</span> :55 etc
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> May <span class="token number">11</span>  <span class="token number">2019</span> home
<span class="token punctuation">..</span>.

<span class="token comment">## 问题:通过上述步骤，容器内的卷目录地址就已经知道了，但是对应的主机目录地址在哪里呢？</span>

<span class="token comment">## 5、我们在数据卷中新建一个文件</span>
<span class="token punctuation">[</span>root@f5824970eefc dataVolumeContainer1<span class="token punctuation">]</span><span class="token comment">## pwd</span>
/dataVolumeContainer1
<span class="token punctuation">[</span>root@f5824970eefc dataVolumeContainer1<span class="token punctuation">]</span><span class="token comment">## touch container.txt</span>
<span class="token punctuation">[</span>root@f5824970eefc dataVolumeContainer1<span class="token punctuation">]</span><span class="token comment">## ls -l</span>
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">11</span> :58 container.txt

<span class="token comment">## 6、查看下这个容器的信息</span>
<span class="token function">docker</span> inspect 0e97e1891a3d

<span class="token comment">## 查看输出的Volumes</span>
<span class="token string">"Volumes"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
<span class="token string">"/dataVolumeContainer1"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
<span class="token string">"/dataVolumeContainer2"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>,

<span class="token comment">## 7、这个卷在主机对应的默认位置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p><img src="@source/Back/imgs/Docker/9.png" alt="9"></p>
<blockquote>
<p>注意：如果访问出现了 cannot open directory: Permission denied
解决办法：在挂载目录后多加一个 --privileged=true 参数即可</p>
</blockquote>
<h3 id="数据卷容器" tabindex="-1"><a class="header-anchor" href="#数据卷容器" aria-hidden="true">#</a> 数据卷容器</h3>
<blockquote>
<p>命名的容器挂载数据卷，其他容器通过挂载这个（父容器）实现数据共享，挂载数据卷的容器，称之为数据卷容器。<br>
我们使用上一步的镜像：kuangshen/centos 为模板，运行容器 docker01，docker02，docker03，他们都会具有容器卷</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token string">"/dataVolumeContainer1"</span>
<span class="token string">"/dataVolumeContainer2"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>我们来测试下，容器间传递共享</p>
<p><strong>1、先启动一个父容器 docker01，然后在 dataVolumeContainer2 新增文件</strong></p>
<p><img src="@source/Back/imgs/Docker/10.png" alt="10"></p>
<p><img src="@source/Back/imgs/Docker/11.png" alt="11"></p>
<blockquote>
<p>退出不停止：ctrl+P+Q</p>
</blockquote>
<p><strong>2、创建 docker02，docker03 让他们继承 docker01 --volumes-from</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker run -it --name docker02 --volumes-from docker01 kuangshen/centos</span>
<span class="token punctuation">[</span>root@ea4c82779077 /<span class="token punctuation">]</span><span class="token comment">## cd /dataVolumeContainer2</span>
<span class="token punctuation">[</span>root@ea4c82779077 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls</span>
docker01.txt
<span class="token punctuation">[</span>root@95164598b306 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## touch docker02.txt</span>
<span class="token punctuation">[</span>root@95164598b306 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls</span>
docker01.txt docker02.txt

<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker run -it --name docker03 --volumes-from docker01 kuangshen/centos</span>
<span class="token punctuation">[</span>root@ea4c82779077 /<span class="token punctuation">]</span><span class="token comment">## cd /dataVolumeContainer2</span>
<span class="token punctuation">[</span>root@ea4c82779077 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls</span>
docker01.txt docker02.txt
<span class="token punctuation">[</span>root@95164598b306 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## touch docker03.txt</span>
<span class="token punctuation">[</span>root@95164598b306 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls</span>
docker01.txt docker02.txt docker03.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>3、回到 docker01 发现可以看到 02 和 03 添加的共享文件</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker attach docker01</span>
<span class="token punctuation">[</span>root@799b6ea5db7c dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls -l</span>
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :20 docker01.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :22 docker02.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :24 docker03.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>4、删除 docker01，docker02 修改后 docker03 还能不能访问</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker rm -f docker01</span>
docker01
<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker attach docker02</span>
<span class="token punctuation">[</span>root@ea4c82779077 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls -l</span>
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :20 docker01.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :22 docker02.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :24 docker03.txt
<span class="token punctuation">[</span>root@ea4c82779077 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## touch docker02-update.txt</span>
<span class="token punctuation">[</span>root@ea4c82779077 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls -a</span>
<span class="token builtin class-name">.</span> <span class="token punctuation">..</span> docker01.txt docker02.txt docker02-update.txt docker03.txt
<span class="token comment">## Ctrl+P+Q 退出容器</span>
<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker attach docker03</span>
<span class="token punctuation">[</span>root@95164598b306 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls -l</span>
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :20 docker01.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :22 docker02.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :29 docker02-update.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :24 docker03.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>5、删除 docker02 ，docker03 还能不能访问</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker ps</span>
CONTAINER ID IMAGE
95164598b306 kuangshen/centos
ea4c82779077 kuangshen/centos
<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker rm -f docker02</span>
docker02
<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker attach docker03</span>
<span class="token punctuation">[</span>root@95164598b306 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls -l</span>
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :20 docker01.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :22 docker02.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :29 docker02-update.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :24 docker03.txt
<span class="token punctuation">[</span>root@95164598b306 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## touch docker03-update.txt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>6、新建 docker04 继承 docker03，然后再删除 docker03，看下是否可以访问！</strong></p>
<p><img src="@source/Back/imgs/Docker/12.png" alt="12"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@2119f4f23a92 /<span class="token punctuation">]</span><span class="token comment">## cd dataVolumeContainer2</span>
<span class="token punctuation">[</span>root@2119f4f23a92 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls -l</span>
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :20 docker01.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :22 docker02.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :29 docker02-update.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :32 docker03-update.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :24 docker03.txt

<span class="token comment">## 查看当前运行的容器</span>
<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker ps</span>
CONTAINER ID IMAGE NAMES
2119f4f23a92 kuangshen/centos docker04
95164598b306 kuangshen/centos docker03

<span class="token comment">## 继续删除docker03</span>
<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker rm -f docker03</span>
docker03
<span class="token punctuation">[</span>root@kuangshen docker-test-volume<span class="token punctuation">]</span><span class="token comment">## docker attach docker04</span>
<span class="token punctuation">[</span>root@2119f4f23a92 dataVolumeContainer2<span class="token punctuation">]</span><span class="token comment">## ls -l</span>
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :20 docker01.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :22 docker02.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :29 docker02-update.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :32 docker03-update.txt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">13</span> :24 docker03.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p><strong>7、总结</strong></p>
<blockquote>
<p>容器之间配置信息的传递，数据卷的生命周期一直持续到没有容器使用它为止。<br>
存储在本机的文件则会一直保留！</p>
</blockquote>
<h2 id="docker-网络讲解" tabindex="-1"><a class="header-anchor" href="#docker-网络讲解" aria-hidden="true">#</a> Docker 网络讲解</h2>
<h3 id="docker0-原理" tabindex="-1"><a class="header-anchor" href="#docker0-原理" aria-hidden="true">#</a> Docker0 原理</h3>
<ol>
<li>每一个安装了 Docker 的 linux 主机都有一个 docker0 的虚拟网卡。这是个桥接网卡，使用了 veth-pair 技术！</li>
<li>每启动一个容器，linux 主机就会多了一个虚拟网卡。</li>
</ol>
<blockquote>
<p>启动两个 tomcat 容器观察：
tomcat01 --- linux 主机 vethc8584ea@if122 ---- 容器内 eth0@if123
tomcat02 --- linux 主机 veth021eeea@if124 ---- 容器内 eth0@if125
结论：<strong>容器和容器之间可以通过 ip 互相访问的。</strong></p>
</blockquote>
<p><strong>网络模型图</strong></p>
<p><img src="@source/Back/imgs/Docker/22.png" alt="22"></p>
<blockquote>
<p>结论：tomcat1 和 tomcat2 共用一个路由器。就是 docker0。任何一个容器启动默认都是 docker0 网络。<br>
docker 默认会给容器分配一个可用 ip。<br></p>
</blockquote>
<h3 id="link-不推荐" tabindex="-1"><a class="header-anchor" href="#link-不推荐" aria-hidden="true">#</a> --Link（不推荐）</h3>
<p>如何通过容器名进行访问，实现高可用性</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 使用 --link</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> tomcat03 <span class="token parameter variable">--link</span> tomcat02 tomcat

<span class="token comment">## 这个时候，就可以使用tomcat03 ping通tomcat02 了，反之不可行</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> tomcat03 <span class="token function">ping</span> tomcat02
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>查看 tomcat03 中的 host 配置文件</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> tomcat03 <span class="token function">cat</span> /etc/hosts
<span class="token number">172</span> .18.0.3 tomcat02 b80da266a3ad  <span class="token comment">## 发现tomcat2直接被写在这里</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote>
<p>原理：--link 的时候，直接把需要 link 的主机的域名和 ip 直接配置到了 hosts 文件中。</p>
</blockquote>
<h3 id="自定义网络" tabindex="-1"><a class="header-anchor" href="#自定义网络" aria-hidden="true">#</a> 自定义网络</h3>
<h4 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令" aria-hidden="true">#</a> 基本命令</h4>
<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>docker network connect</code></td>
<td>连接容器到网络</td>
</tr>
<tr>
<td><code>docker network create</code></td>
<td>创建一个新的网络</td>
</tr>
<tr>
<td><code>docker network disconnect</code></td>
<td>断开容器与网络的连接</td>
</tr>
<tr>
<td><code>docker network inspect</code></td>
<td>查看网络的详细信息</td>
</tr>
<tr>
<td><code>docker network ls</code></td>
<td>列出当前存在的网络</td>
</tr>
<tr>
<td><code>docker network prune</code></td>
<td>清理无用的网络</td>
</tr>
<tr>
<td><code>docker network rm</code></td>
<td>删除一个或多个网络</td>
</tr>
</tbody>
</table>
<h4 id="网络模式" tabindex="-1"><a class="header-anchor" href="#网络模式" aria-hidden="true">#</a> 网络模式</h4>
<p><img src="@source/Back/imgs/Docker/23.png" alt="23"></p>
<h4 id="自定义网卡" tabindex="-1"><a class="header-anchor" href="#自定义网卡" aria-hidden="true">#</a> 自定义网卡</h4>
<p>在容器创建时使用自定义网络</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 自定义创建的默认default "bridge"</span>
<span class="token comment">## 自定义创建一个网络网络</span>
<span class="token function">docker</span> network create <span class="token parameter variable">--driver</span> bridge <span class="token parameter variable">--subnet</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">--gateway</span> <span class="token number">192.168</span>.0.1 mynet

<span class="token comment">## 查看详情</span>
<span class="token function">docker</span> network inspect mynet

<span class="token comment">## 启动容器测试，使用 mynet！</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> tomcat-net-01 <span class="token parameter variable">--net</span> mynet tomcat
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> tomcat-net-02 <span class="token parameter variable">--net</span> mynet tomcat

<span class="token comment">## 再来查看下</span>
<span class="token function">docker</span> network inspect mynet

<span class="token comment">## 都可以ping通</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> tomcat-net-01 <span class="token function">ping</span> <span class="token number">192.168</span>.0.3
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> tomcat-net-01 <span class="token function">ping</span> tomcat-net-02
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="网络连通" tabindex="-1"><a class="header-anchor" href="#网络连通" aria-hidden="true">#</a> 网络连通</h3>
<p><img src="@source/Back/imgs/Docker/24.png" alt="24"></p>
<blockquote>
<p>docker0 和自定义网络是不连通的，使用自定义网络的好处就是网络隔离。<br>
如上图，如何让 tomcat-net-01 访问 tomcat1？<br>
使用 docker network connect [OPTIONS] NETWORK CONTAINER 连接两个网络。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 启动默认的容器，在docker0网络下</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> tomcat01 tomcat
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> tomcat02 tomcat

<span class="token comment">## 连接一个容器到一个网络，打通mynet-docker0</span>
<span class="token comment">## 命令 docker network connect [OPTIONS] NETWORK CONTAINER</span>
<span class="token function">docker</span> network connect mynet tomcat01
<span class="token function">docker</span> network inspect mynet

<span class="token comment">## tomcat01 可以ping通了</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> tomcat01 <span class="token function">ping</span> tomcat-net-01
<span class="token comment">## tomcat02 依旧ping不通，大家应该就理解了</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> tomcat02 <span class="token function">ping</span> tomcat-net-01
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="idea-整合-docker" tabindex="-1"><a class="header-anchor" href="#idea-整合-docker" aria-hidden="true">#</a> IDEA 整合 Docker</h2>
<ol>
<li>打 jar 包</li>
<li>打包镜像</li>
</ol>
<p><strong>在项目下编写 Dockerfile 文件，将打包好的 jar 包拷贝到 Dockerfile 同级目录</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM java:8

<span class="token comment">## 服务器只有dockerfile和jar在同级目录</span>
COPY *.jar /app.jar

CMD <span class="token punctuation">[</span><span class="token string">"--server.port=8080"</span><span class="token punctuation">]</span>

<span class="token comment">## 指定容器内要暴露的端口</span>
EXPOSE <span class="token number">8080</span>

ENTRYPOINT <span class="token punctuation">[</span><span class="token string">"java"</span>,<span class="token string">"-jar"</span>,<span class="token string">"/app.jar"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>将 Dockerfile 和 项目的 jar 包上传到 linux 服务器上，构建运行</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 构建镜像</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> idea-ks.
<span class="token comment">## 查看镜像</span>
<span class="token function">docker</span> images
<span class="token comment">## 运行</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> idea-ks idea-ks
<span class="token function">docker</span> <span class="token function">ps</span>
<span class="token comment">## 测试访问</span>
<span class="token function">curl</span> localhost:32779
<span class="token function">curl</span> localhost:32779/hello
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="可视化" tabindex="-1"><a class="header-anchor" href="#可视化" aria-hidden="true">#</a> 可视化</h2>
<h3 id="portainer-先用这个" tabindex="-1"><a class="header-anchor" href="#portainer-先用这个" aria-hidden="true">#</a> Portainer（先用这个）</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 8088:9000 \ --restart=always -v /var/run/docker.sock:/var/run/docker.sock -- privileged=true portainer/portainer
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="rancher-ci-cd-再用这个" tabindex="-1"><a class="header-anchor" href="#rancher-ci-cd-再用这个" aria-hidden="true">#</a> Rancher（CI/CD 再用这个）</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#安装rancher-server</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> rancher-server <span class="token parameter variable">-p</span> <span class="token number">8000</span>:8080 <span class="token parameter variable">-v</span> /etc/localtime:/etc/localtime:ro <span class="token parameter variable">-d</span> rancher/server
<span class="token comment">#安装agent</span>
<span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">--privileged</span> <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock <span class="token parameter variable">-v</span> /var/lib/rancher:/var/lib/rancher rancher/agent:v1.2.11
http://39.101.191.131:8000/v1/scripts/D3DBD43F263109BB881F:1577750400000:7M0y BzCw4XSxJklD7TpysYIpI
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol>
<li>介绍：</li>
</ol>
<blockquote>
<p>Portainer 是 Docker 的图形化管理工具，提供状态显示面板、应用模板快速部署、容器镜像网络数据卷
的基本操作（包括上传下载镜像，创建容器等操作）、事件日志显示、容器控制台操作、Swarm 集群和
服务等集中管理和操作、登录用户管理和控制等功能。功能十分全面，基本能满足中小型单位对容器管
理的全部需求。
如果仅有一个 docker 宿主机，则可使用单机版运行，Portainer 单机版运行十分简单，只需要一条语句即
可启动容器，来管理该机器上的 docker 镜像、容器等数据。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8088</span>:9000 <span class="token punctuation">\</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock -- <span class="token assign-left variable">privileged</span><span class="token operator">=</span>true portainer/portainer
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2">
<li>
<p>访问方式：http://IP:8088</p>
</li>
<li>
<p>首次登陆需要注册用户，给 admin 用户设置密码：</p>
</li>
</ol>
<p><img src="@source/Back/imgs/Docker/3.png" alt="3"></p>
<ol>
<li>单机版这里选择 local 即可，选择完毕，点击 Connect 即可连接到本地 docker：</li>
</ol>
<p><img src="@source/Back/imgs/Docker/4.png" alt="4"></p>
<ol start="5">
<li>登录成功！</li>
</ol>
<p><img src="@source/Back/imgs/Docker/5.png" alt="5"></p>
</template>
